import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import Navbar from './Navbar';

export const metadata: Metadata = {
  title: 'Admin Dashboard | UndanganKu',
  description: 'Admin panel for managing UndanganKu',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const session = cookieStore.get('user_session')?.value;

  if (!session) {
    redirect('/masuk');
  }

  const user = await prisma.user.findUnique({
    where: { id: session },
    select: { role: true },
  });

  if (!user || user.role !== 'admin') {
    redirect('/dashboard');
  }

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30">
      <Navbar />
      <div className="md:pl-64 pt-16 md:pt-0 min-h-screen flex flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
