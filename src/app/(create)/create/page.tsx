import { createServerSupabase } from "@/lib/supabase/server"; // Sesuaikan path ini
import { prisma } from "@/lib/prisma";
import CreateDesktopView from "@/components/user/create/desktop/CreateDesktopView";
import { InvitationContent } from "@/types/invitation";

export default async function CreateInvitationPage() {
  // 1. Ambil Session User dari Supabase
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 2. Inisialisasi variabel untuk menampung data
  let invitationData: any = null;

  // 3. Ambil data Master (Templates & Musics) - Tetap diambil untuk Dropdown
  const [templates, musics] = await Promise.all([
    prisma.template.findMany({
      orderBy: {
        id: "asc",
      },
    }),
    prisma.music.findMany({
      orderBy: {
        title: "asc",
      },
    }),
  ]);
  // 4. Jika User Login, ambil data undangan spesifik dari Prisma
  if (user) {
    const dbData = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        invitations: {
          take: 1, // Kita ambil 1 saja untuk diedit di halaman ini
          orderBy: { createdAt: "desc" },
          include: { template: true },
        },
      },
    });

    if (dbData?.invitations?.[0]) {
      invitationData = dbData.invitations[0];
    }
  }

  // 5. Fallback Data (Guest Mode / Jika belum punya undangan)
  const defaultContent: InvitationContent = {
    mempelai_pria: { nama: "Aditya", ortu_ayah: "Ayah", ortu_ibu: "Ibu" },
    mempelai_wanita: { nama: "Aura", ortu_ayah: "Ayah", ortu_ibu: "Ibu" },
    acara: [
      {
        tipe: "Akad Nikah",
        tanggal: "2026-12-12",
        jam: "08:00",
        lokasi: "Semarang",
        alamat_lengkap: "Gedung Pernikahan",
        link_maps: "",
      },
    ],
    love_story: [],
    gallery: [],
    digital_envelope: [],
    guest_wishes: [],
    music_url: musics[0]?.url || "",
    rsvp_url: "",
    rsvp_note: "Silakan konfirmasi kehadiran Anda melalui tombol RSVP di atas.",
    countdown_date: "2026-12-12T08:00:00",
    additional_info: "",
    cover_title: "Undangan Untukmu",
    cover_subtitle:
      "Bersama keluarga, kami menantikan kehadiranmu di hari bahagia.",
    closing_message:
      "Terima kasih atas doa dan kehadiranmu. Sampai jumpa di hari istimewa kami!",
    dress_code: "Dark Bold Minimalism",
  };

  // 6. Mapping data akhir
  const initialData = invitationData
    ? (invitationData.content as unknown as InvitationContent)
    : defaultContent;

  return (
    <main className="h-auto w-full overflow-hidden bg-[#F8F5F0]">
      <CreateDesktopView
        invitationId={invitationData?.id || "guest-mode"}
        initialData={initialData}
        templates={templates}
        musics={musics}
        slug={invitationData?.slug || "demo"}
      />
    </main>
  );
}
