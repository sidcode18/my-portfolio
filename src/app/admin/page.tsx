import { FolderKanban, Globe, Link2, Award } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateSiteConfig } from "@/app/admin/actions";
import { AdminForm } from "@/components/admin/admin-form";
import { SubmitButton } from "@/components/admin/submit-button";
import {
  DEFAULT_SITE_CONFIG,
  SITE_CONFIG_ID,
  formatAcademicYear,
} from "@/lib/site-config";

const stats = [
  { key: "projects", label: "Projects", icon: FolderKanban },
  { key: "published", label: "Published", icon: Globe },
  { key: "links", label: "Links", icon: Link2 },
  { key: "certificates", label: "Certificates", icon: Award },
] as const;

export default async function AdminOverviewPage() {
  const session = await auth();

  const [projects, published, links, certificates, siteConfig] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { isPublished: true } }),
    prisma.link.count(),
    prisma.certificate.count(),
    prisma.siteConfig.findUnique({ where: { id: SITE_CONFIG_ID } }),
  ]);

  const counts: Record<(typeof stats)[number]["key"], number> = {
    projects,
    published,
    links,
    certificates,
  };

  const resolvedSiteConfig = siteConfig ?? DEFAULT_SITE_CONFIG;

  return (
    <section className="space-y-8">
      <header>
        <p className="eyebrow">Overview</p>
        <h1 className="mt-2 text-3xl text-foreground">Dashboard</h1>
        {session?.user?.email ? (
          <p className="mt-2 text-xs text-muted">Signed in as {session.user.email}</p>
        ) : null}
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ key, label, icon: Icon }) => (
          <article key={key} className="panel panel-interactive rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted">
                {label}
              </p>
              <Icon className="h-4 w-4 text-accent-strong" />
            </div>
            <p className="mt-3 text-4xl text-foreground">{counts[key]}</p>
          </article>
        ))}
      </div>

      <AdminForm action={updateSiteConfig} className="space-y-6">
        <div className="panel rounded-2xl p-6">
          <p className="eyebrow">Identity</p>
          <h2 className="mt-1 text-xl text-foreground">Name &amp; presence</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="field-label mb-1.5">Full name</span>
              <input
                name="fullName"
                defaultValue={resolvedSiteConfig.fullName}
                className="field-input"
                placeholder="Sidharth Saji Kutty"
                required
                maxLength={120}
              />
            </label>

            <label className="block">
              <span className="field-label mb-1.5">Role tagline</span>
              <input
                name="roleTagline"
                defaultValue={resolvedSiteConfig.roleTagline}
                className="field-input"
                placeholder="Full-Stack Engineer"
                required
                maxLength={120}
              />
            </label>

            <label className="block">
              <span className="field-label mb-1.5">Avatar URL</span>
              <input
                name="avatarUrl"
                type="url"
                defaultValue={resolvedSiteConfig.avatarUrl ?? ""}
                className="field-input"
                placeholder="https://…/avatar.jpg"
              />
            </label>

            <label className="block">
              <span className="field-label mb-1.5">Contact email</span>
              <input
                name="contactEmail"
                type="email"
                defaultValue={resolvedSiteConfig.contactEmail ?? ""}
                className="field-input"
                placeholder="you@example.com"
              />
            </label>
          </div>
        </div>

        <div className="panel rounded-2xl p-6">
          <p className="eyebrow">Homepage</p>
          <h2 className="mt-1 text-xl text-foreground">Hero &amp; about</h2>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="field-label mb-1.5">Hero headline</span>
              <textarea
                name="heroTitle"
                defaultValue={resolvedSiteConfig.heroTitle}
                className="field-input min-h-20 leading-relaxed"
                placeholder="I build and ship full-stack products…"
                required
                maxLength={400}
              />
            </label>

            <label className="block">
              <span className="field-label mb-1.5">About text (terminal output)</span>
              <textarea
                name="aboutText"
                defaultValue={resolvedSiteConfig.aboutText}
                className="field-input min-h-32 leading-relaxed"
                required
                maxLength={4000}
              />
            </label>
          </div>
        </div>

        <div className="panel rounded-2xl p-6">
          <p className="eyebrow">Academics</p>
          <h2 className="mt-1 text-xl text-foreground">Academic year</h2>

          <div className="mt-5 max-w-xs">
            <label className="block">
              <span className="field-label mb-1.5">Current year</span>
              <input
                name="academicYear"
                defaultValue={formatAcademicYear(resolvedSiteConfig.currentYear)}
                className="field-input"
                placeholder="2nd Year"
                required
              />
            </label>
            <p className="mt-2 text-xs text-muted">
              e.g. “1st Year”, “3rd Year”, or “2024–2028”
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <SubmitButton>Save settings</SubmitButton>
        </div>
      </AdminForm>
    </section>
  );
}
