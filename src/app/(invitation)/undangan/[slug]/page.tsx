import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { InvitationContent } from "@/types/invitation";
import PublicInvitationClient from "@/app/(user)/v/[slug]/PublicInvitationClient";

interface InvitationPageProps {
  params: Promise<{ slug: string }>;
}

export default async function InvitationPage({ params }: InvitationPageProps) {
  const { slug } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    include: { template: true },
  });

  if (!invitation) notFound();

  const data = invitation.contentData as unknown as InvitationContent;

  // Normalize template name: "Nero Gold" → "NeroGold"
  const normalizeTemplateName = (title: string) => {
    return title.replace(/\s+/g, "");
  };

  const templateId = invitation.template?.title
    ? normalizeTemplateName(invitation.template.title).toLowerCase()
    : "pink";

  return <PublicInvitationClient data={data} templateId={templateId} />;
}
