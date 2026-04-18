import { prisma } from "@/lib/prisma";

export async function getTemplates() {
  return await prisma.template.findMany({
    orderBy: { title: "asc" },
  });
}

export async function getTemplateCategories() {
  const templates = await prisma.template.findMany({
    select: { category: true },
    distinct: ["category"],
    orderBy: { category: "asc" },
  });
  
  return templates.map((t) => t.category).filter(Boolean);
}