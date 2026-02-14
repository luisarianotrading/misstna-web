import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Datos mock temporales (hasta estar API local lista)
const MOCK_DATA = {
    etfs: {
        botName: 'ETFs Bots',
        status: 'RUNNING',
        trades: 242,
        wins: 178,
        losses: 64,
        winRate: 73.6,
        pnl: 12450.75,
        pnlPercent: 12.45,
        activeRutas: ['TNA', 'SOXL', 'TSLR'],
        lastUpdate: new Date().toISOString()
    },
    spy: {
        botName: 'SPY Bot',
        status: 'RUNNING',
        trades: 89,
        wins: 68,
        losses: 21,
        winRate: 76.4,
        pnl: 8320.50,
        pnlPercent: 8.32,
        activeRutas: ['SPY', 'SPX'],
        lastUpdate: new Date().toISOString()
    },
    stocks: {
        botName: 'Stocks Bot',
        status: 'RUNNING',
        trades: 156,
        wins: 112,
        losses: 44,
        winRate: 71.8,
        pnl: 5890.25,
        pnlPercent: 5.89,
        activeRutas: ['TSLA', 'NVDA'],
        lastUpdate: new Date().toISOString()
    }
};

export async function GET(req: NextRequest) {
    const encoder = new TextEncoder();
    let intervalId: NodeJS.Timeout;

    const stream = new ReadableStream({
        async start(controller) {
            const localApiUrl = process.env.LOCAL_API_URL || 'http://localhost:5000';
            const localApiKey = process.env.LOCAL_API_KEY;

            const fetchBotsData = async () => {
                try {
                    // Intentar conectar a API local
                    const [etfsData, spyData, stocksData] = await Promise.allSettled([
                        axios.get(`${localApiUrl}/data/etfs`, {
                            headers: { 'Authorization': `Bearer ${localApiKey}` },
                            timeout: 3000
                        }),
                        axios.get(`${localApiUrl}/data/spy`, {
                            headers: { 'Authorization': `Bearer ${localApiKey}` },
                            timeout: 3000
                        }),
                        axios.get(`${localApiUrl}/data/stocks`, {
                            headers: { 'Authorization': `Bearer ${localApiKey}` },
                            timeout: 3000
                        })
                    ]);

                    const data = {
                        etfs: etfsData.status === 'fulfilled' ? etfsData.value.data : MOCK_DATA.etfs,
                        spy: spyData.status === 'fulfilled' ? spyData.value.data : MOCK_DATA.spy,
                        stocks: stocksData.status === 'fulfilled' ? stocksData.value.data : MOCK_DATA.stocks,
                        timestamp: new Date().toISOString()
                    };

                    return data;
                } catch (error) {
                    // Si falla, usar datos mock
                    return {
                        etfs: MOCK_DATA.etfs,
                        spy: MOCK_DATA.spy,
                        stocks: MOCK_DATA.stocks,
                        timestamp: new Date().toISOString()
                    };
                }
            };

            // Enviar datos iniciales
            const initialData = await fetchBotsData();
            controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`)
            );

            // Actualizar cada 5 segundos (más rápido para pruebas)
            intervalId = setInterval(async () => {
                const newData = await fetchBotsData();
                controller.enqueue(
                    encoder.encode(`data: ${JSON.stringify(newData)}\n\n`)
                );
            }, 5000);

            // Mantener conexión viva
            const keepAliveId = setInterval(() => {
                controller.enqueue(encoder.encode(': keepalive\n\n'));
            }, 30000);

            req.signal.addEventListener('abort', () => {
                clearInterval(intervalId);
                clearInterval(keepAliveId);
                controller.close();
            });
        },
        cancel() {
            clearInterval(intervalId);
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'X-Accel-Buffering': 'no'
        }
    });
}
