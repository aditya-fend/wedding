"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Heart, 
  Users, 
  Send, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  MinusCircle, 
  Clock 
} from "lucide-react";

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
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      title: "Jumlah Tamu",
      value: stats.totalGuests,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      title: "Total RSVP",
      value: stats.totalRSVP,
      icon: Send,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      title: "Total Kunjungan",
      value: stats.totalViews,
      icon: Eye,
      color: "text-indigo-500",
      bg: "bg-indigo-50",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <Card key={i} className="border-[#E5E0D8] overflow-hidden group hover:shadow-md transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#6B6B6B] mb-1">{card.title}</p>
                  <h3 className="text-2xl font-bold text-[#2C2C2C]">{card.value}</h3>
                </div>
                <div className={`${card.bg} p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className={`size-6 ${card.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Attendance Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-[#E5E0D8] bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#6B6B6B] flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-500" /> Hadir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{stats.breakdown.Hadir}</div>
          </CardContent>
        </Card>
        
        <Card className="border-[#E5E0D8] bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#6B6B6B] flex items-center gap-2">
              <XCircle className="size-4 text-rose-500" /> Tidak Hadir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">{stats.breakdown.Tidak_Hadir}</div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E0D8] bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#6B6B6B] flex items-center gap-2">
              <MinusCircle className="size-4 text-amber-500" /> Ragu-ragu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{stats.breakdown.Ragu_ragu}</div>
          </CardContent>
        </Card>

        <Card className="border-[#E5E0D8] bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-[#6B6B6B] flex items-center gap-2">
              <Clock className="size-4 text-slate-400" /> Belum Jawab
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-500">{stats.breakdown.Belum_Konfirmasi}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
