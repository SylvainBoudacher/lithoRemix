import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { countEffects } from "~/api/effects/countEffects";
import CardKpi from "~/components/card/kpiCard";
import { translationPath } from "~/root";

export const loader = async () => {
  const effects = await countEffects();
  return json({ effects });
};

export default function Effets() {
  const { effects } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-row gap-8 mt-10">
      {Object.entries(effects).map(([key, value]) => (
        <CardKpi 
          key={key} 
          title={translationPath.find(t => t.path === key)?.translation || key} 
          value={value} 
          description={`Nombre d'effets ${translationPath.find(t => t.path === key)?.translation || key}`} 
        />
      ))}
    </div>
  );
}
