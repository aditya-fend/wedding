"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 transition-opacity",
        // Menggunakan warna tema dengan opasitas yang lebih dinamis
        // Opasitas 60% memberikan kesan 'invisible until noticed' yang sangat mewah
        "bg-[#E5E0D8]/60",
        // Logic dimensi
        "data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        // Menambahkan margin otomatis yang aman untuk mobile agar tidak sesak
        "data-[orientation=horizontal]:my-4 md:data-[orientation=horizontal]:my-6",
        className
      )}
      {...props}
    />
  )
}

export { Separator }