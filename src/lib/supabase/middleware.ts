// lib/supabase/middleware.ts
import { type NextRequest, NextResponse } from 'next/server';
import { createServerSupabase } from './server';

export async function updateSession(request: NextRequest) {
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = await createServerSupabase();
  await supabase.auth.getSession();

  return response;
}