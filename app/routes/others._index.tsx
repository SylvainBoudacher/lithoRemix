import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { motion } from "framer-motion";
import { countOtherParams } from "~/api/otherParams/countOther";
import CardKpi from "~/components/card/kpiCard";
import { translationPath } from "~/root";

export const loader = async () => {
  const otherParams = await countOtherParams();
  return json({ otherParams });
};

export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// Variantes d'animation pour chaque carte
export const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    x: -30,
    rotateY: 45,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    rotateY: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    x: 50,
    transition: {
      duration: 0.3,
    },
  },
};

export default function OtherIndex() {
  const { otherParams } = useLoaderData<typeof loader>();

  // Variantes d'animation pour le conteneur

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-row gap-8 mt-10"
    >
      {Object.entries(otherParams).map(([key, value]) => (
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
