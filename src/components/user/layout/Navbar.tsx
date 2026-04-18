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
  LayoutTemplate,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Undangan", href: "/dashboard/undangan", icon: Heart },
  { name: "RSVP", href: "/dashboard/rsvp", icon: Users },
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
    router.push("/masuk");
  };

  const closeMobileMenu = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsMobileOpen(false);
      setIsExiting(false);
    }, 300);
  };

  const toggleMobileMenu = () => {
    if (isMobileOpen) {
      closeMobileMenu();
    } else {
      setIsMobileOpen(true);
    }
  };

  return (
    <>
      {/* MOBILE NAVBAR (TOP) */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-[#E5E0D8] z-[60] px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#D4AF97] p-1.5 rounded-lg">
            <Heart className="size-5 text-white fill-current" />
          </div>
          <span className="font-bold text-[#2C2C2C] tracking-tight">
            Undang Dong
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          className="text-[#2C2C2C]"
        >
          {isMobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </Button>
      </header>

      {/* MOBILE OVERLAY MENU */}
      {isMobileOpen && (
        <>
          <div
            className={cn(
              "lg:hidden fixed inset-0 bg-black/20 z-[50] transition-opacity duration-300",
              isExiting ? "opacity-0" : "opacity-100 animate-in fade-in",
            )}
            onClick={closeMobileMenu}
          />
          <div
            className={cn(
              "lg:hidden fixed top-16 left-0 right-0 bg-white z-[55] border-b border-[#E5E0D8] p-6 shadow-xl rounded-b-3xl transition-transform duration-300 ease-in-out",
              isExiting
                ? "translate-y-[-100%] animate-out slide-out-to-top"
                : "translate-y-0 animate-in slide-in-from-top",
            )}
          >
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={cn(
                    "block py-3 px-4 rounded-xl text-base font-medium transition-colors",
                    pathname === link.href
                      ? "bg-[#F8F5F0] text-[#D4AF97]"
                      : "text-[#6B6B6B] active:bg-[#F0EDE6]",
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-[#F0EDE6]">
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-3 px-4 text-base font-medium text-[#B95C5C] flex items-center gap-2"
                >
                  <LogOut className="size-5" /> Keluar
                </button>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside
        className={cn(
          "hidden lg:flex fixed left-0 top-0 h-screen bg-white border-r border-[#E5E0D8] z-50 flex-col overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isCollapsed ? "w-20" : "w-64",
        )}
      >
        {/* Toggle & Branding Section */}
        <div className="p-4 flex items-center h-20 shrink-0 overflow-hidden">
          <div className="w-12 flex items-center justify-center shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-[#6B6B6B] hover:text-[#D4AF97] hover:bg-[#F8F5F0]"
            >
              {isCollapsed ? <PanelLeftOpen className="size-6" /> : <PanelLeftClose className="size-6" />}
            </Button>
          </div>
          <span
            className={cn(
              "font-bold text-lg text-[#2C2C2C] tracking-tight whitespace-nowrap transition-all duration-500 ml-2",
              isCollapsed ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0",
            )}
          >
            Undang Dong
          </span>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto overflow-x-hidden">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center h-12 rounded-xl transition-all group overflow-hidden",
                  isActive
                    ? "bg-[#F8F5F0] text-[#D4AF97]"
                    : "text-[#6B6B6B] hover:bg-[#F0EDE6]/50 hover:text-[#2C2C2C]",
                )}
              >
                {/* Ikon Wrapper dengan lebar tetap agar sejajar tengah */}
                <div className="w-14 flex items-center justify-center shrink-0">
                  <link.icon
                    className={cn(
                      "size-5 transition-transform duration-300",
                      isActive ? "text-[#D4AF97]" : "text-[#6B6B6B]",
                      !isCollapsed && "group-hover:scale-110",
                    )}
                  />
                </div>
                {/* Label dengan margin-left agar tidak menempel ke ikon */}
                <span
                  className={cn(
                    "font-medium text-sm whitespace-nowrap transition-all duration-500",
                    isCollapsed ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0",
                  )}
                >
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="p-3 border-t border-[#E5E0D8]">
          <button
            onClick={handleLogout}
            className="flex items-center h-12 w-full rounded-xl text-[#B95C5C] hover:bg-red-50 transition-all group overflow-hidden"
          >
            <div className="w-14 flex items-center justify-center shrink-0">
              <LogOut className="size-5" />
            </div>
            <span
              className={cn(
                "font-medium text-sm whitespace-nowrap transition-all duration-500",
                isCollapsed ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0",
              )}
            >
              Keluar Akun
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Spacer */}
      <div
        className={cn(
          "hidden lg:block transition-[width] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
          isCollapsed ? "w-20" : "w-64",
        )}
      />
    </>
  );
}