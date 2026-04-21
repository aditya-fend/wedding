"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Heart,
  PanelLeftClose,
  PanelLeftOpen,
  Users,
  Settings,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Undangan Saya", href: "/dashboard/undangan", icon: Heart },
  { name: "Manajemen RSVP", href: "/dashboard/rsvp", icon: Users },
  // { name: "Pengaturan", href: "/dashboard/settings", icon: Settings },
];

export function Navbar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [isExiting, setIsExiting] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const closeMobileMenu = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsMobileOpen(false);
      setIsExiting(false);
    }, 300);
  };

  return (
    <>
      {/* MOBILE NAVBAR (TOP) */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-[#F0EDE6] z-[60] px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-[#D4AF97]" />
          <span className="font-bold text-lg tracking-tighter text-[#2C2C2C]">
            Saji <span className="text-[#D4AF97]">Janji</span>
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() =>
            isMobileOpen ? closeMobileMenu() : setIsMobileOpen(true)
          }
          className="text-[#2C2C2C] hover:bg-[#FDFCFB]"
        >
          {isMobileOpen ? (
            <X className="size-5" />
          ) : (
            <Menu className="size-5" />
          )}
        </Button>
      </header>

      {/* MOBILE OVERLAY MENU */}
      {isMobileOpen && (
        <>
          <div
            className={cn(
              "lg:hidden fixed inset-0 bg-black/10 backdrop-blur-sm z-[50] transition-opacity duration-300",
              isExiting ? "opacity-0" : "opacity-100 animate-in fade-in",
            )}
            onClick={closeMobileMenu}
          />
          <div
            className={cn(
              "lg:hidden fixed top-16 left-0 right-0 bg-white z-[55] border-b border-[#F0EDE6] p-6 shadow-2xl rounded-b-[2rem] transition-all duration-300 ease-in-out",
              isExiting
                ? "translate-y-[-100%] opacity-0"
                : "translate-y-0 opacity-100 animate-in slide-in-from-top",
            )}
          >
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "flex items-center gap-3 py-3.5 px-5 rounded-2xl text-sm font-bold tracking-tight transition-all",
                    pathname === link.href
                      ? "bg-[#FDFCFB] text-[#D4AF97] shadow-sm shadow-[#D4AF97]/5"
                      : "text-[#6B6B6B] active:bg-[#FDFCFB]",
                  )}
                >
                  <link.icon className="size-4" />
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-[#F0EDE6]">
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-3.5 px-5 text-sm font-bold text-[#B95C5C] flex items-center gap-3"
                >
                  <LogOut className="size-4" /> Keluar Akun
                </button>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside
        className={cn(
          "hidden lg:flex fixed left-0 top-0 h-screen bg-white border-r border-[#F0EDE6] z-50 flex-col transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] shadow-sm",
          isCollapsed ? "w-20" : "w-72",
        )}
      >
        {/* Branding Section */}
        <div
          className={cn(
            "flex p-4 justify-start items-center h-24 transition-all duration-500",
          )}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-[#9B9B9B] hover:text-[#D4AF97] hover:bg-[#FDFCFB] rounded-xl shrink-0"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="size-5" />
            ) : (
              <PanelLeftClose className="size-5" />
            )}
          </Button>
          {!isCollapsed && (
            <Link
              href="/dashboard"
              className="font-bold text-xl tracking-tighter text-[#2C2C2C] animate-in fade-in duration-700"
            >
              Saji <span className="text-[#D4AF97]">Janji</span>
            </Link>
          )}
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center h-12 rounded-2xl transition-all group relative",
                  isActive
                    ? "bg-[#FDFCFB] text-[#D4AF97] shadow-sm"
                    : "text-[#6B6B6B] hover:bg-[#FDFCFB] hover:text-[#2C2C2C]",
                )}
              >
                <div className="w-12 flex items-center justify-center shrink-0">
                  <link.icon
                    className={cn(
                      "size-5 transition-transform duration-300",
                      isActive ? "scale-110" : "group-hover:scale-110",
                    )}
                  />
                </div>
                {!isCollapsed && (
                  <span className="font-bold text-[13px] tracking-tight animate-in fade-in slide-in-from-left-2 duration-500">
                    {link.name}
                  </span>
                )}
                {isActive && (
                  <div className="absolute left-0 w-1 h-5 bg-[#D4AF97] rounded-r-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Section (Logout) */}
        <div className="p-4 mt-auto border-t border-[#F0EDE6]">
          <button
            onClick={handleLogout}
            className="flex items-center h-12 w-full rounded-2xl text-[#B95C5C] hover:bg-red-50/50 transition-all group"
          >
            <div className="w-12 flex items-center justify-center shrink-0">
              <LogOut className="size-5 transition-transform group-hover:-translate-x-1" />
            </div>
            {!isCollapsed && (
              <span className="font-bold text-[13px] tracking-tight">
                Keluar Akun
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Spacer to push content to the right */}
      <div
        className={cn(
          "hidden lg:block transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isCollapsed ? "w-20" : "w-72",
        )}
      />
    </>
  );
}
