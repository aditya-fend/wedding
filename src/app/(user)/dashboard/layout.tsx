"use client"

import * as React from "react"
import { Navbar } from "@/components/user/layout/Navbar"
import { cn } from "@/lib/utils"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#F8F5F0]">
      {/* Sidebar tetap di posisi fixed */}
      <Navbar />

      {/* Main Content Area: Menggunakan flex-1 agar memenuhi sisa lebar layar */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className={cn(
          "flex-1 transition-all duration-500 ease-in-out",
          "pt-20 lg:pt-0", // Padding atas untuk mobile
          "p-4 md:p-10"    // Padding konten
        )}>
          {children}
        </div>
      </main>
    </div>
  )
}