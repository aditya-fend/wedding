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

  // Content data is stored as JSON in Prisma, cast it to InvitationContent
  const data = invitation.contentData as unknown as InvitationContent;

  return (
    <PublicInvitationClient 
      data={data} 
      templateId={invitation.template?.id || "aura-dark"} 
    />
  );
}
