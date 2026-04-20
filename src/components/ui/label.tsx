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
        // Tipografi: Menggunakan font-medium agar tidak terlalu berat dibanding Input
        "flex items-center gap-2 text-[13px] leading-none font-medium text-[#2C2C2C] select-none",
        
        // Memastikan label tidak "berantakan" jika teksnya panjang di mobile
        "tracking-tight antialiased",

        // States
        "group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        
        // Menghilangkan mb-1.5 statis agar tidak merusak layout Checkbox/Radio
        // Gunakan spacing pada parent container (misal: space-y-2)
        className
      )}
      {...props}
    />
  )
}

export { Label }