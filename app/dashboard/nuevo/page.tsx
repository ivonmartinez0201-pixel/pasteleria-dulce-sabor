'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

type Categoria = {
  id: number;
  nombre: string;
};

export default function NuevoPostrePage() {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen_url, setImagenUrl] = useState('');
  const [categoria_id, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError('Debes iniciar sesión');
      setLoading(false);
      return;
    }

    const { error: insertError } = await supabase
      .from('postres')
      .insert({
        nombre,
        descripcion,
        precio: parseFloat(precio),
        imagen_url: imagen_url || null,
        user_id: user.id,
        categoria_id: categoria_id ? parseInt(categoria_id) : null,
      });

    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
        <h2 className="text-2xl font-bold text-green-600">✅ ¡Postre creado!</h2>
        <p className="text-[#662383]/60 mt-4">Redirigiendo al dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <h1 className="text-2xl font-bold text-[#662383] text-center">➕ Agregar Nuevo Postre</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-[#662383]">Nombre *</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Precio *</label>
          <input
            type="number"
            step="0.01"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#662383]">Categoría</label>
          <select
            value={categoria_id}
            onChange={(e) => setCategoriaId(e.target.value)}
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
          <label className="block text-sm font-medium text-[#662383]">URL de Imagen</label>
          <input
            type="url"
            value={imagen_url}
            onChange={(e) => setImagenUrl(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || loadingCategorias}
          className="w-full bg-[#a46dcb] text-white py-2 rounded-lg hover:bg-[#662383] transition-colors disabled:opacity-50"
        >
          {loading ? '⏳ Creando...' : 'Crear Postre'}
        </button>
      </form>
    </div>
  );
}