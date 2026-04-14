import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Modifikasi: Tinggi h-11 agar senada dengan Button, rounded-xl, dan bg-white
        "flex h-11 w-full min-w-0 rounded-xl border border-[#E5E0D8] bg-white px-4 py-2 text-sm text-[#2C2C2C] transition-all outline-none",
        // File styling
        "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-[#2C2C2C]",
        // Placeholder & States
        "placeholder:text-[#6B6B6B]/60",
        "focus-visible:border-[#D4AF97] focus-visible:ring-2 focus-visible:ring-[#D4AF97]/20",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#F0EDE6] disabled:opacity-70",
        // Error handling
        "aria-invalid:border-[#B95C5C] aria-invalid:ring-2 aria-invalid:ring-[#B95C5C]/10",
        className
      )}
      {...props}
    />
  )
}

export { Input }