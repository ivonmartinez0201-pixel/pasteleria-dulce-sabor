import { supabase } from '@/lib/supabase';
import Link from 'next/link';

async function getPostres() {
  const { data, error } = await supabase
    .from('postres')
    .select(`
      *,
      categorias (nombre)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al obtener postres:', error);
    return [];
  }

  return data || [];
}

export default async function PostresPage() {
  const postres = await getPostres();

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#662383] mb-6">🍰 Nuestros Postres</h1>
      
      {postres.length === 0 ? (
        <div className="text-center py-12 bg-[#d0b2e0]/20 rounded-xl">
          <p className="text-[#662383]/60 text-lg">😅 No hay postres aún.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {postres.map((postre: any) => (
            <div
              key={postre.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {postre.imagen_url ? (
                <img
                  src={postre.imagen_url}
                  alt={postre.nombre}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-48 bg-[#d0b2e0]/30 flex items-center justify-center">
                  <span className="text-4xl">🍰</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-[#662383] text-lg line-clamp-1">
                  {postre.nombre}
                </h3>
                <p className="text-sm text-[#662383]/50 line-clamp-2 mt-1">
                  {postre.descripcion || 'Sin descripción'}
                </p>
                <p className="text-[#662383] font-bold mt-2">
                  ${postre.precio}
                </p>
                {postre.categorias && (
                  <p className="text-xs text-[#662383]/40 mt-1">
                    📂 {postre.categorias.nombre}
                  </p>
                )}
                <Link
                  href={`/postres/${postre.id}`}
                  className="inline-block mt-3 w-full text-center bg-[#a46dcb] text-white py-2 rounded-lg hover:bg-[#662383] transition-colors text-sm"
                >
                  Ver Detalle
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-[#d0b2e0]/30 rounded-lg">
        <p className="text-sm text-[#662383]/70">
          📝 Mostrando {postres.length} postres
        </p>
      </div>
    </div>
  );
}