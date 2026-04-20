"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Tabs as TabsPrimitive } from "radix-ui"
import { cn } from "@/lib/utils"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-4 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex items-center justify-start md:justify-center p-1 text-[#6B6B6B]",
  {
    variants: {
      variant: {
        default: "bg-[#F0EDE6]/50 rounded-xl w-full md:w-fit overflow-x-auto no-scrollbar",
        line: "gap-6 bg-transparent border-b border-[#E5E0D8] w-full rounded-none overflow-x-auto no-scrollbar",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Base Styling & Layout
        "relative inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all outline-none select-none whitespace-nowrap",
        "text-[#6B6B6B] hover:text-[#2C2C2C] disabled:opacity-40",
        
        // Variant: Default (Capsule Style)
        "group-data-[variant=default]/tabs-list:rounded-lg",
        "group-data-[variant=default]/tabs-list:data-active:bg-white group-data-[variant=default]/tabs-list:data-active:text-[#2C2C2C] group-data-[variant=default]/tabs-list:data-active:shadow-sm",
        
        // Variant: Line (Underline Style)
        "group-data-[variant=line]/tabs-list:px-0 group-data-[variant=line]/tabs-list:pb-3",
        "group-data-[variant=line]/tabs-list:data-active:text-[#D4AF97]",
        
        // Decorative Underline for Line Variant
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:scale-x-0 after:bg-[#D4AF97] after:transition-transform after:duration-300",
        "group-data-[variant=line]/tabs-list:data-active:after:scale-x-100",
        
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      // Memberikan sedikit jarak dari navigasi tab agar konten tidak menempel
      className={cn("flex-1 pt-4 text-base md:text-sm text-[#2C2C2C] outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }