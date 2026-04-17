"use client";

import React from "react";
import { useEditorStore } from "@/store/useEditorStore";
import { InvitationContent } from "@/types/invitation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
  Plus,
  Trash2,
  BookHeart,
  Wallet,
  Shirt,
} from "lucide-react";
import { SectionCard } from "./SectionCard";
import { Music as MusicType, Template } from "@/types";

interface SidebarProps {
  templates: Template[];
  musics: MusicType[];
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

  // ── Helper: Update nested object field (mempelai_pria, mempelai_wanita) ──
  const updateField = (parent: string, field: string, value: string) => {
    const parentData = (formData as Record<string, unknown>)[parent] ?? {};
    setFormData({
      [parent]: { ...(parentData as Record<string, unknown>), [field]: value },
    });
  };

  // ── Helper: Update an item inside an array field ──
  const updateArrayField = (
    parent: keyof InvitationContent,
    index: number,
    field: string,
    value: string,
  ) => {
    const currentArray = [...((formData[parent] as unknown[]) || [])];
    currentArray[index] = {
      ...(currentArray[index] as Record<string, unknown>),
      [field]: value,
    };
    setFormData({ [parent]: currentArray });
  };

  // ── Helper: Add a new item to an array field ──
  const addArrayItem = (
    parent: keyof InvitationContent,
    template: Record<string, string>,
  ) => {
    const currentArray = [...((formData[parent] as unknown[]) || [])];
    currentArray.push(template);
    setFormData({ [parent]: currentArray });
  };

  // ── Helper: Remove an item from an array field ──
  const removeArrayItem = (parent: keyof InvitationContent, index: number) => {
    const currentArray = [...((formData[parent] as unknown[]) || [])];
    currentArray.splice(index, 1);
    setFormData({ [parent]: currentArray });
  };

