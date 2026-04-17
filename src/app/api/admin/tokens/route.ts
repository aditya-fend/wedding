// app/api/admin/tokens/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Helper: Generate random token code
function generateTokenCode(length = 12): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // Format: XXXX-XXXX-XXXX
  return result.replace(/(.{4})/g, '$1-').slice(0, -1);
}

// GET: Ambil semua token
export async function GET() {
  try {
    const tokens = await prisma.token.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return NextResponse.json({ tokens });
  } catch (error: unknown) {
    console.error('Error fetching tokens:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data token' },
      { status: 500 }
    );
  }
}

// POST: Buat token baru (bisa batch)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { packageType, count = 1, userId } = body;

    if (!packageType) {
      return NextResponse.json(
        { error: 'Tipe paket wajib diisi' },
        { status: 400 }
      );
    }

    const tokensToCreate = [];
    for (let i = 0; i < Math.min(count, 50); i++) {
      tokensToCreate.push({
        tokenCode: generateTokenCode(),
        packageType,
        isUsed: false,
        userId: userId || null,
      });
    }

    const createdTokens = await Promise.all(
      tokensToCreate.map((token) =>
        prisma.token.create({ data: token })
      )
    );

    return NextResponse.json({ tokens: createdTokens }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating tokens:', error);
    return NextResponse.json(
      { error: 'Gagal membuat token' },
      { status: 500 }
    );
  }
}
