'use client';

import { useState, useEffect } from 'react';
import BotonReceta from '@/components/BotonReceta';
import Buscador from '@/components/Buscador';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCountry?: string;
};

export default function ExplorarPage() {
  const [recetas, setRecetas] = useState<Meal[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  const cargarRecetas = async (termino: string = '') => {
    setCargando(true);
    setError(null);

    try {
      let url = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';
      
      if (termino) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${termino}`;
      }

      const res = await fetch(url, { cache: 'no-store' });

      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      const meals = data.meals || [];

      const mealsWithCountry = await Promise.all(
        meals.slice(0, 20).map(async (meal: Meal) => {
          try {
            const detailRes = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`,
              { cache: 'force-cache' }
            );
            if (!detailRes.ok) return { ...meal, strCountry: 'Desconocido' };
            const detailData = await detailRes.json();
            return {
              ...meal,
              strCountry: detailData.meals?.[0]?.strCountry || 'Desconocido',
            };
          } catch {
            return { ...meal, strCountry: 'Desconocido' };
          }
        })
      );

      setRecetas(mealsWithCountry);
    } catch (error) {
      console.error('Error al obtener recetas:', error);
      setError('No pudimos cargar las recetas. Intenta más tarde.');
      setRecetas([]);
    } finally {
      setCargando(false);
    }
  };

  const handleSearch = (termino: string) => {
    setTerminoBusqueda(termino);
    cargarRecetas(termino);
  };

  useEffect(() => {
    cargarRecetas('');
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#662383] mb-6">🌍 Explorar Recetas del Mundo</h1>
      <p className="text-[#662383]/60 mb-4">
        ¿Quieres experimentar con platos de otras nacionalidades?
      </p>
      <p className="text-[#662383]/50 mb-6">
        Desde aquí puedes buscar recetas dulces, saladas o lo que se te antoje.
      </p>

      <div className="mb-8">
        <Buscador onSearch={handleSearch} />
        <p className="text-xs text-[#662383]/40 mt-2">
          💡 Escribe el nombre de cualquier plato para buscar su receta
        </p>
      </div>

      {cargando ? (
        <div className="text-center py-12">
          <p className="text-[#662383]/60">⏳ Cargando recetas...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-[#d0b2e0]/20 rounded-xl">
          <p className="text-[#662383]/60 text-lg">{error}</p>
        </div>
      ) : recetas.length === 0 ? (
        <div className="text-center py-12 bg-[#d0b2e0]/20 rounded-xl">
          <p className="text-[#662383]/60 text-lg">
            {terminoBusqueda ? '😅 No encontramos recetas con ese nombre.' : '😅 No hay recetas disponibles.'}
          </p>
          {terminoBusqueda && (
            <button 
              onClick={() => handleSearch('')} 
              className="mt-4 text-[#a46dcb] hover:underline"
            >
              Ver recetas por defecto
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recetas.map((dessert) => (
              <div
                key={dessert.idMeal}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={dessert.strMealThumb}
                  alt={dessert.strMeal}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-[#662383] text-lg line-clamp-1">
                    {dessert.strMeal}
                  </h3>
                  <p className="text-sm text-[#662383]/50 mt-1">
                    🌍 {dessert.strCountry || 'Origen desconocido'}
                  </p>
                  <BotonReceta idMeal={dessert.idMeal} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-[#d0b2e0]/30 rounded-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <p className="text-sm text-[#662383]/70">
                {terminoBusqueda ? (
                  `📝 Mostrando ${recetas.length} recetas para "${terminoBusqueda}"`
                ) : (
                  `📝 Mostrando ${recetas.length} recetas`
                )}
              </p>
              {terminoBusqueda ? (
                <button 
                  onClick={() => handleSearch('')} 
                  className="text-sm text-[#a46dcb] hover:underline"
                >
                  Ver recetas por defecto
                </button>
              ) : (
                <p className="text-sm text-[#662383]/50">
                  🔍 Busca por nombre para encontrar recetas específicas
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}