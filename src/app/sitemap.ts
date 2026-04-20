import { MetadataRoute } from 'next';
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://saji-janji.vercel.app";

  // 1. Ambil semua slug undangan dari database yang sudah dipublish
  // Kita hanya ambil 'slug' dan 'updatedAt' untuk efisiensi performa
  const invitations = await prisma.invitation.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
    // Optional: Tambahkan filter jika Anda punya status 'PUBLISHED'
    // where: { status: 'PUBLISHED' } 
  });

  // 2. Generate URL untuk setiap undangan
  const invitationUrls = invitations.map((inv) => ({
    url: `${baseUrl}/undangan/${inv.slug}`,
    lastModified: inv.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7, // Prioritas sedikit di bawah halaman utama
  }));

  // 3. Gabungkan dengan halaman statis utama
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0, // Halaman utama selalu prioritas tertinggi
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...invitationUrls,
  ];
}