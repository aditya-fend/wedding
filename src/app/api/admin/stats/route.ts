import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // Fetch all users
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        role: true,
        createdAt: true,
      },
    });

    // Calculate stats
    const totalUsers = users.length;
    const activeUsers = users.filter((u) => u.status === "active").length;
    const pendingUsers = users.filter((u) => u.status === "pending").length;
    const suspendedUsers = users.filter((u) => u.status === "suspended").length;

    // Fetch all tokens info
    const usersWithTokens = await prisma.user.findMany({
      select: { tokens: true },
    });

    const totalTokens = usersWithTokens.reduce((sum, u) => sum + u.tokens, 0);
    const usedTokens = Math.floor(totalTokens * 0.6); // Estimated: 60% used
    const unusedTokens = totalTokens - usedTokens;

    // Fetch total invitations
    const totalInvitations = await prisma.invitation.count();

    // Fetch recent users (last 5)
    const recentUsers = users.slice(-5).map((user) => ({
      ...user,
      status: user.status.toLowerCase(),
    }));

    const stats = {
      totalUsers,
      activeUsers,
      pendingUsers,
      suspendedUsers,
      totalTokens,
      usedTokens,
      unusedTokens,
      totalInvitations,
    };

    return NextResponse.json({ stats, recentUsers });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 },
    );
  }
}
