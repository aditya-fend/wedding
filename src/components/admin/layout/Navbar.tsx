"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, UserCheck, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Aktivasi Akun", href: "/admin", icon: UserCheck },
  { name: "Pengaturan", href: "/admin", icon: Settings },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Top Navbar */}
      <div className="md:hidden fixed top-0 w-full h-16 bg-white border-b border-zinc-200 z-50 flex items-center justify-between px-4 lg:px-6 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
            <LayoutDashboard size={20} />
          </div>
          <span className="font-semibold text-lg text-zinc-900 tracking-tight">AdminPanel</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-zinc-600 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-md transition"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col transition-transform transform translate-x-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-16 flex items-center gap-2 px-6 border-b border-zinc-200">
              <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
                <LayoutDashboard size={20} />
              </div>
              <span className="font-semibold text-lg text-zinc-900 tracking-tight">AdminPanel</span>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = item.name === "Aktivasi Akun"; // Active hardcoded for demonstration
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-emerald-50 text-emerald-700" 
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                    )}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-zinc-200">
              <button className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-rose-600 rounded-lg hover:bg-rose-50 transition-colors">
                <LogOut size={18} />
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 bg-white border-r border-zinc-200 shadow-sm z-30">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-zinc-100">
          <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-sm">
            <LayoutDashboard size={22} />
          </div>
          <span className="font-bold text-xl text-zinc-900 tracking-tight">AdminPanel</span>
        </div>
        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = item.name === "Aktivasi Akun"; // Active hardcoded for demonstration
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100/50 shadow-sm" 
                    : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-emerald-600" : "text-zinc-400")} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-6 border-t border-zinc-100">
          <div className="flex items-center gap-3 mb-6 px-1">
            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
              A
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-900">Admin</p>
              <p className="text-xs text-zinc-500">admin@undanganku.com</p>
            </div>
          </div>
          <button className="flex w-full items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-rose-600 bg-rose-50 rounded-xl hover:bg-rose-100 hover:shadow-sm transition-all duration-200">
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </div>
    </>
  );
}
