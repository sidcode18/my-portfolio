"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

type AdminItemCardProps = {
  title: string;
  subtitle?: string;
  badges?: ReactNode;
  children: ReactNode;
};

export function AdminItemCard({ title, subtitle, badges, children }: AdminItemCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <article className="panel overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-muted"
      >
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-foreground">{title}</span>
          {subtitle ? (
            <span className="mt-0.5 block truncate text-xs text-muted">{subtitle}</span>
          ) : null}
        </span>
        <span className="flex shrink-0 items-center gap-1.5">{badges}</span>
      </button>

      {open ? <div className="border-t border-line p-4">{children}</div> : null}
    </article>
  );
}
