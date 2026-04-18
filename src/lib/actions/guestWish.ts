"use server";

import { prisma } from "@/lib/prisma";
import { Presence } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
    if (data.isPresent === "Tidak Hadir" || data.isPresent === "Tidak_Hadir") {
      presenceValue = Presence.Tidak_Hadir;
    } else if (data.isPresent === "Ragu_ragu" || data.isPresent === "Ragu-ragu") {
      presenceValue = Presence.Ragu_ragu;
    }

    const wish = await prisma.guestWish.create({
      data: {
        invitationId: data.invitationId,
        guestName: data.guestName,
        message: data.message,
        isPresent: presenceValue,
        guestCount: data.guestCount || 1,
      },
    });

    revalidatePath(`/v/${data.invitationId}`);
    revalidatePath(`/undangan/${data.invitationId}`);

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
