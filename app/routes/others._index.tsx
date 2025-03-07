import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { countOtherParams } from "~/api/otherParams/countOther";
import CardKpi from "~/components/card/kpiCard";
import { translationPath } from "~/root";

export const loader = async () => {
  const otherParams = await countOtherParams();
  return json({ otherParams });
};

export default function OtherIndex() {
  const { otherParams } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-row gap-8 mt-10">
      {Object.entries(otherParams).map(([key, value]) => (
        <CardKpi 
          key={key} 
          title={translationPath.find(t => t.path === key)?.translation || key} 
          value={value} 
          description={`Nombre de ${translationPath.find(t => t.path === key)?.translation || key}`} 
        />
      ))}
    </div>
  );
}
