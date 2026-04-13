// app/(dashboard)/layout.tsx
import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase/server';
import { Navbar } from '@/components/layout/Navbar';   // ← huruf kecil "navbar"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar user={session.user} />
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
}