import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { InvitationContent } from "@/types/invitation";
import PublicInvitationClient from "@/app/(invitation)/undangan/preview/[slug]/PublicInvitationClient";
import { Metadata } from "next";

interface InvitationPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: InvitationPageProps): Promise<Metadata> {
  const { slug } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    select: { contentData: true },
  });

  if (!invitation || !invitation.contentData) {
    return { title: "Undangan Pernikahan | Saji Janji" };
  }

  // Casting menggunakan interface yang Anda berikan
  const data = invitation.contentData as unknown as InvitationContent;

  const pria = data.mempelai_pria?.nama || "Mempelai Pria";
  const wanita = data.mempelai_wanita?.nama || "Mempelai Wanita";

  const weddingTitle = `Undangan Pernikahan ${pria} & ${wanita}`;
  const weddingDesc =
    data.closing_message ||
    `Kami mengundang Anda untuk merayakan hari bahagia ${pria} & ${wanita}. Lihat detail lokasi dan kirimkan doa restu online.`;

  // Prioritas Gambar Preview: Hero Image > Foto Pria > Foto Wanita > Fallback
  const previewImage =
    data.hero_image ||
    data.mempelai_pria?.foto ||
    data.mempelai_wanita?.foto ||
    "/og-image.jpg";

  return {
    title: weddingTitle,
    description: weddingDesc,
    openGraph: {
      title: weddingTitle,
      description: weddingDesc,
      url: `https://saji-janji.vercel.app/undangan/${slug}`,
      siteName: "Saji Janji",
      images: [
        {
          url: previewImage,
          width: 1200,
          height: 630,
          alt: `The Wedding of ${pria} & ${wanita}`,
        },
      ],
      locale: "id_ID",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: weddingTitle,
      description: weddingDesc,
      images: [previewImage],
    },
    // Menghindari indexing jika ini adalah draft (opsional)
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { slug } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    include: { template: true },
  });

  if (!invitation) notFound();

  const data = invitation.contentData as unknown as InvitationContent;

  const normalizeTemplateName = (title: string) => {
    return title.replace(/\s+/g, "");
  };

  const templateId = normalizeTemplateName(
    invitation.template.title,
  ).toLowerCase();

  return (
    <>
      {/* Schema Markup Khusus Undangan (Event) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: `Pernikahan ${data.mempelai_pria.nama} & ${data.mempelai_wanita.nama}`,
            startDate:
              data.wedding_date || (data.acara && data.acara[0]?.tanggal),
            location: {
              "@type": "Place",
              name: (data.acara && data.acara[0]?.lokasi) || "Lokasi Acara",
              address:
                (data.acara && data.acara[0]?.alamat_lengkap) || "Alamat Acara",
            },
            image: data.hero_image || data.gallery?.[0] || "/og-image.jpg",
            description:
              data.closing_message ||
              `Kami mengundang Anda untuk merayakan momen bahagia pernikahan kami.`,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode:
              "https://schema.org/OfflineEventAttendanceMode",
            organizer: {
              "@type": "Organization",
              name: "Saji Janji",
              url: "https://saji-janji.vercel.app",
            },
          }),
        }}
      />

      <PublicInvitationClient
        data={data}
        templateId={templateId}
        invitationId={invitation.id}
      />
    </>
  );
}
