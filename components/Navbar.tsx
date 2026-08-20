'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/postres', label: 'Experiencias' },
    { href: '/explorar', label: 'Explorar' },
  ];

  const authLinks = user ? [
    { href: '/dashboard', label: 'Dashboard' },
  ] : [
    { href: '/login', label: 'Login' },
    { href: '/register', label: 'Registro' },
  ];

  return (
    <nav className="bg-violeta-oscuro text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-violeta-blanco hover:text-violeta-claro transition-colors">
            🧁 Dulce Sabor
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-violeta-claro transition-colors ${pathname === link.href ? 'text-violeta-claro font-semibold' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            {!loading && (
              <>
                {user ? (
                  <>
                    {authLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`hover:text-violeta-claro transition-colors ${pathname === link.href ? 'text-violeta-claro font-semibold' : ''}`}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <span className="text-sm text-violeta-claro">
                      👤 {user.email}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="bg-violeta-claro text-violeta-oscuro px-4 py-2 rounded-lg hover:bg-violeta-blanco transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  authLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`hover:text-violeta-claro transition-colors ${pathname === link.href ? 'text-violeta-claro font-semibold' : ''}`}
                    >
                      {link.label}
                    </Link>
                  ))
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}