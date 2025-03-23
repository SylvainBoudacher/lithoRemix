import { motion } from "framer-motion";
import React, { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`bg-gray-100 rounded-full px-4 py-2 ${className}`}
      whileHover={{
        scale: 1.05,
        backgroundColor: "#f0f0f0",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <p className="text-black font-medium">{children}</p>
    </motion.div>
  );
};
