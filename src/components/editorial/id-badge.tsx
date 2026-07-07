"use client";

import { motion } from "framer-motion";

type IdBadgeProps = {
  academicYear: string;
};

export function IdBadge({ academicYear }: IdBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-fit"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="glass-panel flex items-center gap-4 rounded-2xl px-5 py-4"
      >
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 border-white/80 bg-gradient-to-br from-orange-200 to-amber-100 shadow-inner">
          <div className="flex h-full w-full items-center justify-center font-serif text-xl font-semibold text-foreground/80">
            SSK
          </div>
        </div>
        <div>
          <p className="font-serif text-lg font-semibold text-foreground">Sidharth Saji Kutty</p>
          <div className="mt-1 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs uppercase tracking-wider text-muted">
              {academicYear} Student
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
