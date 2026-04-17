// proxy.ts (Pengganti middleware.ts di Next.js 16)
import { type NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  const isAuthPage = request.nextUrl.pathname.startsWith('/masuk') || 
                     request.nextUrl.pathname.startsWith('/daftar');
  const isAdminPage = request.nextUrl.pathname.startsWith('/admin');
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard');

  if (isAuthPage || isAdminPage || isDashboardPage) {
    const sessionCookie = request.cookies.get('user_session');
    const session = sessionCookie ? sessionCookie.value : null;

    if (!session && (isAdminPage || isDashboardPage)) {
      return NextResponse.redirect(new URL('/masuk', request.url));
    }

    if (session && isAuthPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};