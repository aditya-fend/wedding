import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Memaksa Next.js untuk selalu menjalankan route ini secara dinamis (tidak di-cache statis)
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    // 1. (Opsional) Keamanan dasar untuk Vercel Cron.
    // Vercel otomatis mengirim header Authorization berisi CRON_SECRET.
    // Jika dijalankan lokal/manual, Anda harus menambahkan header ini.
    const authHeader = request.headers.get("authorization");
    
    // Jika Anda mengatur CRON_SECRET di .env, kita bisa memvalidasinya.
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // 2. Lakukan query seringan mungkin HANYA untuk "menyentuh" database
    // SELECT 1 sangat cepat, murah, dan memastikan koneksi terjadi.
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json(
      { success: true, message: "Database pinged successfully. Supabase is awake!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Keep-alive error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to ping database" },
      { status: 500 }
    );
  }
}
