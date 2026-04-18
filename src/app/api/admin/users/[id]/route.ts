import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function GET(
  request: NextRequest,
  { params }: Params,
) {
  const { id } = await params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        tokens: true,
        package: true,
        _count: {
          select: {
            invitations: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Pengguna tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: "",
        role: user.role,
        status: user.status,
        createdAt: user.createdAt.toISOString(),
        tokens: [],
        _count: {
          invitations: user._count.invitations,
        },
      },
    });
  } catch (error) {
    console.error("GET error", error);
    return NextResponse.json(
      { error: "Gagal memuat pengguna" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: Params,
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { name, email, role, status } = body;

    if (!name || !email || !role || !status) {
      return NextResponse.json(
        { error: "Nama, email, role, dan status wajib diisi" },
        { status: 400 },
      );
    }

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        email,
        role: role === "admin" ? "admin" : "user",
        status: ["active", "pending", "suspended"].includes(status)
          ? status
          : "pending",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        tokens: true,
        package: true,
        _count: {
          select: {
            invitations: true,
          },
        },
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("PUT error", error);
    return NextResponse.json(
      { error: "Gagal mengupdate pengguna" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: Params,
) {
  const { id } = await params;

  try {
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error", error);
    return NextResponse.json(
      { error: "Gagal menghapus pengguna" },
      { status: 500 },
    );
  }
}