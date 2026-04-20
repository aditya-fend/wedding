// /lib/templateRegistry.ts
import Royal from "@/components/templates/royal/Royal";
import { InvitationContent } from "@/types/invitation";

export type TemplateComponent = React.ComponentType<{
  data: InvitationContent;
  invitationId?: string;
}>;

// Gunakan keys dalam lowercase untuk kompatibilitas pencarian
export const templateRegistry: Record<string, TemplateComponent> = {
  royal: Royal,
};

// getTemplate sekarang merujuk ke registry yang sama untuk konsistensi
export const getTemplate = templateRegistry;
