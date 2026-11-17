"use client";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { PropsWithChildren } from "react";

const variants = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: "blur(4px)",
  },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(4px)",
  },
};

export function PageTransitionProvider({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      // Cover'ın flex kolonunda araya girdiği için sayfaların flex-1'i korunur
      className="flex min-h-0 flex-1 flex-col"
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
}
