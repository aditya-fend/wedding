import { create } from "zustand";
import { InvitationContent } from "@/types/invitation";
import { SectionId } from "@/components/user/create/desktop/constants";

interface EditorState {
  formData: InvitationContent;
  invitationId: string;
  activeSection: SectionId;
  activeTemplate: string;

  isSaving: boolean;

  setFormData: (data: Partial<InvitationContent>) => void;
  setInvitationId: (id: string) => void;
  setActiveSection: (section: SectionId) => void;
  setActiveTemplate: (templateId: string) => void;
  setIsSaving: (status: boolean) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  formData: {
    mempelai_pria: { nama: "", ortu_ayah: "", ortu_ibu: "" },
    mempelai_wanita: { nama: "", ortu_ayah: "", ortu_ibu: "" },
    acara: [],
    love_story: [],
    gallery: [],
    digital_envelope: [],
    dress_code: "",
  } as InvitationContent,
  invitationId: "",
  activeSection: "mempelai_pria",
  activeTemplate: "aura-dark",
  isSaving: false,

  setFormData: (update) =>
    set((state) => ({
      formData: { ...state.formData, ...update },
    })),

  setInvitationId: (id) => set({ invitationId: id }),
  setActiveSection: (section) => set({ activeSection: section }),
  setActiveTemplate: (templateId) => set({ activeTemplate: templateId }),
  setIsSaving: (status) => set({ isSaving: status }),
}));
