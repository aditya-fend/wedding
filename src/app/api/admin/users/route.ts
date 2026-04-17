// app/api/admin/users/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@supabase/supabase-js';

// GET: Ambil semua user
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        tokens: true,
        _count: {
          select: { invitations: true },
        },
      },
    });

    return NextResponse.json({ users });
  } catch (error: unknown) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil data pengguna' },
      { status: 500 }
    );
  }
}

// POST: Buat user baru (aktivasi akun via Supabase + Prisma)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, packageType, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Nama, email, dan password wajib diisi' },
        { status: 400 }
      );
    }

    // 1. Cek apakah user sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    // 2. Buat record di tabel User Prisma langsung tanpa Supabase
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Simpan password langsung ke DB
        role: role || 'user',
        status: 'active',
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Gagal membuat pengguna baru' },
      { status: 500 }
    );
  }
}
