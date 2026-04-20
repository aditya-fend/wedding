import * as React from "react";
import { createServerSupabase } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { getAllUserGuests } from "@/lib/actions/guestWish";
import { RSVPManagementTab } from "@/components/user/dashboard/RSVPManagementTab";
import { Sparkles, Users } from "lucide-react";
import { Presence } from "@prisma/client";

interface Guest {
  id: string;
  guestName: string;
  message: string;
  isPresent: Presence;
  guestCount: number;
  createdAt: Date;
  invitation: {
    title: string;
  };
  invitationId: string;
}

export default async function RSVPPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-in fade-in duration-700">
        <div className="p-4 rounded-full bg-[#FDFCFB] border border-[#F0EDE6]">
          <Sparkles className="size-8 text-[#D4AF97] opacity-20" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B]">Akses Terbatas</p>
        <p className="text-muted-foreground text-sm">Silakan login untuk mengelola database tamu Anda.</p>
      </div>
    );
  }

  // Fetch data secara paralel untuk mengoptimalkan LCP
const [invitations, guestsRes] = await Promise.all([
    prisma.invitation.findMany({
      where: { userId: user.id },
      select: { 
        id: true, 
        title: true,
        // Tambahkan field lain jika RSVPManagementTab membutuhkannya
        slug: true,
        isActive: true,
        viewsCount: true,
        createdAt: true,
        contentData: true,
        userId: true,
        templateId: true
      }
    }),
    getAllUserGuests(),
  ]);
  const guests = guestsRes.success ? (guestsRes.data as Guest[]) : [];

  return (
    <main className="w-full max-w-7xl mx-auto pt-24 lg:pt-12 px-4 lg:px-8 pb-20 space-y-10 animate-in fade-in duration-1000 ease-out">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#D4AF97]">
            <Users className="size-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Guest Intelligence</span>
          </div>
          <h1 className="text-4xl font-black text-[#2C2C2C] tracking-tighter">
            Manajemen RSVP
          </h1>
          <p className="text-muted-foreground font-medium text-sm lg:text-base max-w-md leading-relaxed">
            Pantau tingkat kehadiran dan kelola pesan hangat dari para tamu undangan Anda secara real-time.
          </p>
        </div>

        {/* Kontainer Aksi Tambahan (Jika ada tombol ekspor atau filter global nantinya) */}
        <div className="flex items-center gap-4 shrink-0 animate-in slide-in-from-right-4 duration-700 delay-300">
          <div className="bg-[#FDFCFB] border border-[#F0EDE6] px-4 py-2 rounded-2xl hidden md:block">
            <span className="text-[10px] font-bold text-[#9B9B9B] uppercase tracking-widest">
              Total Entri: <span className="text-[#D4AF97]">{guests.length}</span>
            </span>
          </div>
        </div>
      </section>

      {/* RSVP Management Content */}
      <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 ease-in-out">
        <RSVPManagementTab guests={guests} invitations={invitations} />
      </section>

      {/* Info Footer */}
      <footer className="pt-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-linear-to-r from-[#F0EDE6] to-transparent" />
        <p className="text-[10px] font-bold text-[#9B9B9B] uppercase tracking-[0.2em]">
          Data diperbarui otomatis setiap ada konfirmasi baru
        </p>
      </footer>
    </main>
  );
}