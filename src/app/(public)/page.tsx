'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
    const { data: session } = useSession();
    const router = useRouter();

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const pillars = [
        {
            title: 'Didáctica',
            description: 'Claridad sin complicaciones. Cualquier persona puede entender.',
            icon: '📚',
            details: 'Métodos visuales y prácticos para aprender trading desde cero'
        },
        {
            title: 'Exclusividad',
            description: 'No es un grupo masivo. Es un método educativo protegido.',
            icon: '🔒',
            details: 'Acceso limitado a 500 traders selectos. Comunidad de élite.'
        },
        {
            title: 'Protección',
            description: 'Lo primero es aprender a no perder. Luego, crecer.',
            icon: '🛡️',
            details: 'Stop loss disciplinado. Gestión de riesgo desde el primer trade.'
        },
        {
            title: 'Formación',
            description: 'Técnica + Mentalidad + Disciplina integral.',
            icon: '🎯',
            details: 'Sesiones vivas, mentoría 1-a-1, y análisis en tiempo real.'
        },
        {
            title: 'Comunidad',
            description: 'Discord activo. Acompañamiento real, no un curso frío.',
            icon: '👥',
            details: 'Soporte 24/7 y networking con traders profesionales.'
        }
    ];

    const bots = [
        {
            name: 'Bot ETFs',
            description: 'Trading automatizado de 12 ETFs apalancados',
            assets: '12 Activos apalancados',
            status: 'Activo',
            statusBadge: '🟢',
            pnl: '+$12,450.75',
            winrate: '73.6%',
            trades: '242',
            color: 'border-blue-500'
        },
        {
            name: 'Bot SPY',
            description: 'Opciones SPY/SPX 0 DTE estrategia de scalping',
            assets: 'Opciones 0DTE',
            status: 'Activo',
            statusBadge: '🟢',
            pnl: '+$8,320.50',
            winrate: '76.4%',
            trades: '89',
            color: 'border-purple-500'
        },
        {
            name: 'Bot Stocks',
            description: 'Trading de acciones: Tesla + 7 blue chips',
            assets: 'Tesla + 7 Maravillas',
            status: 'En pruebas',
            statusBadge: '🟡',
            pnl: '+$5,890.25',
            winrate: '71.8%',
            trades: '156',
            color: 'border-green-500'
        }
    ];

    return (
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900 bg-opacity-80 border-b border-yellow-600 border-opacity-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <Image 
                            src="/branding/logo.jpeg" 
                            alt="MissTNA Logo" 
                            width={40}
                            height={40}
                            className="rounded-lg"
                        />
                        <span className="text-xl font-bold gradient-text hidden sm:inline">MissTNA</span>
                    </Link>
                    <div className="hidden md:flex gap-8">
                        <button
                            onClick={() => scrollToSection('pilares')}
                            className="text-light hover:text-yellow-400 transition"
                        >
                            Pilares
                        </button>
                        <button
                            onClick={() => scrollToSection('bots')}
                            className="text-light hover:text-yellow-400 transition"
                        >
                            Bots
                        </button>
                        <button
                            onClick={() => scrollToSection('contacto')}
                            className="text-light hover:text-yellow-400 transition"
                        >
                            Contacto
                        </button>
                    </div>
                    <div className="flex gap-4">
                        {session?.user ? (
                            <Link
                                href="/dashboard"
                                className="btn-primary"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="btn-secondary">
                                    Ingresar
                                </Link>
                                <Link href="/register" className="btn-primary">
                                    Solicitar Acceso
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in-up">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="gradient-text">MissTNA</span>
                            <br />
                            Método Educativo Exclusivo
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            Trading profesional desde cero. Aprende a leer rutas de mercado con claridad, disciplina y protección del capital.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            {!session?.user && (
                                <>
                                    <button
                                        onClick={() => router.push('/dashboard')}
                                        className="btn-primary"
                                    >
                                        Acceder al Dashboard
                                    </button>
                                    <button
                                        onClick={() => scrollToSection('contacto')}
                                        className="btn-secondary"
                                    >
                                        Solicitar Acceso
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* KPI Cards Preview */}
                    <div className="grid gap-4">
                        <div className="card">
                            <div className="text-sm text-gray-400 mb-2">P&L Total ETFs</div>
                            <div className="text-4xl font-bold text-green-400">+$2,450</div>
                            <div className="text-xs text-gray-500 mt-2">12 activos | Winrate 65%</div>
                        </div>
                        <div className="card">
                            <div className="text-sm text-gray-400 mb-2">Señales SPY</div>
                            <div className="text-4xl font-bold text-yellow-400">127</div>
                            <div className="text-xs text-gray-500 mt-2">Este mes | 0DTE Options</div>
                        </div>
                        <div className="card">
                            <div className="text-sm text-gray-400 mb-2">Comunidad</div>
                            <div className="text-4xl font-bold text-cyan-400">500+</div>
                            <div className="text-xs text-gray-500 mt-2">Traders conectados en Discord</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pilares Section */}
            <section id="pilares" className="bg-gradient-to-b from-slate-900 to-slate-800 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-4 gradient-text">
                        5 Pilares de MissTNA
                    </h2>
                    <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
                        Nuestro método se construye sobre estos 5 pilares fundamentales que garantizan tu éxito en el trading disciplinado
                    </p>
                    <div className="grid md:grid-cols-5 gap-6">
                        {pillars.map((pillar, i) => (
                            <div 
                                key={i} 
                                className="group card bg-gradient-to-b from-slate-800 to-slate-900 border border-yellow-600 border-opacity-20 hover:border-opacity-100 hover:shadow-lg hover:shadow-yellow-600 transition-all duration-300"
                            >
                                <div className="text-6xl mb-4 text-center group-hover:scale-110 transition-transform">{pillar.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-center text-yellow-400">{pillar.title}</h3>
                                <p className="text-gray-400 text-sm text-center mb-3 leading-relaxed">{pillar.description}</p>
                                <div className="hidden group-hover:block text-xs text-gray-300 text-center mt-4 pt-4 border-t border-gray-700">
                                    {pillar.details}
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Subtext */}
                    <div className="mt-16 text-center">
                        <p className="text-lg text-gray-300">
                            Más de <span className="text-yellow-400 font-bold text-2xl">500 traders</span> ya forman parte de la comunidad
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                            Dashboard en tiempo real • Señales automáticas • Mentoría personal
                        </p>
                    </div>
                </div>
            </section>

            {/* Bots Section */}
            <section id="bots" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
                        3 Bots Activos
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {bots.map((bot, i) => (
                            <div key={i} className={`card border-l-4 ${bot.color} hover:bg-opacity-80 transition`}>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold">{bot.name}</h3>
                                    <span className="text-2xl">{bot.statusBadge}</span>
                                </div>
                                <p className="text-sm text-gray-400 mb-4">{bot.description}</p>
                                
                                {/* Metrics Grid */}
                                <div className="grid grid-cols-3 gap-3 mb-6 py-4 bg-slate-800 bg-opacity-50 rounded p-3">
                                    <div className="text-center">
                                        <div className="text-xs text-gray-500 mb-1">Trades</div>
                                        <div className="text-lg font-bold text-cyan-400">{bot.trades}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-gray-500 mb-1">Winrate</div>
                                        <div className="text-lg font-bold text-green-400">{bot.winrate}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-xs text-gray-500 mb-1">P&L</div>
                                        <div className="text-lg font-bold text-yellow-400">{bot.pnl}</div>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <div className="text-sm text-gray-400 mb-2">Activos</div>
                                    <div className="text-base font-semibold text-light">{bot.assets}</div>
                                </div>
                                
                                <div className="mb-6">
                                    <span className={`badge ${bot.status === 'Activo' ? 'badge-success' : 'badge-warning'}`}>
                                        {bot.status}
                                    </span>
                                </div>
                                
                                <Link href="/dashboard" className="w-full btn-secondary text-sm py-2 inline-block text-center">
                                    Ver Dashboard
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-gold py-20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">
                        ¿Listo para dominar el trading?
                    </h2>
                    <p className="text-lg text-slate-800 mb-8">
                        Únete a una comunidad exclusiva de traders disciplinados. Acceso inmediato al dashboard y señales en tiempo real.
                    </p>
                    <button
                        onClick={() => router.push('/register')}
                        className="inline-block px-8 py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition"
                    >
                        Solicitar Acceso Ahora
                    </button>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contacto" className="py-20">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
                        Contacto
                    </h2>
                    <div className="card">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-2">Nombre</label>
                                <input
                                    type="text"
                                    className="w-full bg-slate-800 border border-yellow-600 border-opacity-30 rounded px-4 py-2 text-light focus:outline-none focus:border-yellow-400"
                                    placeholder="Tu nombre"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-slate-800 border border-yellow-600 border-opacity-30 rounded px-4 py-2 text-light focus:outline-none focus:border-yellow-400"
                                    placeholder="tu-email@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-2">Mensaje</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-slate-800 border border-yellow-600 border-opacity-30 rounded px-4 py-2 text-light focus:outline-none focus:border-yellow-400"
                                    placeholder="Tu mensaje..."
                                ></textarea>
                            </div>
                            <button type="submit" className="w-full btn-primary">
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-yellow-600 border-opacity-10 bg-slate-900 bg-opacity-50 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                    <p>© 2026 MissTNA Trading. Todos los derechos reservados.</p>
                    <p className="mt-2 text-sm">
                        Trading involucra riesgo. Por favor, opere responsablemente.
                    </p>
                </div>
            </footer>
        </main>
    );
}
