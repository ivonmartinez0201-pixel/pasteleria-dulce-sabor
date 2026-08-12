import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Por ahora solo pasa las peticiones
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};