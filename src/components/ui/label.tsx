"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        // Modifikasi: Menggunakan warna foreground gelap yang elegan dan font semi-bold
        "flex items-center gap-2 text-[13px] leading-none font-semibold text-[#2C2C2C] tracking-tight select-none",
        // States
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        // Modifikasi: Memberikan sedikit margin bawah secara default jika digunakan di atas input
        "mb-1.5",
        className
      )}
      {...props}
    />
  )
}

export { Label }