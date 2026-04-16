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
      // Pesan error menunjukkan isActive tidak ada.
      // Jika Anda ingin memfilter yang aktif, Anda harus menambahkannya dulu di schema.prisma.
      // Untuk sekarang, kita hapus filter where-nya agar tidak error.
      orderBy: {
        // Karena createdAt juga tidak ada di list error, kita gunakan 'id' atau 'title'
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
    dress_code: "Dark Bold Minimalism",
    music_url: musics[0]?.url || "",
  };

  // 6. Mapping data akhir
  const initialData = invitationData
    ? (invitationData.content as unknown as InvitationContent)
    : defaultContent;

  return (
    <main className="h-screen w-full overflow-hidden bg-[#F8F5F0]">
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
