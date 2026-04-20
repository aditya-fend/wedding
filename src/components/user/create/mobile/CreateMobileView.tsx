"use client";

import * as React from "react";
import { useEditorStore } from "@/store/useEditorStore";
import { updateInvitationContent } from "@/lib/actions/invitation";
import { useDebouncedCallback } from "use-debounce";
import { EditorSidebar } from "../desktop/EditorSidebar";
import { LivePreview } from "../desktop/LivePreview";
import { InvitationContent } from "@/types/invitation";
import { Music, Template } from "@prisma/client";
import { Play, X, Eye, Sparkles, Loader2, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CreateMobileViewProps {
  templates: Template[];
  musics: Music[];
  invitationId: string;
  initialData: InvitationContent;
  initialTemplate: string;
  slug: string;
}

export default function CreateMobileView({
  templates,
  musics,
  invitationId,
  initialData,
  initialTemplate,
}: CreateMobileViewProps) {
  const {
    formData,
    setFormData,
    setInvitationId,
    setIsSaving,
    activeTemplate,
    setActiveTemplate,
  } = useEditorStore();

  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  // 1. Sinkronisasi Awal (Hanya dijalankan sekali saat mount)
  React.useEffect(() => {
    if (initialData && !hasData) {
      setFormData(initialData);
      setInvitationId(invitationId);
      setActiveTemplate(initialTemplate);
    }
  }, [
    initialData,
    invitationId,
    initialTemplate,
    setFormData,
    setInvitationId,
    setActiveTemplate,
  ]);

  // 2. Logika Auto-save (Debounced 1.5 detik)
  const debouncedSave = useDebouncedCallback(
    async (data: InvitationContent, template: string) => {
      setIsSaving(true);
      try {
        await updateInvitationContent(invitationId, data, template);
      } catch (error) {
        console.error("Auto-save failed:", error);
      } finally {
        // Beri delay sedikit agar user merasa progressnya nyata
        setTimeout(() => setIsSaving(false), 800);
      }
    },
    1500,
  );

  // Trigger Save ketika data atau template berubah
  React.useEffect(() => {
    if (formData && (Object.keys(formData).length > 0 || activeTemplate)) {
      debouncedSave(formData, activeTemplate);
    }
  }, [formData, activeTemplate, debouncedSave]);

  // Handle Loading State yang lebih premium
  if (!formData || Object.keys(formData).length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#FDFCFB]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[#D4AF97]/20 blur-xl rounded-full animate-pulse" />
            <Loader2 className="size-10 text-[#D4AF97] animate-spin relative" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-[10px] font-black tracking-[0.4em] text-[#2C2C2C] uppercase">
              Synchronizing Engine
            </p>
            <div className="flex gap-1 justify-center">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="size-1 rounded-full bg-[#D4AF97]/40 animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const hasData = formData && Object.keys(formData).length > 0;

  return (
    <div className="flex flex-col max-h-screen bg-[#F8F5F0] overflow-hidden relative">

      {/* ── SCROLLABLE EDITOR AREA ── */}
      <div className="flex-1 overflow-y-auto no-scrollbar min-h-0 bg-[#F8F5F0] pt-16">
        <EditorSidebar templates={templates} musics={musics} />
      </div>

      {/* ── FLOATING ACTION BUTTON ── */}
      <div className="absolute bottom-8 right-6 z-[100] pointer-events-none">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsPreviewOpen(true)}
          className="pointer-events-auto group relative size-16 flex items-center justify-center rounded-full bg-[#2C2C2C] text-white shadow-[0_20px_50px_rgba(0,0,0,0.2)] border-[3px] border-white overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF97]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Play size={24} className="fill-white ml-1 relative z-10" />
        </motion.button>
      </div>

      {/* ── FULLSCREEN PREVIEW MODAL ── */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] backdrop-blur-2xl flex flex-col pt-safe"
          >
            {/* Header Modal */}
            <div className="flex items-center justify-between px-6 py-6">
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="size-11 flex items-center justify-center bg-black/50 hover:bg-white/20 rounded-2xl text-white transition-all active:scale-90"
              >
                <X size={20} />
              </button>
            </div>

            {/* Container Preview (Memanggil Component LivePreview Anda) */}
            <div className="flex-1 overflow-hidden relative">
              <LivePreview />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
