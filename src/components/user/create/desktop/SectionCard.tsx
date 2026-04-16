"use client";

import { ChevronDown, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionCardProps {
  title: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export function SectionCard({
  title,
  icon: Icon,
  isActive,
  onClick,
  children,
}: SectionCardProps) {
  return (
    <div
      className={cn(
        "border rounded-2xl transition-all duration-300 overflow-hidden bg-white shadow-md",
      )}
    >
      {/* Header Card */}
      <button
        onClick={onClick}
        className="w-full p-4 flex items-center justify-between hover:bg-white/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={cn("p-2 rounded-lg bg-[#F8F5F0] text-[#D4AF97]")}>
            <Icon size={18} />
          </div>
          <span
            className={cn(
              "text-xs font-black uppercase tracking-tight",
              isActive ? "text-slate-800" : "text-slate-500",
            )}
          >
            {title}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform text-slate-400",
            isActive && "rotate-180",
          )}
        />
      </button>

      {/* Area Input (Hanya muncul jika aktif) */}
      {isActive && (
        <div className="p-5 pt-0 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-300">
          <div className="h-px bg-slate-100 mb-2" />
          {children}
        </div>
      )}
    </div>
  );
}
