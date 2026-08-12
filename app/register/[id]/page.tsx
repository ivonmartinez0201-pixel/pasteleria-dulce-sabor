export default function PostreDetallePage({ params }: { params: { id: string } }) {
  return (
    <div className="max-w-3xl mx-auto card">
      <h1 className="text-2xl font-bold text-[#662383]">Detalle del Postre #{params.id}</h1>
      <p className="text-[#662383]/60 mt-4">Próximamente: Detalle completo con datos reales</p>
      <div className="mt-6 p-4 bg-[#d0b2e0]/30 rounded-lg">
        <p className="text-sm text-[#662383]/70">📝 Esta ruta dinámica mostrará el detalle de cada postre (FASE 5)</p>
      </div>
    </div>
  );
}