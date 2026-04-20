"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      // Perbaikan: Shadow halus dan rounded agar kontainer tabel terlihat seperti kartu premium
      className="relative w-full overflow-x-auto rounded-xl border border-[#E5E0D8] bg-white shadow-sm"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm text-[#2C2C2C]", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      // Header menggunakan background cream sangat tipis agar hirarki jelas
      className={cn("bg-[#F0EDE6]/30 [&_tr]:border-b border-[#E5E0D8]", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-[#E5E0D8] bg-[#F0EDE6]/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-[#E5E0D8] transition-colors hover:bg-[#F0EDE6]/20 data-[state=selected]:bg-[#F0EDE6]/40",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        // Padding lebih lega (px-4) agar teks tidak menempel ke garis
        "h-12 px-4 text-left align-middle font-bold uppercase text-[11px] tracking-widest text-[#6B6B6B] whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        // Responsivitas: text-base di mobile (mudah dibaca), text-sm di desktop
        "p-4 align-middle text-base md:text-sm whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("p-4 text-xs italic text-[#6B6B6B]/80", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}