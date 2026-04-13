// app/(invitation)/invitation/[slug]/page.tsx
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Users } from 'lucide-react';
import RSVPForm from './RSVPForm';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function InvitationPage({ params }: Props) {
  const { slug } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    include: {
      template: true,
      rsvps: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!invitation) {
    notFound();
  }

  const totalRsvp = invitation.rsvps.length;
  const hadirCount = invitation.rsvps.filter(r => r.attendance === 'hadir').length;

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20">
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        {/* Header Undangan */}
        <div className="mb-16">
          <div className="inline-block px-8 py-3 bg-white/10 backdrop-blur rounded-full text-sm mb-8">
            UNDANGAN PERNIKAHAN
          </div>
          <h1 className="text-6xl font-serif leading-none mb-6">
            {invitation.groomName} <span className="text-4xl">&amp;</span><br />
            {invitation.brideName}
          </h1>
          <p className="text-zinc-400 text-lg">Kepada Bapak/Ibu/Saudara/i yang kami hormati</p>
        </div>

        {/* Info Pernikahan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-10">
            <Calendar className="w-12 h-12 mx-auto mb-6 text-rose-400" />
            <p className="text-sm text-zinc-400 mb-2">Hari & Tanggal</p>
            <p className="text-2xl font-medium">
              {new Date(invitation.weddingDate).toLocaleDateString('id-ID', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-10">
            <MapPin className="w-12 h-12 mx-auto mb-6 text-rose-400" />
            <p className="text-sm text-zinc-400 mb-2">Lokasi Acara</p>
            <p className="text-2xl font-medium leading-tight">{invitation.venue}</p>
            {invitation.address && (
              <p className="text-sm text-zinc-500 mt-3">{invitation.address}</p>
            )}
          </div>
        </div>

        {/* Pesan */}
        {invitation.message && (
          <div className="max-w-md mx-auto mb-16 italic text-lg text-zinc-300">
            &quot;{invitation.message}&quot;
          </div>
        )}

        {/* RSVP Section */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-4 mb-8">
            <Users className="w-8 h-8" />
            <div>
              <p className="text-2xl font-semibold">{totalRsvp} Tamu telah konfirmasi</p>
              <p className="text-sm text-zinc-400">{hadirCount} orang akan hadir</p>
            </div>
          </div>

          <RSVPForm invitationId={invitation.id} slug={slug} />
        </div>

        <div className="text-xs text-zinc-500 mt-20">
          Dibuat dengan ❤️ oleh UndanganKu
        </div>
      </div>
    </div>
  );
}