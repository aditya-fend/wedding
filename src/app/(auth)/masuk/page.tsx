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
import { LogIn, KeyRound, Mail, Loader2, ChevronLeft } from "lucide-react";
import { getUserRole } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

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

    const actualRole = await getUserRole(data.user.id);

    await fetch("/api/set-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: data.user.id }),
    });

    toast.success("Login berhasil! Mengalihkan...");
    await new Promise((resolve) => setTimeout(resolve, 300));
    router.refresh();

    if (actualRole === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block font-bold text-2xl tracking-tighter text-[#2C2C2C]">
            Undang<span className="text-[#D4AF97]">Dong</span>
          </Link>
          <p className="text-[#9B9B9B] text-[10px] font-bold uppercase tracking-[0.2em]">
            Welcome Back • Member Access
          </p>
        </div>

        <Card className="border-[#F0EDE6] shadow-xl shadow-[#D4AF97]/5 rounded-[2rem] overflow-hidden bg-white">
          <CardHeader className="bg-[#FDFCFB] border-b border-[#F0EDE6] p-6 md:p-8 text-center space-y-2">
            <CardTitle className="text-xl md:text-2xl font-bold text-[#2C2C2C] tracking-tight">
              Selamat Datang
            </CardTitle>
            <CardDescription className="text-xs md:text-sm text-[#6B6B6B] leading-relaxed">
              Masuk untuk melanjutkan pengaturan dan pantau undangan digital Anda.
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 md:p-8 space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Input Email */}
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[11px] font-bold uppercase tracking-widest text-[#2C2C2C]">
                  Alamat Email
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#9B9B9B] group-focus-within:text-[#D4AF97] transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    className="pl-11 h-11 rounded-xl border-[#F0EDE6] focus:border-[#D4AF97] focus:ring-[#D4AF97]/10 transition-all bg-[#FDFCFB]/30"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Input Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[11px] font-bold uppercase tracking-widest text-[#2C2C2C]">
                    Kata Sandi
                  </Label>
                  <Link href="/lupa-password" className="text-[10px] font-bold text-[#D4AF97] uppercase tracking-tighter hover:underline">
                    Lupa sandi?
                  </Link>
                </div>
                <div className="relative group">
                  <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-[#9B9B9B] group-focus-within:text-[#D4AF97] transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-11 h-11 rounded-xl border-[#F0EDE6] focus:border-[#D4AF97] focus:ring-[#D4AF97]/10 transition-all bg-[#FDFCFB]/30"
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
                className={cn(
                  "w-full h-12 bg-[#D4AF97] hover:bg-[#B99575] text-white font-bold rounded-xl text-sm transition-all mt-2 shadow-lg shadow-[#D4AF97]/10",
                  "flex items-center justify-center gap-2"
                )}
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <LogIn className="size-4" />
                    Masuk Sekarang
                  </>
                )}
              </Button>
            </form>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#F0EDE6]" />
              </div>
              <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                <span className="bg-white px-4 text-[#9B9B9B]">Atau</span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-[#9B9B9B] font-medium">
                Belum memiliki akun?{" "}
                <Link href="/daftar" className="text-[#D4AF97] font-bold hover:underline italic">
                  Daftar di sini
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back Link & Copyright */}
        <div className="flex flex-col items-center gap-4">
          <Link href="/" className="text-[10px] font-bold uppercase tracking-widest text-[#9B9B9B] hover:text-[#2C2C2C] flex items-center transition-colors">
            <ChevronLeft className="size-3 mr-1" /> Kembali ke Beranda
          </Link>
          <p className="text-[10px] font-bold text-[#9B9B9B] uppercase tracking-widest">
            © 2026 SajiJanji • Member Area
          </p>
        </div>
      </div>
    </div>
  );
}