import type { Metadata } from 'next';
import Navbar from './Navbar';

export const metadata: Metadata = {
  title: 'Admin Dashboard | UndanganKu',
  description: 'Admin panel for managing UndanganKu',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />
      {/* 
        On mobile: Add pt-16 to account for the fixed top navbar.
        On desktop: Add pl-64 to account for the fixed left sidebar.
      */}
      <div className="md:pl-64 pt-16 md:pt-0 min-h-screen flex flex-col">
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
