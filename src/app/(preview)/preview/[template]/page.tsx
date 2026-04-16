import { data } from "@/lib/dummy/data";
import { templateRegistry } from "@/lib/templateRegistry";

export default async function Page({
  params,
}: {
  params: Promise<{ template: string }>;
}) {
  const { template } = await params;

  const Template = templateRegistry[template];

  if (!Template) return <div>Template tidak ditemukan</div>;

  return <Template data={data} />;
}
