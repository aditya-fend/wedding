"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, KeyRound, Mail, Loader2 } from "lucide-react";
import { getUserRole } from "@/lib/actions/auth";

export default function MasukPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      toast.error(
        error.message === "Invalid login credentials"
          ? "Email atau kata sandi salah"
          : error.message,
      );
      return;
    }

    if (!data.user) {
      setLoading(false);
      toast.error("User tidak ditemukan");
      return;
    }

    // 🔥 Ambil role dari database
    const actualRole = await getUserRole(data.user.id);

    await fetch("/api/set-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: data.user.id,
      }),
    });

    toast.success("Login berhasil! Mengalihkan...");

    // 🔥 PENTING: tunggu sebentar agar cookie Supabase tersimpan
    await new Promise((resolve) => setTimeout(resolve, 300));

    // 🔥 Refresh dulu supaya server component kebaca session
    router.refresh();

    // 🔥 Baru redirect
    if (actualRole === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center p-6">
      <div className="w-full max-w-[420px] space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold tracking-tight text-[#2C2C2C]">
              Undang Dong
            </h1>
          </Link>
          <p className="text-[#6B6B6B]">
            Kelola undangan digital Anda dengan mudah
          </p>
        </div>

        <Card className="border-[#E5E0D8] shadow-xl">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="text-2xl font-semibold text-[#2C2C2C]">
              Selamat Datang Kembali
            </CardTitle>
            <CardDescription className="text-[#6B6B6B]">
              Masuk untuk melanjutkan pengaturan undangan Anda.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Input Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#6B6B6B]/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Kata Sandi</Label>
                  <Link
                    href="/lupa-password"
                    className="text-xs text-[#D4AF97] font-medium hover:underline"
                  >
                    Lupa sandi?
                  </Link>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#6B6B6B]/50" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 text-base mt-2"
                size="default"
              >
                {loading ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <LogIn className="mr-2 size-4" />
                )}
                {loading ? "Memproses..." : "Masuk Sekarang"}
              </Button>
            </form>

            {/* Separator untuk Footer Card */}
            <div className="relative pt-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#E5E0D8]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-[#6B6B6B]">Atau</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-[#6B6B6B]">
                Belum memiliki akun?{" "}
                <Link
                  href="/daftar"
                  className="text-[#D4AF97] font-semibold hover:underline"
                >
                  Daftar di sini
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Link */}
        <p className="text-center text-xs text-[#6B6B6B]">
          &copy; {new Date().getFullYear()} UndangDong. Semua hak cipta
          dilindungi.
        </p>
      </div>
    </div>
  );
}
