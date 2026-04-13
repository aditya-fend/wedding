// middleware.ts
import { type NextRequest } from 'next/server';
import { createServerSupabase } from './lib/supabase/server';
import { updateSession } from './lib/supabase/middleware'; // kita buat nanti

export async function proxy(request: NextRequest) {
  const supabase = await createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/register');

  // Jika belum login dan mencoba akses dashboard → redirect ke login
  if (!session && !isAuthPage && request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/login', request.url));
  }

  // Jika sudah login dan di halaman auth → redirect ke dashboard
  if (session && isAuthPage) {
    return Response.redirect(new URL('/dashboard', request.url));
  }

  return updateSession(request); // untuk refresh session
}