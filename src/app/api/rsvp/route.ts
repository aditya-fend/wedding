// app/api/rsvp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { invitationId, guestName, guestPhone, attendance, numberOfGuest, message } = body;

    if (!invitationId || !guestName || !attendance) {
      return NextResponse.json(
        { error: "Data wajib tidak lengkap" },
        { status: 400 }
      );
    }

    const rsvp = await prisma.rsvp.create({
      data: {
        invitationId,
        guestName: guestName.trim(),
        guestPhone: guestPhone?.trim() || null,
        attendance,
        numberOfGuest: Number(numberOfGuest) || 1,
        message: message?.trim() || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "RSVP berhasil disimpan",
      data: rsvp,
    });

  } catch (error: unknown) {
    console.error("RSVP Error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan RSVP. Silakan coba lagi." },
      { status: 500 }
    );
  }
}