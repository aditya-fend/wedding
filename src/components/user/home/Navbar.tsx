// components/home/Navbar.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Menangani efek blur saat scroll agar lebih dinamis
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Fitur", href: "#fitur" },
    { name: "Template", href: "#template" },
    { name: "Harga", href: "#harga" },
    { name: "Testimoni", href: "#testimoni" },
  ];

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/80 backdrop-blur-lg border-[#E5E0D8] py-3" 
          : "bg-transparent border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 group">
          <span className="font-bold text-xl tracking-tighter text-[#2C2C2C]">
            Undang<span className="text-[#D4AF97] group-hover:text-[#B99575] transition-colors">Dong</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              className="text-sm font-medium text-[#6B6B6B] hover:text-[#D4AF97] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/masuk">
            <Button
              variant="ghost"
              className="text-[#2C2C2C] hover:bg-[#F0EDE6] rounded-xl px-5"
            >
              Masuk
            </Button>
          </Link>
          <Link href="/daftar">
            <Button className="bg-[#D4AF97] hover:bg-[#B99575] text-white shadow-md shadow-[#D4AF97]/20 rounded-xl px-6">
              Daftar Gratis
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#2C2C2C] p-2 hover:bg-[#F0EDE6] rounded-lg transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={cn(
          "absolute top-full left-0 right-0 bg-white border-b border-[#E5E0D8] p-6 lg:hidden transition-all duration-300 origin-top",
          isOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-95 invisible"
        )}
      >
        <div className="flex flex-col gap-5">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-base font-medium text-[#2C2C2C] py-2 border-b border-[#F0EDE6]/50 last:border-0"
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex flex-col gap-3 pt-2">
            <Link href="/masuk" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full h-12 border-[#D4AF97] text-[#2C2C2C] rounded-xl">
                Masuk
              </Button>
            </Link>
            <Link href="/daftar" onClick={() => setIsOpen(false)}>
              <Button className="w-full h-12 bg-[#D4AF97] hover:bg-[#B99575] text-white rounded-xl">
                Daftar Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}