'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 relative">
              <Image
                src="/branding/logo.jpeg"
                alt="MissTNA Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold text-amber-400">MissTNA</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm">
            <a href="#pilares" className="text-slate-300 hover:text-amber-400 transition">Pilares</a>
            <a href="#bots" className="text-slate-300 hover:text-amber-400 transition">Bots</a>
            <a href="#contacto" className="text-slate-300 hover:text-amber-400 transition">Contacto</a>
          </div>
          <div className="flex gap-3">
            {session ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-amber-400 text-slate-900 font-bold rounded hover:bg-amber-300 transition"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 border border-cyan-400 text-cyan-400 rounded hover:bg-cyan-400/10 transition"
                >
                  Ingresar
                </Link>
                <button className="px-4 py-2 bg-amber-400 text-slate-900 font-bold rounded hover:bg-amber-300 transition">
                  Solicitar Acceso
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="text-amber-400">MissTNA</span>
            <br />
            <span className="text-white">Consultoría de Trading</span>
            <br />
            <span className="text-cyan-400">Profesional</span>
          </h1>
          <p className="text-lg text-slate-300 mb-8 leading-relaxed">
            Soluciones avanzadas en gestión de bots, análisis de algoritmos, consultoría financiera y gestión de riesgo para instituciones y traders profesionales.
          </p>
          <div className="flex gap-4">
            <Link
              href={session ? '/dashboard' : '/login'}
              className="px-6 py-3 bg-amber-400 text-slate-900 font-bold rounded-lg hover:bg-amber-300 transition"
            >
              {session ? 'Ir al Dashboard' : 'Acceder al Dashboard'}
            </Link>
            <button className="px-6 py-3 border-2 border-cyan-400 text-cyan-400 font-bold rounded-lg hover:bg-cyan-400/10 transition">
              Solicitar Consultoría
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur">
            <p className="text-slate-400 text-sm mb-2">P&L Total ETFs</p>
            <p className="text-3xl font-bold text-green-400">+$2,450</p>
            <p className="text-xs text-slate-500 mt-2">12 estrategias | Rentabilidad 73.6%</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur">
            <p className="text-slate-400 text-sm mb-2">Señales SPY</p>
            <p className="text-3xl font-bold text-amber-400">127</p>
            <p className="text-xs text-slate-500 mt-2">Este mes | DOTE Options</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 backdrop-blur">
            <p className="text-slate-400 text-sm mb-2">Comunidad</p>
            <p className="text-3xl font-bold text-cyan-400">500+</p>
            <p className="text-xs text-slate-500 mt-2">Traders conectados en Discord</p>
          </div>
        </div>
      </section>

      {/* Services (Pilares) */}
      <section id="pilares" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-black text-center mb-4 text-white">Servicios de Consultoría</h2>
        <p className="text-center text-slate-400 mb-12 text-lg">
          $50M+ AUM para clientes institucionales
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {[
            {
              icon: '🤖',
              title: 'Gestión de Bots',
              description: 'Desarrollo, optimización y monitoreo en tiempo real de algoritmos de trading.',
            },
            {
              icon: '📊',
              title: 'Análisis Algoritmo',
              description: 'Backtesting exhaustivo de estrategias con métricas avanzadas.',
            },
            {
              icon: '💼',
              title: 'Consultoría Financiera',
              description: 'Asesoramiento integral en construcción de portafolios.',
            },
            {
              icon: '🛡️',
              title: 'Risk Management',
              description: 'Gestión avanzada de riesgo y capital para instituciones.',
            },
            {
              icon: '⚙️',
              title: 'Soporte Técnico',
              description: 'Asistencia especializada 24/7 para operaciones profesionales.',
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-amber-400 hover:bg-slate-800/80 transition"
            >
              <div className="text-4xl mb-3">{pillar.icon}</div>
              <h3 className="text-lg font-bold text-white mb-3">{pillar.title}</h3>
              <p className="text-sm text-slate-300">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bots Showcase */}
      <section id="bots" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-black text-center mb-12 text-white">Nuestros Bots</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'ETFs Strategy',
              trades: 242,
              winrate: 73.6,
              pnl: '+$12,450.75',
              color: 'from-green-600 to-green-800',
            },
            {
              name: 'SPY Trader',
              trades: 89,
              winrate: 76.4,
              pnl: '+$8,320.50',
              color: 'from-amber-600 to-amber-800',
            },
            {
              name: 'Stock Picker',
              trades: 156,
              winrate: 71.8,
              pnl: '+$5,890.25',
              color: 'from-cyan-600 to-cyan-800',
            },
          ].map((bot, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${bot.color} rounded-lg p-6 text-white border border-opacity-20 border-white`}>
              <h3 className="text-xl font-bold mb-4">{bot.name}</h3>
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

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-amber-600 to-cyan-600 rounded-lg p-12 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Trading Profesional Sin Límites</h2>
          <p className="text-lg text-white/90 mb-8">
            Transforma tu estrategia de trading con tecnología y consultoría de clase mundial
          </p>
          <button className="px-8 py-4 bg-white text-amber-600 font-bold text-lg rounded-lg hover:bg-slate-100 transition">
            Comienza Ahora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 bg-slate-900/50 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400">
          <p>&copy; 2026 Miss TNA Software & Strategy LLC. Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
