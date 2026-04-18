import { prisma } from "@/lib/prisma";

export async function getTemplates() {
  return await prisma.template.findMany({
    orderBy: { title: "asc" },
  });
}