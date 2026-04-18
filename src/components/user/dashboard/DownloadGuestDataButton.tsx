"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { getGuestWishes } from "@/lib/actions/guestWish";

interface DownloadGuestDataButtonProps {
  invitationId: string;
  title: string;
}

export function DownloadGuestDataButton({
  invitationId,
  title,
}: DownloadGuestDataButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const result = await getGuestWishes(invitationId);
      
      if (!result.success || !result.data) {
        alert("Gagal mengambil data ucapan.");
        return;
      }

      const wishes = result.data;
      if (wishes.length === 0) {
        alert("Belum ada data RSVP atau ucapan untuk undangan ini.");
        return;
      }

      // Generate CSV
      const headers = ["Nama Tamu", "Pesan/Ucapan", "Kehadiran", "Jumlah Tamu", "Tanggal"];
      const rows = wishes.map((w) => [
        w.guestName,
        `"${w.message.replace(/"/g, '""')}"`, // Escape quotes
        w.isPresent,
        w.guestCount,
        new Date(w.createdAt).toLocaleString("id-ID"),
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      // Create download link
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `RSVP_${title.replace(/\s+/g, "_")}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download error:", error);
      alert("Terjadi kesalahan saat mengunduh data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-xl h-10 w-full flex-1 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
      onClick={handleDownload}
      disabled={loading}
      title="Download Data RSVP & Ucapan"
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <span className="flex">
          <Download className="size-4" /> Download Data RSVP
        </span>
      )}
    </Button>
  );
}
