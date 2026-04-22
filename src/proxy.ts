import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });
          supabaseResponse = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { session } } = await supabase.auth.getSession();
  
  const hasUserSession = request.cookies.has("user_session") || !!session;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname === "/masuk" || pathname === "/daftar" || pathname === "/lupa-password";

  if (isAuthPage && hasUserSession) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const protectedPaths = ["/admin", "/dashboard", "/create", "/edit"];
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));

  if (isProtectedPath && !hasUserSession) {
    return NextResponse.redirect(new URL("/masuk", request.url));
  }

  if (pathname.startsWith("/api/")) {
    const publicApiPaths = [
      "/api/set-session",
      "/api/cron",
      "/api/geocode",
      "/api/templates",
    ];

    const isPublicApi = publicApiPaths.some(path => pathname.startsWith(path));

    if (!isPublicApi && !hasUserSession) {
      return NextResponse.json(
        { error: "Akses tidak sah. Rute API ini dilindungi." },
        { status: 401 }
      );
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

// Ekspor sebagai proxy untuk Next.js versi 16+
export const proxy = middleware;
export default middleware;