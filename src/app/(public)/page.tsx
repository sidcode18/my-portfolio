import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/motion/page-transition";
import { HomeContent } from "@/components/editorial/home-content";
import {
  DEFAULT_SITE_CONFIG,
  SITE_CONFIG_ID,
  formatAcademicYear,
} from "@/lib/site-config";

const MAX_HOME_ITEMS = 3;
const MAX_HOME_CERTIFICATES = 4;

export default async function HomePage() {
  const [projects, links, certificates, siteConfig, projectCount, certificateCount] =
    await Promise.all([
      prisma.project.findMany({
        where: { isPublished: true },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: MAX_HOME_ITEMS,
      }),
      prisma.link.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.certificate.findMany({ orderBy: { date: "desc" }, take: MAX_HOME_CERTIFICATES }),
      prisma.siteConfig.findUnique({ where: { id: SITE_CONFIG_ID } }),
      prisma.project.count({ where: { isPublished: true } }),
      prisma.certificate.count(),
    ]);

  const config = siteConfig ?? DEFAULT_SITE_CONFIG;

  const githubUrl =
    links.find(
      (link) =>
        link.iconName.toLowerCase().includes("github") ||
        link.platform.toLowerCase().includes("github"),
    )?.url ?? null;

  return (
    <PageTransition>
      <HomeContent
        projects={projects}
        links={links}
        certificates={certificates}
        fullName={config.fullName}
        roleTagline={config.roleTagline}
        heroTitle={config.heroTitle}
        avatarUrl={config.avatarUrl}
        contactEmail={config.contactEmail}
        aboutText={config.aboutText}
        academicYear={formatAcademicYear(config.currentYear)}
        projectCount={projectCount}
        certificateCount={certificateCount}
        githubUrl={githubUrl}
      />
    </PageTransition>
  );
}
