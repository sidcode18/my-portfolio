"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LinkIcon } from "@/components/icons/link-icon";

type HeroSectionProps = {
  fullName: string;
  roleTagline: string;
  heroTitle: string;
  avatarUrl: string | null;
  academicYear: string;
  projectCount: number;
  certificateCount: number;
  githubUrl: string | null;
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function HeroSection({
  fullName,
  roleTagline,
  heroTitle,
  avatarUrl,
  academicYear,
  projectCount,
  certificateCount,
  githubUrl,
}: HeroSectionProps) {
  const stats = [
    { label: "Projects", value: String(projectCount) },
    { label: "Certificates", value: String(certificateCount) },
    { label: "Academic Year", value: academicYear },
  ];

  return (
    <section className="relative pt-14 md:pt-20">
      <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
        <motion.div variants={item} className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl border border-line bg-surface-muted">
            {avatarUrl ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={avatarUrl}
                alt={fullName}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="font-serif text-lg font-medium text-accent">
                {initialsOf(fullName)}
              </span>
            )}
          </div>

          <div>
            <p className="text-sm font-medium text-foreground">{academicYear} Student</p>
            <p className="mt-0.5 text-sm text-muted">{roleTagline}</p>
          </div>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-8 text-5xl leading-[1.05] tracking-tight text-foreground md:text-6xl"
        >
          {fullName}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
        >
          {heroTitle}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
          <Link href="/projects" className="btn btn-primary group">
            View Work
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              <LinkIcon name="github" className="h-4 w-4" />
              GitHub
            </a>
          ) : null}
        </motion.div>

        <motion.dl variants={item} className="mt-12 flex flex-wrap gap-x-12 gap-y-5">
          {stats.map(({ label, value }) => (
            <div key={label}>
              <dt className="text-xs font-medium uppercase tracking-[0.1em] text-faint">
                {label}
              </dt>
              <dd className="mt-1 font-serif text-lg text-foreground">{value}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
