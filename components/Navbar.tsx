'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/postres', label: 'Postres' },
    { href: '/explorar', label: 'Explorar' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/login', label: 'Login' },
    { href: '/register', label: 'Registro' },
  ];

  return (
    <nav className="bg-violeta-oscuro text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-[#e8ddf6] hover:text-[#d0b2e0] transition-colors">
            🧁 Dulce Sabor
          </Link>

          {/* Enlaces de navegación */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-[#d0b2e0] transition-colors ${
                  pathname === link.href ? 'text-[#d0b2e0] font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Menú hamburguesa para móvil */}
          <button className="md:hidden text-white hover:text-[#d0b2e0]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}