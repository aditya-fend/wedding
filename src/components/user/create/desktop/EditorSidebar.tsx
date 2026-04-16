"use client";

import React from "react";
import { useEditorStore } from "@/store/useEditorStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Palette,
  Music,
  User2,
  Heart,
  CalendarDays,
  ImageIcon,
  LayoutDashboard,
} from "lucide-react";
import { SectionCard } from "./SectionCard";

interface SidebarProps {
  templates: any[];
  musics: any[];
}

export function EditorSidebar({ templates, musics }: SidebarProps) {
  const {
    activeTemplate,
    setActiveTemplate,
    activeSection,
    setActiveSection,
    formData,
    setFormData,
  } = useEditorStore();

  const updateField = (parent: string, field: string, value: string) => {
    const parentData = (formData as any)[parent] || {};
    setFormData({
      ...formData,
      [parent]: { ...parentData, [field]: value },
    });
  };

  return (
    <aside
      className="flex flex-col h-full w-[450px] shrink-0"
      style={{ backgroundColor: "var(--color-background, #F8F5F0)" }}
    >
      {/* ── HEADER & GLOBAL SETTINGS ── */}
      <div className="p-6 space-y-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#D4AF97] rounded-lg text-white">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tighter text-[#2C2C2C] uppercase leading-none">
              Editor
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">
              Undang Dong Engine
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Template Selector */}
          <div className="space-y-2">
            <Label className="text-[9px] font-black uppercase text-slate-500 flex items-center gap-2">
              <Palette className="size-3 text-[#D4AF97]" /> Template
            </Label>
            <Select
              value={activeTemplate || "aura-dark"}
              onValueChange={setActiveTemplate}
            >
              <SelectTrigger className="h-10 rounded-md bg-white border-slate-200 text-xs font-bold shadow-sm">
                <SelectValue placeholder="Pilih Template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((t) => (
                  // Pastikan t.id berisi string seperti 'aura-dark' atau 'nero-gold'
                  <SelectItem key={t.id} value={t.title}>
                    {t.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Music Selector */}
          <div className="space-y-2">
            <Label className="text-[9px] font-black uppercase text-slate-500 flex items-center gap-2">
              <Music className="size-3 text-[#D4AF97]" /> BGM
            </Label>
            <Select
              value={formData.music_url}
              onValueChange={(v) => setFormData({ ...formData, music_url: v })}
            >
              <SelectTrigger className="h-10 rounded-md bg-white border-slate-200 text-xs font-bold shadow-sm">
                <SelectValue placeholder="Pilih Musik" />
              </SelectTrigger>
              <SelectContent>
                {musics.map((m) => (
                  <SelectItem key={m.id} value={m.url}>
                    {m.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE SECTION CARDS ── */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {/* Section: Mempelai Pria */}
        <SectionCard
          title="Mempelai Pria"
          icon={User2}
          isActive={activeSection === "mempelai_pria"}
          onClick={() =>
            setActiveSection(
              activeSection === "mempelai_pria" ? "" : "mempelai_pria",
            )
          }
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Nama Lengkap
              </Label>
              <Input
                value={formData.mempelai_pria?.nama || ""}
                onChange={(e) =>
                  updateField("mempelai_pria", "nama", e.target.value)
                }
                placeholder="Contoh: Aditya F."
                className="rounded-xl border-slate-200 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Ayah
                </Label>
                <Input
                  value={formData.mempelai_pria?.ortu_ayah || ""}
                  onChange={(e) =>
                    updateField("mempelai_pria", "ortu_ayah", e.target.value)
                  }
                  className="rounded-xl bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Ibu
                </Label>
                <Input
                  value={formData.mempelai_pria?.ortu_ibu || ""}
                  onChange={(e) =>
                    updateField("mempelai_pria", "ortu_ibu", e.target.value)
                  }
                  className="rounded-xl bg-white"
                />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* Section: Mempelai Wanita */}
        <SectionCard
          title="Mempelai Wanita"
          icon={Heart}
          isActive={activeSection === "mempelai_wanita"}
          onClick={() =>
            setActiveSection(
              activeSection === "mempelai_wanita" ? "" : "mempelai_wanita",
            )
          }
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Nama Lengkap
              </Label>
              <Input
                value={formData.mempelai_wanita?.nama || ""}
                onChange={(e) =>
                  updateField("mempelai_wanita", "nama", e.target.value)
                }
                className="rounded-xl bg-white"
              />
            </div>
            {/* Field Ayah & Ibu Wanita sama seperti di atas */}
          </div>
        </SectionCard>

        {/* Section: Acara */}
        <SectionCard
          title="Jadwal Acara"
          icon={CalendarDays}
          isActive={activeSection === "acara"}
          onClick={() =>
            setActiveSection(activeSection === "acara" ? "" : "acara")
          }
        >
          <div className="flex flex-col gap-3">
            <p className="text-[10px] text-slate-400 italic">
              Data acara akan muncul di sini sesuai format database.
            </p>
          </div>
        </SectionCard>

        {/* Section: Gallery */}
        <SectionCard
          title="Galeri Foto"
          icon={ImageIcon}
          isActive={activeSection === "gallery"}
          onClick={() =>
            setActiveSection(activeSection === "gallery" ? "" : "gallery")
          }
        >
          <div className="flex flex-col gap-3">
            {/* Logic mapping gallery Anda */}
          </div>
        </SectionCard>
      </div>
    </aside>
  );
}
