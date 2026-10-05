"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  Link2,
  Award,
  LayoutDashboard,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { AdminSignOut } from "@/components/ui/admin-sign-out";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/links", label: "Links", icon: Link2 },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full flex-col border-b border-line bg-surface-muted md:fixed md:left-0 md:top-0 md:z-30 md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="border-b border-line px-5 py-5">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface font-mono text-xs font-semibold text-accent-strong">
            &lt;/&gt;
          </span>
          <div>
            <p className="text-sm font-medium text-foreground">Portfolio CMS</p>
            <p className="text-xs text-faint">Admin</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] transition-colors duration-150 ${
                active
                  ? "border border-line bg-surface text-foreground shadow-sm"
                  : "border border-transparent text-muted hover:bg-surface hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-line p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-[13.5px] text-muted transition-colors hover:bg-surface hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" />
          View site
        </Link>
        <AdminSignOut />
        <p className="flex items-center gap-2 px-3 pt-2 text-xs text-faint">
          <ShieldCheck className="h-3.5 w-3.5" />
          GitHub protected
        </p>
      </div>
    </aside>
  );
}
