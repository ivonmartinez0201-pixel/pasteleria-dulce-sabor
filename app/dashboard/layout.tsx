export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="bg-[#d0b2e0]/30 p-4 rounded-lg mb-6">
        <p className="text-sm text-[#662383]/70">🔒 Área protegida - Solo usuarios autenticados</p>
      </div>
      {children}
    </div>
  );
}