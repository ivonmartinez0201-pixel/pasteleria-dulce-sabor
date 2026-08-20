import { supabase } from '@/lib/supabase';
import Link from 'next/link';

async function getPostre(id: string) {
  const { data, error } = await supabase
    .from('postres')
    .select(`
      *,
      categorias (nombre)
    `)
    .eq('id', id)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export default async function PostreDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postre = await getPostre(id);

  if (!postre) {
    return (
      <div className="max-w-3xl mx-auto mt-10 text-center">
        <h1 className="text-2xl font-bold text-red-600">❌ Experiencia no encontrada</h1>
        <Link href="/postres" className="inline-block mt-4 text-[#a46dcb] hover:underline">
          ← Volver a experiencias
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      {postre.imagen_url ? (
        <img
          src={postre.imagen_url}
          alt={postre.nombre}
          className="w-full h-64 object-cover"
        />
      ) : (
        <div className="w-full h-64 bg-[#d0b2e0]/30 flex items-center justify-center">
          <span className="text-6xl">🍰</span>
        </div>
      )}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-[#662383]">{postre.nombre}</h1>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {postre.dificultad && (
            <span className="text-sm bg-[#d0b2e0]/30 text-[#662383] px-3 py-1 rounded-full">
              {postre.dificultad}
            </span>
          )}
          {postre.tiempo_preparacion && (
            <span className="text-sm bg-[#d0b2e0]/30 text-[#662383] px-3 py-1 rounded-full">
              ⏱️ {postre.tiempo_preparacion}
            </span>
          )}
          {postre.categorias && (
            <span className="text-sm bg-[#d0b2e0]/30 text-[#662383] px-3 py-1 rounded-full">
              📂 {postre.categorias.nombre}
            </span>
          )}
        </div>

        <p className="text-sm text-[#662383]/40 mt-3">
          📅 {new Date(postre.created_at).toLocaleDateString('es-ES')}
        </p>

        {postre.descripcion && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold text-[#662383]">📝 Descripción</h2>
            <p className="text-[#662383]/70 mt-1">{postre.descripcion}</p>
          </div>
        )}

        {postre.experiencia && (
          <div className="mt-4 p-4 bg-[#e8ddf6] rounded-lg">
            <h2 className="text-lg font-semibold text-[#662383]">💪 Mi Experiencia</h2>
            <p className="text-[#662383]/70 mt-1">{postre.experiencia}</p>
          </div>
        )}

        {postre.solucion && (
          <div className="mt-4 p-4 bg-[#d0b2e0]/20 rounded-lg">
            <h2 className="text-lg font-semibold text-[#662383]">✅ Cómo lo resolví</h2>
            <p className="text-[#662383]/70 mt-1">{postre.solucion}</p>
          </div>
        )}

        <Link
          href="/postres"
          className="inline-block mt-6 text-[#a46dcb] hover:underline"
        >
          ← Volver a experiencias
        </Link>
      </div>
    </div>
  );
}