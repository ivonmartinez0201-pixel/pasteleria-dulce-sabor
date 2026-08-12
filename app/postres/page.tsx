export default function PostresPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#662383] mb-6">Nuestros Postres</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-48 bg-[#d0b2e0]/50 rounded-lg mb-4"></div>
            <div className="h-6 bg-[#d0b2e0]/50 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-[#d0b2e0]/50 rounded w-1/2"></div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-[#d0b2e0]/30 rounded-lg">
        <p className="text-sm text-[#662383]/70">📝 Próximamente: Postres reales desde Supabase (FASE 5)</p>
      </div>
    </div>
  );
}