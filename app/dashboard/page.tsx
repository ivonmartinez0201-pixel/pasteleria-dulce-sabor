'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      setUser(session.user);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      setProfile(profileData);
      setLoading(false);
    };

    getUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-[#662383]/60">⏳ Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-yellow-50 border border-yellow-200 rounded-xl p-8">
        <h2 className="text-xl font-bold text-yellow-700">⚠️ No hay sesión</h2>
        <p className="text-yellow-600 mt-2">No estás logueado.</p>
        <a href="/login" className="inline-block mt-4 bg-[#a46dcb] text-white px-4 py-2 rounded-lg">Ir a Login</a>
      </div>
    );
  }

  const rol = profile?.rol || 'cliente';
  const nombre = profile?.nombre_completo || user.email;

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#662383] mb-6">📊 Panel de Control</h1>
      
      <div className="bg-[#d0b2e0]/30 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#662383]/70">
          👤 <strong>{nombre}</strong> - {user.email}
        </p>
        <p className="text-sm text-[#662383]/70 mt-1">
          🏷️ Rol: <strong className="uppercase">{rol}</strong>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-semibold text-[#662383]">👤 Mi Perfil</h3>
          <p className="text-[#662383]/60 mt-2">Nombre: <strong>{nombre}</strong></p>
          <p className="text-[#662383]/60 mt-1">Email: {user.email}</p>
          <p className="text-[#662383]/60 mt-1">Rol: <strong className="uppercase">{rol}</strong></p>
        </div>

        {rol === 'repostero' ? (
          <div className="bg-white rounded-xl shadow-md p-6 border-2 border-[#a46dcb]">
            <h3 className="text-xl font-semibold text-[#662383]">🍰 Gestión de Postres</h3>
            <p className="text-[#662383]/60 mt-2">Eres repostero. Puedes crear y gestionar tus postres.</p>
            <Link 
              href="/dashboard/nuevo" 
              className="inline-block mt-3 bg-[#a46dcb] text-white px-4 py-2 rounded-lg hover:bg-[#662383] transition-colors"
            >
              + Agregar Postre
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-[#662383]">📝 Explorar Postres</h3>
            <p className="text-[#662383]/60 mt-2">Eres cliente. Puedes ver y explorar todos los postres.</p>
            <Link 
              href="/postres" 
              className="inline-block mt-3 bg-[#d0b2e0] text-[#662383] px-4 py-2 rounded-lg hover:bg-[#a46dcb] hover:text-white transition-colors"
            >
              Ver Postres
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}