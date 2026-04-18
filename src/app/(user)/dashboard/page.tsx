import * as React from "react";
import { createServerSupabase } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Plus,
  Ticket,
  ExternalLink,
  Settings2,
  Trash,
  Send,
} from "lucide-react";
import { CreateInvitationModal } from "@/components/user/dashboard/CreateInvitationModal";
import { AddTokensModal } from "@/components/user/dashboard/AddTokensModal";
import Link from "next/link";
import { Invitation, Template } from "@prisma/client";
import { InvitationContent } from "@/types/invitation";
import { DeleteInvitationButton } from "@/components/user/dashboard/DeleteInvitationButton";
import { ShareInvitationModal } from "@/components/user/dashboard/ShareInvitationModal";

// Tipe data untuk hasil query Prisma
type InvitationWithTemplate = Invitation & {
  template: Template | null;
  // Kita cast contentData karena Prisma membacanya sebagai JsonValue
  contentData: InvitationContent | null;
};

export default async function DashboardPage() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let totalTokens = 0;
  let userName = "Pengguna";

  // SEBELUM: let invitations: any[] = [];
  // SESUDAH: Menggunakan tipe data yang spesifik
  let invitations: InvitationWithTemplate[] = [];

  if (user) {
    userName = user.user_metadata?.full_name?.split(" ")[0] || "Pengguna";

    const dbData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        tokens: true,
        invitations: {
          orderBy: { createdAt: "desc" },
          include: { template: true },
        },
      },
    });

    if (dbData) {
      totalTokens = dbData.tokens;
      // Casting data agar sesuai dengan interface InvitationContent
      invitations = dbData.invitations as unknown as InvitationWithTemplate[];
    } else {
      totalTokens = Number(user.user_metadata?.tokens || 0);
    }
  }

  return (
    <div className="w-full pt-18 lg:pt-10 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
        <div className="shrink-0">
          <h1 className="text-3xl font-bold text-[#2C2C2C] tracking-tight">
            Halo, {userName}!
          </h1>
          <p className="text-[#6B6B6B]">
            Selamat datang di panel manajemen undangan Anda.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <AddTokensModal currentTokens={totalTokens} totalTokens={totalTokens}/>
          <CreateInvitationModal totalTokens={totalTokens} />
        </div>
      </div>

      {/* List Undangan */}
      <div className="w-full">
        <h2 className="text-xl font-semibold text-[#2C2C2C] mb-6">
          Undangan Anda ({invitations.length})
        </h2>

        {invitations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {invitations.map((item) => (
              <Card
                key={item.id}
                className="w-full border-[#E5E0D8] bg-white overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="w-full p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="bg-[#F8F5F0] p-3 rounded-xl">
                      <Calendar className="size-6 text-[#D4AF97]" />
                    </div>
                    {/* Sekarang aman mengakses template.category secara type-safe */}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B] bg-[#F8F5F0] px-2 py-1 rounded-md">
                      {item.template?.category || "Custom"}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-[#2C2C2C] text-lg truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#D4AF97] font-medium">
                      diundang.in/{item.slug}
                    </p>
                  </div>

                  {/* Contoh penggunaan InvitationContent: Menampilkan nama mempelai jika sudah ada */}
                  {item.contentData?.mempelai_pria?.nama && (
                    <p className="text-xs text-[#6B6B6B] italic">
                      {item.contentData.mempelai_pria.nama} &{" "}
                      {item.contentData.mempelai_wanita?.nama}
                    </p>
                  )}

                  <div className="flex gap-1 pt-2">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 rounded-xl h-10 text-xs gap-2"
                    >
                      <Link href={`/dashboard/edit/${item.id}`}>
                        <Settings2 className="size-3.5" /> Edit
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="secondary"
                      className="flex-1 rounded-xl h-10 text-xs gap-2"
                    >
                      <a
                        href={`/v/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="size-3.5" /> Preview
                      </a>
                    </Button>
                    <DeleteInvitationButton id={item.id} title={item.title} />
                    <ShareInvitationModal slug={item.slug} title={item.title} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="border-dashed border-2 border-[#E5E0D8] bg-white/50 w-full overflow-hidden">
            <CardContent className="p-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-white p-4 rounded-full shadow-sm border border-[#E5E0D8]">
                <Calendar className="size-8 text-[#D4AF97]" />
              </div>
              <div>
                <p className="font-semibold text-[#2C2C2C] text-lg">
                  Belum ada undangan
                </p>
                <p className="text-sm text-[#6B6B6B]">
                  Klik tombol di atas untuk membuat undangan pertama Anda.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
