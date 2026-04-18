"use client";

import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import { saveGuestWish } from "@/lib/actions/guestWish";
import { toast } from "sonner";

export function AddGuestModal({ invitations }: { invitations: any[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    invitationId: invitations?.[0]?.id || "",
    guestName: "",
    guestCount: 1,
    isPresent: "Belum_Konfirmasi",
  });

  // Ensure invitationId is set if invitations load after initial mount (as insurance)
  React.useEffect(() => {
    if (invitations?.length > 0 && !formData.invitationId) {
      setFormData(prev => ({ ...prev, invitationId: invitations[0].id }));
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
        <Button className="rounded-xl gap-2 bg-[#D4AF97] hover:bg-[#C49B83] text-white">
          <Plus className="size-4" /> Tamu Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Tambah Tamu Manual</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="invitation">Pilih Undangan</Label>
            <Select 
              value={formData.invitationId} 
              onValueChange={(val) => setFormData({ ...formData, invitationId: val })}
            >
              <SelectTrigger id="invitation" className="rounded-xl border-[#E5E0D8]">
                <SelectValue placeholder="Pilih Undangan" />
              </SelectTrigger>
              <SelectContent>
                {invitations.map((inv) => (
                  <SelectItem key={inv.id} value={inv.id}>{inv.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nama Tamu</Label>
            <Input 
              id="name" 
              placeholder="Masukkan nama lengkap" 
              className="rounded-xl border-[#E5E0D8]" 
              value={formData.guestName}
              onChange={(e) => setFormData({ ...formData, guestName: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="count">Jumlah Tamu</Label>
              <Input 
                id="count" 
                type="number" 
                min="1"
                className="rounded-xl border-[#E5E0D8]" 
                value={formData.guestCount}
                onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value) })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status Awal</Label>
              <Select 
                value={formData.isPresent} 
                onValueChange={(val) => setFormData({ ...formData, isPresent: val })}
              >
                <SelectTrigger id="status" className="rounded-xl border-[#E5E0D8]">
                  <SelectValue placeholder="Pilih Status" />
                </SelectTrigger>
                <SelectContent className="z-101">
                  <SelectItem value="Hadir">Hadir</SelectItem>
                  <SelectItem value="Tidak_Hadir">Tidak Hadir</SelectItem>
                  <SelectItem value="Ragu_ragu">Ragu-ragu</SelectItem>
                  <SelectItem value="Belum_Konfirmasi">Belum Jawab</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              className="w-full rounded-xl bg-[#2C2C2C] hover:bg-black text-white"
              disabled={loading}
            >
              {loading ? <Loader2 className="size-4 animate-spin mr-2" /> : null}
              Simpan Data Tamu
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
