import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/supabase/actions";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    if (!dbUser || dbUser.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { title, artist, url, category } = await request.json();

    // Validate required fields
    if (!title || !url) {
      return NextResponse.json(
        { error: "Title and URL are required" },
        { status: 400 },
      );
    }

    // Create music record
    const music = await prisma.music.create({
      data: {
        title: title || "Untitled",
        artist: artist || null,
        url: url,
        category: category || "wedding",
      },
    });

    return NextResponse.json({
      message: "Music uploaded successfully",
      music,
    });
  } catch (error) {
    console.error("DETAILED PRISMA ERROR:", error);
    console.error("Error uploading music:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { role: true },
    });

    if (!dbUser || dbUser.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const musics = await prisma.music.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ musics });
  } catch (error) {
    console.error("DETAILED PRISMA ERROR:", error);
    console.error("Error fetching musics:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error.message,
        prismaCode: error.code,
      },
      { status: 500 },
    );
  }
}
