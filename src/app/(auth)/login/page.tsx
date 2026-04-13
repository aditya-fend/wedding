// app/(auth)/login/page.tsx
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

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Login berhasil!");
      router.push("/dashboard");
      router.refresh();
    }

    setIsLoading(false);
  };

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-white">Masuk Akun</CardTitle>
        <CardDescription className="text-zinc-400">
          Selamat datang kembali! Masuk untuk mengelola undangan kamu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
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
              placeholder="Password kamu"
              required
              className="bg-zinc-950 border-zinc-700 text-white"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-white text-black hover:bg-zinc-200"
            disabled={isLoading}
          >
            {isLoading ? "Masuk..." : "Masuk"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-zinc-400">
          Belum punya akun?{" "}
          <Link href="/register" className="text-white hover:underline font-medium">
            Daftar sekarang
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}