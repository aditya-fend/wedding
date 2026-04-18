import * as React from "react";
import { createServerSupabase } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { InvitationListTab } from "@/components/user/dashboard/InvitationListTab";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { AddTokensModal } from "@/components/user/dashboard/AddTokensModal";
import { CreateInvitationModal } from "@/components/user/dashboard/CreateInvitationModal";

export default async function UndanganPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const [dbData] = await Promise.all([
    prisma.user.findUnique({
      where: { id: user.id },
      select: { tokens: true },
    }),
  ]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-[#6B6B6B]">
          Silakan login untuk mengakses halaman ini.
        </p>
      </div>
    );
  }

  // Mengambil daftar undangan milik user yang login dengan stats yang relevan
  const invitations = await prisma.invitation.findMany({
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
  });

  const totalTokens = dbData?.tokens || 0;

  return (
    <div className="w-full pt-18 lg:pt-10 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-[#2C2C2C] tracking-tight">
            Undangan Saya
          </h1>
          <p className="text-[#6B6B6B]">
            Kelola semua undangan digital yang telah Anda buat.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <AddTokensModal
            currentTokens={totalTokens}
            totalTokens={totalTokens}
          />
          <CreateInvitationModal totalTokens={totalTokens} />
        </div>
      </div>

      <div className="space-y-6">
        <InvitationListTab invitations={invitations as any} />
      </div>
    </div>
  );
}
