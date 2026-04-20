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
        "group/avatar relative flex shrink-0 rounded-full select-none",
        "after:absolute after:inset-0 after:rounded-full after:border after:border-[#E5E0D8]/60 after:mix-blend-multiply",
        // Ukuran disesuaikan: sm(24px), default(36px), lg(48px -> 56px di desktop)
        "data-[size=sm]:size-6", 
        "data-[size=default]:size-9", 
        "data-[size=lg]:size-12 md:data-[size=lg]:size-14",
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
        "flex size-full items-center justify-center rounded-full bg-[#F0EDE6] font-medium text-[#D4AF97]",
        // Skala teks adaptif terhadap ukuran avatar
        "text-xs group-data-[size=default]/avatar:text-sm group-data-[size=lg]/avatar:text-base group-data-[size=sm]/avatar:text-[10px]",
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
        "absolute right-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-[#D4AF97] text-white ring-2 ring-[#F8F5F0] select-none",
        // Ukuran badge yang lebih presisi
        "group-data-[size=sm]/avatar:size-2",
        "group-data-[size=default]/avatar:size-2.5",
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
        "group/avatar-group flex items-center -space-x-2 md:-space-x-3",
        "*:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-[#F8F5F0]",
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
        "relative flex shrink-0 items-center justify-center rounded-full bg-[#F0EDE6] border border-[#E5E0D8] text-[#6B6B6B] ring-2 ring-[#F8F5F0]",
        // Mengikuti ukuran sibling (avatar lain dalam grup)
        "size-9 text-xs font-semibold",
        "group-has-[[data-size=lg]]/avatar-group:size-12 group-has-[[data-size=lg]]/avatar-group:text-sm",
        "group-has-[[data-size=sm]]/avatar-group:size-6 group-has-[[data-size=sm]]/avatar-group:text-[10px]",
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