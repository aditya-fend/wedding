"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Coins,
  LogOut,
  Shield,
  Music,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Kelola Pengguna", href: "/admin/pengguna", icon: Users },
  { name: "Kelola Token", href: "/admin/token", icon: Coins },
  { name: "Tambah Template", href: "/admin/add-template", icon: LayoutDashboard },
  { name: "Tambah Musik", href: "/admin/add-music", icon: Music },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Berhasil keluar!");
      router.push("/masuk");
      router.refresh();
    } catch (e) {
      toast.error("Gagal keluar.");
    }
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 w-full h-20 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
          <span className="font-black text-xs text-white uppercase tracking-[0.4em] italic">
            CORE.ADMIN
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-3 bg-white/5 text-slate-400 hover:text-white rounded-none border border-white/5 transition-all"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Desktop Sidebar Navbar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-72 md:flex-col z-50 transition-all duration-500">
        <div className="flex flex-col flex-grow bg-slate-950 border-r border-white/5 overflow-y-auto pt-10 px-8">
          <div className="flex items-center gap-4 mb-16 group">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
              <Shield size={28} className="text-cyan-500 relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xs text-white uppercase tracking-[0.5em] italic leading-tight">
                Nexus
              </span>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">
                Command Center
              </span>
            </div>
          </div>

          <div className="space-y-12 flex-grow">
            <div>
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-6 ml-4">
                Main Directory
              </p>
              <nav className="space-y-2">
                {navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-4 px-4 py-4 transition-all duration-300 border-l-2",
                        active
                          ? "bg-cyan-500/5 text-cyan-400 border-cyan-500 shadow-[20px_0_40px_-15px_rgba(6,182,212,0.1)_inset]"
                          : "text-slate-500 hover:text-white border-transparent hover:bg-white/[0.02]",
                      )}
                    >
                      <item.icon
                        size={16}
                        className={cn(
                          "transition-transform duration-300 group-hover:scale-110",
                          active
                            ? "text-cyan-400"
                            : "text-slate-600 group-hover:text-white",
                        )}
                      />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                        {item.name}
                      </span>
                      {active && (
                        <div className="ml-auto w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_8px_cyan]" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div>
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-6 ml-4">
                System
              </p>
              <button
                onClick={handleLogout}
                className="w-full group flex items-center gap-4 px-4 py-4 text-slate-500 hover:text-rose-500 hover:bg-rose-500/5 transition-all text-[10px] font-black uppercase tracking-[0.3em] border-l-2 border-transparent hover:border-rose-500"
              >
                <LogOut
                  size={16}
                  className="text-slate-600 group-hover:text-rose-500 group-hover:translate-x-1 transition-all"
                />
                Disconnect
              </button>
            </div>
          </div>

          <div className="mt-auto mb-10 p-6 bg-slate-900/50 border border-white/5">
            <div className="flex items-center gap-3">
              <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">
                Secure Connection
              </span>
            </div>
            <p className="text-[10px] font-mono text-slate-600 mt-2 truncate">
              ID: admin_x86_64
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Restyled) */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 left-0 w-72 bg-slate-950 border-r border-white/5 flex flex-col pt-24 px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="space-y-4">
              {navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 py-6 border-b border-white/[0.03] transition-all",
                      active
                        ? "text-cyan-400"
                        : "text-slate-500 hover:text-white",
                    )}
                  >
                    <item.icon size={18} />
                    <span className="text-[11px] font-black uppercase tracking-[0.4em]">
                      {item.name}
                    </span>
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-4 py-6 text-rose-500/70 hover:text-rose-500 font-black uppercase tracking-[0.4em] text-[11px] transition-all"
              >
                <LogOut size={18} />
                Disconnect
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
