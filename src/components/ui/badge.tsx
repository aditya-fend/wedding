import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-[#D4AF97] [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        // Primary: Elegant Gold untuk status aktif/premium
        default: 
          "bg-[#D4AF97] text-[#2C2C2C] shadow-sm [a]:hover:bg-[#E8C8A0]",
        // Secondary: Soft Cream untuk status pending atau netral
        secondary:
          "bg-[#F0EDE6] text-[#6B6B6B] border-[#E5E0D8] [a]:hover:bg-[#E5E0D8]",
        // Destructive: Soft Red untuk error atau suspended
        destructive:
          "bg-[#B95C5C]/10 text-[#B95C5C] border-[#B95C5C]/20 [a]:hover:bg-[#B95C5C]/20",
        // Outline: Tipis dan minimalis untuk kategori template
        outline:
          "border-[#D4AF97] text-[#D4AF97] bg-transparent [a]:hover:bg-[#D4AF97]/10",
        // Ghost: Tanpa background untuk filter dashboard
        ghost:
          "text-[#6B6B6B] hover:bg-[#F0EDE6] hover:text-[#2C2C2C]",
        // Link: Untuk navigasi slug atau preview link
        link: "text-[#D4AF97] underline-offset-4 hover:underline font-semibold",
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