// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [
      totalUsers,
      activeUsers,
      pendingUsers,
      suspendedUsers,
      totalTokens,
      usedTokens,
      unusedTokens,
      totalInvitations,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { status: 'active' } }),
      prisma.user.count({ where: { status: 'pending' } }),
      prisma.user.count({ where: { status: 'suspended' } }),
      prisma.token.count(),
      prisma.token.count({ where: { isUsed: true } }),
      prisma.token.count({ where: { isUsed: false } }),
      prisma.invitation.count(),
    ]);

    // Ambil 5 user terbaru
    const recentUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      stats: {
        totalUsers,
        activeUsers,
        pendingUsers,
        suspendedUsers,
        totalTokens,
        usedTokens,
        unusedTokens,
        totalInvitations,
      },
      recentUsers,
    });
  } catch (error: unknown) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Gagal mengambil statistik' },
      { status: 500 }
    );
  }
}
