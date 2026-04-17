// app/api/admin/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@supabase/supabase-js';

// GET: Ambil user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        tokens: true,
        _count: {
          select: { invitations: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User tidak ditemukan' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error: unknown) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data pengguna' },
      { status: 500 }
    );
  }
}

// PUT: Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email, role, status } = body;

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(role && { role }),
        ...(status && { status }),
      },
    });

    return NextResponse.json({ user });
  } catch (error: unknown) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Gagal mengupdate pengguna' },
      { status: 500 }
    );
  }
}

// DELETE: Hapus user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Hapus tokens terkait dulu
    await prisma.token.deleteMany({ where: { userId: id } });
    
    // DELETE: Hapus user
    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ message: 'Pengguna berhasil dihapus' });
  } catch (error: unknown) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Gagal menghapus pengguna' },
      { status: 500 }
    );
  }
}
