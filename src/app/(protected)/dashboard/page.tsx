'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <p className="text-white">Cargando...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-amber-400">
            MissTNA
          </Link>
          <h1 className="text-xl text-white">Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Salir
          </button>
        </div>
      </nav>

      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-black text-white mb-2">Bienvenido, {session?.user?.name || session?.user?.email}</h2>
        <p className="text-slate-400">Monitoreo en tiempo real de tus bots de trading</p>
      </section>

      {/* Bots Metrics */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold text-white mb-6">Rendimiento de Bots</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'ETFs Strategy',
              status: 'Activo',
              trades: 242,
              winrate: 73.6,
              pnl: '+$12,450.75',
              color: 'from-green-600 to-green-800',
            },
            {
              name: 'SPY Trader',
              status: 'Activo',
              trades: 89,
              winrate: 76.4,
              pnl: '+$8,320.50',
              color: 'from-amber-600 to-amber-800',
            },
            {
              name: 'Stock Picker',
              status: 'Pausado',
              trades: 156,
              winrate: 71.8,
              pnl: '+$5,890.25',
              color: 'from-cyan-600 to-cyan-800',
            },
          ].map((bot, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${bot.color} rounded-lg p-6 text-white border border-opacity-20 border-white`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="text-xl font-bold">{bot.name}</h4>
                  <p className={`text-sm ${bot.status === 'Activo' ? 'text-green-200' : 'text-yellow-200'}`}>
                    {bot.status === 'Activo' ? '🟢' : '🟡'} {bot.status}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-white/70">Operaciones</p>
                  <p className="text-2xl font-bold">{bot.trades}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Winrate</p>
                  <p className="text-2xl font-bold">{bot.winrate}%</p>
                </div>
              </div>
              <div className="bg-white/10 rounded p-3 backdrop-blur">
                <p className="text-sm text-white/70">P&L Total</p>
                <p className="text-xl font-bold text-white">{bot.pnl}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Portfolio Overview */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h3 className="text-2xl font-bold text-white mb-6">Resumen del Portafolios</h3>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { label: 'Capital Total', value: '$100,000', color: 'from-blue-600 to-blue-800' },
            { label: 'P&L Acumulado', value: '+$26,661.50', color: 'from-green-600 to-green-800' },
            { label: 'Rentabilidad', value: '26.66%', color: 'from-amber-600 to-amber-800' },
            { label: 'Drawdown Máx', value: '-8.5%', color: 'from-red-600 to-red-800' },
          ].map((item, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${item.color} rounded-lg p-4 text-white`}>
              <p className="text-sm text-white/70 mb-2">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Settings */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Configuración</h3>
          <p className="text-slate-400 mb-6">Gestiona tus preferencias y credenciales de API</p>
          <button className="px-6 py-2 bg-amber-400 text-slate-900 font-bold rounded hover:bg-amber-300 transition">
            Ir a Configuración
          </button>
        </div>
      </section>
    </main>
  );
}
