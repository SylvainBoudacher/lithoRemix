/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import React from "react";
import { Badge } from "./Badge";
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

  return (
    <PropertyCard>
      <div className="w-full">
        <p className="text-black font-bold text-lg pb-3">{title}</p>
        <div className="flex flex-row flex-wrap gap-2">
          {items.map((item, index) => (
            <motion.div
              key={item[idKey]}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={badgeVariants}
            >
              <Badge>{item[propertyKey]}</Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </PropertyCard>
  );
};
