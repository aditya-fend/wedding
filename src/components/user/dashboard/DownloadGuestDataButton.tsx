"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2, FileSpreadsheet } from "lucide-react";
import { getGuestWishes } from "@/lib/actions/guestWish";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface DownloadGuestDataButtonProps {
  invitationId: string;
  title: string;
  variant?: "icon" | "full";
}

export function DownloadGuestDataButton({
  invitationId,
  title,
  variant = "full",
}: DownloadGuestDataButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    const toastId = toast.loading("Menyiapkan data tamu...");

    try {
      const result = await getGuestWishes(invitationId);
      
      if (!result.success || !result.data) {
        toast.error("Gagal mengambil data ucapan", { id: toastId });
        return;
      }

      const wishes = result.data;
      if (wishes.length === 0) {
        toast.info("Belum ada data RSVP untuk undangan ini", { id: toastId });
        return;
      }

      // Generate CSV dengan BOM agar Excel membaca karakter khusus (seperti emoji) dengan benar
      const headers = ["Nama Tamu", "Pesan/Ucapan", "Status Kehadiran", "Jumlah Pax", "Tanggal RSVP"];
      const rows = wishes.map((w) => [
        w.guestName,
        `"${(w.message || "").replace(/"/g, '""')}"`, 
        w.isPresent,
        w.guestCount,
        new Date(w.createdAt).toLocaleString("id-ID"),
      ]);

      const csvContent = "\uFEFF" + [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      // Create download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `RSVP_${title.replace(/\s+/g, "_")}_${new Date().getTime()}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success("Data berhasil diunduh", { id: toastId });
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Terjadi kesalahan sistem", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleDownload}
      disabled={loading}
      className={cn(
        "rounded-2xl h-11 border-[#F0EDE6] bg-white transition-all font-bold text-xs tracking-tight",
        "hover:bg-[#FDFCFB] hover:text-[#D4AF97] hover:border-[#D4AF97]/50",
        variant === "icon" ? "w-11 p-0" : "w-full px-5 flex items-center gap-2.5"
      )}
      title="Export RSVP to CSV"
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <>
          <FileSpreadsheet className="size-4 opacity-70" />
          {variant === "full" && <span>Export Data CSV</span>}
        </>
      )}
    </Button>
  );
}