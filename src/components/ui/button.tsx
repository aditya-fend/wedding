import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-2xl border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-[#D4AF97] active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primary: Elegant Gold (btn-primary di globals.css)
        default: 
          "bg-[#D4AF97] text-[#2C2C2C] hover:bg-[#E8C8A0] shadow-sm shadow-[#D4AF97]/20",
        // Outline: Gold Border (btn-outline di globals.css)
        outline:
          "border-[#D4AF97] bg-transparent text-[#2C2C2C] hover:bg-[#D4AF97]/10",
        // Secondary: Soft Cream untuk dashboard atau filter
        secondary:
          "bg-[#F0EDE6] text-[#2C2C2C] hover:bg-[#E5E0D8] border-[#E5E0D8]",
        // Ghost: Bersih untuk navigasi menu
        ghost:
          "text-[#6B6B6B] hover:bg-[#F0EDE6] hover:text-[#2C2C2C]",
        // Destructive: Soft Red untuk aksi hapus/cancel
        destructive:
          "bg-[#B95C5C]/10 text-[#B95C5C] hover:bg-[#B95C5C]/20 border-transparent",
        // Link: Gold Text untuk navigasi footer atau teks kecil
        link: "text-[#D4AF97] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 gap-2", // Disesuaikan agar lebih proporsional untuk tombol utama
        xs: "h-7 px-3 text-xs rounded-lg gap-1",
        sm: "h-9 px-4 text-[0.85rem] rounded-xl gap-1.5",
        lg: "h-13 px-8 text-base rounded-[1.25rem] gap-2.5",
        xl: "h-16 px-10 text-lg rounded-[1.5rem] gap-3",
        icon: "size-11",
        "icon-xs": "size-7 rounded-lg",
        "icon-sm": "size-9 rounded-xl",
        "icon-lg": "size-13 rounded-[1.25rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }