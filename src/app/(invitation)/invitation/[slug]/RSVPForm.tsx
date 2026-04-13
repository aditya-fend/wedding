// app/(invitation)/invitation/[slug]/RSVPForm.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface RSVPFormProps {
  invitationId: string;
  slug: string;
}

export default function RSVPForm({ invitationId }: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    guestName: "",
    guestPhone: "",
    attendance: "hadir" as "hadir" | "tidak_hadir" | "mungkin",
    numberOfGuest: 1,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invitationId,
          ...form,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Konfirmasi kehadiran berhasil!", {
          description: "Terima kasih telah mengonfirmasi ❤️",
        });

        // Reset form
        setForm({
          guestName: "",
          guestPhone: "",
          attendance: "hadir",
          numberOfGuest: 1,
          message: "",
        });
      } else {
        toast.error(result.error || "Gagal mengirim RSVP");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan koneksi. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Konfirmasi Kehadiran</CardTitle>
        <CardDescription>Mohon isi dengan jujur</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <Label>Nama Lengkap</Label>
            <Input
              value={form.guestName}
              onChange={(e) => setForm({ ...form, guestName: e.target.value })}
              placeholder="Nama kamu"
              required
            />
          </div>

          <div>
            <Label>Nomor WhatsApp (Opsional)</Label>
            <Input
              type="tel"
              value={form.guestPhone}
              onChange={(e) => setForm({ ...form, guestPhone: e.target.value })}
              placeholder="081234567890"
            />
          </div>

          <div>
            <Label>Kehadiran</Label>
            <Select 
              value={form.attendance} 
              onValueChange={(value: "hadir" | "tidak_hadir" | "mungkin") => 
                setForm({ ...form, attendance: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hadir">Hadir</SelectItem>
                <SelectItem value="tidak_hadir">Tidak Hadir</SelectItem>
                <SelectItem value="mungkin">Mungkin Hadir</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Jumlah Tamu yang Datang</Label>
            <Input
              type="number"
              min="1"
              value={form.numberOfGuest}
              onChange={(e) => setForm({ ...form, numberOfGuest: parseInt(e.target.value) || 1 })}
            />
          </div>

          <div>
            <Label>Pesan Tambahan (Opsional)</Label>
            <Textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Ucapan atau doa restu..."
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Mengirim Konfirmasi..." : "Kirim Konfirmasi Kehadiran"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}