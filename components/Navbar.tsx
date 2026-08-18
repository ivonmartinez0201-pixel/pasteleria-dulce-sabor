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

  return (
    <nav className="bg-violeta-oscuro text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-violeta-blanco hover:text-violeta-claro transition-colors">
            🧁 Dulce Sabor
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className={`hover:text-violeta-claro transition-colors ${pathname === '/' ? 'text-violeta-claro font-semibold' : ''}`}>
              Inicio
            </Link>
            <Link href="/postres" className={`hover:text-violeta-claro transition-colors ${pathname === '/postres' ? 'text-violeta-claro font-semibold' : ''}`}>
              Postres
            </Link>
            <Link href="/explorar" className={`hover:text-violeta-claro transition-colors ${pathname === '/explorar' ? 'text-violeta-claro font-semibold' : ''}`}>
              Explorar
            </Link>

            {!loading && (
              <>
                {user ? (
                  <>
                    <Link href="/dashboard" className={`hover:text-violeta-claro transition-colors ${pathname === '/dashboard' ? 'text-violeta-claro font-semibold' : ''}`}>
                      Dashboard
                    </Link>
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
                  <>
                    <Link href="/login" className={`hover:text-violeta-claro transition-colors ${pathname === '/login' ? 'text-violeta-claro font-semibold' : ''}`}>
                      Login
                    </Link>
                    <Link href="/register" className={`hover:text-violeta-claro transition-colors ${pathname === '/register' ? 'text-violeta-claro font-semibold' : ''}`}>
                      Registro
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}