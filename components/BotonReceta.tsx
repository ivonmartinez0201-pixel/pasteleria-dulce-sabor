'use client';

interface BotonRecetaProps {
  idMeal: string;
}

export default function BotonReceta({ idMeal }: BotonRecetaProps) {
  const verReceta = () => {
    window.open(`https://www.themealdb.com/meal/${idMeal}`, '_blank');
  };

  return (
    <button
      onClick={verReceta}
      className="mt-3 w-full bg-[#a46dcb] text-white py-2 rounded-lg hover:bg-[#662383] transition-colors text-sm"
    >
      Ver Receta Completa
    </button>
  );
}