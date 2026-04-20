"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center border border-transparent bg-clip-padding text-sm font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-[#D4AF97] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primary: Elegant Gold
        default: 
          "bg-[#D4AF97] text-[#2C2C2C] hover:bg-[#E8C8A0] shadow-sm shadow-[#D4AF97]/15",
        // Outline: Gold Border
        outline:
          "border-[#D4AF97]/60 bg-transparent text-[#2C2C2C] hover:bg-[#D4AF97]/10 hover:border-[#D4AF97]",
        // Secondary: Soft Cream
        secondary:
          "bg-[#F0EDE6] text-[#2C2C2C] hover:bg-[#E5E0D8] border-[#E5E0D8]/50",
        // Ghost: Navigasi
        ghost:
          "text-[#6B6B6B] hover:bg-[#F0EDE6] hover:text-[#2C2C2C]",
        // Destructive: Soft Red
        destructive:
          "bg-[#B95C5C]/10 text-[#B95C5C] hover:bg-[#B95C5C]/20",
        // Link: Gold Text
        link: "text-[#D4AF97] underline-offset-4 hover:underline p-0 h-auto bg-transparent",
      },
      size: {
        // Ukuran default dibuat lebih ramping untuk mobile
        default: "h-10 md:h-11 px-5 md:px-6 rounded-xl md:rounded-2xl gap-2",
        xs: "h-7 px-3 text-[10px] uppercase tracking-wider rounded-lg gap-1",
        sm: "h-9 px-4 text-xs rounded-xl gap-1.5",
        lg: "h-12 md:h-13 px-7 md:px-8 text-base rounded-xl md:rounded-[1.25rem] gap-2.5",
        xl: "h-14 md:h-16 px-8 md:px-10 text-lg rounded-2xl md:rounded-[1.5rem] gap-3",
        icon: "size-10 md:size-11 rounded-xl md:rounded-2xl",
        "icon-xs": "size-7 rounded-lg",
        "icon-sm": "size-9 rounded-xl",
        "icon-lg": "size-12 md:size-13 rounded-xl md:rounded-[1.25rem]",
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