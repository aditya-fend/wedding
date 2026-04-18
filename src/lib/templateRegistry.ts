// /lib/templateRegistry.ts
import NeroGold from "@/components/templates/NeroGold";
import AuraDark from "@/components/templates/AuraDark";
import Pink from "@/components/templates/Pink";
import Royal from "@/components/templates/royal/Royal";
import { InvitationContent } from "@/types/invitation";

export type TemplateComponent = React.ComponentType<{
  data: InvitationContent;
}>;

export const templateRegistry = {
  nerogold: NeroGold,
  auradark: AuraDark,
  pink: Pink,
  royal: Royal,
};

export const getTemplate: Record<string, React.ComponentType<unknown>> = {
  AuraDark,
  NeroGold,
  Pink,
  Royal,
};
