import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface TwoColumnGridProps {
  children: ReactNode;
}

export const TwoColumnGrid: React.FC<TwoColumnGridProps> = ({ children }) => {
  // Convertir les enfants en tableau
  const childrenArray = React.Children.toArray(children);

  // Filtrer les éléments nuls ou falsy
  const validChildren = childrenArray.filter(Boolean);

  // Variants pour l'animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {validChildren.map((child, index) => (
        <motion.div
          key={index}
          className="w-full"
          variants={itemVariants}
          transition={{
            duration: 0.4,
            // Ajouter un délai supplémentaire pour les éléments de droite (impairs)
            delay: index % 2 === 1 ? 0.1 : 0,
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
