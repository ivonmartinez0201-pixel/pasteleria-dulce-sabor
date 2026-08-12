export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#662383] mb-6">Panel de Control</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold text-[#662383]">👤 Mi Perfil</h3>
          <p className="text-[#662383]/60 mt-2">Información de tu cuenta</p>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold text-[#662383]">📝 Mis Postres</h3>
          <p className="text-[#662383]/60 mt-2">Gestiona tus creaciones</p>
        </div>
      </div>
      <div className="mt-6 p-4 bg-[#d0b2e0]/30 rounded-lg">
        <p className="text-sm text-[#662383]/70">📝 Dashboard completo con datos reales (FASE 5)</p>
      </div>
    </div>
  );
}