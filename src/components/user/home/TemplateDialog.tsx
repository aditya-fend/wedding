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
import { Eye } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Template } from "@/types/invitation";

type TemplateItem = Template & {
  thumbnailLabel?: string;
};

function TemplateCard({ template }: { template: TemplateItem }) {
  return (
    <Card className="group overflow-hidden rounded-[1.75rem] border-border bg-white shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="relative h-44 overflow-hidden rounded-t-3xl">
        {template.thumbnailUrl ? (
          <Image
            src={template.thumbnailUrl}
            alt={template.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-[#F6EEE6] via-[#F8F3EE] to-[#FDF8F4] px-4 text-center">
            <div>
              <div className="mb-3 inline-flex items-center justify-center rounded-full bg-[#D4AF97]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#2C2C2C]">
                {template.category}
              </div>
              <p className="text-sm font-semibold text-[#2C2C2C]">
                {template.title}
              </p>
            </div>
          </div>
        )}
        {/* Overlay kategori untuk thumbnail */}
        {template.thumbnailUrl && (
          <div className="absolute top-3 left-3">
            <div className="inline-flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#2C2C2C]">
              {template.category}
            </div>
          </div>
        )}
      </div>
      <CardContent className="space-y-4 px-5 pb-0 pt-5 grow">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-[#2C2C2C] tracking-tight transition-colors group-hover:text-[#D4AF97]">
            {template.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {template.description ||
              "Template undangan digital eksklusif untuk momen spesial Anda."}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex gap-3 flex-col items-stretch sm:flex-row sm:justify-between sm:items-center px-5 pt-4 pb-5">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="w-full sm:w-auto rounded-xl"
        >
          <Link
            href={template.previewUrl || "#"}
            className="inline-flex items-center gap-2"
          >
            <Eye className="size-4" /> Preview
          </Link>
        </Button>
        <Button size="sm" className="w-full sm:w-auto rounded-xl">
          <Link
            href="/masuk"
            className="inline-flex items-center gap-2"
          >
            Pilih Template
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

interface TemplateDialogProps {
  templates: Template[];
}

export function TemplateDialog({ templates }: TemplateDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua Kategori");
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Fetch categories from API on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/templates/categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(["Semua Kategori", ...data.categories]);
        } else {
          // Fallback: derive categories from templates
          const uniqueCategories = Array.from(
            new Set(templates.map((item) => item.category)),
          );
          setCategories(["Semua Kategori", ...uniqueCategories]);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Fallback: derive categories from templates
        const uniqueCategories = Array.from(
          new Set(templates.map((item) => item.category)),
        );
        setCategories(["Semua Kategori", ...uniqueCategories]);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();

    return templates.filter((template) => {
      const matchesCategory =
        selectedCategory === "Semua Kategori" ||
        template.category === selectedCategory;
      const matchesQuery =
        query === "" ||
        template.title.toLowerCase().includes(query) ||
        template.description?.toLowerCase().includes(query) ||
        template.category.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory, templates]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">Lihat Semua Template</Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl">
        <DialogHeader>
          <DialogTitle>Semua Template</DialogTitle>
          <DialogDescription>
            Cari template sesuai kategori dan kata kunci. Temukan desain yang
            cocok untuk gaya undangan Anda.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 grid gap-4 sm:grid-cols-[1.5fr_1fr]">
          <Input
            placeholder="Cari template..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger aria-label="Pilih kategori" className="w-full">
              <SelectValue placeholder="Semua Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-border bg-[#FBF8F4] p-10 text-center text-sm text-muted-foreground">
              Tidak ada template yang sesuai dengan filter Anda. Coba kata kunci
              lain atau pilih kategori lain.
            </div>
          )}
        </div>

        <DialogFooter className="mt-6 justify-end">
          <DialogClose asChild>
            <Button variant="secondary">Tutup</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
