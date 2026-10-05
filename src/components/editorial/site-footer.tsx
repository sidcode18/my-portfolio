import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LinkIcon } from "@/components/icons/link-icon";
import { DEFAULT_SITE_CONFIG, SITE_CONFIG_ID } from "@/lib/site-config";

export async function SiteFooter() {
  const [links, siteConfig] = await Promise.all([
    prisma.link.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.siteConfig.findUnique({ where: { id: SITE_CONFIG_ID } }),
  ]);

  const fullName = siteConfig?.fullName ?? DEFAULT_SITE_CONFIG.fullName;
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div>
            <p className="text-sm font-medium text-foreground">
              <span className="font-mono text-accent">@</span>
              sidcode18
            </p>
            <p className="mt-2 max-w-sm text-sm text-muted">
              {fullName} — building software with care, one commit at a time.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  title={link.platform}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors hover:border-line-strong hover:bg-surface-muted hover:text-foreground"
                >
                  <LinkIcon name={link.iconName} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-faint">Sitemap</p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                <li>
                  <Link href="/" className="transition-colors hover:text-accent-strong">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="transition-colors hover:text-accent-strong">
                    Work
                  </Link>
                </li>
                <li>
                  <Link href="/certificates" className="transition-colors hover:text-accent-strong">
                    Certificates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-faint">Stack</p>
              <ul className="mt-3 space-y-2 text-sm text-faint">
                <li>Next.js · React</li>
                <li>TypeScript · Prisma</li>
                <li>Tailwind CSS</li>
                <li>PostgreSQL</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <p className="text-xs text-faint">
            © {year} {fullName}. All rights reserved.
          </p>
          <p className="text-xs text-faint">
            Designed &amp; engineered by <span className="text-muted">@sidcode18</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
