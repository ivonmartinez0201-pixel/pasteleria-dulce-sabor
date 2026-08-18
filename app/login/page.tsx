'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (loginError) {
        setError(loginError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        router.push('/dashboard');
      } else {
        setError('No se pudo iniciar sesión');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-[#662383] text-center">🔐 Iniciar Sesión</h1>
      <form onSubmit={handleLogin} className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-[#662383]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@correo.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#662383]">Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
            required
          />
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#a46dcb] text-white py-2 rounded-lg hover:bg-[#662383] transition-colors disabled:opacity-50"
        >
          {loading ? '⏳ Iniciando...' : 'Iniciar Sesión'}
        </button>
        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta? <Link href="/register" className="text-[#a46dcb] hover:underline">Regístrate</Link>
        </p>
      </form>
    </div>
  );
}