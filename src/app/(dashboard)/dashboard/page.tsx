// app/(dashboard)/page.tsx
import { createServerSupabase } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Plus, Calendar, Users, Eye } from "lucide-react";
import Image from "next/image";

export default async function DashboardPage() {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return <div>Not authenticated</div>;
  }

  const invitations = await prisma.invitation.findMany({
    where: { userId: session.user.id },
    include: {
      template: true,
      rsvps: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const templates = await prisma.template.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Selamat Datang</h1>
          <p className="text-zinc-400 mt-2">
            Kelola undangan pernikahan digital kamu
          </p>
        </div>

        <Link href="/dashboard/create">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-zinc-200 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Buat Undangan Baru
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" /> Undangan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold">{invitations.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" /> Total RSVP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold">
              {invitations.reduce(
                (sum: number, inv: { rsvps: { id: string }[] }) =>
                  sum + inv.rsvps.length,
                0,
              )}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pilih Template */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Pilih Template</h2>
          <Link
            href="/templates"
            className="text-sm text-zinc-400 hover:text-white"
          >
            Lihat Semua ✨
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="bg-zinc-900 border-zinc-800 overflow-hidden group"
            >
              <div className="relative h-48">
                <Image
                  src={template.thumbnail}
                  alt={template.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                {template.isPremium && (
                  <div className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-3 py-1 rounded-full font-medium">
                    Premium
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/dashboard/create?template=${template.slug}`}>
                  <Button className="w-full">Gunakan Template Ini</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Undangan Saya + RSVP */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle>Undangan Saya</CardTitle>
          <CardDescription>Daftar undangan beserta RSVP tamu</CardDescription>
        </CardHeader>
        <CardContent>
          {invitations.length === 0 ? (
            <div className="text-center py-16 text-zinc-500">
              Belum ada undangan yang dibuat
            </div>
          ) : (
            <div className="space-y-8">
              {invitations.map((inv) => (
                <div
                  key={inv.id}
                  className="border border-zinc-800 rounded-2xl p-6"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold">
                        {inv.groomName} & {inv.brideName}
                      </h3>
                      <p className="text-zinc-400 text-sm mt-1">
                        {inv.venue} •{" "}
                        {new Date(inv.weddingDate).toLocaleDateString("id-ID")}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Link href={`/invitation/${inv.slug}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Lihat Undangan
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* RSVP Summary */}
                  <div className="flex items-center gap-8 text-sm">
                    <div>
                      <span className="text-zinc-400">Total RSVP:</span>{" "}
                      <span className="font-semibold text-white">
                        {inv.rsvps.length}
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-400">Hadir:</span>{" "}
                      <span className="font-semibold text-green-400">
                        {
                          inv.rsvps.filter((r) => r.attendance === "hadir")
                            .length
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-zinc-400">Tidak Hadir:</span>{" "}
                      <span className="font-semibold text-red-400">
                        {
                          inv.rsvps.filter(
                            (r) => r.attendance === "tidak_hadir",
                          ).length
                        }
                      </span>
                    </div>
                  </div>

                  {/* List RSVP Terbaru */}
                  {inv.rsvps.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-zinc-800">
                      <p className="text-sm text-zinc-400 mb-3">
                        Konfirmasi Terbaru:
                      </p>
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                        {inv.rsvps.slice(0, 5).map((rsvp) => (
                          <div
                            key={rsvp.id}
                            className="flex justify-between items-center text-sm bg-zinc-950 p-3 rounded-lg"
                          >
                            <div>
                              <span className="font-medium">
                                {rsvp.guestName}
                              </span>
                              {rsvp.guestPhone && (
                                <span className="text-zinc-500 ml-2">
                                  • {rsvp.guestPhone}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4">
                              <span
                                className={`px-3 py-1 text-xs rounded-full ${
                                  rsvp.attendance === "hadir"
                                    ? "bg-green-500/20 text-green-400"
                                    : rsvp.attendance === "tidak_hadir"
                                      ? "bg-red-500/20 text-red-400"
                                      : "bg-yellow-500/20 text-yellow-400"
                                }`}
                              >
                                {rsvp.attendance === "hadir"
                                  ? "Hadir"
                                  : rsvp.attendance === "tidak_hadir"
                                    ? "Tidak Hadir"
                                    : "Mungkin"}
                              </span>
                              <span className="text-zinc-500">
                                ({rsvp.numberOfGuest} orang)
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
