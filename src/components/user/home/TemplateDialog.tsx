"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Search } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Template } from "@/types/invitation";

export function TemplateCard({
  template,
}: {
  template: Template & { thumbnailLabel?: string };
}) {
  return (
    <Card
      key={template.id}
      className="group overflow-hidden rounded-[28px] border transition duration-300 "
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        {template.thumbnailUrl ? (
          <Image
            src={template.thumbnailUrl}
            alt={template.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#FDFCFB] px-4 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF97] opacity-60">
              No Preview
            </p>
          </div>
        )}
        {/* Badge: Ukuran teks diperkecil ke text-[10px] */}
        <div className="absolute top-2.5 left-2.5">
          <div className="inline-flex items-center rounded-full bg-white/90 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2C2C2C] shadow-sm">
            {template.category}
          </div>
        </div>
      </div>

      <CardContent className="p-4 pb-0">
        <h3 className="text-sm font-bold text-[#2C2C2C] truncate group-hover:text-[#D4AF97] transition-colors">
          {template.title}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-[#6B6B6B] line-clamp-2">
          {template.description || "Template undangan digital eksklusif."}
        </p>
      </CardContent>

      <CardFooter className="flex gap-2 p-4 pt-3">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="h-8 flex-1 rounded-lg text-[11px] border-[#E5E0D8]"
        >
          <Link href={template.previewUrl || "#"} target="_blank" rel="noreferrer">
            <Eye className="mr-1.5 size-3" /> Preview
          </Link>
        </Button>
        <Button
          size="sm"
          className="h-8 flex-1 rounded-lg text-[11px] bg-[#D4AF97] hover:bg-[#B99575]"
        >
          <Link href="/login" rel="noreferrer">Pilih</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function TemplateDialog({ templates }: { templates: Template[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [categories, setCategories] = useState<string[]>(["Semua Kategori"]);

  useEffect(() => {
    const unique = Array.from(new Set(templates.map((t) => t.category)));
    setCategories(["Semua Kategori", ...unique]);
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return templates.filter((t) => {
      const mCat =
        selectedCategory === "Semua Kategori" ||
        t.category === selectedCategory;
      const mQue =
        !query ||
        t.title.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query);
      return mCat && mQue;
    });
  }, [searchQuery, selectedCategory, templates]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-10 px-6 rounded-xl border-[#D4AF97] text-[#2C2C2C] text-sm"
        >
          Lihat Semua Template
        </Button>
      </DialogTrigger>

      {/* Dialog Content: max-w-5xl (lebih ramping) dan max-h-screen */}
      <DialogContent className="md:min-w-4xl lg:min-w-5xl max-h-[90vh] overflow-hidden flex flex-col p-0 rounded-2xl border-none">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-bold text-[#2C2C2C]">
            Katalog Template
          </DialogTitle>
          <DialogDescription className="text-xs text-[#6B6B6B]">
            Pilih desain yang paling menggambarkan momen bahagia Anda.
          </DialogDescription>
        </DialogHeader>

        {/* Filter Bar: Lebih compact */}
        <div className="px-6 mt-4 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-[#6B6B6B]/50" />
            <Input
              placeholder="Cari desain..."
              className="pl-9 h-9 text-xs rounded-lg border-[#E5E0D8]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="h-9 w-full sm:w-[180px] text-xs rounded-lg border-[#E5E0D8]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c} className="text-xs">
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Scrollable Area */}
        <div className="flex-1 overflow-y-auto p-6 pt-4 no-scrollbar">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map((t) => (
                <TemplateCard key={t.id} template={t} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center rounded-2xl border border-dashed border-[#E5E0D8] bg-[#FDFCFB]">
                <p className="text-xs text-[#6B6B6B]">
                  Template tidak ditemukan.
                </p>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="p-4 border-t border-[#F0EDE6] bg-[#FDFCFB]/50">
          <DialogClose asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs hover:bg-[#F0EDE6]"
            >
              Tutup
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
