"use server";

import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase/server";

export async function getDashboardStats() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const userId = user.id;

    // 1. Total Undangan Aktif
    const activeInvitationsCount = await prisma.invitation.count({
      where: { userId, isActive: true },
    });

    // 2. Total Kunjungan (Views)
    const viewsAggregate = await prisma.invitation.aggregate({
      where: { userId },
      _sum: { viewsCount: true },
    });
    const totalViews = viewsAggregate._sum.viewsCount || 0;

    // 3. RSVP Stats
    const guestStats = await prisma.guestWish.aggregate({
      where: { invitation: { userId } },
      _count: { id: true },
      _sum: { guestCount: true },
    });

    const totalRSVP = guestStats._count.id || 0;
    const totalGuests = Number(guestStats._sum.guestCount || 0);

    // 4. Presence Breakdown
    const presenceGroups = await prisma.guestWish.groupBy({
      by: ["isPresent"],
      where: { invitation: { userId } },
      _count: { id: true },
    });

    const breakdown = {
      Hadir: 0,
      Tidak_Hadir: 0,
      Ragu_ragu: 0,
      Belum_Konfirmasi: 0,
    };

    presenceGroups.forEach((group) => {
      if (group.isPresent in breakdown) {
        breakdown[group.isPresent as keyof typeof breakdown] = group._count.id;
      }
    });

    return {
      success: true,
      data: {
        activeInvitationsCount,
        totalViews,
        totalRSVP,
        totalGuests,
        breakdown,
      },
    };
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return { success: false, error: "Gagal mengambil statistik dashboard." };
  }
}
