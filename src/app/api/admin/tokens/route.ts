import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readFile } from "node:fs/promises";

const tokenFile = new URL("./data.json", import.meta.url);

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

export async function GET() {
  try {
    const tokens = await loadTokens();
    const userIds = tokens
      .map((token) => token.userId)
      .filter((id): id is string => Boolean(id));

    const users = userIds.length
      ? await prisma.user.findMany({
          where: { id: { in: userIds } },
          select: { id: true, name: true, email: true },
        })
      : [];

    const userMap = new Map(users.map((user) => [user.id, user]));

    return NextResponse.json({
      tokens: tokens.map((token) => ({
        ...token,
        user: token.userId ? (userMap.get(token.userId) ?? null) : null,
      })),
    });
  } catch (error) {
    console.error("GET /api/admin/tokens error", error);
    return NextResponse.json({ error: "Gagal memuat token" }, { status: 500 });
  }
}
