"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2, UserPlus, Users, Info } from "lucide-react";
import { saveGuestWish } from "@/lib/actions/guestWish";
import { toast } from "sonner";
import { Invitation } from "@prisma/client";

export function AddGuestModal({ invitations }: { invitations: Invitation[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    invitationId: invitations?.[0]?.id || "",
    guestName: "",
    guestCount: 1,
    isPresent: "Belum_Konfirmasi",
  });

  React.useEffect(() => {
    if (invitations?.length > 0 && !formData.invitationId) {
      setFormData((prev) => ({ ...prev, invitationId: invitations[0].id }));
    }
  }, [invitations, formData.invitationId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.invitationId || !formData.guestName) {
      toast.error("Nama tamu dan undangan harus diisi");
      return;
    }

    setLoading(true);
    try {
      const res = await saveGuestWish({
        ...formData,
        message: "Ditambahkan manual oleh pemilik",
      });

      if (res.success) {
        toast.success("Tamu berhasil ditambahkan");
        setOpen(false);
        setFormData({
          ...formData,
          guestName: "",
          guestCount: 1,
        });
      } else {
        toast.error(res.error || "Gagal menambahkan tamu");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-2xl h-11 px-6 bg-[#D4AF97] hover:bg-[#B99575] text-white font-bold shadow-lg shadow-[#D4AF97]/20 transition-all active:scale-[0.98] gap-2">
          <Plus className="size-4" />
          <span className="tracking-tight">Tamu Baru</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-110 rounded-[2.5rem] border-[#F0EDE6] p-8 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute -top-12 -right-12 size-32 bg-[#FDFCFB] border border-[#F0EDE6] rounded-full opacity-50 z-0" />

        <DialogHeader className="relative z-10 space-y-3">
          <div className="bg-[#FDFCFB] w-fit p-3 rounded-2xl border border-[#F0EDE6] mb-2 shadow-sm">
            <UserPlus className="size-5 text-[#D4AF97]" />
          </div>
          <DialogTitle className="text-2xl font-black text-[#2C2C2C] tracking-tighter">
            Tambah Tamu
          </DialogTitle>
          <DialogDescription className="text-xs font-medium text-muted-foreground leading-relaxed">
            loginkan detail tamu secara manual untuk pencatatan RSVP internal
            Anda.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6 mt-6">
          <div className="space-y-5">
            {/* Pilih Undangan */}
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B] ml-1">
                Kaitkan ke Undangan
              </Label>
              <Select
                value={formData.invitationId}
                onValueChange={(val) =>
                  setFormData({ ...formData, invitationId: val })
                }
              >
                <SelectTrigger className="h-12 rounded-2xl border-[#F0EDE6] bg-[#FDFCFB]/30 font-bold focus:ring-[#D4AF97]/10 transition-all">
                  <SelectValue placeholder="Pilih Undangan" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-[#F0EDE6] p-1 shadow-xl">
                  {invitations.map((inv) => (
                    <SelectItem
                      key={inv.id}
                      value={inv.id}
                      className="rounded-xl py-2.5 font-medium cursor-pointer focus:bg-[#FDFCFB] focus:text-[#D4AF97]"
                    >
                      {inv.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Nama Tamu */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B] ml-1"
              >
                Identitas Tamu
              </Label>
              <Input
                id="name"
                placeholder="loginkan nama lengkap tamu"
                className="h-12 rounded-2xl border-[#F0EDE6] bg-[#FDFCFB]/30 pl-5 font-bold focus:border-[#D4AF97] focus:ring-[#D4AF97]/10 transition-all"
                value={formData.guestName}
                onChange={(e) =>
                  setFormData({ ...formData, guestName: e.target.value })
                }
                required
              />
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="count"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B] ml-1 flex items-center gap-1.5"
                >
                  <Users className="size-3 text-[#D4AF97]" /> Pax
                </Label>
                <Input
                  id="count"
                  type="number"
                  min="1"
                  className="h-12 rounded-2xl border-[#F0EDE6] bg-[#FDFCFB]/30 pl-5 font-bold focus:border-[#D4AF97] transition-all"
                  value={formData.guestCount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      guestCount: parseInt(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B] ml-1">
                  Status
                </Label>
                <Select
                  value={formData.isPresent}
                  onValueChange={(val) =>
                    setFormData({ ...formData, isPresent: val })
                  }
                >
                  <SelectTrigger className="h-12 rounded-2xl border-[#F0EDE6] bg-[#FDFCFB]/30 font-bold focus:ring-[#D4AF97]/10 transition-all">
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-[#F0EDE6] p-1 shadow-xl">
                    <SelectItem
                      value="Hadir"
                      className="rounded-xl focus:text-emerald-600 focus:bg-emerald-50 font-bold"
                    >
                      Hadir
                    </SelectItem>
                    <SelectItem
                      value="Tidak_Hadir"
                      className="rounded-xl focus:text-rose-600 focus:bg-rose-50 font-bold"
                    >
                      Tidak Hadir
                    </SelectItem>
                    <SelectItem
                      value="Ragu_ragu"
                      className="rounded-xl focus:text-amber-600 focus:bg-amber-50 font-bold"
                    >
                      Ragu-ragu
                    </SelectItem>
                    <SelectItem
                      value="Belum_Konfirmasi"
                      className="rounded-xl font-bold"
                    >
                      Belum Jawab
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Info Note */}
          <div className="bg-[#FDFCFB] border border-[#F0EDE6] rounded-2xl p-4 flex items-start gap-3">
            <Info className="size-4 text-[#D4AF97] mt-0.5 shrink-0" />
            <p className="text-[10px] text-[#9B9B9B] font-medium leading-normal italic">
              Data ini akan dicatat sebagai input internal. Pesan ucapan
              otomatis diatur sebagai &quot;Ditambahkan manual oleh pemilik&quot;.
            </p>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="submit"
              className="w-full h-12 bg-[#2C2C2C] hover:bg-black text-white rounded-2xl font-bold transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-2 active:scale-[0.98]"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <>
                  <Plus className="size-4" />
                  <span className="text-sm tracking-tight">
                    Simpan Data Tamu
                  </span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
