import { data } from "@/lib/dummy/data";
import { templateRegistry } from "@/lib/templateRegistry";

export default function Page({ params }: { params: { template: string } }) {
  const Template = templateRegistry[params.template];

  if (!Template) return <div>Template tidak ditemukan</div>;

  return <Template data={data} />;
}