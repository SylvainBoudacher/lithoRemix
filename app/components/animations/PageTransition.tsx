import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimationVariant =
  | "fade"
  | "slide"
  | "scale"
  | "rotate"
  | "cards"
  | "fancy";

interface PageTransitionProps {
  children: ReactNode;
  variant?: AnimationVariant;
  className?: string;
}

const fadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const slideVariants = {
  hidden: { x: -300, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 120,
    },
  },
  exit: {
    x: 300,
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut" as const,
    },
  },
};

const scaleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 200,
    },
  },
  exit: {
    scale: 0.95,
    opacity: 0,
    transition: { duration: 0.3 },
  },
};

const rotateVariants = {
  hidden: {
    rotateY: 90,
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    rotateY: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 80,
    },
  },
  exit: {
    rotateY: -90,
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.4 },
  },
};

const cardsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
};

const fancyVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(20px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 1, 0.5, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    filter: "blur(10px)",
    transition: {
      duration: 0.5,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

const getVariants = (variant: AnimationVariant) => {
  switch (variant) {
    case "fade":
      return fadeVariants;
    case "slide":
      return slideVariants;
    case "scale":
      return scaleVariants;
    case "rotate":
      return rotateVariants;
    case "cards":
      return cardsVariants;
    case "fancy":
      return fancyVariants;
    default:
      return fadeVariants;
  }
};

export const PageTransition = ({
  children,
  variant = "fade",
  className = "",
}: PageTransitionProps) => {
  const variants = getVariants(variant);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Composant pour les éléments enfants de "cards"
export const CardItem = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  const cardItemVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 30,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div variants={cardItemVariants} className={className}>
      {children}
    </motion.div>
  );
};
