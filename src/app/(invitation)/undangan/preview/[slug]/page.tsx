import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { InvitationContent } from "@/types/invitation";
import PublicInvitationClient from "./PublicInvitationClient"; // Komponen Client baru

interface PublicInvitationPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PublicInvitationPage({
  params,
}: PublicInvitationPageProps) {
  const { slug } = await params;

  const invitation = await prisma.invitation.findUnique({
    where: { slug },
    include: { template: true },
  });

  if (!invitation) notFound();

  const data = invitation.contentData as unknown as InvitationContent;

  const normalizeTemplateName = (title: string) => {
    return title.replace(/\s+/g, "");
  };

  const templateId = invitation.template?.title
    ? normalizeTemplateName(invitation.template.title).toLowerCase()
    : "pink";

  return (
    <PublicInvitationClient
      data={data}
      templateId={templateId}
      invitationId={invitation.id}
    />
  );
}
