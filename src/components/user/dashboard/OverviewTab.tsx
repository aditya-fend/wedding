"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Users,
  Send,
  Eye,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface OverviewStats {
  activeInvitationsCount: number;
  totalViews: number;
  totalRSVP: number;
  totalGuests: number;
  breakdown: {
    Hadir: number;
    Tidak_Hadir: number;
    Ragu_ragu: number;
    Belum_Konfirmasi: number;
  };
}

export function OverviewTab({ stats }: { stats: OverviewStats }) {
  const cards = [
    {
      title: "Undangan Aktif",
      value: stats.activeInvitationsCount,
      icon: Heart,
      color: "text-[#D4AF97]",
      bg: "bg-[#D4AF97]/10",
      description: "Kampanye berjalan",
    },
    {
      title: "Jumlah Tamu",
      value: stats.totalGuests,
      icon: Users,
      color: "text-[#6B6B6B]",
      bg: "bg-[#FDFCFB]",
      description: "Total dalam database",
    },
    {
      title: "Total RSVP",
      value: stats.totalRSVP,
      icon: Send,
      color: "text-[#D4AF97]",
      bg: "bg-[#D4AF97]/10",
      description: "Tanggapan login",
    },
    {
      title: "Total Kunjungan",
      value: stats.totalViews,
      icon: Eye,
      color: "text-[#6B6B6B]",
      bg: "bg-[#FDFCFB]",
      description: "Analitik pengunjung",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Section Header */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#2C2C2C]">
            Ringkasan Data
          </h2>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#9B9B9B] mt-1">
            Real-time Performance Metrics
          </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {cards.map((card, i) => (
          <Card
            key={i}
            className="border-[#F0EDE6] rounded-[2rem] overflow-hidden group hover:shadow-xl hover:shadow-[#D4AF97]/5 transition-all duration-500 bg-white"
          >
            <CardContent className="p-7">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div
                    className={cn(
                      "p-3 rounded-2xl transition-all duration-500 group-hover:scale-110",
                      card.bg,
                    )}
                  >
                    <card.icon className={cn("size-5", card.color)} />
                  </div>
                  <ArrowUpRight className="size-4 text-[#E5E0D8] group-hover:text-[#D4AF97] transition-colors" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-[#2C2C2C] tracking-tighter">
                    {card.value}
                  </h3>
                  <p className="text-[11px] font-bold text-[#9B9B9B] uppercase tracking-widest mt-1">
                    {card.title}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Attendance Breakdown Section */}
      <div className="space-y-4">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#9B9B9B]">
          Status Konfirmasi Tamu
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "Hadir",
              val: stats.breakdown.Hadir,
              icon: CheckCircle2,
              color: "text-emerald-500",
              bg: "bg-emerald-50/50",
            },
            {
              label: "Tidak Hadir",
              val: stats.breakdown.Tidak_Hadir,
              icon: XCircle,
              color: "text-rose-500",
              bg: "bg-rose-50/50",
            },
            {
              label: "Ragu-ragu",
              val: stats.breakdown.Ragu_ragu,
              icon: MinusCircle,
              color: "text-amber-500",
              bg: "bg-amber-50/50",
            },
            {
              label: "Belum Jawab",
              val: stats.breakdown.Belum_Konfirmasi,
              icon: Clock,
              color: "text-slate-400",
              bg: "bg-slate-50/50",
            },
          ].map((item, idx) => (
            <Card
              key={idx}
              className="border-[#F0EDE6] bg-[#FDFCFB]/50 rounded-[1.5rem] shadow-none"
            >
              <CardContent className="p-5 flex flex-col items-center text-center gap-2">
                <item.icon className={cn("size-5", item.color)} />
                <div className="text-xl font-bold text-[#2C2C2C]">
                  {item.val}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-tighter text-[#9B9B9B]">
                  {item.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
