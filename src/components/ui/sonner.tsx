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
      icons={{
        success: (
          <CircleCheckIcon className="size-4 text-[#D4AF97]" />
        ),
        info: (
          <InfoIcon className="size-4 text-[#6B6B6B]" />
        ),
        warning: (
          <TriangleAlertIcon className="size-4 text-[#D4AF97]" />
        ),
        error: (
          <OctagonXIcon className="size-4 text-[#B95C5C]" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin text-[#D4AF97]" />
        ),
      }}
      style={
        {
          // Modifikasi: Menggunakan skema warna Undang Dong secara eksplisit
          "--normal-bg": "#FFFFFF",
          "--normal-text": "#2C2C2C",
          "--normal-border": "#E5E0D8",
          "--success-bg": "#F8F5F0",
          "--success-text": "#2C2C2C",
          "--success-border": "#D4AF97",
          "--border-radius": "1rem", // rounded-2xl
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          // Modifikasi: Styling khusus untuk toast agar senada dengan card-premium
          toast: "group-[.toaster]:bg-white group-[.toaster]:text-[#2C2C2C] group-[.toaster]:border-[#E5E0D8] group-[.toaster]:shadow-xl group-[.toaster]:rounded-2xl group-[.toaster]:px-4 group-[.toaster]:py-3 group-[.toaster]:font-sans",
          description: "group-[.toast]:text-[#6B6B6B] group-[.toast]:text-xs",
          actionButton: "group-[.toast]:bg-[#D4AF97] group-[.toast]:text-[#2C2C2C] group-[.toast]:font-semibold group-[.toast]:rounded-xl",
          cancelButton: "group-[.toast]:bg-[#F0EDE6] group-[.toast]:text-[#6B6B6B] group-[.toast]:rounded-xl",
          success: "group-[.toast]:border-[#D4AF97] group-[.toast]:bg-[#F8F5F0]",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }