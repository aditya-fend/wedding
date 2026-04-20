"use server";

import { prisma } from "@/lib/prisma";
import { createServerSupabase } from "@/lib/supabase/server";
import { InvitationContent } from "@/types/invitation";
import { revalidatePath } from "next/cache";

import { Prisma } from "@prisma/client";

export async function updateInvitationContent(
  invitationId: string,
  content: InvitationContent,
  templateTitle?: string,
) {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  try {
    const existing = await prisma.invitation.findUnique({
      where: { id: invitationId },
      select: { userId: true },
    });

    if (!existing || existing.userId !== user.id) {
      throw new Error("Anda tidak memiliki akses untuk mengubah undangan ini.");
    }

    // FIX: Gunakan tipe UpdateInput dari Prisma
    const updateData: Prisma.InvitationUpdateInput = {
      contentData: content as unknown as Prisma.InputJsonValue,
    };

    if (templateTitle) {
      const template = await prisma.template.findFirst({
        where: { title: { equals: templateTitle, mode: "insensitive" } },
      });
      if (template) {
        updateData.template = { connect: { id: template.id } };
      }
    }

    await prisma.invitation.update({
      where: { id: invitationId },
      data: updateData,
    });

    revalidatePath("/dashboard");
    revalidatePath(`/v/${invitationId}`);

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal menyimpan konten.";
    console.error("Update Error:", error);
    throw new Error(message);
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
      let defaultTemplate = await tx.template.findFirst();

      if (!defaultTemplate) {
        defaultTemplate = await tx.template.create({
          data: {
            title: "Default Template",
            configPath: "{}",
            category: "General",
          },
        });
      }

      await tx.user.update({
        where: { id: user.id },
        data: { tokens: { decrement: 10 } },
      });

      return await tx.invitation.create({
        data: {
          title: formData.title,
          slug: formData.slug,
          userId: user.id, // Cara koneksi yang lebih ringkas
          templateId: defaultTemplate.id,
        },
      });
    });

    revalidatePath("/dashboard");
    return { success: true, invitationId: result.id };
  } catch (error: unknown) {
    // FIX: Tangkap error prisma secara spesifik tanpa 'any'
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("URL baru saja diambil oleh pengguna lain.");
      }
    }
    const message = error instanceof Error ? error.message : "Terjadi kesalahan.";
    throw new Error(message);
  }
}

export async function saveInvitation(id: string, content: InvitationContent) {
  try {
    const updated = await prisma.invitation.update({
      where: { id },
      data: {
        contentData: content as unknown as Prisma.InputJsonValue,
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
} catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Gagal menghapus.";
    throw new Error(message);
  }
}
