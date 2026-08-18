'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ 
          id: authData.user.id, 
          nombre_completo: nombre, 
          rol: 'cliente' 
        }]);

      if (profileError) {
        console.error('Error al crear perfil:', profileError);
        setError('Error al crear tu perfil');
        setLoading(false);
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    }
  };

  if (success) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold text-green-600">✅ ¡Registro exitoso!</h2>
        <p className="text-[#662383]/60 mt-4">Redirigiendo al inicio de sesión...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-[#662383] text-center">📝 Registro</h1>
      <form onSubmit={handleRegister} className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-[#662383]">Nombre Completo</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#662383]">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
            required
            minLength={6}
          />
          <p className="text-xs text-gray-400 mt-1">Mínimo 6 caracteres</p>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#a46dcb] text-white py-2 rounded-lg hover:bg-[#662383] transition-colors disabled:opacity-50"
        >
          {loading ? '⏳ Registrando...' : 'Registrarse'}
        </button>
        <p className="text-center text-sm text-gray-600">
          ¿Ya tienes cuenta? <Link href="/login" className="text-[#a46dcb] hover:underline">Inicia Sesión</Link>
        </p>
      </form>
    </div>
  );
}