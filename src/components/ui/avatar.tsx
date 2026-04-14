"use client"

import * as React from "react"
import { Avatar as AvatarPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root> & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      data-size={size}
      className={cn(
        // Modifikasi: border disesuaikan ke warna --border (#E5E0D8) agar lebih halus
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-[#E5E0D8] after:mix-blend-multiply data-[size=lg]:size-12 data-[size=sm]:size-6",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn(
        "aspect-square size-full rounded-full object-cover",
        className
      )}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        // Modifikasi: bg menggunakan --muted (#F0EDE6) dan text menggunakan --primary (Gold)
        "flex size-full items-center justify-center rounded-full bg-[#F0EDE6] text-sm font-medium text-[#D4AF97] group-data-[size=sm]/avatar:text-[10px]",
        className
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="avatar-badge"
      className={cn(
        // Modifikasi: Badge menggunakan warna Gold khas Undang Dong
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-[#D4AF97] text-white ring-2 ring-[#F8F5F0] select-none",
        "group-data-[size=sm]/avatar:size-2",
        "group-data-[size=default]/avatar:size-3",
        "group-data-[size=lg]/avatar:size-3.5",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group"
      className={cn(
        // Modifikasi: Ring antar avatar menggunakan warna background Cream
        "group/avatar-group flex -space-x-3 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-[#F8F5F0]",
        className
      )}
      {...props}
    />
  )
}

function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="avatar-group-count"
      className={cn(
        // Modifikasi: Background disesuaikan dengan skema warna kartu premium
        "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F0EDE6] border border-[#E5E0D8] text-xs font-semibold text-[#6B6B6B] ring-2 ring-[#F8F5F0] group-has-data-[size=lg]/avatar-group:size-12 group-has-data-[size=sm]/avatar-group:size-6",
        className
      )}
      {...props}
    />
  )
}

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarBadge,
}