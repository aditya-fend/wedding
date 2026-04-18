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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  ExternalLink, 
  Settings2, 
  Users, 
  MessageSquare 
} from "lucide-react";
import Link from "next/link";
import { DeleteInvitationButton } from "./DeleteInvitationButton";
import { ShareInvitationModal } from "./ShareInvitationModal";
import { DownloadGuestDataButton } from "./DownloadGuestDataButton";

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
    <div className="bg-white border border-[#E5E0D8] rounded-2xl overflow-hidden animate-in fade-in duration-700">
      <Table>
        <TableHeader className="bg-[#F8F5F0]">
          <TableRow className="hover:bg-transparent border-[#E5E0D8]">
            <TableHead className="font-bold text-[#2C2C2C] py-4">Nama Acara</TableHead>
            <TableHead className="font-bold text-[#2C2C2C]">Tanggal</TableHead>
            <TableHead className="font-bold text-[#2C2C2C]">Status</TableHead>
            <TableHead className="font-bold text-[#2C2C2C]">Stats</TableHead>
            <TableHead className="font-bold text-[#2C2C2C] text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations.length > 0 ? (
            invitations.map((item) => {
              const eventDate = item.contentData?.acara?.[0]?.tanggal || "-";
              
              return (
                <TableRow key={item.id} className="border-[#E5E0D8] hover:bg-slate-50/50 transition-colors">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-bold text-[#2C2C2C]">{item.title}</span>
                      <span className="text-xs text-[#6B6B6B] uppercase tracking-wider">
                        {item.template?.category || "Custom"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-[#6B6B6B] text-sm">
                      <Calendar className="size-3.5 text-[#D4AF97]" />
                      {eventDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.isActive ? (
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-100 rounded-full px-3">
                        Aktif
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-slate-100 text-slate-500 border-slate-200 rounded-full px-3">
                        Nonaktif
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5" title="Jumlah RSVP">
                        <MessageSquare className="size-3.5 text-[#D4AF97]" />
                        <span className="text-sm font-medium">{item._count.guestWishes}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="outline" className="flex-1 rounded-xl h-10 text-xs gap-2">
                        <Link href={`/edit/${item.id}`}>
                          <Settings2 className="size-3.5" /> Edit
                        </Link>
                      </Button>
                      <Button asChild variant="secondary" className="flex-1 rounded-xl h-10 text-xs gap-2">
                        <a href={`/v/${item.slug}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-3.5" /> Preview
                        </a>
                      </Button>
                      <ShareInvitationModal slug={item.slug} title={item.title} />
                      <DeleteInvitationButton id={item.id} title={item.title} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-32 text-center text-[#6B6B6B]">
                Belum ada undangan.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
