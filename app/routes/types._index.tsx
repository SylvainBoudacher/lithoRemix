import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { countTypes } from "~/api/types/countTypes";
import CardKpi from "~/components/card/kpiCard";
import { translationPath } from "~/root";

export const loader = async () => {
  const types = await countTypes();
  return json({ types });
};

export default function TypeIndex() {
  const { types } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-row gap-8 mt-10">
      {Object.entries(types).map(([key, value]) => (
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