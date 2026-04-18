import * as React from "react";
import { createServerSupabase } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { getAllUserGuests } from "@/lib/actions/guestWish";
import { RSVPManagementTab } from "@/components/user/dashboard/RSVPManagementTab";

export default async function RSVPPage() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[#6B6B6B]">Silakan login untuk mengakses halaman ini.</p>
      </div>
    );
  }

  // Fetch initial data
  const [invitations, guestsRes] = await Promise.all([
    prisma.invitation.findMany({
      where: { userId: user.id },
      select: { id: true, title: true }
    }),
    getAllUserGuests(),
  ]);

  const guests = guestsRes.success ? (guestsRes.data as any[]) : [];

  return (
    <div className="w-full pt-18 lg:pt-10 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2C2C2C] tracking-tight">Manajemen RSVP</h1>
          <p className="text-[#6B6B6B]">Kelola daftar tamu dan konfirmasi kehadiran undangan Anda.</p>
        </div>
      </div>

      <div className="space-y-6">
        <RSVPManagementTab guests={guests} invitations={invitations} />
      </div>
    </div>
  );
}
