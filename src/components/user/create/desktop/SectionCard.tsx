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
        "border transition-all duration-500 rounded-[2rem] overflow-hidden",
        isActive 
          ? "bg-white border-[#D4AF97]/30 shadow-xl shadow-[#D4AF97]/5 ring-1 ring-[#D4AF97]/10" 
          : "bg-[#FDFCFB]/50 border-[#F0EDE6] shadow-sm hover:border-[#D4AF97]/20"
      )}
    >
      {/* Header Card */}
      <button
        onClick={onClick}
        className={cn(
          "w-full p-5 flex items-center justify-between transition-all duration-300",
          isActive ? "bg-white" : "hover:bg-white"
        )}
      >
        <div className="flex items-center gap-4">
          <div className={cn(
            "p-2.5 rounded-2xl transition-all duration-500",
            isActive 
              ? "bg-[#D4AF97] text-white shadow-lg shadow-[#D4AF97]/20 scale-110" 
              : "bg-white border border-[#F0EDE6] text-[#9B9B9B]"
          )}>
            <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
          </div>
          <div className="flex flex-col items-start text-left">
            <span
              className={cn(
                "text-[10px] font-black uppercase tracking-[0.2em] transition-colors duration-300",
                isActive ? "text-[#D4AF97]" : "text-[#9B9B9B]",
              )}
            >
              Konfigurasi
            </span>
            <span
              className={cn(
                "text-sm font-black tracking-tight transition-colors duration-300",
                isActive ? "text-[#2C2C2C]" : "text-[#6B6B6B]",
              )}
            >
              {title}
            </span>
          </div>
        </div>
        
        <div className={cn(
          "p-2 rounded-full transition-all duration-300",
          isActive ? "bg-[#FDFCFB] text-[#D4AF97]" : "text-[#9B9B9B]"
        )}>
          <ChevronDown
            size={16}
            className={cn(
              "transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
              isActive && "rotate-180",
            )}
          />
        </div>
      </button>

      {/* Area Content */}
      <div 
        className={cn(
          "grid transition-all duration-500 ease-in-out",
          isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-6 pt-2 flex flex-col gap-5 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="h-px bg-gradient-to-r from-[#F0EDE6] via-[#F0EDE6] to-transparent mb-2" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}