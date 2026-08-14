'use client';

import { useState } from 'react';

interface BuscadorProps {
  onSearch: (termino: string) => void;
}

export default function Buscador({ onSearch }: BuscadorProps) {
  const [termino, setTermino] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(termino);
  };

  const handleClear = () => {
    setTermino('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={termino}
        onChange={(e) => setTermino(e.target.value)}
        placeholder="🔍 Buscar postres..."
        className="flex-1 px-4 py-2 border border-[#d0b2e0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#a46dcb]"
      />
      <button
        type="submit"
        className="bg-[#a46dcb] text-white px-6 py-2 rounded-lg hover:bg-[#662383] transition-colors"
      >
        Buscar
      </button>
      {termino && (
        <button
          type="button"
          onClick={handleClear}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
        >
          ✕
        </button>
      )}
    </form>
  );
}