import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { countEffects } from "~/api/effects/countEffects";
import CardKpi from "~/components/card/kpiCard";
import { translationPath } from "~/root";
import { cardVariants, containerVariants } from "./others._index";

export const loader = async () => {
  const effects = await countEffects();
  return json({ effects });
};

export default function EffetsIndex() {
  const { effects } = useLoaderData<typeof loader>();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-row gap-8 mt-10"
    >
      {Object.entries(effects).map(([key, value]) => (
        <motion.div key={key} variants={cardVariants}>
          <CardKpi
            title={
              translationPath.find((t) => t.path === key)?.translation || key
            }
            value={value}
            description={`Nombre d'effets ${
              translationPath.find((t) => t.path === key)?.translation || key
            }`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
