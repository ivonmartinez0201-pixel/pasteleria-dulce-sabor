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
        <h1 className="text-2xl font-bold text-red-600">❌ Postre no encontrado</h1>
        <Link href="/postres" className="inline-block mt-4 text-[#a46dcb] hover:underline">
          ← Volver a postres
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
        <p className="text-2xl font-bold text-[#a46dcb] mt-2">${postre.precio}</p>
        {postre.categorias && (
          <p className="text-sm text-[#662383]/60 mt-1">
            📂 {postre.categorias.nombre}
          </p>
        )}
        <p className="text-[#662383]/70 mt-4">{postre.descripcion || 'Sin descripción'}</p>
        <Link
          href="/postres"
          className="inline-block mt-6 text-[#a46dcb] hover:underline"
        >
          ← Volver a postres
        </Link>
      </div>
    </div>
  );
}