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
import { Prisma } from "@prisma/client";

// Mengambil tipe data otomatis dari Prisma termasuk relasi template dan rsvps
type InvitationWithRelations = Prisma.InvitationGetPayload<{
  include: {
    template: true;
    rsvps: true;
  };
}>;

export default async function DashboardPage() {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-zinc-400">Silakan login untuk mengakses dashboard.</p>
      </div>
    );
  }

  // Fetch data undangan milik user
  const invitations: InvitationWithRelations[] = await prisma.invitation.findMany({
    where: { userId: session.user.id },
    include: {
      template: true,
      rsvps: {
        orderBy: { createdAt: "desc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Fetch semua template yang tersedia
  const templates = await prisma.template.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-10 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Selamat Datang</h1>
          <p className="text-zinc-400 mt-2">
            Kelola undangan pernikahan digital kamu dengan mudah.
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

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-zinc-300">
              <Calendar className="w-5 h-5 text-zinc-500" /> Total Undangan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-white">{invitations.length}</p>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-zinc-300">
              <Users className="w-5 h-5 text-zinc-500" /> Total RSVP Masuk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl font-bold text-white">
              {invitations.reduce((sum, inv) => sum + inv.rsvps.length, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Grid Templates */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">Pilih Template ✨</h2>
          <Link href="/templates" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Lihat Semua
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="bg-zinc-900 border-zinc-800 overflow-hidden group">
              <div className="relative h-48">
                <Image
                  src={template.thumbnail}
                  alt={template.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {template.isPremium && (
                  <div className="absolute top-3 right-3 bg-yellow-500 text-black text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                    Premium
                  </div>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription className="line-clamp-1">{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={`/dashboard/create?template=${template.slug}`}>
                  <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white">Gunakan Template</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Undangan Saya Section */}
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white">Undangan Saya</CardTitle>
          <CardDescription>Daftar undangan aktif dan ringkasan tamu.</CardDescription>
        </CardHeader>
        <CardContent>
          {invitations.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-500">
              Kamu belum memiliki undangan aktif.
            </div>
          ) : (
            <div className="space-y-8">
              {invitations.map((inv) => (
                <div key={inv.id} className="border border-zinc-800 rounded-2xl p-6 bg-zinc-950/50">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {inv.groomName} & {inv.brideName}
                      </h3>
                      <p className="text-zinc-400 text-sm mt-1">
                        {inv.venue} • {new Date(inv.weddingDate).toLocaleDateString("id-ID", { 
                          day: 'numeric', month: 'long', year: 'numeric' 
                        })}
                      </p>
                    </div>

                    <Link href={`/invitation/${inv.slug}`} target="_blank">
                      <Button variant="outline" size="sm" className="border-zinc-700 hover:bg-zinc-800">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </Link>
                  </div>

                  {/* RSVP Counter */}
                  <div className="flex flex-wrap items-center gap-6 text-xs uppercase tracking-widest font-medium">
                    <div className="flex flex-col">
                      <span className="text-zinc-500 mb-1">Total RSVP</span>
                      <span className="text-lg text-white">{inv.rsvps.length}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-zinc-500 mb-1">Hadir</span>
                      <span className="text-lg text-green-400">
                        {inv.rsvps.filter(r => r.attendance === "hadir").length}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-zinc-500 mb-1">Mungkin</span>
                      <span className="text-lg text-yellow-400">
                        {inv.rsvps.filter(r => r.attendance === "mungkin").length}
                      </span>
                    </div>
                  </div>

                  {/* List RSVP Terakhir */}
                  {inv.rsvps.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-zinc-900">
                      <p className="text-sm font-medium text-zinc-400 mb-4">Konfirmasi Terbaru</p>
                      <div className="grid grid-cols-1 gap-2">
                        {inv.rsvps.slice(0, 3).map((rsvp) => (
                          <div key={rsvp.id} className="flex justify-between items-center bg-zinc-900/40 p-3 rounded-lg border border-zinc-800/50">
                            <div className="text-sm">
                              <span className="text-white font-medium">{rsvp.guestName}</span>
                              <span className="text-zinc-600 mx-2 text-xs">|</span>
                              <span className="text-zinc-500 text-xs">{rsvp.numberOfGuest} Tamu</span>
                            </div>
                            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                              rsvp.attendance === "hadir" ? "bg-green-500/10 text-green-500" :
                              rsvp.attendance === "tidak_hadir" ? "bg-red-500/10 text-red-500" : "bg-yellow-500/10 text-yellow-500"
                            }`}>
                              {rsvp.attendance.replace('_', ' ')}
                            </span>
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