// /lib/templateRegistry.ts
import NeroGold from "@/components/templates/NeroGold";
import AuraDark from "@/components/templates/AuraDark";
import Pink from "@/components/templates/Pink";
import Royal from "@/components/templates/royal/Royal";
import JawaRoyalKeraton from "@/components/templates/JawaRoyalKeraton";
import SundaAnggunPriangan from "@/components/templates/SundaAnggunPriangan";
import MinangMaharaja from "@/components/templates/MinangMaharaja";
import BaliSacredLuxury from "@/components/templates/BaliSacredLuxury";
import BatakHeritage from "@/components/templates/BatakHeritage";
import BugisGoldenSilk from "@/components/templates/BugisGoldenSilk";
import { InvitationContent } from "@/types/invitation";

export type TemplateComponent = React.ComponentType<{
  data: InvitationContent;
  invitationId?: string;
}>;

// Gunakan keys dalam lowercase untuk kompatibilitas pencarian
export const templateRegistry: Record<string, TemplateComponent> = {
  nerogold: NeroGold,
  auradark: AuraDark,
  pink: Pink,
  royal: Royal,
  jawaroyalkeraton: JawaRoyalKeraton,
  sundaanggunpriangan: SundaAnggunPriangan,
  minangmaharaja: MinangMaharaja,
  balisacredluxury: BaliSacredLuxury,
  batakheritage: BatakHeritage,
  bugisgoldensilk: BugisGoldenSilk,
};

// getTemplate sekarang merujuk ke registry yang sama untuk konsistensi
export const getTemplate = templateRegistry;
