import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFile, writeFile } from "node:fs/promises";

const tokenFile = new URL("../data.json", import.meta.url);

interface TokenRecord {
  id: string;
  tokenCode: string;
  packageType: string;
  isUsed: boolean;
  createdAt: string;
  userId: string | null;
}

async function loadTokens(): Promise<TokenRecord[]> {
  try {
    const content = await readFile(tokenFile, "utf8");
    return JSON.parse(content) as TokenRecord[];
  } catch (error: any) {
    if (error?.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function saveTokens(tokens: TokenRecord[]) {
  await writeFile(tokenFile, JSON.stringify(tokens, null, 2), "utf8");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const tokens = await loadTokens();
    const index = tokens.findIndex((token) => token.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Token tidak ditemukan" },
        { status: 404 },
      );
    }

    const body = await request.json();
    const { packageType, isUsed, userId } = body;

    tokens[index] = {
      ...tokens[index],
      packageType:
        typeof packageType === "string"
          ? packageType
          : tokens[index].packageType,
      isUsed: typeof isUsed === "boolean" ? isUsed : tokens[index].isUsed,
      userId:
        userId === null
          ? null
          : typeof userId === "string"
            ? userId
            : tokens[index].userId,
    };

    await saveTokens(tokens);
    const updated = tokens[index];

    const user = updated.userId
      ? await prisma.user.findUnique({
          where: { id: updated.userId },
          select: { id: true, name: true, email: true },
        })
      : null;

    return NextResponse.json({ token: { ...updated, user } });
  } catch (error) {
    console.error("PUT /api/admin/tokens/[id] error", error);
    return NextResponse.json(
      { error: "Gagal mengupdate token" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const tokens = await loadTokens();
    const index = tokens.findIndex((token) => token.id === params.id);

    if (index === -1) {
      return NextResponse.json(
        { error: "Token tidak ditemukan" },
        { status: 404 },
      );
    }

    tokens.splice(index, 1);
    await saveTokens(tokens);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/tokens/[id] error", error);
    return NextResponse.json(
      { error: "Gagal menghapus token" },
      { status: 500 },
    );
  }
}
