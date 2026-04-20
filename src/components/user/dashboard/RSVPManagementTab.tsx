"use client";

import React, { useState, useMemo } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Download, 
  Users,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  MoreVertical
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { deleteGuest, updateGuestStatus } from "@/lib/actions/guestWish";
import { Invitation, Presence } from "@prisma/client";
import { toast } from "sonner";
import { AddGuestModal } from "./AddGuestModal";

interface Guest {
  id: string;
  guestName: string;
  message: string;
  isPresent: Presence;
  guestCount: number;
  createdAt: Date;
  invitation: {
    title: string;
  };
  invitationId: string;
}

export function RSVPManagementTab({ guests, invitations }: { guests: Guest[], invitations: Invitation[] }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [invitationFilter, setInvitationFilter] = useState<string>("ALL");

  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      const matchSearch = g.guestName.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "ALL" || g.isPresent === statusFilter;
      const matchInvitation = invitationFilter === "ALL" || g.invitationId === invitationFilter;
      return matchSearch && matchStatus && matchInvitation;
    });
  }, [guests, search, statusFilter, invitationFilter]);

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data tamu ini?")) {
      const res = await deleteGuest(id);
      if (res.success) {
        toast.success("Tamu berhasil dihapus");
      } else {
        toast.error("Gagal menghapus tamu");
      }
    }
  };

  const handleStatusUpdate = async (id: string, status: Presence) => {
    const res = await updateGuestStatus(id, status);
    if (res.success) {
      toast.success("Status tamu diperbarui");
    } else {
      toast.error("Gagal memperbarui status");
    }
  };

  const exportToCSV = () => {
    const headers = ["Nama Tamu", "Acara", "Status", "Jumlah", "Pesan", "Tanggal"];
    const rows = filteredGuests.map((g) => [
      g.guestName,
      g.invitation.title,
      g.isPresent,
      g.guestCount,
      `"${g.message.replace(/"/g, '""')}"`,
      new Date(g.createdAt).toLocaleString("id-ID"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Data_Tamu_${new Date().toLocaleDateString()}.csv`);
    link.click();
  };

  const getStatusBadge = (status: Presence) => {
    switch (status) {
      case "Hadir":
        return <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100"><CheckCircle2 className="size-3 mr-1" /> Hadir</Badge>;
      case "Tidak_Hadir":
        return <Badge variant="destructive" className="bg-rose-50 text-rose-600 border-rose-100"><XCircle className="size-3 mr-1" /> Tidak Hadir</Badge>;
      case "Ragu_ragu":
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-100"><HelpCircle className="size-3 mr-1" /> Ragu-ragu</Badge>;
      case "Belum_Konfirmasi":
        return <Badge variant="secondary" className="bg-slate-100 text-slate-500 border-slate-200"><Clock className="size-3 mr-1" /> Belum Jawab</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-700">
      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-4 border border-[#E5E0D8] rounded-2xl">
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input 
              placeholder="Cari nama tamu..." 
              className="pl-9 w-full md:w-[250px] rounded-xl border-[#E5E0D8]" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[150px] rounded-xl border-[#E5E0D8]">
              <SelectValue placeholder="Semua Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Semua Status</SelectItem>
              <SelectItem value="Hadir">Hadir</SelectItem>
              <SelectItem value="Tidak_Hadir">Tidak Hadir</SelectItem>
              <SelectItem value="Ragu_ragu">Ragu-ragu</SelectItem>
              <SelectItem value="Belum_Konfirmasi">Belum Jawab</SelectItem>
            </SelectContent>
          </Select>

          <Select value={invitationFilter} onValueChange={setInvitationFilter}>
            <SelectTrigger className="w-full md:w-[200px] rounded-xl border-[#E5E0D8]">
              <SelectValue placeholder="Semua Undangan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Semua Undangan</SelectItem>
              {invitations.map((inv) => (
                <SelectItem key={inv.id} value={inv.id}>{inv.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="rounded-xl gap-2 border-[#E5E0D8] flex-1" onClick={exportToCSV}>
            <Download className="size-4" /> Export
          </Button>
          <AddGuestModal invitations={invitations} />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden">
        <Table>
          <TableHeader className="bg-[#F8F5F0]">
            <TableRow className="hover:bg-transparent border-[#E5E0D8]">
              <TableHead className="font-bold text-[#2C2C2C] py-4">Nama Tamu</TableHead>
              <TableHead className="font-bold text-[#2C2C2C]">Acara</TableHead>
              <TableHead className="font-bold text-[#2C2C2C]">Status</TableHead>
              <TableHead className="font-bold text-[#2C2C2C]">Jumlah</TableHead>
              <TableHead className="font-bold text-[#2C2C2C] text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuests.length > 0 ? (
              filteredGuests.map((guest) => (
                <TableRow key={guest.id} className="border-[#E5E0D8]">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-[#2C2C2C]">{guest.guestName}</span>
                      {guest.message && (
                        <span className="text-xs text-[#6B6B6B] line-clamp-1 italic">&quot;{guest.message}&quot;</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-[#6B6B6B]">{guest.invitation.title}</TableCell>
                  <TableCell>{getStatusBadge(guest.isPresent)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-[#6B6B6B]">
                      <Users className="size-3.5" />
                      {guest.guestCount}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px] rounded-xl">
                        <DropdownMenuItem onClick={() => handleStatusUpdate(guest.id, "Hadir")}>
                          Set Hadir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(guest.id, "Tidak_Hadir")}>
                          Set Tidak Hadir
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(guest.id, "Belum_Konfirmasi")}>
                          Set Belum Jawab
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(guest.id)} className="text-rose-600 focus:text-rose-600">
                          Hapus Data
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-[#6B6B6B]">
                  Tidak ada data tamu yang ditemukan.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
