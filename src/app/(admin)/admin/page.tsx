"use client";

import { useEffect, useState } from "react";
import {
  Users,
  Coins,
  TrendingUp,
  UserCheck,
  UserX,
  Clock,
  Ticket,
  TicketCheck,
  ArrowUpRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Stats {
  totalUsers: number;
  activeUsers: number;
  pendingUsers: number;
  suspendedUsers: number;
  totalTokens: number;
  usedTokens: number;
  unusedTokens: number;
  totalInvitations: number;
}

interface RecentUser {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      setStats(data.stats);
      setRecentUsers(data.recentUsers || []);
    } catch {
      console.error("Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] animate-pulse">Syncing Terminal...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      label: "Total Entities",
      value: stats?.totalUsers ?? 0,
      icon: Users,
      accent: "cyan",
      textColor: "text-cyan-400",
    },
    {
      label: "Operational",
      value: stats?.activeUsers ?? 0,
      icon: UserCheck,
      accent: "emerald",
      textColor: "text-emerald-400",
    },
    {
      label: "Awaiting Sync",
      value: stats?.pendingUsers ?? 0,
      icon: Clock,
      accent: "amber",
      textColor: "text-amber-400",
    },
    {
      label: "Terminated",
      value: stats?.suspendedUsers ?? 0,
      icon: UserX,
      accent: "rose",
      textColor: "text-rose-400",
    },
    {
      label: "Asset Registry",
      value: stats?.totalTokens ?? 0,
      icon: Coins,
      accent: "violet",
      textColor: "text-violet-400",
    },
    {
      label: "Active Keys",
      value: stats?.usedTokens ?? 0,
      icon: TicketCheck,
      accent: "blue",
      textColor: "text-blue-400",
    },
    {
      label: "Void Keys",
      value: stats?.unusedTokens ?? 0,
      icon: Ticket,
      accent: "slate",
      textColor: "text-slate-400",
    },
    {
      label: "Total Assets",
      value: stats?.totalInvitations ?? 0,
      icon: TicketCheck,
      accent: "cyan",
      textColor: "text-cyan-400",
    },
  ];

  const statusBadge = (status: string) => {
    const map: Record<string, string> = {
      active: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
      pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
      suspended: "bg-rose-500/10 text-rose-500 border-rose-500/20",
    };
    const labelMap: Record<string, string> = {
      active: "OPERATIONAL",
      pending: "SYNCING",
      suspended: "PURGED",
    };
    return (
      <span
        className={cn(
          "inline-flex items-center px-4 py-1.5 text-[8px] font-black border uppercase tracking-[0.2em]",
          map[status] ?? "bg-slate-500/10 text-slate-400 border-slate-500/20"
        )}
      >
        {labelMap[status] ?? status}
      </span>
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col gap-2 border-b border-white/5 pb-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-1 w-8 bg-cyan-500 rounded-full" />
          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Operational Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter italic uppercase flex items-center gap-4 group">
          Terminal Overview
          <TrendingUp className="text-cyan-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={28} />
        </h1>
        <p className="text-slate-500 mt-2 font-mono text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
          <span className="h-1 w-1 bg-emerald-500 rounded-full animate-pulse" />
          Systems: Online / Secure / Encrypted
        </p>
      </div>

      {/* Stats Matrix Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="bg-slate-950 border border-white/10 p-6 relative overflow-hidden group hover:border-white/20 transition-colors duration-500"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 bg-slate-900 border border-white/5 group-hover:border-white/20 transition-all">
                <card.icon size={18} className={card.textColor} />
              </div>
              <div className="h-1 w-4 bg-slate-800" />
            </div>
            <p className="text-3xl font-black text-white tracking-tighter mb-2">{card.value.toLocaleString()}</p>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover:text-slate-300 transition-colors">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Core Activity + Intel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Registry Feed */}
        <div className="lg:col-span-2 bg-slate-950 border border-white/10 overflow-hidden">
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-slate-900/50">
            <div>
                <span className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.3em] block mb-1">Live Feed</span>
                <h2 className="font-black text-white uppercase italic tracking-tighter">Entity Registry</h2>
            </div>
            <Link
              href="/admin/pengguna"
              className="px-4 py-2 bg-white/5 text-[9px] font-black text-slate-400 hover:text-white border border-white/5 hover:bg-white/10 transition-all uppercase tracking-widest flex items-center gap-2"
            >
              Browse Registry
              <ArrowUpRight size={12} />
            </Link>
          </div>
          <div className="divide-y divide-white/[0.02]">
            {recentUsers.length === 0 ? (
              <div className="py-24 text-center text-slate-700 italic text-[10px] font-black uppercase tracking-[0.4em]">
                Void Stream - Awaiting Signal
              </div>
            ) : (
              recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between px-8 py-5 hover:bg-cyan-500/[0.02] transition-colors group border-l-2 border-transparent hover:border-cyan-500"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="h-10 w-10 bg-slate-900 border border-white/10 flex items-center justify-center text-cyan-500 font-black text-xs uppercase">
                      {user.name?.charAt(0) || "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">
                        {user.name}
                      </p>
                      <p className="text-[9px] font-mono text-slate-500 mt-1">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 shrink-0">
                    {statusBadge(user.status)}
                    <span className="text-[9px] font-mono text-slate-700 hidden sm:inline uppercase">
                      {new Date(user.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Command Controls */}
        <div className="space-y-8">
          <div className="bg-slate-950 border border-white/10 p-8">
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] block mb-6">Command Link</span>
            <div className="space-y-3">
              <Link
                href="/admin/pengguna"
                className="flex items-center gap-4 px-6 py-5 bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-cyan-500/30 transition-all group"
              >
                <div className="p-2 bg-slate-950 border border-white/5 group-hover:border-cyan-500/20">
                    <Users size={16} className="text-cyan-400" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Identity Manager</span>
              </Link>
              <Link
                href="/admin/token"
                className="flex items-center gap-4 px-6 py-5 bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-violet-500/30 transition-all group"
              >
                <div className="p-2 bg-slate-950 border border-white/5 group-hover:border-violet-500/20">
                    <Coins size={16} className="text-violet-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Asset Forge</span>
              </Link>
            </div>
          </div>

          {/* Efficiency Analytics */}
          <div className="bg-slate-950 border border-white/10 p-8 relative overflow-hidden group">
            <div className="absolute top-0 right-0 h-40 w-40 bg-cyan-500/5 blur-[80px] group-hover:bg-cyan-500/10 transition-colors" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] block mb-8">System Analytics</span>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Retention Core</span>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">
                    {stats && stats.totalUsers > 0 ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-[3px] bg-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.8)] transition-all duration-1000"
                    style={{ width: `${stats && stats.totalUsers > 0 ? (stats.activeUsers / stats.totalUsers) * 100 : 0}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Efficiency Index</span>
                  <span className="text-[10px] font-mono text-violet-400 font-bold">
                    {stats && stats.totalTokens > 0 ? Math.round((stats.usedTokens / stats.totalTokens) * 100) : 0}%
                  </span>
                </div>
                <div className="w-full h-[3px] bg-slate-900 overflow-hidden">
                  <div
                    className="h-full bg-violet-500 shadow-[0_0_15px_rgba(167,139,250,0.8)] transition-all duration-1000"
                    style={{ width: `${stats && stats.totalTokens > 0 ? (stats.usedTokens / stats.totalTokens) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_#10b981]" />
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Operational: Nominal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
