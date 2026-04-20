"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex w-full bg-white outline-none transition-all",
        // Spacing & Height
        // Mengurangi min-h di mobile agar tidak terlalu "makan tempat"
        "min-h-24 md:min-h-32 rounded-xl border border-[#E5E0D8] px-4 py-3",
        // Typography: text-base (16px) di mobile sangat krusial untuk mencegah auto-zoom iOS
        "text-base md:text-sm text-[#2C2C2C] leading-relaxed",
        
        // Placeholder
        "placeholder:text-[#6B6B6B]/50",
        
        // Focus state: Efek glow yang lebih lembut (ring-4 dengan opasitas rendah)
        "focus-visible:border-[#D4AF97] focus-visible:ring-4 focus-visible:ring-[#D4AF97]/10",
        
        // Interaction
        "hover:border-[#D4AF97]/40",
        "disabled:cursor-not-allowed disabled:bg-[#F0EDE6]/50 disabled:opacity-70",
        
        // Error handling
        "aria-invalid:border-[#B95C5C] aria-invalid:ring-4 aria-invalid:ring-[#B95C5C]/5",
        
        // Menghilangkan scrollbar default di beberapa browser untuk estetika bersih
        "resize-none overflow-y-auto no-scrollbar",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }