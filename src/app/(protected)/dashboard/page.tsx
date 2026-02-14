'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface BotsData {
    etfs: any;
    spy: any;
    stocks: any;
    timestamp: string;
}

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [botsData, setBotsData] = useState<BotsData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
            return;
        }

        // Verificar permisos
        if (session?.user && !['PREMIUM', 'ADMIN'].includes((session.user as any).role)) {
            toast.error('No tienes acceso al dashboard');
            router.push('/');
            return;
        }

        // SSE Conexión para datos en tiempo real
        if (status === 'authenticated') {
            const eventSource = new EventSource('/api/stream/dashboard');

            eventSource.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    setBotsData(data);
                    setLoading(false);
                } catch (error) {
                    console.error('Error parsing SSE data:', error);
                }
            };

            eventSource.onerror = () => {
                console.error('SSE connection error');
                eventSource.close();
                setLoading(false);
            };

            return () => eventSource.close();
        }
    }, [status, session, router]);

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        );
    }

    if (!botsData) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
                <div className="card text-center">
                    <p className="text-gray-400">No hay datos disponibles</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
            {/* Header */}
            <div className="border-b border-yellow-600 border-opacity-10 bg-slate-900 bg-opacity-50 sticky top-0 z-40 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold gradient-text">Dashboard MissTNA</h1>
                        <div className="flex items-center gap-6">
                            <span className="text-sm text-gray-400">
                                Actualizado: {new Date(botsData.timestamp).toLocaleTimeString('es-ES')}
                            </span>
                            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                            
                            {/* Navegación */}
                            <div className="flex gap-3">
                                <Link 
                                    href="/" 
                                    className="px-4 py-2 text-sm bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                                >
                                    🏠 Home
                                </Link>
                                <button
                                    onClick={() => signOut({ callbackUrl: '/' })}
                                    className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                                >
                                    🚪 Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* ETFs Bot */}
                {botsData.etfs && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-yellow-400">Bot ETFs (12 Activos)</h2>
                        <div className="grid md:grid-cols-4 gap-4 mb-6">
                            <div className="card">
                                <div className="text-sm text-gray-400 mb-2">Total Trades</div>
                                <div className="text-3xl font-bold">{botsData.etfs.metricas?.total_trades || 0}</div>
                            </div>
                            <div className="card">
                                <div className="text-sm text-gray-400 mb-2">Winrate</div>
                                <div className="text-3xl font-bold text-green-400">
                                    {botsData.etfs.metricas?.winrate?.toFixed(1) || 0}%
                                </div>
                            </div>
                            <div className="card">
                                <div className="text-sm text-gray-400 mb-2">P&L Total</div>
                                <div className={`text-3xl font-bold ${(botsData.etfs.metricas?.pnl_total || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    ${botsData.etfs.metricas?.pnl_total?.toFixed(2) || 0}
                                </div>
                            </div>
                            <div className="card">
                                <div className="text-sm text-gray-400 mb-2">Avg R</div>
                                <div className="text-3xl font-bold text-cyan-400">
                                    {botsData.etfs.metricas?.avg_r?.toFixed(2) || 0}R
                                </div>
                            </div>
                        </div>

                        {/* Rutas Activas */}
                        {botsData.etfs.rutas_activas && botsData.etfs.rutas_activas.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-bold mb-4">Rutas Activas ({botsData.etfs.rutas_activas.length})</h3>
                                <div className="overflow-x-auto card">
                                    <table className="w-full">
                                        <thead>
                                            <tr>
                                                <th>Símbolo</th>
                                                <th>Tipo</th>
                                                <th>Entry</th>
                                                <th>Actual</th>
                                                <th>Stop</th>
                                                <th>P&L</th>
                                                <th>Score</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {botsData.etfs.rutas_activas.map((route: any, i: number) => (
                                                <tr key={i}>
                                                    <td className="font-bold">{route.symbol}</td>
                                                    <td>
                                                        <span className={`badge ${route.signal === 'LONG' ? 'badge-success' : 'badge-danger'}`}>
                                                            {route.signal}
                                                        </span>
                                                    </td>
                                                    <td>${route.entry.toFixed(2)}</td>
                                                    <td>${route.current.toFixed(2)}</td>
                                                    <td>${route.stop.toFixed(2)}</td>
                                                    <td className={route.pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                                                        {route.pnl >= 0 ? '+' : ''}{route.pnl.toFixed(2)}
                                                    </td>
                                                    <td>{route.score.toFixed(1)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* SPY Bot */}
                {botsData.spy && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-purple-400">Bot SPY (Opciones 0DTE)</h2>
                        <div className="grid md:grid-cols-4 gap-4 mb-6">
                            <div className="card">
                                <div className="text-sm text-gray-400 mb-2">Total Trades</div>
                                <div className="text-3xl font-bold">{botsData.spy.trades || 0}</div>
                            </div>
                            <div className="card">
                                <div className="text-sm text-gray-400 mb-2">Winrate</div>
                                <div className="text-3xl font-bold text-green-400">
                                    {botsData.spy.winRate?.toFixed(1) || 0}%
                                </div>
                            </div>
                            <div className="card">
                                <div className="text-sm text-gray-400 mb-2">P&L Total</div>
                                <div className={`text-3xl font-bold ${(botsData.spy.pnl || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    ${botsData.spy.pnl?.toFixed(2) || 0}
                                </div>
                            </div>
                            <div className="card">
                                <div className="text-sm text-gray-400 mb-2">Status</div>
                                <div className="text-3xl font-bold text-cyan-400">
                                    {botsData.spy.status === 'RUNNING' ? '🟢 Activo' : '🔴 Parado'}
                                </div>
                            </div>
                        </div>
                        {botsData.spy.activeRutas && botsData.spy.activeRutas.length > 0 && (
                            <div className="card">
                                <h3 className="text-lg font-bold mb-3">Rutas Activas</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {botsData.spy.activeRutas.map((ruta: string) => (
                                        <span key={ruta} className="badge badge-primary">{ruta}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Stocks Bot */}
                {botsData.stocks && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold mb-6 text-green-400">Bot Stocks (Tesla + 7 Maravillas)</h2>
                        <div className="grid md:grid-cols-4 gap-4 mb-6">
                            <div className="card">
                                <div className="text-sm text-gray-400 mb-2">Total Trades</div>
                                <div className="text-3xl font-bold">{botsData.stocks.trades || 0}</div>
                            </div>
                            <div className="card">
                                <div className="text-sm text-gray-400 mb-2">Winrate</div>
                                <div className="text-3xl font-bold text-green-400">
                                    {botsData.stocks.winRate?.toFixed(1) || 0}%
                                </div>
                            </div>
                            <div className="card">
                                <div className="text-sm text-gray-400 mb-2">P&L Total</div>
                                <div className={`text-3xl font-bold ${(botsData.stocks.pnl || 0) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                    ${botsData.stocks.pnl?.toFixed(2) || 0}
                                </div>
                            </div>
                            <div className="card">
                                <div className="text-sm text-gray-400 mb-2">Status</div>
                                <div className="text-3xl font-bold text-cyan-400">
                                    {botsData.stocks.status === 'RUNNING' ? '🟢 Activo' : '🔴 Parado'}
                                </div>
                            </div>
                        </div>
                        {botsData.stocks.activeRutas && botsData.stocks.activeRutas.length > 0 && (
                            <div className="card">
                                <h3 className="text-lg font-bold mb-3">Rutas Activas</h3>
                                <div className="flex gap-2 flex-wrap">
                                    {botsData.stocks.activeRutas.map((ruta: string) => (
                                        <span key={ruta} className="badge badge-success">{ruta}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
