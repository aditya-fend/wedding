// components/home/Navbar.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#E5E0D8] bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <span className="font-semibold text-xl tracking-tighter text-[#2C2C2C]">
            Undang<span className="text-[#D4AF97]">Dong</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-[#2C2C2C]">
          <a href="#fitur" className="hover:text-[#D4AF97] transition-colors">Fitur</a>
          <a href="#template" className="hover:text-[#D4AF97] transition-colors">Template</a>
          <a href="#harga" className="hover:text-[#D4AF97] transition-colors">Harga</a>
          <a href="#testimoni" className="hover:text-[#D4AF97] transition-colors">Testimoni</a>
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">

            <Link href="/masuk" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="btn-primary px-6 py-3 rounded-md border-[#D4AF97] text-[#2C2C2C] hover:bg-white w-full bg-white/50 backdrop-blur-sm"
              >
                Masuk
              </Button>
            </Link>

            <Link href="/daftar" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="px-6 py-3 rounded-md font-medium w-full flex items-center justify-center gap-3 group"
              >
                Buat Undangan
              </Button>
            </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#2C2C2C] p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6h12v12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-[#E5E0D8] bg-white py-6 px-6">
          <div className="flex flex-col gap-6 text-sm text-[#2C2C2C]">
            <a href="#fitur" className="hover:text-[#D4AF97]">Fitur</a>
            <a href="#template" className="hover:text-[#D4AF97]">Template</a>
            <a href="#harga" className="hover:text-[#D4AF97]">Harga</a>
            <a href="#testimoni" className="hover:text-[#D4AF97]">Testimoni</a>

            <div className="pt-6 border-t border-[#E5E0D8] flex flex-col gap-3">
            <Link href="/masuk" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="btn-primary px-6 py-3 rounded-md border-[#D4AF97] text-[#2C2C2C] hover:bg-white w-full bg-white/50 backdrop-blur-sm"
              >
                Masuk
              </Button>
            </Link>

            <Link href="/daftar" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="px-6 py-3 rounded-md font-medium w-full flex items-center justify-center gap-3 group"
              >
                Daftar
              </Button>
            </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}