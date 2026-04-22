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

export const defaultFormData: InvitationContent = {
  mempelai_pria: { nama: "", ortu_ayah: "", ortu_ibu: "" },
  mempelai_wanita: { nama: "", ortu_ayah: "", ortu_ibu: "" },
  acara: [],
  love_story: [],
  gallery: [],
  digital_envelope: [],
  guest_wishes: [],
  music_url: "",
  rsvp_url: "",
  rsvp_note: "",
  countdown_date: "",
  additional_info: "",
  cover_title: "",
  cover_subtitle: "",
  closing_message: "",
  dress_code: "Formal",
  dress_code_description: "",
  dress_code_color: "#D4AF37",
  dress_code_colors: ["#D4AF37"],
  additional_info_list: [],
};

export const useEditorStore = create<EditorState>((set) => ({
  formData: defaultFormData,
  invitationId: "",
  activeSection: "cover",
  activeTemplate: "",
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
