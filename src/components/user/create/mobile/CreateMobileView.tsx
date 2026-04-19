"use client";

import * as React from "react";
import { useEditorStore } from "@/store/useEditorStore";
import { updateInvitationContent } from "@/lib/actions/invitation";
import { useDebouncedCallback } from "use-debounce";
import { EditorSidebar } from "../desktop/EditorSidebar";
import { LivePreview } from "../desktop/LivePreview";
import { InvitationContent } from "@/types/invitation";
import { Music, Template } from "@prisma/client";
import { Play, X, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface CreateMobileViewProps {
  templates: Template[];
  musics: Music[];
  invitationId: string;
  initialData: InvitationContent;
  slug: string;
}

export default function CreateMobileView({
  templates,
  musics,
  invitationId,
  initialData,
}: CreateMobileViewProps) {
  const { formData, setFormData, setInvitationId, setIsSaving } =
    useEditorStore();
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

  // 1. Sinkronisasi (Hanya jika data berubah/berbeda)
  React.useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setInvitationId(invitationId);
    }
  }, [initialData, invitationId, setFormData, setInvitationId]);

  // 2. Logika Auto-save (Debounced)
  const debouncedSave = useDebouncedCallback(
    async (data: InvitationContent) => {
      setIsSaving(true);
      try {
        await updateInvitationContent(invitationId, data);
      } catch (error) {
        console.error("Auto-save failed:", error);
      } finally {
        setIsSaving(false);
      }
    },
    1500,
  );

  React.useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      debouncedSave(formData);
    }
  }, [formData, debouncedSave]);

  // Loading hanya jika data benar-benar belum ada sama sekali
  if (!formData || Object.keys(formData).length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#F8F5F0]">
        <div className="flex flex-col items-center gap-4">
          <div className="size-10 border-4 border-[#D4AF97] border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-bold tracking-[0.3em] text-slate-400 uppercase">
            Synchronizing...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#F8F5F0] overflow-hidden relative">
      
      {/* Scrollable Editor Area */}
      <div className="flex-1 h-1 overflow-y-auto pb-24">
        <EditorSidebar templates={templates} musics={musics} />
      </div>

      {/* Floating Play Button */}
      <div className="absolute bottom-6 right-6 z-[100]">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsPreviewOpen(true)}
          className="size-16 bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white"
        >
          <Play size={24} className="fill-white ml-1" />
        </motion.button>
      </div>

      {/* Fullscreen Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-xl flex flex-col pt-10"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 pb-6">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl text-white">
                    <Eye size={18} />
                  </div>
                  <h3 className="text-white font-bold tracking-widest text-xs uppercase">Live Preview</h3>
               </div>
               <button 
                onClick={() => setIsPreviewOpen(false)}
                className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl text-white transition-colors"
               >
                 <X size={20} />
               </button>
            </div>

            {/* Simulator Container */}
            <div className="flex-1 overflow-hidden">
               <LivePreview />
            </div>

            {/* Modal Bottom Tip */}
            <div className="p-6 text-center">
               <p className="text-white/60 text-[10px] font-medium tracking-wide">
                 Gulir ke atas/bawah pada simulasi ponsel untuk navigasi.
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
