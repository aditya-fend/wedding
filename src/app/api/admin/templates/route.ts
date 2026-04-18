import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/supabase/actions";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    if (!dbUser || dbUser.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const {
      title,
      category,
      description,
      thumbnailUrl,
      previewUrl,
      configPath,
      isActive,
    } = body;

    if (!title || !category || !configPath) {
      return NextResponse.json(
        { error: "Title, category, and configPath are required" },
        { status: 400 },
      );
    }

    const template = await prisma.template.create({
      data: {
        title: title.trim(),
        category: category.trim(),
        description: description?.trim() || null,
        thumbnailUrl: thumbnailUrl?.trim() || null,
        previewUrl: previewUrl?.trim() || null,
        configPath: configPath.trim(),
        isActive: isActive === false ? false : true,
      },
    });

    return NextResponse.json({
      message: "Template berhasil ditambahkan",
      template,
    });
  } catch (error) {
    console.error("POST /api/admin/templates error", error);
    return NextResponse.json(
      { error: "Gagal menambahkan template" },
      { status: 500 },
    );
  }
}
