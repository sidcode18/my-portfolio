import Link from "next/link";
import { FolderKanban, Link2, Award, LayoutDashboard } from "lucide-react";
import { AdminSignOut } from "@/components/ui/admin-sign-out";

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/links", label: "Links", icon: Link2 },
  { href: "/admin/certificates", label: "Certificates", icon: Award },
];

export function AdminSidebar() {
  return (
    <aside className="flex w-full flex-col border-b border-neutral-200 bg-white/40 backdrop-blur-2xl md:fixed md:left-0 md:top-0 md:z-30 md:h-screen md:w-64 md:border-b-0 md:border-r">
      <div className="border-b border-neutral-200 px-6 py-5">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted">Admin Dashboard</p>
        <h1 className="mt-1 font-serif text-xl font-semibold text-foreground">Portfolio CMS</h1>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 font-mono text-xs uppercase tracking-wider text-muted transition hover:bg-white/40 hover:text-foreground"
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-neutral-200 p-3 pb-20">
        <AdminSignOut />
      </div>
    </aside>
  );
}
