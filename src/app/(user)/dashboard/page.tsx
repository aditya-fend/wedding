import * as React from "react";
import { createServerSupabase } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { CreateInvitationModal } from "@/components/user/dashboard/CreateInvitationModal";
import { AddTokensModal } from "@/components/user/dashboard/AddTokensModal";
import { getDashboardStats } from "@/lib/actions/dashboard";
import { OverviewTab } from "@/components/user/dashboard/OverviewTab";

export default async function DashboardPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[#6B6B6B]">Silakan login untuk mengakses dashboard.</p>
      </div>
    );
  }

  const userName = user.user_metadata?.full_name?.split(" ")[0] || "Pengguna";

  // Fetch initial data
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
    <div className="w-full pt-18 lg:pt-10 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full animate-in fade-in duration-700">
        <div className="shrink-0">
          <h1 className="text-3xl font-bold text-[#2C2C2C] tracking-tight">
            Halo, {userName}!
          </h1>
          <p className="text-[#6B6B6B]">
            Berikut adalah ringkasan performa undangan Anda hari ini.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <AddTokensModal currentTokens={totalTokens} totalTokens={totalTokens}/>
          <CreateInvitationModal totalTokens={totalTokens} />
        </div>
      </div>

      {/* Overview is now the primary view of the dashboard */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#2C2C2C]">Ringkasan Statistik</h2>
        </div>
        <OverviewTab stats={stats} />
      </div>
    </div>
  );
}
