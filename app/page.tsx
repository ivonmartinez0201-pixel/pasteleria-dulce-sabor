import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center">
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#662383] mb-6">
            Bienvenido a <span className="text-[#a46dcb]">Dulce Sabor</span>
          </h1>
          <p className="text-xl text-[#662383]/70 mb-4">
            Un espacio para <strong>aprender, compartir y crecer</strong> en la repostería.
          </p>
          <p className="text-lg text-[#662383]/50 mb-4">
            Porque los errores también saben a gloria y endulzan el alma.
          </p>
          <p className="text-md text-[#662383]/40 mb-8">
            ✨ Aprende de las experiencias de otros y comparte las tuyas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/postres" className="bg-[#a46dcb] text-white px-6 py-3 rounded-full hover:bg-[#662383] transition-colors">
              Ver Experiencias
            </Link>
            <Link href="/explorar" className="bg-[#d0b2e0] text-[#662383] px-6 py-3 rounded-full hover:bg-[#a46dcb] hover:text-white transition-colors">
              Explorar Recetas
            </Link>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0NCtWN0SAieQNy9dRKJ4AEPIazu4ZJwT67X52cy9mgYr8JlhlrwKEQGE&s=10"
              alt="Postre decorativo"
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 bg-gradient-to-r from-[#e8ddf6] to-[#d0b2e0] rounded-2xl p-8">
            <p className="text-xl md:text-2xl italic text-[#662383]">
              "El primer pastel siempre se desmorona, 
              <br />el segundo ya tiene forma, 
              <br />el tercero sabe a gloria."
            </p>
            <p className="text-sm text-[#662383]/50 mt-4">— La cocina también es paciencia</p>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6 py-12 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-3">📖</div>
          <h3 className="text-xl font-semibold text-[#662383]">Experiencias Compartidas</h3>
          <p className="text-[#662383]/60">Descubre los aciertos y errores de otros reposteros</p>
          <p className="text-xs text-[#662383]/40 mt-2">Aprende de la comunidad</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-3">🍰</div>
          <h3 className="text-xl font-semibold text-[#662383]">Nuevas Recetas</h3>
          <p className="text-[#662383]/60">Encuentra inspiración para tu próxima creación</p>
          <p className="text-xs text-[#662383]/40 mt-2">Explora y experimenta</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
          <div className="text-4xl mb-3">👨‍🍳</div>
          <h3 className="text-xl font-semibold text-[#662383]">Comparte tu Historia</h3>
          <p className="text-[#662383]/60">Ayuda a quienes están empezando en la repostería</p>
          <p className="text-xs text-[#662383]/40 mt-2">Tus errores también enseñan</p>
        </div>
      </section>

      <section className="py-12 border-t border-[#d0b2e0]/30">
        <h2 className="text-2xl font-bold text-[#662383] mb-8">Para todos los niveles</h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-[#e8ddf6] rounded-xl p-6 text-left">
            <h3 className="text-xl font-semibold text-[#662383] flex items-center gap-2">
              👤 Principiante
            </h3>
            <ul className="mt-3 space-y-2 text-[#662383]/70">
              <li>✅ Aprende de las experiencias de otros</li>
              <li>✅ Explora recetas internacionales</li>
              <li>✅ Evita errores comunes</li>
            </ul>
          </div>
          <div className="bg-[#d0b2e0]/30 rounded-xl p-6 text-left border-2 border-[#a46dcb]">
            <h3 className="text-xl font-semibold text-[#662383] flex items-center gap-2">
              👨‍🍳 Repostero
            </h3>
            <ul className="mt-3 space-y-2 text-[#662383]/70">
              <li>✅ Comparte tus experiencias</li>
              <li>✅ Ayuda a quienes empiezan</li>
              <li>✅ Edita y gestiona tus publicaciones</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="w-full md:w-1/2">
            <img
              src="https://st3.depositphotos.com/1004713/12943/i/450/depositphotos_129439912-stock-photo-granny-making-christmas-cookies-with.jpg"
              alt="Abuela haciendo galletas"
              className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 bg-gradient-to-r from-[#d0b2e0] to-[#e8ddf6] rounded-2xl p-8">
            <p className="text-xl md:text-2xl italic text-[#662383]">
              "La repostería no es solo mezclar ingredientes, 
              <br />es mezclar paciencia, pasión y aprendizaje."
            </p>
            <p className="text-sm text-[#662383]/50 mt-4">
              Cada error es un paso más cerca del sabor perfecto.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}