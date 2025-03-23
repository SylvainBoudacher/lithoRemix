import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { countTypes } from "~/api/types/countTypes";
import CardKpi from "~/components/card/kpiCard";
import { translationPath } from "~/root";
import { cardVariants, containerVariants } from "./others._index";

export const loader = async () => {
  const types = await countTypes();
  return json({ types });
};

export default function TypeIndex() {
  const { types } = useLoaderData<typeof loader>();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-row gap-8 mt-10"
    >
      {Object.entries(types).map(([key, value]) => (
        <motion.div key={key} variants={cardVariants}>
          <CardKpi
            title={
              translationPath.find((t) => t.path === key)?.translation || key
            }
            value={value}
            description={`Nombre de ${
              translationPath.find((t) => t.path === key)?.translation || key
            }`}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
