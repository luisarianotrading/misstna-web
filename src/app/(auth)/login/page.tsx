'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('trader@misstna.app');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email o contraseña inválidos');
      } else if (result?.ok) {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="text-amber-400 hover:text-amber-300 mb-6 inline-block">
          ← Volver al inicio
        </Link>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 backdrop-blur">
          <h1 className="text-3xl font-bold text-white mb-2">Acceso al Dashboard</h1>
          <p className="text-slate-400 mb-6">Ingresa tus credenciales para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                placeholder="trader@misstna.app"
              />
              <p className="text-xs text-slate-400 mt-1">Demo: trader@misstna.app</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                placeholder="password123"
              />
              <p className="text-xs text-slate-400 mt-1">Demo: password123</p>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 bg-amber-400 text-slate-900 font-bold rounded hover:bg-amber-300 disabled:opacity-50 transition"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <div className="mt-6 p-4 bg-slate-700/50 rounded border border-slate-600">
            <p className="text-xs text-slate-400 mb-2"><strong>Cuentas de Demo:</strong></p>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>👤 <strong>Trader:</strong> trader@misstna.app / password123</li>
              <li>🔐 <strong>Admin:</strong> admin@misstna.app / admin123</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
