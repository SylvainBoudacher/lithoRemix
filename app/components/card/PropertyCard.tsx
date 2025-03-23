import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface PropertyCardProps {
  children: ReactNode;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ children }) => {
  return (
    <motion.div
      className="bg-white rounded-lg border border-gray-100 shadow-md p-4 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};
