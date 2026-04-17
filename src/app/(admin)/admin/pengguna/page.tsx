"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Users,
  Plus,
  Search,
  Edit3,
  Trash2,
  Copy,
  Check,
  X,
  Loader2,
  Eye,
  EyeOff,
  UserPlus,
  Mail,
  Lock,
  Shield,
  ChevronDown,
  AlertTriangle,
  Save,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface UserToken {
  id: string;
  tokenCode: string;
  packageType: string;
  isUsed: boolean;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  createdAt: string;
  tokens: UserToken[];
  _count: {
    invitations: number;
  };
}

interface FormData {
  name: string;
  email: string;
  password: string;
  packageType: string;
  role: string;
}

export default function PenggunaPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    packageType: "Basic",
    role: "user",
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    role: "user",
    status: "active",
  });

  const fetchUsers = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch {
      toast.error("Gagal memuat data pengguna");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal membuat pengguna");
        return;
      }
      toast.success("Pengguna berhasil dibuat!");
      setShowCreateModal(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        packageType: "Basic",
        role: "user",
      });
      fetchUsers();
    } catch {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setFormLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editFormData),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal mengupdate pengguna");
        return;
      }
      toast.success("Pengguna berhasil diupdate!");
      setShowEditModal(false);
      fetchUsers();
    } catch {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setFormLoading(true);
    try {
      const res = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal menghapus pengguna");
        return;
      }
      toast.success("Pengguna berhasil dihapus!");
      setShowDeleteModal(false);
      setSelectedUser(null);
      fetchUsers();
    } catch {
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setFormLoading(false);
    }
  };

  const copyCredentials = (user: UserData) => {
    const credentials = `Email: ${user.email}\nNama: ${user.name}\nRole: ${user.role}\nStatus: ${user.status}`;
    navigator.clipboard.writeText(credentials);
    setCopiedId(user.id);
    toast.success("Credential berhasil disalin!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openEditModal = (user: UserData) => {
    setSelectedUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (user: UserData) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getRoleBadge = (role: string) => {
    return (
      <span className={cn(
        "px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-[0.2em] border",
        role === 'admin' 
          ? "bg-violet-500/10 text-violet-400 border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]" 
          : "bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
      )}>
        {role === 'admin' ? 'Superuser' : 'Operator'}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const isActive = status === 'active';
    return (
      <span className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-[9px] font-black uppercase tracking-[0.2em] border",
        isActive 
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
      )}>
        <div className={cn("h-1 w-1 rounded-full", isActive ? "bg-emerald-500 animate-pulse" : "bg-rose-500")} />
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-2 border-b-2 border-cyan-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center text-cyan-500/50">
            <Users className="h-8 w-8 animate-pulse" />
          </div>
          <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] whitespace-nowrap">
            Scanning User Nodes
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
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em]">Directory Matrix</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tighter italic uppercase flex items-center gap-4">
            User Registry
          </h1>
          <p className="text-slate-500 mt-2 font-mono text-[10px] uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="h-1 w-1 bg-slate-700 rounded-full" />
            Active Nodes: {users.length}
            <span className="ml-2 h-1 w-1 bg-slate-700 rounded-full" />
            System Status: Nominal
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="group relative flex items-center gap-3 px-8 py-4 bg-white text-black font-black uppercase text-[10px] tracking-[0.3em] overflow-hidden transition-all hover:pr-10"
        >
          <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative z-10 group-hover:text-white transition-colors">Register Entity</span>
          <Plus size={14} className="relative z-10 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Filter Matrix */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative group flex-1">
            <Search
            size={14}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-500 transition-colors"
            />
            <input
            type="text"
            placeholder="SEARCH IDENTITY OR EMAIL..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-white/5 rounded-none focus:border-cyan-500/50 outline-none transition-all text-[10px] font-black text-white placeholder:text-slate-600 tracking-widest uppercase"
            />
        </div>
        <div className="relative group">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="appearance-none pl-6 pr-12 py-4 bg-slate-900/50 border border-white/5 rounded-none focus:border-cyan-500/50 outline-none transition-all text-[10px] font-black text-white tracking-widest uppercase cursor-pointer min-w-[200px]"
          >
            <option value="all">GLOBAL STATUS</option>
            <option value="active">OPERATIONAL</option>
            <option value="pending">AWAITING SYNC</option>
            <option value="suspended">TERMINATED</option>
          </select>
          <ChevronDown
            size={14}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-hover:text-cyan-500 transition-colors"
          />
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
                  Identity Node
                </th>
                <th className="text-left text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-4 py-6">
                  Access Level
                </th>
                <th className="text-left text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-4 py-6">
                  Operational
                </th>
                <th className="text-left text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-4 py-6">
                  Hash Key
                </th>
                <th className="text-right text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] px-8 py-6">
                  Commands
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.02]">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-32 text-slate-600 italic text-[10px] font-black uppercase tracking-[0.4em]">
                    No Identity Found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-cyan-500/[0.02] transition-colors group/row border-l-2 border-transparent hover:border-cyan-500"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 bg-slate-900 border border-white/5 rounded-none flex items-center justify-center text-cyan-400 font-black text-xs">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black text-white uppercase tracking-widest leading-none">
                            {user.name}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 mt-1">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-6">{getRoleBadge(user.role)}</td>
                    <td className="px-4 py-6">{getStatusBadge(user.status)}</td>
                    <td className="px-4 py-6">
                      <code className="text-[9px] font-mono text-slate-500 bg-white/5 px-2 py-1">
                        {user.id.substring(0, 8)}...
                      </code>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => copyCredentials(user)}
                          className="p-2.5 text-slate-600 hover:text-white hover:bg-white/5 transition-all border border-transparent hover:border-white/10"
                          title="Extract Credentials"
                        >
                          {copiedId === user.id ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                        </button>
                        <button
                          onClick={() => openEditModal(user)}
                          className="p-2.5 text-slate-600 hover:text-amber-500 hover:bg-amber-500/10 transition-all border border-transparent hover:border-amber-500/20"
                          title="Modify Entry"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(user)}
                          className="p-2.5 text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 transition-all border border-transparent hover:border-rose-500/20"
                          title="Purge Node"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-slate-950 w-full max-w-lg border border-white/10 animate-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.3em] mb-1">New Identity</span>
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Register Entity</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="p-2 text-slate-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-8 space-y-6">
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block">Full Designation</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-4 bg-slate-900 border border-white/5 outline-none focus:border-cyan-500/50 text-[10px] font-black text-white tracking-widest uppercase"
                  placeholder="ENTITY NAME"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block">Signal Address (Email)</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-4 bg-slate-900 border border-white/5 outline-none focus:border-cyan-500/50 text-[10px] font-black text-white tracking-widest uppercase"
                  placeholder="IDENTITY@CORE.SYS"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block">Access Key</label>
                <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-4 bg-slate-900 border border-white/5 outline-none focus:border-cyan-500/50 text-[10px] font-black text-white tracking-widest uppercase pr-12"
                  placeholder="SECURITY KEY"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block">Tier</label>
                    <select
                        value={formData.packageType}
                        onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900 border border-white/5 outline-none focus:border-cyan-500/50 text-[10px] font-black text-white tracking-widest uppercase"
                    >
                        <option value="Basic">Basic Protocol</option>
                        <option value="Premium">Premium Suite</option>
                        <option value="Exclusive">Exclusive Vault</option>
                    </select>
                </div>
                <div className="space-y-4">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block">Clearance</label>
                    <select
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900 border border-white/5 outline-none focus:border-cyan-500/50 text-[10px] font-black text-white tracking-widest uppercase"
                    >
                        <option value="user">Operator</option>
                        <option value="admin">Superuser</option>
                    </select>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white border border-white/5 transition-colors"
                >
                  Abort
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 px-4 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-black bg-cyan-500 hover:bg-cyan-400 transition-all flex items-center justify-center gap-2"
                >
                  {formLoading ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
                  INITIALIZE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modify Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="bg-slate-950 w-full max-w-lg border border-white/10 animate-in zoom-in-95 duration-500">
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.3em] mb-1">Configuration</span>
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Modify Entry</h3>
              </div>
              <button onClick={() => setShowEditModal(false)} className="p-2 text-slate-500 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdate} className="p-8 space-y-6">
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block">Full Designation</label>
                <input
                  type="text"
                  required
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full px-4 py-4 bg-slate-900 border border-white/5 outline-none focus:border-cyan-500/50 text-[10px] font-black text-white tracking-widest uppercase"
                />
              </div>
              <div className="space-y-4">
                <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block">Signal Address</label>
                <input
                  type="email"
                  required
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full px-4 py-4 bg-slate-900 border border-white/5 outline-none focus:border-cyan-500/50 text-[10px] font-black text-white tracking-widest uppercase"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block">Status</label>
                    <select
                        value={editFormData.status}
                        onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900 border border-white/5 outline-none focus:border-cyan-500/50 text-[10px] font-black text-white tracking-widest uppercase"
                    >
                        <option value="active">Operational</option>
                        <option value="pending">Awaiting Sync</option>
                        <option value="suspended">Terminated</option>
                    </select>
                </div>
                <div className="space-y-4">
                    <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] block">Clearance</label>
                    <select
                        value={editFormData.role}
                        onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-900 border border-white/5 outline-none focus:border-cyan-500/50 text-[10px] font-black text-white tracking-widest uppercase"
                    >
                        <option value="user">Operator</option>
                        <option value="admin">Superuser</option>
                    </select>
                </div>
              </div>
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 px-4 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white border border-white/5 transition-colors"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="flex-1 px-4 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-black bg-amber-500 hover:bg-amber-400 transition-all flex items-center justify-center gap-2"
                >
                  {formLoading ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  COMMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
          <div className="bg-slate-950 w-full max-w-md border border-rose-500/30 p-12 text-center animate-in scale-95 duration-300">
            <div className="inline-flex items-center justify-center h-20 w-20 bg-rose-500/10 border border-rose-500/20 mb-8 shadow-[0_0_50px_rgba(244,63,94,0.1)]">
              <AlertTriangle size={36} className="text-rose-500" />
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Purge Entity</h3>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 leading-relaxed">
              Confirm permanent deletion of:
            </p>
            <div className="text-sm font-mono font-black text-rose-500 bg-rose-500/5 px-4 py-4 border border-rose-500/10 my-6 tracking-[0.1em]">
              {selectedUser.name} <br/> <span className="text-[10px] opacity-70">{selectedUser.email}</span>
            </div>
            <div className="flex gap-4 mt-12">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-4 text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white border border-white/5"
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
