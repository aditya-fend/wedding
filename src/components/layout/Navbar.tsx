// components/layout/navbar.tsx
"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { toast } from "sonner";

interface NavbarProps {
  user: {
    id: string;
    email?: string | null;
    user_metadata?: {
      username?: string;
    };
  };
}

export function Navbar({ user }: NavbarProps) {
  const supabase = createClient();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast.error("Gagal logout. Silakan coba lagi.");
      return;
    }

    toast.success("Berhasil logout");
    window.location.href = '/login';
  };

  const displayName = user.user_metadata?.username 
    || user.email?.split('@')[0] 
    || "Pengguna";

  const email = user.email || "email tidak tersedia";

  return (
    <nav className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="font-bold text-2xl tracking-tight">
          Undangan<span className="text-white/60">Ku</span>
        </Link>

        <div className="flex items-center gap-8">
          <nav className="flex items-center gap-6 text-sm">
            <Link 
              href="/dashboard" 
              className="hover:text-white transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link 
              href="/templates" 
              className="hover:text-white transition-colors font-medium"
            >
              Template
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center">
                <UserIcon className="w-4 h-4" />
              </div>
              <div className="text-right">
                <p className="font-medium text-white">{displayName}</p>
                <p className="text-xs text-zinc-500">{email}</p>
              </div>
            </div>

            <Button 
              onClick={handleLogout}
              variant="ghost" 
              size="sm"
              className="text-red-400 hover:text-red-500 hover:bg-red-950/50"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Keluar
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}