// hooks/useAutoSave.ts
import { useEffect, useRef } from "react";
import { useEditorStore } from "@/store/useEditorStore";
import { saveInvitation } from "@/lib/actions/invitation";

export const useAutoSave = () => {
  const { formData, invitationId, setIsSaving } = useEditorStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Jangan save jika ID belum ada (data baru)
    if (!invitationId) return;

    // Bersihkan timer sebelumnya (debouncing)
    if (timerRef.current) clearTimeout(timerRef.current);

    setIsSaving(true);

    timerRef.current = setTimeout(async () => {
      const result = await saveInvitation(invitationId, formData);
      if (result.success) {
        console.log("Auto-saved successfully");
      }
      setIsSaving(false);
    }, 2000); // Save setelah 2 detik berhenti mengetik

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [formData, invitationId]);
};