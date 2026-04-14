import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        // Modifikasi: Menggunakan rounded-xl, background putih, dan border halus (#E5E0D8)
        "flex min-h-32 w-full rounded-xl border border-[#E5E0D8] bg-white px-4 py-3 text-sm text-[#2C2C2C] leading-relaxed transition-all outline-none",
        // Placeholder styling
        "placeholder:text-[#6B6B6B]/60",
        // Focus state: Menggunakan aksen Gold khas Undang Dong
        "focus-visible:border-[#D4AF97] focus-visible:ring-2 focus-visible:ring-[#D4AF97]/20",
        // States: Disabled & Error
        "disabled:cursor-not-allowed disabled:bg-[#F0EDE6] disabled:opacity-70",
        "aria-invalid:border-[#B95C5C] aria-invalid:ring-2 aria-invalid:ring-[#B95C5C]/10",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }