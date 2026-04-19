"use server";

import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase/server";
import { InvitationContent } from "@/types/invitation";
import { revalidatePath } from "next/cache";

export async function updateInvitationContent(
  invitationId: string,
  content: InvitationContent,
  templateTitle?: string,
) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  try {
    // 1. Validasi kepemilikan
    const existing = await prisma.invitation.findUnique({
      where: { id: invitationId },
      select: { userId: true },
    });

    if (!existing || existing.userId !== user.id) {
      throw new Error("Anda tidak memiliki akses untuk mengubah undangan ini.");
    }

    // 2. Siapkan data update
    const updateData: any = {
      contentData: content as any,
    };

    // Jika ada templateTitle, cari template yang sesuai di DB
    if (templateTitle) {
      const template = await prisma.template.findFirst({
        where: {
          title: {
            equals: templateTitle,
            mode: "insensitive",
          },
        },
      });
      if (template) {
        updateData.templateId = template.id;
      }
    }

    // 3. Update record undangan
    await prisma.invitation.update({
      where: { id: invitationId },
      data: updateData,
    });

    // 4. Refresh cache
    revalidatePath("/dashboard");
    revalidatePath(`/v/${invitationId}`);

    return { success: true };
  } catch (error: any) {
    console.error("Update Error:", error);
    throw new Error(error.message || "Gagal menyimpan konten.");
  }
}

export async function createInitialInvitation(formData: {
  title: string;
  slug: string;
}) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  // 1. Pre-validation: Cek ketersediaan Slug (Agar tidak kena P2002)
  const existingSlug = await prisma.invitation.findUnique({
    where: { slug: formData.slug },
  });

  if (existingSlug) {
    throw new Error("URL (slug) sudah digunakan. Silakan pilih nama lain.");
  }

  // 2. Pre-validation: Cek saldo token user
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { tokens: true },
  });

  if (!dbUser || dbUser.tokens < 10) {
    throw new Error(
      `Token tidak mencukupi. Saldo Anda: ${dbUser?.tokens || 0}`,
    );
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // A. Ambil template default
      let defaultTemplate = await tx.template.findFirst();

      // Jika template benar-benar kosong di DB, buat satu agar tidak error
      if (!defaultTemplate) {
        defaultTemplate = await tx.template.create({
          data: {
            title: "Default Template",
            configPath: "{}",
            category: "General",
          },
        });
      }

      // B. Kurangi saldo token (Menggunakan atomik decrement)
      await tx.user.update({
        where: { id: user.id },
        data: { tokens: { decrement: 10 } },
      });

      // C. Buat record undangan
      return await tx.invitation.create({
        data: {
          title: formData.title,
          slug: formData.slug,
          user: {
            connect: { id: user.id },
          },
          template: {
            connect: { id: defaultTemplate.id },
          },
        },
      });
    });

    revalidatePath("/dashboard");
    return { success: true, invitationId: result.id };
  } catch (error: any) {
    // Menangkap error spesifik prisma jika ada race condition
    if (error.code === "P2002") {
      throw new Error(
        "URL baru saja diambil oleh pengguna lain. Coba URL lain.",
      );
    }
    throw new Error(
      error.message || "Terjadi kesalahan saat membuat undangan.",
    );
  }
}

export async function saveInvitation(id: string, content: InvitationContent) {
  try {
    const updated = await prisma.invitation.update({
      where: { id },
      data: {
        contentData: content as any,
      },
    });

    revalidatePath(`/preview/${updated.slug}`);

    return { success: true, data: updated };
  } catch (error) {
    console.error("Save Error:", error);
    return { success: false, error: "Gagal menyimpan data" };
  }
}

export async function getInvitationById(id: string) {
  return await prisma.invitation.findUnique({
    where: { id },
    include: { template: true },
  });
}

export async function deleteInvitation(invitationId: string) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  try {
    // 1. Validasi kepemilikan
    const existing = await prisma.invitation.findUnique({
      where: { id: invitationId },
      select: { userId: true },
    });

    if (!existing || existing.userId !== user.id) {
      throw new Error(
        "Anda tidak memiliki akses untuk menghapus undangan ini.",
      );
    }

    // 2. Hapus undangan
    await prisma.invitation.delete({
      where: { id: invitationId },
    });

    // 3. Revalidate dashboard
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error: any) {
    console.error("Delete Error:", error);
    throw new Error(error.message || "Gagal menghapus undangan.");
  }
}
