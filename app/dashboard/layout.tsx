export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#e8ddf6] p-4">
      {children}
    </div>
  );
}