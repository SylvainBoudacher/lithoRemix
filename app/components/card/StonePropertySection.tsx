/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import {
  Bone,
  BookHeart,
  Flower,
  Leaf,
  Shell,
  ShieldAlert,
  Sun,
  TriangleDashed,
} from "lucide-react";
import React from "react";
import { Badge } from "../ui/badge";
import { PropertyCard } from "./PropertyCard";

interface StonePropertySectionProps {
  title: string;
  items: any[];
  propertyKey: string;
  idKey?: string;
}

export const StonePropertySection: React.FC<StonePropertySectionProps> = ({
  title,
  items,
  propertyKey,
  idKey = "id",
}) => {
  if (!items || items.length === 0) return null;

  // Animation pour les badges
  const badgeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  const iconPerType = {
    purification: <Sun size={16} />,
    rechargement: <Leaf size={16} />,
    corporels: <Bone size={16} />,
    spirituels: <Flower size={16} />,
    emotionnels: <BookHeart size={16} />,
    chakras: <Shell size={16} />,
    contraindications: <ShieldAlert size={16} />,
    formes: <TriangleDashed size={16} />,
  };

  return (
    <PropertyCard>
      <div className="w-full">
        <p className="text-black font-bold text-md pb-3 flex flex-row items-center gap-2">
          {title} {iconPerType[title.toLowerCase() as keyof typeof iconPerType]}
        </p>
        <div className="flex flex-row flex-wrap gap-2">
          {items.map((item, index) => (
            <motion.div
              key={item[idKey]}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={badgeVariants}
            >
              <Badge variant="secondary">{item[propertyKey]}</Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </PropertyCard>
  );
};
