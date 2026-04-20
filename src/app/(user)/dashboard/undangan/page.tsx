import * as React from "react";
import { createServerSupabase } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { InvitationListTab } from "@/components/user/dashboard/InvitationListTab";
import { AddTokensModal } from "@/components/user/dashboard/AddTokensModal";
import { CreateInvitationModal } from "@/components/user/dashboard/CreateInvitationModal";
import { Sparkles, Library } from "lucide-react";

export default async function UndanganPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-in fade-in duration-700">
        <div className="p-4 rounded-full bg-[#FDFCFB] border border-[#F0EDE6]">
          <Sparkles className="size-8 text-[#D4AF97] opacity-20" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B]">Akses Terbatas</p>
        <p className="text-[#6B6B6B] text-sm">Silakan login untuk mengelola koleksi undangan Anda.</p>
      </div>
    );
  }

  // Fetch data user (tokens) dan daftar undangan secara paralel
  const [dbData, invitations] = await Promise.all([
    prisma.user.findUnique({
      where: { id: user.id },
      select: { tokens: true },
    }),
    prisma.invitation.findMany({
      where: {
        userId: user.id,
      },
      include: {
        template: { select: { category: true } },
        _count: { select: { guestWishes: true } },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const totalTokens = dbData?.tokens || 0;

  return (
    <main className="w-full max-w-7xl mx-auto pt-24 lg:pt-12 px-4 lg:px-8 pb-20 space-y-10 animate-in fade-in duration-1000 ease-out">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#D4AF97]">
            <Library className="size-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Collection</span>
          </div>
          <h1 className="text-4xl font-black text-[#2C2C2C] tracking-tighter">
            Undangan Saya
          </h1>
          <p className="text-[#6B6B6B] font-medium text-sm lg:text-base max-w-md leading-relaxed">
            Pusat kendali untuk semua karya digital Anda. Pantau status dan kelola detail setiap acara di sini.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0 animate-in slide-in-from-right-4 duration-700 delay-300">
          <AddTokensModal
            currentTokens={totalTokens}
            totalTokens={totalTokens}
          />
          <CreateInvitationModal totalTokens={totalTokens} />
        </div>
      </section>

      {/* List Section Area */}
      <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
        <div className="relative">
          {/* Subtle background glow for the list area */}
          <div className="absolute inset-0 bg-[#D4AF97]/5 blur-[100px] -z-10 rounded-full opacity-30 pointer-events-none" />
          
          <InvitationListTab invitations={invitations as any} />
          
          {invitations.length > 0 && (
            <div className="mt-6 flex items-center justify-between px-2">
              <p className="text-[10px] font-bold text-[#9B9B9B] uppercase tracking-widest">
                Menampilkan {invitations.length} Undangan Terdaftar
              </p>
              <div className="h-px flex-1 mx-6 bg-gradient-to-r from-[#F0EDE6] to-transparent" />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}