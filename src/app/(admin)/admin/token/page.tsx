"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Coins,
  Search,
  Edit3,
  Trash2,
  Copy,
  Check,
  X,
  Loader2,
  ChevronDown,
  AlertTriangle,
  Ticket,
  Package,
  Hash,
  User,
} from "lucide-react";
import { toast } from "sonner";

interface TokenUser {
  id: string;
  name: string;
  email: string;
}

interface TokenData {
  id: string;
  tokenCode: string;
  packageType: string;
  isUsed: boolean;
  createdAt: string;
  userId: string | null;
  user: TokenUser | null;
}

export default function TokenPage() {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedToken, setSelectedToken] = useState<TokenData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterPackage, setFilterPackage] = useState<string>("all");

  const [editForm, setEditForm] = useState({
    packageType: "Basic",
    isUsed: false,
    userId: "",
  });

  const fetchTokens = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/tokens");
      const data = await res.json();
      setTokens(data.tokens || []);
    } catch {
      toast.error("Gagal memuat data token");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedToken) return;
    setFormLoading(true);
    try {
      const res = await fetch(`/api/admin/tokens/${selectedToken.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageType: editForm.packageType,
          isUsed: editForm.isUsed,
          userId: editForm.userId || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal mengupdate token");
        return;
      }
      toast.success("Token berhasil diupdate!");
      setShowEditModal(false);
      fetchTokens();
    } catch {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedToken) return;
    setFormLoading(true);
    try {
      const res = await fetch(`/api/admin/tokens/${selectedToken.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal menghapus token");
        return;
      }
      toast.success("Token berhasil dihapus!");
      setShowDeleteModal(false);
      setSelectedToken(null);
      fetchTokens();
    } catch {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setFormLoading(false);
    }
  };

  const copyTokenCode = (token: TokenData) => {
    navigator.clipboard.writeText(token.tokenCode);
    setCopiedId(token.id);
    toast.success("Kode token berhasil disalin!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openEditModal = (token: TokenData) => {
    setSelectedToken(token);
    setEditForm({
      packageType: token.packageType,
      isUsed: token.isUsed,
      userId: token.userId || "",
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (token: TokenData) => {
    setSelectedToken(token);
    setShowDeleteModal(true);
  };

  const filteredTokens = tokens.filter((token) => {
    const matchesSearch =
      token.tokenCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.user?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "used" && token.isUsed) ||
      (filterStatus === "unused" && !token.isUsed);
    const matchesPackage =
      filterPackage === "all" || token.packageType === filterPackage;
    return matchesSearch && matchesStatus && matchesPackage;
  });

  const packageBadge = (pkg: string) => {
    const map: Record<string, string> = {
      Basic: "bg-slate-500/5 text-slate-400 border-slate-500/10",
      Premium: "bg-violet-500/10 text-violet-400 border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]",
      Exclusive: "bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
    };
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-sm text-[9px] font-black border uppercase tracking-[0.2em] ${map[pkg] ?? "bg-slate-500/5 text-slate-400 border-slate-500/10"}`}
      >
        {pkg}
      </span>
    );
  };

  const usageBadge = (isUsed: boolean) => {
    return isUsed ? (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[9px] font-black bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-[0.2em]">
        <div className="h-1 w-1 rounded-full bg-rose-500 animate-pulse" />
        Consumed
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[9px] font-black bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-[0.2em] shadow-[0_0_15px_rgba(6,182,212,0.1)]">
        <div className="h-1 w-1 rounded-full bg-cyan-500" />
        Standby
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-2 border-b-2 border-cyan-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-8 w-8 text-cyan-500/50 animate-pulse" />
          </div>
          <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] whitespace-nowrap">
            Fetching Auth Nodes
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-1 w-8 bg-cyan-500 rounded-full" />
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Security Layer</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter flex items-center gap-4 italic uppercase">
            Token Control
          </h1>
          <p className="text-slate-500 mt-2 font-mono text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="h-1 w-1 bg-slate-700 rounded-full" />
            Active Protocols: {tokens.length}
            <span className="ml-2 h-1 w-1 bg-slate-700 rounded-full" />
            Vailable Sectors: {tokens.filter((t) => !t.isUsed).length}
          </p>
        </div>
      </div>

      {/* Filter Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative group">
          <Search
            size={14}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors"
          />
          <input
            type="text"
            placeholder="FILTER BY HASH..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/5 rounded-none focus:border-cyan-500/50 outline-none transition-all text-[10px] font-black text-white placeholder:text-slate-600 tracking-widest uppercase"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="w-full appearance-none px-6 py-4 bg-slate-900/50 border border-white/5 rounded-none outline-none transition-all text-[10px] font-black text-slate-400 tracking-widest uppercase cursor-pointer hover:border-white/10"
          >
            <option value="all">Global Status</option>
            <option value="used">Occupied</option>
            <option value="unused">Standby</option>
          </select>
          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
        </div>
        <div className="relative">
          <select
            value={filterPackage}
            onChange={(e) => setFilterPackage(e.target.value)}
            className="w-full appearance-none px-6 py-4 bg-slate-900/50 border border-white/5 rounded-none outline-none transition-all text-[10px] font-black text-slate-400 tracking-widest uppercase cursor-pointer hover:border-white/10"
          >
            <option value="all">All Service Tiers</option>
            <option value="Basic">Basic</option>
            <option value="Premium">Premium</option>
            <option value="Exclusive">Exclusive</option>
          </select>
          <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
        </div>
      </div>

      {/* Tech Table Component */}
      <div className="bg-slate-950 border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-8 py-6">
                  ID Hash
                </th>
                <th className="text-left text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-4 py-6">
                  Protocol Tier
                </th>
                <th className="text-left text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-4 py-6">
                  Operational Status
                </th>
                <th className="text-left text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-4 py-6">
                  Linked Identity
                </th>
                <th className="text-left text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-4 py-6">
                  Sys Timestamp
                </th>
                <th className="text-right text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-8 py-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {filteredTokens.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-32">
                    <div className="flex flex-col items-center gap-4">
                      <Ticket size={40} className="text-slate-800 animate-pulse" />
                      <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Void Registry</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredTokens.map((token) => (
                  <tr
                    key={token.id}
                    className="hover:bg-cyan-500/[0.02] transition-colors group/row border-l-2 border-transparent hover:border-cyan-500"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-2 w-2 bg-slate-800 rounded-full group-hover/row:bg-cyan-500 transition-colors" />
                        <code className="text-xs font-mono font-black text-white tracking-widest">
                          {token.tokenCode}
                        </code>
                      </div>
                    </td>
                    <td className="px-4 py-6">
                      {packageBadge(token.packageType)}
                    </td>
                    <td className="px-4 py-6">{usageBadge(token.isUsed)}</td>
                    <td className="px-4 py-6">
                      {token.user ? (
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">{token.user.name}</span>
                          <span className="text-[9px] font-mono text-slate-500">{token.user.email}</span>
                        </div>
                      ) : (
                        <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest italic">-- Unlinked --</span>
                      )}
                    </td>
                    <td className="px-4 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          {new Date(token.createdAt).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
                        </span>
                        <span className="text-[8px] font-mono text-slate-600">
                          {new Date(token.createdAt).getFullYear()}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        onClick={() => openDeleteModal(token)}
                        className="inline-flex items-center justify-center p-3 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 transition-all active:scale-90 border border-transparent hover:border-rose-500/20"
                        title="Purge Node"
                      >
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Termination Modal */}
      {showDeleteModal && selectedToken && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
          <div className="bg-slate-950 w-full max-w-md border border-rose-500/30 p-12 text-center animate-in scale-95 duration-300">
            <div className="inline-flex items-center justify-center h-20 w-20 bg-rose-500/10 border border-rose-500/20 mb-8 shadow-[0_0_50px_rgba(244,63,94,0.1)]">
              <AlertTriangle size={36} className="text-rose-500" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Confirm Purge</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 leading-relaxed">
              Initiating permanent deletion of hash:
            </p>
            <code className="text-sm font-mono font-black text-rose-500 bg-rose-500/5 px-4 py-3 border border-rose-500/10 block my-6 tracking-[0.2em]">
              {selectedToken.tokenCode}
            </code>
            <div className="flex gap-4 mt-12">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-colors border border-white/5"
              >
                Abort
              </button>
              <button
                onClick={handleDelete}
                disabled={formLoading}
                className="flex-1 px-4 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-white bg-rose-600 hover:bg-rose-500 transition-all flex items-center justify-center gap-2"
              >
                {formLoading ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                PURGE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
