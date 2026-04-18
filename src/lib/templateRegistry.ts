// /lib/templateRegistry.ts
import NeroGold from "@/components/templates/NeroGold";
import AuraDark from "@/components/templates/AuraDark";
import Pink from "@/components/templates/Pink";

export const templateRegistry = {
  nerogold: NeroGold,
  auradark: AuraDark,
  pink: Pink,
};

export const getTemplate: Record<string, React.ComponentType<unknown>> = {
  AuraDark,
  NeroGold,
  Pink,
};
