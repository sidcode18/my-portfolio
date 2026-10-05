"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";

const navItems = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Work" },
  { href: "/certificates", label: "Certificates" },
];

export function PublicNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-mono text-sm font-semibold text-accent transition-colors group-hover:text-accent-strong">
            {"</>"}
          </span>
          <span className="text-[0.9375rem] font-medium tracking-tight text-foreground">
            sidcode18
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive ? "text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 -bottom-px h-[1.5px] rounded-full bg-accent transition-transform duration-200 ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}

          <span className="mx-2 hidden h-4 w-px bg-line-strong sm:block" />

          <kbd className="hidden rounded-md border border-line bg-surface-muted px-2 py-1 font-mono text-[0.65rem] text-faint sm:block">
            Ctrl K
          </kbd>

          <Link
            href="/login"
            title="Admin"
            className="ml-1 flex h-8 w-8 items-center justify-center rounded-lg text-faint transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            <Lock className="h-3.5 w-3.5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
