"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ParallaxBackground() {
  const { scrollY } = useScroll();

  const blobY1 = useTransform(scrollY, [0, 1200], [0, -180]);
  const blobY2 = useTransform(scrollY, [0, 1200], [0, -90]);
  const textY1 = useTransform(scrollY, [0, 1200], [0, -140]);
  const textY2 = useTransform(scrollY, [0, 1200], [0, -60]);
  const ringY = useTransform(scrollY, [0, 1200], [0, -220]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <motion.div
        style={{ y: blobY1 }}
        className="absolute -left-24 top-16 h-[28rem] w-[28rem] rounded-full bg-orange-900/10 blur-3xl"
      />
      <motion.div
        style={{ y: blobY2 }}
        className="absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-stone-300/25 blur-3xl"
      />
      <motion.div
        style={{ y: ringY }}
        className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full border border-neutral-200/60"
      />
      <motion.p
        style={{ y: textY1 }}
        className="absolute right-[8%] top-[18%] select-none font-serif text-[9rem] leading-none text-stone-300/40 md:text-[12rem]"
      >
        Building
      </motion.p>
      <motion.p
        style={{ y: textY2 }}
        className="absolute left-[6%] top-[55%] select-none font-mono text-xs uppercase tracking-[0.4em] text-stone-400/50 md:text-sm"
      >
        Full-Stack · System Design & Architecture · Problem Solving 
      </motion.p>
    </div>
  );
}
