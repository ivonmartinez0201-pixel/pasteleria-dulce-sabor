import BotonReceta from '@/components/BotonReceta';

type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCountry?: string;
};

type ApiResponse = {
  meals: Meal[] | null;
};

type MealDetailResponse = {
  meals: Array<{
    idMeal: string;
    strMeal: string;
    strCountry: string;
  }> | null;
};

async function getDesserts(): Promise<Meal[]> {
  try {
    const res = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data: ApiResponse = await res.json();
    const meals = data.meals || [];

    const mealsWithCountry = await Promise.all(
      meals.slice(0, 20).map(async (meal) => {
        try {
          const detailRes = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`,
            { cache: 'force-cache' }
          );
          if (!detailRes.ok) return { ...meal, strCountry: 'Desconocido' };
          const detailData: MealDetailResponse = await detailRes.json();
          return {
            ...meal,
            strCountry: detailData.meals?.[0]?.strCountry || 'Desconocido',
          };
        } catch {
          return { ...meal, strCountry: 'Desconocido' };
        }
      })
    );

    return mealsWithCountry;
  } catch (error) {
    console.error('Error al obtener recetas:', error);
    return [];
  }
}

export default async function ExplorarPage() {
  const desserts = await getDesserts();

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#662383] mb-6">🍰 Explorar Recetas de Postres</h1>
      <p className="text-[#662383]/60 mb-8">
        Descubre recetas de postres de todo el mundo, cortesía de TheMealDB
      </p>

      {desserts.length === 0 ? (
        <div className="text-center py-12 bg-[#d0b2e0]/20 rounded-xl">
          <p className="text-[#662383]/60 text-lg">
            😅 No pudimos cargar las recetas en este momento. Intenta más tarde.
          </p>
          <p className="text-[#662383]/40 text-sm mt-2">
            (Esto puede deberse a que la API externa no está disponible)
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {desserts.map((dessert) => (
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
      )}

      <div className="mt-8 p-4 bg-[#d0b2e0]/30 rounded-lg">
        <p className="text-sm text-[#662383]/70">
          📝 Datos proporcionados por <strong>TheMealDB</strong> - API pública gratuita
        </p>
        <p className="text-xs text-[#662383]/50 mt-1">
          Mostrando {desserts.length} recetas
        </p>
      </div>
    </div>
  );
}