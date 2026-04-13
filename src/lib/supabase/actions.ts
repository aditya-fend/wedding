// lib/supabase/actions.ts
"use server";

import { createServerSupabase } from './server';

export async function getCurrentUser() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function signOut() {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
}