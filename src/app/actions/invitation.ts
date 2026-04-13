// app/actions/invitation.ts
"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase/server";

const QRIS_IMAGE_URL = "https://i.ibb.co/0jZfX8k/qris-placeholder.jpg"; // Ganti dengan QRIS kamu nanti

export async function createInvitation(formData: FormData) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Silakan login terlebih dahulu");

  const groomName = (formData.get("groomName") as string).trim();
  const brideName = (formData.get("brideName") as string).trim();
  const weddingDateStr = formData.get("weddingDate") as string;
  const venue = (formData.get("venue") as string).trim();
  const address = (formData.get("address") as string)?.trim() || null;
  const message = (formData.get("message") as string)?.trim() || null;
  const templateSlug = (formData.get("templateSlug") as string) || "elegant-minimal";
  const packageType = (formData.get("packageType") as string) || "basic";

  if (!groomName || !brideName || !weddingDateStr || !venue) {
    throw new Error("Nama pengantin, tanggal, dan tempat wajib diisi");
  }

  const weddingDate = new Date(weddingDateStr);

  // Sinkronisasi user
  const dbUser = await prisma.user.upsert({
    where: { id: user.id },
    update: {},
    create: {
      id: user.id,
      email: user.email!,
      username: user.user_metadata?.username || user.email?.split('@')[0] || "user",
    },
  });

  const template = await prisma.template.findUnique({ where: { slug: templateSlug } });
  if (!template) throw new Error("Template tidak ditemukan");

  const baseSlug = `${groomName.toLowerCase().replace(/\s+/g, '-')}-${brideName.toLowerCase().replace(/\s+/g, '-')}`;
  const slug = `${baseSlug}-${Date.now().toString().slice(-6)}`;

  const invitation = await prisma.invitation.create({
    data: {
      slug,
      userId: dbUser.id,
      templateId: template.id,
      groomName,
      brideName,
      weddingDate,
      venue,
      address,
      message,
      packageType,
      isPublished: false,
    },
  });

  revalidatePath("/dashboard");

  return {
    success: true,
    message: "Undangan berhasil dibuat!",
    slug: invitation.slug,
    packageType,
    groomName,
    brideName,
    qrisImage: QRIS_IMAGE_URL,
    whatsappNumber: "6281234567890", // Ganti dengan nomor WA kamu
  };
}