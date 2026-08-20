'use client';

import { useState, useEffect, use, useTransition } from 'react';
import { supabase } from '@/lib/supabase';
import { editarPostre } from '@/app/actions/postres';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Postre = {
  id: number;
  nombre: string;
  descripcion: string;
  dificultad: string;
  tiempo_preparacion: string;
  experiencia: string;
  solucion: string;
  imagen_url: string | null;
  categoria_id: number | null;
};

type Categoria = {
  id: number;
  nombre: string;
};

type Params = {
  id: string;
};

export default function EditarPostrePage({ params }: { params: Promise<Params> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const postreId = parseInt(resolvedParams.id);

  const [postre, setPostre] = useState<Postre | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      const { data: categoriasData } = await supabase
        .from('categorias')
        .select('*')
        .order('nombre');

      setCategorias(categoriasData || []);

      const { data: postreData, error: postreError } = await supabase
        .from('postres')
        .select('*')
        .eq('id', postreId)
        .maybeSingle();

      if (postreError || !postreData) {
        setError('Publicación no encontrada');
        setLoading(false);
        return;
      }

      setPostre(postreData);
      setLoading(false);
    };

    loadData();
  }, [postreId]);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    startTransition(async () => {
      try {
        await editarPostre(formData);
        setSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);
      } catch (err: any) {
        setError(err.message || 'Error al editar la publicación');
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

  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-xl p-8">
        <h2 className="text-xl font-bold text-red-700">❌ {error}</h2>
        <Link href="/dashboard" className="inline-block mt-4 text-[#a46dcb] hover:underline">
          ← Volver al dashboard
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4">
          <p className="font-bold">✅ ¡Publicación actualizada con éxito!</p>
        </div>
        <p className="text-[#662383]/60 mt-4">Redirigiendo al dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-[#662383] text-center">✏️ Editar Experiencia</h1>

      <form action={handleSubmit} className="space-y-4 mt-6">
        <input type="hidden" name="id" value={postre?.id} />

        <div>
          <label className="block text-sm font-medium text-[#662383]">Nombre del Postre *</label>
          <input
            type="text"
            name="nombre"
            defaultValue={postre?.nombre || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Descripción</label>
          <textarea
            name="descripcion"
            rows={2}
            defaultValue={postre?.descripcion || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Dificultad</label>
          <select
            name="dificultad"
            defaultValue={postre?.dificultad || 'Media'}
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
            defaultValue={postre?.tiempo_preparacion || ''}
            placeholder="Ej: 2 horas"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Categoría</label>
          <select
            name="categoria_id"
            defaultValue={postre?.categoria_id || ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Mi Experiencia</label>
          <textarea
            name="experiencia"
            rows={3}
            defaultValue={postre?.experiencia || ''}
            placeholder="¿Qué retos tuviste al hacer este postre?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Cómo lo resolví</label>
          <textarea
            name="solucion"
            rows={3}
            defaultValue={postre?.solucion || ''}
            placeholder="¿Cómo solucionaste los retos?"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">URL de la Foto</label>
          <input
            type="url"
            name="imagen_url"
            defaultValue={postre?.imagen_url || ''}
            placeholder="https://ejemplo.com/foto-postre.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          />
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
            <p>{error}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 bg-[#a46dcb] text-white py-2 rounded-lg hover:bg-[#662383] transition-colors disabled:opacity-50"
          >
            {isPending ? '⏳ Guardando...' : '💾 Guardar Cambios'}
          </button>
          <Link
            href="/dashboard"
            className="flex-1 text-center bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}