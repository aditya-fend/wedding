import * as React from "react";
import { createServerSupabase } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { CreateInvitationModal } from "@/components/user/dashboard/CreateInvitationModal";
import { AddTokensModal } from "@/components/user/dashboard/AddTokensModal";
import { getDashboardStats } from "@/lib/actions/dashboard";
import { OverviewTab } from "@/components/user/dashboard/OverviewTab";
import { Sparkles } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 animate-in fade-in duration-700">
        <div className="p-4 rounded-full bg-[#FDFCFB] border border-[#F0EDE6]">
          <Sparkles className="size-8 text-[#D4AF97] opacity-20" />
        </div>
        <p className="text-sm font-bold text-[#9B9B9B] uppercase tracking-[0.2em]">Sesi Berakhir</p>
        <p className="text-muted-foreground text-center max-w-xs">Silakan login kembali untuk mengakses dashboard eksklusif Anda.</p>
      </div>
    );
  }

  const userName = user.user_metadata?.full_name?.split(" ")[0] || "Pengguna";

  // Fetch initial data secara paralel untuk performa maksimal
  const [dbData, statsRes] = await Promise.all([
    prisma.user.findUnique({
      where: { id: user.id },
      select: { tokens: true },
    }),
    getDashboardStats(),
  ]);

  const totalTokens = dbData?.tokens || 0;
  const stats = statsRes.success ? statsRes.data : {
    activeInvitationsCount: 0,
    totalViews: 0,
    totalRSVP: 0,
    totalGuests: 0,
    breakdown: { Hadir: 0, Tidak_Hadir: 0, Ragu_ragu: 0, Belum_Konfirmasi: 0 }
  };

  return (
    <main className="w-full max-w-7xl mx-auto pt-24 lg:pt-12 px-4 lg:px-8 pb-20 space-y-12">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in slide-in-from-top-4 duration-1000 ease-out">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-px w-8 bg-[#D4AF97]" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF97]">Dashboard</span>
          </div>
          <h1 className="text-4xl font-black text-[#2C2C2C] tracking-tighter lg:text-5xl">
            Halo, {userName}.
          </h1>
          <p className="text-muted-foreground font-medium text-sm lg:text-base max-w-md leading-relaxed">
            Kelola momen berharga Anda. Berikut adalah ringkasan performa undangan digital Anda saat ini.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
          <div className="animate-in fade-in zoom-in-95 duration-700 delay-300">
            <AddTokensModal currentTokens={totalTokens} totalTokens={totalTokens}/>
          </div>
          <div className="animate-in fade-in zoom-in-95 duration-700 delay-500">
            <CreateInvitationModal totalTokens={totalTokens} />
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300 ease-in-out">
        <OverviewTab stats={stats} />
      </section>
    </main>
  );
}