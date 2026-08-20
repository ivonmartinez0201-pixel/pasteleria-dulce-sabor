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
    console.error('Error al obtener publicaciones:', error);
    return [];
  }

  return data || [];
}

export default async function PostresPage() {
  const postres = await getPostres();

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#662383] mb-6">🍰 Experiencias de Reposteros</h1>
      <p className="text-[#662383]/60 mb-6">Descubre las experiencias, retos y soluciones de otros reposteros</p>
      
      {postres.length === 0 ? (
        <div className="text-center py-12 bg-[#d0b2e0]/20 rounded-xl">
          <p className="text-[#662383]/60 text-lg">😅 No hay experiencias compartidas aún.</p>
          <p className="text-[#662383]/40 text-sm mt-2">¡Sé el primero en compartir tu experiencia!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <h3 className="font-semibold text-[#662383] text-lg">{postre.nombre}</h3>
                <p className="text-sm text-[#662383]/50 line-clamp-2 mt-1">
                  {postre.descripcion || 'Sin descripción'}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {postre.dificultad && (
                    <span className="text-xs bg-[#d0b2e0]/30 text-[#662383] px-2 py-1 rounded-full">
                      {postre.dificultad}
                    </span>
                  )}
                  {postre.tiempo_preparacion && (
                    <span className="text-xs bg-[#d0b2e0]/30 text-[#662383] px-2 py-1 rounded-full">
                      ⏱️ {postre.tiempo_preparacion}
                    </span>
                  )}
                  {postre.categorias && (
                    <span className="text-xs bg-[#d0b2e0]/30 text-[#662383] px-2 py-1 rounded-full">
                      📂 {postre.categorias.nombre}
                    </span>
                  )}
                </div>

                {postre.experiencia && (
                  <p className="text-sm text-[#662383]/60 mt-2 line-clamp-2">
                    💪 {postre.experiencia}
                  </p>
                )}

                <p className="text-xs text-[#662383]/30 mt-1">
                  📅 {new Date(postre.created_at).toLocaleDateString('es-ES')}
                </p>

                <Link
                  href={`/postres/${postre.id}`}
                  className="inline-block mt-3 w-full text-center bg-[#a46dcb] text-white py-2 rounded-lg hover:bg-[#662383] transition-colors text-sm"
                >
                  Ver Experiencia
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-[#d0b2e0]/30 rounded-lg">
        <p className="text-sm text-[#662383]/70">
          📝 Mostrando {postres.length} experiencias compartidas
        </p>
      </div>
    </div>
  );
}