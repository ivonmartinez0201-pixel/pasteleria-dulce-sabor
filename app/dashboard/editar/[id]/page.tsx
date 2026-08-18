'use client';

import { useState, useEffect, use } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Postre = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      // Cargar categorías
      const { data: categoriasData } = await supabase
        .from('categorias')
        .select('*')
        .order('nombre');

      setCategorias(categoriasData || []);

      // Cargar postre
      const { data: postreData, error: postreError } = await supabase
        .from('postres')
        .select('*')
        .eq('id', postreId)
        .single();

      if (postreError) {
        setError('Postre no encontrado');
        setLoading(false);
        return;
      }

      setPostre(postreData);
      setLoading(false);
    };

    loadData();
  }, [postreId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postre) return;

    setSaving(true);
    setError(null);

    const { error: updateError } = await supabase
      .from('postres')
      .update({
        nombre: postre.nombre,
        descripcion: postre.descripcion,
        precio: postre.precio,
        imagen_url: postre.imagen_url || null,
        categoria_id: postre.categoria_id || null,
      })
      .eq('id', postre.id);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push('/dashboard'), 1500);
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
        <h2 className="text-2xl font-bold text-green-600">✅ ¡Postre actualizado!</h2>
        <p className="text-[#662383]/60 mt-4">Redirigiendo al dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-[#662383] text-center">✏️ Editar Postre</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-[#662383]">Nombre *</label>
          <input
            type="text"
            value={postre?.nombre || ''}
            onChange={(e) => setPostre({ ...postre!, nombre: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Descripción</label>
          <textarea
            value={postre?.descripcion || ''}
            onChange={(e) => setPostre({ ...postre!, descripcion: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Precio *</label>
          <input
            type="number"
            step="0.01"
            value={postre?.precio || ''}
            onChange={(e) => setPostre({ ...postre!, precio: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Categoría</label>
          <select
            value={postre?.categoria_id || ''}
            onChange={(e) =>
              setPostre({
                ...postre!,
                categoria_id: e.target.value ? parseInt(e.target.value) : null,
              })
            }
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
          <label className="block text-sm font-medium text-[#662383]">URL de Imagen</label>
          <input
            type="url"
            value={postre?.imagen_url || ''}
            onChange={(e) => setPostre({ ...postre!, imagen_url: e.target.value })}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-[#a46dcb] text-white py-2 rounded-lg hover:bg-[#662383] transition-colors disabled:opacity-50"
          >
            {saving ? '⏳ Guardando...' : '💾 Guardar Cambios'}
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