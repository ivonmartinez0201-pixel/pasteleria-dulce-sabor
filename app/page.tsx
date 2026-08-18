import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#662383] mb-6">
            Bienvenido a <span className="text-[#a46dcb]">Dulce Sabor</span>
          </h1>
          <p className="text-xl text-[#662383]/70 mb-8">
            El lugar donde los sueños se convierten en deliciosos postres y cafés artesanales
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/postres" className="bg-[#a46dcb] text-white px-6 py-3 rounded-full hover:bg-[#662383] transition-colors">
              Ver Postres
            </Link>
            <Link href="/explorar" className="bg-[#d0b2e0] text-[#662383] px-6 py-3 rounded-full hover:bg-[#a46dcb] hover:text-white transition-colors">
              Explorar Recetas
            </Link>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 py-12">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-3">🍰</div>
          <h3 className="text-xl font-semibold text-[#662383]">Postres Únicos</h3>
          <p className="text-[#662383]/60">Recetas exclusivas creadas por nuestros reposteros expertos</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-3">☕</div>
          <h3 className="text-xl font-semibold text-[#662383]">Café de Especialidad</h3>
          <p className="text-[#662383]/60">Los mejores granos seleccionados para acompañar tus postres</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-3">👨‍🍳</div>
          <h3 className="text-xl font-semibold text-[#662383]">Comunidad</h3>
          <p className="text-[#662383]/60">Comparte tus creaciones y descubre nuevas recetas</p>
        </div>
      </section>
    </div>
  );
}