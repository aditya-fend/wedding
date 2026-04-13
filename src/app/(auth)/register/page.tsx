// app/(auth)/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const username = formData.get("username") as string;

    if (password.length < 6) {
      toast.error("Password minimal 6 karakter");
      setIsLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }, // simpan username di user metadata
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Registrasi berhasil! Silakan login.");
      router.push("/login");
    }

    setIsLoading(false);
  };

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-white">Buat Akun</CardTitle>
        <CardDescription className="text-zinc-400">
          Daftar untuk mulai membuat undangan pernikahan digital
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              placeholder="nama_pengantin"
              required
              className="bg-zinc-950 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="nama@email.com"
              required
              className="bg-zinc-950 border-zinc-700 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Minimal 6 karakter"
              required
              className="bg-zinc-950 border-zinc-700 text-white"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-white text-black hover:bg-zinc-200"
            disabled={isLoading}
          >
            {isLoading ? "Mendaftar..." : "Daftar Sekarang"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-400">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-white hover:underline font-medium">
            Masuk di sini
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}