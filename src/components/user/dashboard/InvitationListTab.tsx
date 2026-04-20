"use client";

import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  ExternalLink, 
  Settings2, 
  MessageSquare, 
  MoreHorizontal,
  Eye,
  Share2,
  Trash2,
  Globe
} from "lucide-react";
import Link from "next/link";
import { DeleteInvitationButton } from "./DeleteInvitationButton";
import { ShareInvitationModal } from "./ShareInvitationModal";

interface InvitationWithStats {
  id: string;
  title: string;
  slug: string;
  isActive: boolean;
  createdAt: Date;
  contentData: any;
  template: {
    category: string;
  } | null;
  _count: {
    guestWishes: number;
  };
}

export function InvitationListTab({ invitations }: { invitations: InvitationWithStats[] }) {
  return (
    <div className="bg-white border border-[#F0EDE6] rounded-[2rem] overflow-hidden shadow-sm animate-in fade-in duration-700">
      <Table>
        <TableHeader className="bg-[#FDFCFB]">
          <TableRow className="hover:bg-transparent border-[#F0EDE6]">
            <TableHead className="py-5 px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B]">Detail Undangan</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B]">Jadwal Acara</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B]">Status</TableHead>
            <TableHead className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B]">Engagement</TableHead>
            <TableHead className="text-right px-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B]">Opsi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.length > 0 ? (
            invitations.map((item) => {
              const eventDate = item.contentData?.acara?.[0]?.tanggal || "Belum diatur";
              
              return (
                <TableRow key={item.id} className="border-[#F0EDE6] hover:bg-[#FDFCFB]/50 transition-colors group">
                  <TableCell className="px-6 py-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-bold text-[#2C2C2C] tracking-tight group-hover:text-[#D4AF97] transition-colors">
                        {item.title}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Globe className="size-3 text-[#9B9B9B]" />
                        <span className="text-[10px] text-[#9B9B9B] font-bold uppercase tracking-widest">
                          {item.slug}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-[#6B6B6B] text-xs font-medium">
                      <div className="p-1.5 rounded-lg bg-[#D4AF97]/5 text-[#D4AF97]">
                        <Calendar className="size-3.5" />
                      </div>
                      {eventDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.isActive ? (
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Live</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[#9B9B9B]">
                        <div className="size-1.5 rounded-full bg-[#E5E0D8]" />
                        <span className="text-[10px] font-black uppercase tracking-wider">Draft</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#F0EDE6] bg-white" title="Pesan Ucapan">
                        <MessageSquare className="size-3 text-[#D4AF97]" />
                        <span className="text-xs font-bold text-[#2C2C2C]">{item._count.guestWishes}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-52 rounded-2xl border-[#F0EDE6] p-2 shadow-xl shadow-[#D4AF97]/5">
                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B] px-3 py-2">
                          Manajemen Konten
                        </DropdownMenuLabel>
                        <DropdownMenuItem asChild className="rounded-xl focus:bg-[#FDFCFB] focus:text-[#D4AF97] cursor-pointer">
                          <Link href={`/edit/${item.id}`} className="flex items-center gap-2 w-full py-2.5 font-bold text-xs text-[#2C2C2C]">
                            <Settings2 className="size-4" /> Edit Undangan
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild className="rounded-xl focus:bg-[#FDFCFB] focus:text-[#D4AF97] cursor-pointer">
                          <a href={`/undangan/preview/${item.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 w-full py-2.5 font-bold text-xs text-[#2C2C2C]">
                            <Eye className="size-4" /> Lihat Preview
                          </a>
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator className="bg-[#F0EDE6] my-1" />
                        
                        <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-[#9B9B9B] px-3 py-2">
                          Distribusi & Data
                        </DropdownMenuLabel>
                        <div className="p-1 space-y-1">
                           {/* Kita bungkus modal dalam div/custom item agar trigger tetap elegan */}
                          <div className="flex items-center gap-2 w-full px-2 py-2 text-xs font-bold text-[#2C2C2C] hover:bg-[#FDFCFB] hover:text-[#D4AF97] rounded-xl transition-all cursor-pointer">
                            <ShareInvitationModal slug={item.slug} title={item.title}/>
                          </div>
                        </div>

                        <DropdownMenuSeparator className="bg-[#F0EDE6] my-1" />
                        
                        <div className="p-1">
                          <DeleteInvitationButton id={item.id} title={item.title} />
                        </div>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-40 text-center">
                <div className="flex flex-col items-center justify-center gap-2 text-[#9B9B9B]">
                  <Globe className="size-8 opacity-20" />
                  <p className="text-[11px] font-black uppercase tracking-widest">Belum ada kampanye aktif</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}