"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  // Base: Menghapus font-bold agar lebih bersih, menggunakan font-semibold
  // Menambahkan h-auto agar padding lebih fleksibel dan tidak "gepeng"
  "group/badge inline-flex items-center justify-center gap-1.5 overflow-hidden rounded-full border border-transparent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-[#D4AF97] [&>svg]:pointer-events-none [&>svg]:size-3 shrink-0",
  {
    variants: {
      variant: {
        // Primary: Elegant Gold
        default: 
          "bg-[#D4AF97] text-[#2C2C2C] shadow-sm hover:bg-[#E8C8A0] active:scale-95",
        // Secondary: Soft Cream
        secondary:
          "bg-[#F0EDE6] text-[#6B6B6B] border-[#E5E0D8] hover:bg-[#E5E0D8] active:scale-95",
        // Destructive: Soft Red (Dibuat lebih lembut agar tidak menusuk mata)
        destructive:
          "bg-[#B95C5C]/8 text-[#B95C5C] border-[#B95C5C]/20 hover:bg-[#B95C5C]/15 active:scale-95",
        // Outline: Minimalis
        outline:
          "border-[#D4AF97]/50 text-[#D4AF97] bg-transparent hover:bg-[#D4AF97]/5 active:scale-95",
        // Ghost: Filter dashboard
        ghost:
          "text-[#6B6B6B] hover:bg-[#F0EDE6] hover:text-[#2C2C2C] active:scale-95",
        // Link
        link: "text-[#D4AF97] underline-offset-4 hover:underline font-semibold p-0 h-auto bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }