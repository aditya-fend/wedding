import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

/**
 * FINAL SITEMAP GENERATOR - SAJI JANJI
 * Mekanisme ini membantu Google mengindeks Landing Page dan 
 * seluruh undangan user secara otomatis.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://saji-janji.vercel.app";

  // 1. Fetch data dari database berdasarkan skema model Invitation
  // Menggunakan 'createdAt' karena skema belum memiliki 'updatedAt'
  const invitations = await prisma.invitation.findMany({
    where: {
      isActive: true, // Hanya indeks undangan yang aktif
    },
    select: {
      slug: true,
      createdAt: true,
    },
  });

  // 2. Mapping data undangan ke format URL Sitemap
  const invitationUrls = invitations.map((inv) => ({
    url: `${baseUrl}/undangan/${inv.slug}`,
    lastModified: inv.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.6, // Fokus utama tetap pada landing page
  }));

  // 3. Daftar halaman statis utama
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/register`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [...staticPages, ...invitationUrls];
}