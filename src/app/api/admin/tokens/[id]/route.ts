// app/api/admin/tokens/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PUT: Update token
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { packageType, isUsed, userId } = body;

    const token = await prisma.token.update({
      where: { id },
      data: {
        ...(packageType !== undefined && { packageType }),
        ...(isUsed !== undefined && { isUsed }),
        ...(userId !== undefined && { userId: userId || null }),
      },
    });

    return NextResponse.json({ token });
  } catch (error: unknown) {
    console.error('Error updating token:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate token' },
      { status: 500 }
    );
  }
}

// DELETE: Hapus token
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.token.delete({ where: { id } });

    return NextResponse.json({ message: 'Token berhasil dihapus' });
  } catch (error: unknown) {
    console.error('Error deleting token:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus token' },
      { status: 500 }
    );
  }
}
