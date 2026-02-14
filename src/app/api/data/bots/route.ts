import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// Unificar datos de los 3 bots desde la API local
export async function GET(req: NextRequest) {
    try {
        const localApiUrl = process.env.LOCAL_API_URL || 'http://localhost:5000';
        const localApiKey = process.env.LOCAL_API_KEY;

        // Intentar obtener datos de los 3 bots en paralelo
        const [etfsData, spyData, stocksData] = await Promise.allSettled([
            axios.get(`${localApiUrl}/data/etfs`, {
                headers: { 'Authorization': `Bearer ${localApiKey}` },
                timeout: 5000
            }),
            axios.get(`${localApiUrl}/data/spy`, {
                headers: { 'Authorization': `Bearer ${localApiKey}` },
                timeout: 5000
            }),
            axios.get(`${localApiUrl}/data/stocks`, {
                headers: { 'Authorization': `Bearer ${localApiKey}` },
                timeout: 5000
            })
        ]);

        const data = {
            etfs: etfsData.status === 'fulfilled' ? etfsData.value.data : null,
            spy: spyData.status === 'fulfilled' ? spyData.value.data : null,
            stocks: stocksData.status === 'fulfilled' ? stocksData.value.data : null,
            timestamp: new Date().toISOString(),
            status: 'success'
        };

        // Cachear respuesta por 60 segundos
        const cacheKey = 'bots-data';
        // TODO: Implementar cache con Redis

        return NextResponse.json(data);
    } catch (error: any) {
        console.error('Error fetching bots data:', error.message);
        return NextResponse.json(
            {
                error: 'Failed to fetch bots data',
                message: error.message
            },
            { status: 500 }
        );
    }
}
