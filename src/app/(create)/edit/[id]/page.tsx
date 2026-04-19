import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import EditInvitationClient from "@/components/user/create/EditInvitationClient";
import { InvitationContent } from "@/types/invitation";

interface EditInvitationPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditInvitationPage({ params }: EditInvitationPageProps) {
  // 1. Ambil ID dari params (Next.js 15+ menggunakan await params)
  const { id } = await params;

  // 2. Ambil data undangan dari database berdasarkan ID
  // Pastikan relasi template dan music di-include untuk kebutuhan dropdown di sidebar
  const invitation = await prisma.invitation.findUnique({
    where: { id: id },
    include: {
      template: true,
    },
  });

  // 3. Jika data tidak ditemukan, arahkan ke 404
  if (!invitation) {
    notFound();
  }

  // 4. Ambil semua daftar template dan musik untuk dikirim ke EditorSidebar
  const [templates, musics] = await Promise.all([
    prisma.template.findMany(),
    prisma.music.findMany(),
  ]);

  // 5. Parsing data JSON dari database ke tipe InvitationContent
  const initialData = invitation.contentData as unknown as InvitationContent;

  return (
    <main className="h-screen w-full overflow-hidden">
      <EditInvitationClient
        invitationId={invitation.id}
        initialData={initialData}
        initialTemplate={invitation.template?.title || "Pink"}
        templates={templates}
        musics={musics}
        slug={invitation.slug || ""}
      />
    </main>
  );
}