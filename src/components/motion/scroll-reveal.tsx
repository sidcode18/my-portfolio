"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
};

export function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay }}
    >
      {children}
    </motion.div>
  );
}
