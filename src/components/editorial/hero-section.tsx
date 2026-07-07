"use client";

import { IdBadge } from "@/components/editorial/id-badge";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type HeroSectionProps = {
  academicYear: string;
};

export function HeroSection({ academicYear }: HeroSectionProps) {
  return (
    <section className="relative pt-12 text-center md:pt-20">
      <ScrollReveal>
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted">
          Student Developer
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <h1 className="mx-auto mt-5 max-w-4xl font-serif text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Engineer in Progress:{" "}
          <em className="not-italic text-accent">mostly figuring things out .</em>
        </h1>
      </ScrollReveal>

      <ScrollReveal delay={0.14}>
        <p className="mx-auto mt-6 max-w-2xl font-mono text-sm leading-relaxed text-muted md:text-base">
          Trying to bring ideas to life.
        </p>
      </ScrollReveal>

      <div className="mt-10">
        <IdBadge academicYear={academicYear} />
      </div>
    </section>
  );
}
