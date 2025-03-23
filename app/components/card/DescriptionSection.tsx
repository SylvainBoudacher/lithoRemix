import { motion } from "framer-motion";
import React from "react";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

interface DescriptionSectionProps {
  description: string | null | undefined;
}

export const DescriptionSection: React.FC<DescriptionSectionProps> = ({
  description,
}) => {
  if (!description) return null;

  return (
    <motion.div
      className="w-full bg-white rounded-lg shadow-md p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Label
        htmlFor="description"
        className="text-black font-bold text-lg mb-2 block"
      >
        Description
      </Label>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Textarea
          id="description"
          value={description}
          readOnly
          className="min-h-20 bg-gray-50 focus:bg-white"
        />
      </motion.div>
    </motion.div>
  );
};
