import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateSiteConfig } from "@/app/admin/actions";
import {
  DEFAULT_SITE_CONFIG,
  SITE_CONFIG_ID,
  formatAcademicYear,
} from "@/lib/site-config";

export default async function AdminOverviewPage() {
  const session = await auth();

  const [projects, links, certificates, siteConfig] = await Promise.all([
    prisma.project.count(),
    prisma.link.count(),
    prisma.certificate.count(),
    prisma.siteConfig.findUnique({ where: { id: SITE_CONFIG_ID } }),
  ]);
  const resolvedSiteConfig = siteConfig ?? DEFAULT_SITE_CONFIG;

  return (
    <section className="space-y-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Overview</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground">Dashboard</h1>
        {session?.user?.email ? (
          <p className="mt-2 font-mono text-sm text-muted">Signed in as {session.user.email}</p>
        ) : null}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <article className="glass-panel rounded-2xl p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Projects</p>
          <p className="mt-2 font-serif text-4xl font-semibold text-foreground">{projects}</p>
        </article>
        <article className="glass-panel rounded-2xl p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Links</p>
          <p className="mt-2 font-serif text-4xl font-semibold text-foreground">{links}</p>
        </article>
        <article className="glass-panel rounded-2xl p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-muted">Certificates</p>
          <p className="mt-2 font-serif text-4xl font-semibold text-foreground">{certificates}</p>
        </article>
      </div>

      <form action={updateSiteConfig} className="glass-panel space-y-4 rounded-2xl p-5">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Site Settings</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground">Site Settings</h2>
        </div>

        <label className="block space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">About Me</span>
          <textarea
            name="aboutText"
            defaultValue={resolvedSiteConfig.aboutText}
            className="editorial-input min-h-32"
            required
          />
        </label>

        <label className="block space-y-2">
          <span className="font-mono text-xs uppercase tracking-wider text-muted">Academic Year</span>
          <input
            name="academicYear"
            defaultValue={formatAcademicYear(resolvedSiteConfig.currentYear)}
            className="editorial-input"
            required
          />
        </label>

        <button type="submit" className="editorial-btn-primary">
          Save Settings
        </button>
      </form>
    </section>
  );
}
