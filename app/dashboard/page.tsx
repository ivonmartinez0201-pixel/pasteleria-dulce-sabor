'use client';

import { useState, useEffect, useTransition } from 'react';
import { supabase } from '@/lib/supabase';
import { eliminarPostre } from '@/app/actions/postres';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [misPostres, setMisPostres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState<{ tipo: 'success' | 'error'; texto: string } | null>(null);
  const [isPending, startTransition] = useTransition();
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

      const { data: postresData } = await supabase
        .from('postres')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      setMisPostres(postresData || []);
      setLoading(false);
    };

    getUser();
  }, [router]);

  const handleEliminar = (formData: FormData) => {
    const id = parseInt(formData.get('id') as string);
    const confirmar = confirm('¿Estás seguro de eliminar esta experiencia?');
    if (!confirmar) return;

    startTransition(async () => {
      try {
        await eliminarPostre(formData);
        setMensaje({ tipo: 'success', texto: '✅ ¡Experiencia eliminada con éxito!' });
        setMisPostres(misPostres.filter(p => p.id !== id));
        setTimeout(() => setMensaje(null), 3000);
      } catch (err: any) {
        setMensaje({ tipo: 'error', texto: '❌ Error al eliminar: ' + err.message });
        setTimeout(() => setMensaje(null), 3000);
      }
    });
  };

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
    <div className="max-w-6xl mx-auto">
      {mensaje && (
        <div className={`mb-4 px-4 py-3 rounded-lg ${
          mensaje.tipo === 'success' 
            ? 'bg-green-100 border border-green-400 text-green-700' 
            : 'bg-red-100 border border-red-400 text-red-700'
        }`}>
          <p className="font-bold">{mensaje.texto}</p>
        </div>
      )}

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#662383]">📊 Panel de Control</h1>
        <p className="text-[#662383]/60 mt-1">Bienvenido de vuelta, {nombre}</p>
      </div>

      <div className="bg-gradient-to-r from-[#e8ddf6] to-[#d0b2e0] rounded-xl p-6 mb-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#a46dcb] flex items-center justify-center text-white text-2xl font-bold">
              {nombre.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xl font-semibold text-[#662383]">{nombre}</p>
              <p className="text-[#662383]/70 text-sm">{user.email}</p>
            </div>
          </div>
          <div className="mt-3 md:mt-0">
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
              rol === 'repostero' 
                ? 'bg-[#a46dcb] text-white' 
                : 'bg-[#d0b2e0] text-[#662383]'
            }`}>
              {rol === 'repostero' ? '👨‍🍳 Repostero' : '👤 Cliente'}
            </span>
          </div>
        </div>
      </div>

      {rol === 'repostero' ? (
        <div className="bg-white rounded-xl shadow-md p-6 border-2 border-[#a46dcb] mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[#662383]">🍰 Compartir Experiencia</h3>
              <p className="text-[#662383]/60 mt-1">Cuenta tu experiencia haciendo un postre.</p>
            </div>
            <Link 
              href="/dashboard/nuevo" 
              className="mt-3 md:mt-0 bg-[#a46dcb] text-white px-6 py-2.5 rounded-lg hover:bg-[#662383] transition-colors font-medium inline-block text-center"
            >
              + Compartir
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[#662383]">📝 Explorar Experiencias</h3>
              <p className="text-[#662383]/60 mt-1">Descubre las experiencias de otros reposteros.</p>
            </div>
            <Link 
              href="/postres" 
              className="mt-3 md:mt-0 bg-[#d0b2e0] text-[#662383] px-6 py-2.5 rounded-lg hover:bg-[#a46dcb] hover:text-white transition-colors font-medium inline-block text-center"
            >
              Ver Experiencias
            </Link>
          </div>
        </div>
      )}

      {rol === 'repostero' && (
        <div>
          <h2 className="text-xl font-bold text-[#662383] mb-4">📝 Mis Experiencias</h2>
          {misPostres.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <p className="text-[#662383]/60">No has compartido ninguna experiencia aún.</p>
              <Link 
                href="/dashboard/nuevo" 
                className="inline-block mt-3 text-[#a46dcb] hover:underline"
              >
                + Compartir tu primera experiencia
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {misPostres.map((postre) => (
                <div key={postre.id} className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
                  {postre.imagen_url ? (
                    <img
                      src={postre.imagen_url}
                      alt={postre.nombre}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  ) : (
                    <div className="w-full h-32 bg-[#d0b2e0]/30 rounded-lg mb-3 flex items-center justify-center">
                      <span className="text-3xl">🍰</span>
                    </div>
                  )}
                  <h3 className="font-semibold text-[#662383]">{postre.nombre}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className="text-xs bg-[#d0b2e0]/30 text-[#662383] px-2 py-0.5 rounded-full">
                      {postre.dificultad || 'Media'}
                    </span>
                    {postre.tiempo_preparacion && (
                      <span className="text-xs bg-[#d0b2e0]/30 text-[#662383] px-2 py-0.5 rounded-full">
                        ⏱️ {postre.tiempo_preparacion}
                      </span>
                    )}
                  </div>
                  {postre.experiencia && (
                    <p className="text-xs text-[#662383]/60 mt-2 line-clamp-2">
                      💪 {postre.experiencia}
                    </p>
                  )}
                  <div className="flex gap-2 mt-3">
                    <Link
                      href={`/dashboard/editar/${postre.id}`}
                      className="flex-1 text-center bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      ✏️ Editar
                    </Link>
                    <form action={handleEliminar}>
                      <input type="hidden" name="id" value={postre.id} />
                      <button
                        type="submit"
                        disabled={isPending}
                        className="flex-1 text-center bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors text-sm disabled:opacity-50"
                      >
                        {isPending ? '⏳' : '🗑️ Eliminar'}
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}