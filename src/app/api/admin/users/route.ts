import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const packageMap: Record<string, "BASIC" | "STANDARD" | "PREMIUM"> = {
  Basic: "BASIC",
  Standard: "STANDARD",
  Premium: "PREMIUM",
  Exclusive: "PREMIUM",
};

export async function GET() {
  try {
    const users = await prisma.user.findMany({
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

    const formattedUsers = users.map((user) => ({
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
    }));

    return NextResponse.json({ users: formattedUsers });
  } catch (error) {
    console.error("GET /api/admin/users error", error);
    return NextResponse.json(
      { error: "Gagal memuat data pengguna" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, packageType, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Nama, email, dan password wajib diisi" },
        { status: 400 },
      );
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: role === "admin" ? "admin" : "user",
        status: "pending",
        tokens: 0,
        package: packageMap[packageType] ?? "BASIC",
      },
    });

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
        _count: { invitations: 0 },
      },
    });
  } catch (error) {
    console.error("POST /api/admin/users error", error);
    return NextResponse.json(
      { error: "Gagal membuat pengguna" },
      { status: 500 },
    );
  }
}
