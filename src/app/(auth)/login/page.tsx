'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false
            });

            if (result?.error) {
                toast.error(result.error);
            } else if (result?.ok) {
                toast.success('¡Ingreso exitoso!');
                router.push('/dashboard');
            }
        } catch (error) {
            toast.error('Error al ingresar');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
            <div className="w-full max-w-md">
                <div className="card">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold gradient-text mb-2">MissTNA</h1>
                        <p className="text-gray-400">Ingresa a tu cuenta</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-800 border border-yellow-600 border-opacity-30 rounded px-4 py-2 text-light focus:outline-none focus:border-yellow-400"
                                placeholder="tu-email@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold mb-2">Contraseña</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-800 border border-yellow-600 border-opacity-30 rounded px-4 py-2 text-light focus:outline-none focus:border-yellow-400"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary disabled:opacity-50"
                        >
                            {loading ? 'Ingresando...' : 'Ingresar'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-gray-400">
                        ¿No tienes cuenta?{' '}
                        <Link href="/register" className="text-yellow-400 hover:text-yellow-300">
                            Solicita acceso
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
