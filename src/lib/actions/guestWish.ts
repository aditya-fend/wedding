"use server";

import { prisma } from "@/lib/prisma";
import { Presence } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { createServerSupabase } from "../supabase/server";
import sanitizeHtml from "sanitize-html";

export async function saveGuestWish(data: {
  invitationId: string;
  guestName: string;
  message: string;
  isPresent: string;
  guestCount?: number;
}) {
  try {
    // Map string presence to Enum
    let presenceValue: Presence = Presence.Hadir;
    const p = data.isPresent.toLowerCase();
    
    if (p === "tidak hadir" || p === "tidak_hadir") {
      presenceValue = Presence.Tidak_Hadir;
    } else if (p === "ragu_ragu" || p === "ragu-ragu" || p === "ragu ragu") {
      presenceValue = Presence.Ragu_ragu;
    } else if (p === "belum_konfirmasi" || p === "belum konfirmasi" || p === "belum_jawab" || p === "belum jawab") {
      presenceValue = Presence.Belum_Konfirmasi;
    }

    const sanitizedName = sanitizeHtml(data.guestName, { allowedTags: [], allowedAttributes: {} }).trim();
    const sanitizedMessage = sanitizeHtml(data.message, { allowedTags: [], allowedAttributes: {} }).trim();

    const wish = await prisma.guestWish.create({
      data: {
        invitationId: data.invitationId,
        guestName: sanitizedName,
        message: sanitizedMessage,
        isPresent: presenceValue,
        guestCount: data.guestCount || 1,
      },
    });

    revalidatePath(`/v/${data.invitationId}`);
    revalidatePath(`/undangan/${data.invitationId}`);
    revalidatePath("/dashboard/rsvp");
    revalidatePath("/dashboard");

    return { success: true, data: wish };
  } catch (error) {
    console.error("Save Guest Wish Error:", error);
    return { success: false, error: "Gagal menyimpan ucapan." };
  }
}

export async function getGuestWishes(invitationId: string) {
  try {
    const wishes = await prisma.guestWish.findMany({
      where: { invitationId },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: wishes };
  } catch (error) {
    console.error("Get Guest Wishes Error:", error);
    return { success: false, error: "Gagal mengambil data ucapan." };
  }
}

export async function getAllUserGuests() {
  const supabase = await createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Unauthorized" };

  try {
    const guests = await prisma.guestWish.findMany({
      where: {
        invitation: { userId: user.id }
      },
      include: {
        invitation: {
          select: { title: true }
        }
      },
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: guests };
  } catch (error) {
    console.error("Get All User Guests Error:", error);
    return { success: false, error: "Gagal mengambil data tamu." };
  }
}

export async function deleteGuest(id: string) {
  try {
    await prisma.guestWish.delete({
      where: { id },
    });
    revalidatePath("/dashboard/rsvp");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Delete Guest Error:", error);
    return { success: false, error: "Gagal menghapus tamu." };
  }
}

export async function updateGuestStatus(id: string, isPresent: Presence) {
  try {
    await prisma.guestWish.update({
      where: { id },
      data: { isPresent },
    });
    revalidatePath("/dashboard/rsvp");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Update Guest Status Error:", error);
    return { success: false, error: "Gagal memperbarui status." };
  }
}
