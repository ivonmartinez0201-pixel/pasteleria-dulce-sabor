'use client';

import { useState, useEffect, useTransition } from 'react';
import { supabase } from '@/lib/supabase';
import { crearPostre } from '@/app/actions/postres';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Categoria = {
  id: number;
  nombre: string;
};

export default function NuevoPostrePage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    const getCategorias = async () => {
      const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .order('nombre');
      
      if (error) {
        console.error('Error al cargar categorías:', error);
      } else {
        setCategorias(data || []);
      }
      setLoadingCategorias(false);
    };

    getCategorias();
  }, []);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      try {
        await crearPostre(formData);
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } catch (err: any) {
        setError(err.message || 'Error al crear la publicación');
      }
    });
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
          <p className="font-bold">✅ ¡Publicación creada con éxito!</p>
        </div>
        <p className="text-[#662383]/60 mt-4">Redirigiendo al dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-[#662383] text-center">➕ Compartir Experiencia</h1>
      <p className="text-center text-[#662383]/50 text-sm mt-1">Cuenta tu experiencia haciendo este postre</p>
      
      <form action={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-[#662383]">Nombre del Postre *</label>
          <input
            type="text"
            name="nombre"
            placeholder="Ej: Torta de Queso"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Descripción</label>
          <textarea
            name="descripcion"
            rows={2}
            placeholder="Breve descripción del postre..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Dificultad</label>
          <select
            name="dificultad"
            defaultValue="Media"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          >
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Tiempo de Preparación</label>
          <input
            type="text"
            name="tiempo_preparacion"
            placeholder="Ej: 2 horas"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Categoría</label>
          <select
            name="categoria_id"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          >
            <option value="">Seleccionar categoría</option>
            {loadingCategorias ? (
              <option disabled>Cargando categorías...</option>
            ) : (
              categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Mi Experiencia</label>
          <textarea
            name="experiencia"
            rows={3}
            placeholder="¿Qué retos tuviste al hacer este postre?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Cómo lo resolví</label>
          <textarea
            name="solucion"
            rows={3}
            placeholder="¿Cómo solucionaste los retos?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">URL de la Foto</label>
          <input
            type="url"
            name="imagen_url"
            placeholder="https://ejemplo.com/foto-postre.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#a46dcb] text-white py-2 rounded-lg hover:bg-[#662383] transition-colors disabled:opacity-50"
        >
          {isPending ? '⏳ Creando...' : 'Compartir Experiencia'}
        </button>
      </form>
    </div>
  );
}