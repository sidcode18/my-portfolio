import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/motion/page-transition";
import { HomeContent } from "@/components/editorial/home-content";
import {
  DEFAULT_SITE_CONFIG,
  SITE_CONFIG_ID,
  formatAcademicYear,
} from "@/lib/site-config";

const MAX_HOME_ITEMS = 3;

export default async function HomePage() {
  const [projects, links, certificates, siteConfig] = await Promise.all([
    prisma.project.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
      take: MAX_HOME_ITEMS,
    }),
    prisma.link.findMany({ orderBy: { createdAt: "asc" } }),
    prisma.certificate.findMany({ orderBy: { date: "desc" }, take: MAX_HOME_ITEMS }),
    prisma.siteConfig.findUnique({ where: { id: SITE_CONFIG_ID } }),
  ]);

  const resolvedSiteConfig = siteConfig ?? DEFAULT_SITE_CONFIG;

  return (
    <PageTransition>
      <HomeContent
        projects={projects}
        links={links}
        certificates={certificates}
        aboutText={resolvedSiteConfig.aboutText}
        academicYear={formatAcademicYear(resolvedSiteConfig.currentYear)}
      />
    </PageTransition>
  );
}
