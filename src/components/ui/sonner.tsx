"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import { CircleCheckIcon, InfoIcon, TriangleAlertIcon, OctagonXIcon, Loader2Icon } from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      // Memastikan toast muncul di tengah bawah pada mobile agar mudah dijangkau ibu jari
      position="bottom-center"
      offset={20}
      icons={{
        success: <CircleCheckIcon className="size-4 text-[#D4AF97]" />,
        info: <InfoIcon className="size-4 text-[#6B6B6B]" />,
        warning: <TriangleAlertIcon className="size-4 text-[#D4AF97]" />,
        error: <OctagonXIcon className="size-4 text-[#B95C5C]" />,
        loading: <Loader2Icon className="size-4 animate-spin text-[#D4AF97]" />,
      }}
      style={{
        "--normal-bg": "#FFFFFF",
        "--normal-text": "#2C2C2C",
        "--normal-border": "#E5E0D8",
        "--success-bg": "#FDFCFB", // Lebih soft dari F8F5F0 agar teks lebih terbaca
        "--success-text": "#2C2C2C",
        "--success-border": "#D4AF97/40",
        "--border-radius": "12px", // Sedikit lebih ramping dari 1rem untuk toast kecil
      } as React.CSSProperties}
      toastOptions={{
        classNames: {
          toast: cn(
            "group-[.toaster]:bg-white group-[.toaster]:text-[#2C2C2C] group-[.toaster]:border-[#E5E0D8]",
            "group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl md:group-[.toaster]:rounded-2xl",
            "group-[.toaster]:px-4 group-[.toaster]:py-3.5 group-[.toaster]:font-sans",
            // Mengatur lebar agar tidak overflow di layar yang sangat kecil
            "max-w-[calc(100vw-32px)] sm:max-w-[380px]"
          ),
          description: "group-[.toast]:text-[#6B6B6B] group-[.toast]:text-[11px] md:group-[.toast]:text-xs leading-tight",
          actionButton: "group-[.toast]:bg-[#D4AF97] group-[.toast]:text-[#2C2C2C] group-[.toast]:font-bold group-[.toast]:rounded-lg group-[.toast]:text-xs",
          cancelButton: "group-[.toast]:bg-[#F0EDE6] group-[.toast]:text-[#6B6B6B] group-[.toast]:rounded-lg group-[.toast]:text-xs",
          success: "group-[.toast]:border-[#D4AF97]/30 group-[.toast]:bg-[#FDFCFB]",
          error: "group-[.toast]:border-[#B95C5C]/20 group-[.toast]:bg-[#B95C5C]/5",
        },
      }}
      {...props}
    />
  )
}

// Helper untuk utility class jika belum diimport
import { cn } from "@/lib/utils"

export { Toaster }