  return (
    <aside
      className="flex flex-col h-full w-full shrink-0 border-r border-[#E5E0D8]"
      style={{ backgroundColor: "var(--color-background, #F8F5F0)" }}
    >
      {/* ── HEADER & GLOBAL SETTINGS ── */}
      <div className="p-6 space-y-6 shrink-0 border-b border-[#E5E0D8]/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#D4AF97] rounded-lg text-white shadow-sm">
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

        <div className="space-y-2">
            <Label className="text-[9px] font-black uppercase text-slate-500 flex items-center gap-2">
              <Palette className="size-3 text-[#D4AF97]" /> Template
            </Label>
            <Select value={activeTemplate} onValueChange={setActiveTemplate}>
              <SelectTrigger className="h-10 rounded-xl bg-white border-slate-200 text-xs font-bold shadow-sm focus:ring-[#D4AF97]">
                <SelectValue placeholder="Pilih Template" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {templates.map((t) => (
                  <SelectItem key={t.id} value={t.title}> 
                    {t.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-[9px] font-black uppercase text-slate-500 flex items-center gap-2">
              <Music className="size-3 text-[#D4AF97]" /> Musik Latar
            </Label>
            <Select
              value={formData.music_url}
              onValueChange={(v) => setFormData({ music_url: v })}
            >
              <SelectTrigger className="h-10 rounded-xl bg-white border-slate-200 text-xs font-bold shadow-sm focus:ring-[#D4AF97]">
                <SelectValue placeholder="Pilih Musik" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {musics.map((m) => (
                  <SelectItem key={m.id} value={m.url}>
                    {m.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
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
                Nama Lengkap & Gelar
              </Label>
              <Input
                value={formData.mempelai_pria?.nama || ""}
                onChange={(e) =>
                  updateField("mempelai_pria", "nama", e.target.value)
                }
                placeholder="Contoh: Aditya Pratama, S.Kom"
                className="rounded-xl border-slate-200 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Nama Ayah
                </Label>
                <Input
                  value={formData.mempelai_pria?.ortu_ayah || ""}
                  onChange={(e) =>
                    updateField("mempelai_pria", "ortu_ayah", e.target.value)
                  }
                  placeholder="Nama ayah"
                  className="rounded-xl bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Nama Ibu
                </Label>
                <Input
                  value={formData.mempelai_pria?.ortu_ibu || ""}
                  onChange={(e) =>
                    updateField("mempelai_pria", "ortu_ibu", e.target.value)
                  }
                  placeholder="Nama ibu"
                  className="rounded-xl bg-white"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Instagram
              </Label>
              <Input
                value={formData.mempelai_pria?.instagram || ""}
                onChange={(e) =>
                  updateField("mempelai_pria", "instagram", e.target.value)
                }
                placeholder="@username"
                className="rounded-xl bg-white"
              />
            </div>
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════
            Section: Mempelai Wanita
        ═══════════════════════════════════════════ */}
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
                Nama Lengkap & Gelar
              </Label>
              <Input
                value={formData.mempelai_wanita?.nama || ""}
                onChange={(e) =>
                  updateField("mempelai_wanita", "nama", e.target.value)
                }
                placeholder="Contoh: Aura Putri Kusuma, B.A"
                className="rounded-xl border-slate-200 bg-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Nama Ayah
                </Label>
                <Input
                  value={formData.mempelai_wanita?.ortu_ayah || ""}
                  onChange={(e) =>
                    updateField("mempelai_wanita", "ortu_ayah", e.target.value)
                  }
                  placeholder="Nama ayah"
                  className="rounded-xl bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Nama Ibu
                </Label>
                <Input
                  value={formData.mempelai_wanita?.ortu_ibu || ""}
                  onChange={(e) =>
                    updateField("mempelai_wanita", "ortu_ibu", e.target.value)
                  }
                  placeholder="Nama ibu"
                  className="rounded-xl bg-white"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Instagram
              </Label>
              <Input
                value={formData.mempelai_wanita?.instagram || ""}
                onChange={(e) =>
                  updateField("mempelai_wanita", "instagram", e.target.value)
                }
                placeholder="@username"
                className="rounded-xl bg-white"
              />
            </div>
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════
            Section: Jadwal Acara
        ═══════════════════════════════════════════ */}
        <SectionCard
          title="Jadwal Acara"
          icon={CalendarDays}
          isActive={activeSection === "acara"}
          onClick={() =>
            setActiveSection(activeSection === "acara" ? "" : "acara")
          }
        >
          <div className="flex flex-col gap-6">
            {formData.acara?.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50 relative group"
              >
                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => removeArrayItem("acara", idx)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="size-3.5" />
                </button>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Tipe Acara
                  </Label>
                  <Input
                    value={item.tipe}
                    onChange={(e) =>
                      updateArrayField("acara", idx, "tipe", e.target.value)
                    }
                    placeholder="Akad / Resepsi"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Tanggal
                    </Label>
                    <Input
                      type="date"
                      value={item.tanggal}
                      onChange={(e) =>
                        updateArrayField(
                          "acara",
                          idx,
                          "tanggal",
                          e.target.value,
                        )
                      }
                      className="h-8 rounded-lg bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      Jam
                    </Label>
                    <Input
                      type="time"
                      value={item.jam}
                      onChange={(e) =>
                        updateArrayField("acara", idx, "jam", e.target.value)
                      }
                      className="h-8 rounded-lg bg-white"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Nama Lokasi
                  </Label>
                  <Input
                    value={item.lokasi}
                    onChange={(e) =>
                      updateArrayField("acara", idx, "lokasi", e.target.value)
                    }
                    placeholder="Grand Ballroom Hotel XYZ"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Alamat Lengkap
                  </Label>
                  <Textarea
                    value={item.alamat_lengkap}
                    onChange={(e) =>
                      updateArrayField(
                        "acara",
                        idx,
                        "alamat_lengkap",
                        e.target.value,
                      )
                    }
                    placeholder="Jl. Contoh No. 123, Kota, Provinsi"
                    className="min-h-[60px] rounded-lg bg-white resize-none text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Link Google Maps
                  </Label>
                  <Input
                    value={item.link_maps}
                    onChange={(e) =>
                      updateArrayField(
                        "acara",
                        idx,
                        "link_maps",
                        e.target.value,
                      )
                    }
                    placeholder="https://maps.google.com/..."
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl border-dashed border-[#D4AF97] text-[#D4AF97] hover:bg-[#F8F5F0]"
              onClick={() =>
                addArrayItem("acara", {
                  tipe: "",
                  tanggal: "",
                  jam: "",
                  lokasi: "",
                  alamat_lengkap: "",
                  link_maps: "",
                })
              }
            >
              <Plus className="size-4 mr-2" /> Tambah Acara
            </Button>
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════
            Section: Cerita Cinta (Love Story)
        ═══════════════════════════════════════════ */}
        <SectionCard
          title="Cerita Cinta"
          icon={BookHeart}
          isActive={activeSection === "love_story"}
          onClick={() =>
            setActiveSection(activeSection === "love_story" ? "" : "love_story")
          }
        >
          <div className="flex flex-col gap-6">
            {formData.love_story?.map((story, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50 relative group"
              >
                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => removeArrayItem("love_story", idx)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="size-3.5" />
                </button>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Tahun
                  </Label>
                  <Input
                    value={story.tahun}
                    onChange={(e) =>
                      updateArrayField(
                        "love_story",
                        idx,
                        "tahun",
                        e.target.value,
                      )
                    }
                    placeholder="2020"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Cerita
                  </Label>
                  <Textarea
                    value={story.cerita}
                    onChange={(e) =>
                      updateArrayField(
                        "love_story",
                        idx,
                        "cerita",
                        e.target.value,
                      )
                    }
                    placeholder="Ceritakan momen spesial kalian..."
                    className="min-h-[80px] rounded-lg bg-white resize-none text-xs"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    URL Foto (Opsional)
                  </Label>
                  <Input
                    value={story.foto || ""}
                    onChange={(e) =>
                      updateArrayField(
                        "love_story",
                        idx,
                        "foto",
                        e.target.value,
                      )
                    }
                    placeholder="https://example.com/foto.jpg"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl border-dashed border-[#D4AF97] text-[#D4AF97] hover:bg-[#F8F5F0]"
              onClick={() =>
                addArrayItem("love_story", {
                  tahun: "",
                  cerita: "",
                  foto: "",
                })
              }
            >
              <Plus className="size-4 mr-2" /> Tambah Cerita
            </Button>
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════
            Section: Galeri Foto
        ═══════════════════════════════════════════ */}
        <SectionCard
          title="Galeri Foto"
          icon={ImageIcon}
          isActive={activeSection === "gallery"}
          onClick={() =>
            setActiveSection(activeSection === "gallery" ? "" : "gallery")
          }
        >
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-3 gap-2">
              {formData.gallery?.map((url, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-lg bg-slate-200 overflow-hidden relative group"
                >
                  <img
                    src={url}
                    alt="Gallery"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const newGallery = [...(formData.gallery || [])];
                      newGallery.splice(idx, 1);
                      setFormData({ gallery: newGallery });
                    }}
                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                  >
                    <Trash2 className="size-4 text-white" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className="aspect-square rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-400 hover:border-[#D4AF97] hover:text-[#D4AF97] transition-colors"
                onClick={() => {
                  const url = prompt("Masukkan URL foto:");
                  if (url) {
                    setFormData({
                      gallery: [...(formData.gallery || []), url],
                    });
                  }
                }}
              >
                <Plus size={20} />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-bold">
              Maksimal 12 Foto
            </p>
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════
            Section: Amplop Digital (Digital Envelope)
        ═══════════════════════════════════════════ */}
        <SectionCard
          title="Amplop Digital"
          icon={Wallet}
          isActive={activeSection === "digital_envelope"}
          onClick={() =>
            setActiveSection(
              activeSection === "digital_envelope" ? "" : "digital_envelope",
            )
          }
        >
          <div className="flex flex-col gap-6">
            {formData.digital_envelope?.map((envelope, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-4 rounded-xl border border-slate-100 bg-slate-50/50 relative group"
              >
                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => removeArrayItem("digital_envelope", idx)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="size-3.5" />
                </button>

                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Nama Bank
                  </Label>
                  <Input
                    value={envelope.bank_name}
                    onChange={(e) =>
                      updateArrayField(
                        "digital_envelope",
                        idx,
                        "bank_name",
                        e.target.value,
                      )
                    }
                    placeholder="BCA / Mandiri / BNI / dll"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Nomor Rekening
                  </Label>
                  <Input
                    value={envelope.account_number}
                    onChange={(e) =>
                      updateArrayField(
                        "digital_envelope",
                        idx,
                        "account_number",
                        e.target.value,
                      )
                    }
                    placeholder="1234567890"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Atas Nama
                  </Label>
                  <Input
                    value={envelope.account_holder}
                    onChange={(e) =>
                      updateArrayField(
                        "digital_envelope",
                        idx,
                        "account_holder",
                        e.target.value,
                      )
                    }
                    placeholder="Nama pemilik rekening"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    URL QRIS (Opsional)
                  </Label>
                  <Input
                    value={envelope.qris_url || ""}
                    onChange={(e) =>
                      updateArrayField(
                        "digital_envelope",
                        idx,
                        "qris_url",
                        e.target.value,
                      )
                    }
                    placeholder="https://example.com/qris.png"
                    className="h-8 rounded-lg bg-white"
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl border-dashed border-[#D4AF97] text-[#D4AF97] hover:bg-[#F8F5F0]"
              onClick={() =>
                addArrayItem("digital_envelope", {
                  bank_name: "",
                  account_number: "",
                  account_holder: "",
                  qris_url: "",
                })
              }
            >
              <Plus className="size-4 mr-2" /> Tambah Rekening
            </Button>
          </div>
        </SectionCard>

        {/* ═══════════════════════════════════════════
            Section: Dress Code
        ═══════════════════════════════════════════ */}
        <SectionCard
          title="Dress Code"
          icon={Shirt}
          isActive={activeSection === "dress_code"}
          onClick={() =>
            setActiveSection(activeSection === "dress_code" ? "" : "dress_code")
          }
        >
          <div className="flex flex-col gap-4">
            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Warna / Tema Pakaian
              </Label>
              <Input
                value={formData.dress_code || ""}
                onChange={(e) => setFormData({ dress_code: e.target.value })}
                placeholder="Contoh: Pastel / Earth Tone / Hitam & Putih"
                className="rounded-xl border-slate-200 bg-white"
              />
            </div>
          </div>
        </SectionCard>
      </div>

      {/* ── FOOTER STATUS ── */}
      <div className="p-4 border-t border-[#E5E0D8]/50 flex items-center justify-between px-6 bg-[#FDFCFB]">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">
          Auto-sync Active
        </span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
          <span className="text-[9px] font-black uppercase text-green-600">
            Connected
          </span>
        </div>
      </div>
    </aside>
  );
}
