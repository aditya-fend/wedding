"use client";

import * as React from "react";
import { useEditorStore } from "@/store/useEditorStore";
import { updateInvitationContent } from "@/lib/actions/invitation";
import { useDebouncedCallback } from "use-debounce";
import { EditorSidebar } from "./EditorSidebar";
import { LivePreview } from "./LivePreview";
import { InvitationContent } from "@/types/invitation";
import { Music, Template } from "@prisma/client";
import Link from "next/link";

interface CreateDesktopViewProps {
  templates: Template[];
  musics: Music[];
  invitationId: string;
  initialData: InvitationContent;
  initialTemplate: string;
  slug: string;
}

export default function CreateDesktopView({
  templates,
  musics,
  invitationId,
  initialData,
  initialTemplate,
}: CreateDesktopViewProps) {
  const {
    formData,
    setFormData,
    setInvitationId,
    setIsSaving,
    activeTemplate,
    setActiveTemplate,
  } = useEditorStore();
  const [isReady, setIsReady] = React.useState(true);

  // 1. Inisialisasi Store dengan data dari Server (Prisma)
  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setInvitationId(invitationId);
      setActiveTemplate(initialTemplate);
      setIsReady(true);
    }
  }, [
    initialData,
    invitationId,
    initialTemplate,
    setFormData,
    setInvitationId,
    setActiveTemplate,
  ]);

  // 2. Logika Auto-save (Debounced)
  const debouncedSave = useDebouncedCallback(
    async (data: InvitationContent, template: string) => {
      setIsSaving(true);
      try {
        await updateInvitationContent(invitationId, data, template);
      } catch (error) {
        console.error("Auto-save failed:", error);
      } finally {
        setIsSaving(false);
      }
    },
    1500,
  ); // Jeda 1.5 detik setelah user berhenti mengetik

  // 3. Monitor perubahan formData untuk memicu save
  React.useEffect(() => {
    if (isReady && (Object.keys(formData).length > 0 || activeTemplate)) {
      debouncedSave(formData, activeTemplate);
    }
  }, [formData, activeTemplate, isReady, debouncedSave]);

  if (!isReady) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8F5F0]">
        <div className="flex flex-col items-center gap-4">
          <div className="size-12 border-4 border-[#D4AF97] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            Loading Editor DNA...
          </p>
        </div>
      </div>
    );
  }

  return (
    // h-[calc(100vh-5rem)] memastikan layout tidak melebihi layar setelah dikurangi navbar
    <div className="grid grid-cols-2 h-screen overflow-hidden bg-[#F8F5F0]">
      {/* AREA KIRI: FIXED WIDTH (450px) */}
      <div className="col-span-1 h-full shrink-0 overflow-y-auto">
        <EditorSidebar templates={templates} musics={musics} />
      </div>

      {/* AREA KANAN: FLEX-1 (Mengambil sisa ruang) */}
      <div className="col-span-1 h-full relative flex items-center justify-center p-10 overflow-hidden">
        <LivePreview />
      </div>
    </div>
  );
}
