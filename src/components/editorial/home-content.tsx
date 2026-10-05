import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Terminal } from "@/components/Terminal";
import { CertificateList } from "@/components/editorial/certificate-list";
import { HeroSection } from "@/components/editorial/hero-section";
import { LinksPanel } from "@/components/editorial/links-panel";
import { ProjectCard } from "@/components/editorial/project-card";
import { SectionHeading } from "@/components/editorial/section-heading";
import { ViewAllCta } from "@/components/editorial/view-all-cta";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string | null;
  liveLink: string | null;
  repoLink: string | null;
};

type LinkItem = {
  id: string;
  platform: string;
  url: string;
  iconName: string;
};

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  url: string;
  date: Date;
};

type HomeContentProps = {
  projects: Project[];
  links: LinkItem[];
  certificates: Certificate[];
  fullName: string;
  roleTagline: string;
  heroTitle: string;
  avatarUrl: string | null;
  contactEmail: string | null;
  aboutText: string;
  academicYear: string;
  projectCount: number;
  certificateCount: number;
  githubUrl: string | null;
};

export function HomeContent({
  projects,
  links,
  certificates,
  fullName,
  roleTagline,
  heroTitle,
  avatarUrl,
  contactEmail,
  aboutText,
  academicYear,
  projectCount,
  certificateCount,
  githubUrl,
}: HomeContentProps) {
  return (
    <section className="pb-8">
      <HeroSection
        fullName={fullName}
        roleTagline={roleTagline}
        heroTitle={heroTitle}
        avatarUrl={avatarUrl}
        academicYear={academicYear}
        projectCount={projectCount}
        certificateCount={certificateCount}
        githubUrl={githubUrl}
      />

      <div id="about" className="mt-16 scroll-mt-24">
        <ScrollReveal>
          <Terminal key={aboutText} aboutText={aboutText} />
        </ScrollReveal>
      </div>

      <div className="mt-24 space-y-24">
        <ScrollReveal delay={0.05}>
          <SectionHeading
            eyebrow="Portfolio"
            title="Selected Work"
            description="A few things I've designed, built, and shipped."
          />
          {projects.length > 0 ? (
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  imageUrl={project.imageUrl || undefined}
                  liveLink={project.liveLink}
                  repoLink={project.repoLink}
                />
              ))}
            </div>
          ) : (
            <p className="mt-8 rounded-2xl border border-dashed border-line px-6 py-10 text-center text-sm text-faint">
              No projects published yet.
            </p>
          )}
          <ViewAllCta href="/projects" label="View all projects" />
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <div className="grid gap-6 lg:grid-cols-2">
            <LinksPanel links={links} />
            <div>
              <CertificateList certificates={certificates} />
              <ViewAllCta href="/certificates" label="View all certificates" />
            </div>
          </div>
        </ScrollReveal>

        {contactEmail ? (
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl bg-[#1f1e1d] px-8 py-10 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#E08B6D]">
                Get in touch
              </p>
              <h2 className="mt-3 text-2xl tracking-tight text-[#FAF9F5] md:text-3xl">
                Let&apos;s build something together
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm text-[#B8B5AD]">
                Open to internships, collaborations, and interesting problems.
              </p>
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={`mailto:${contactEmail}`}
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#FAF9F5] px-4 py-2.5 text-sm font-medium text-[#1F1E1D] transition-colors hover:bg-white"
                >
                  <Mail className="h-4 w-4" />
                  {contactEmail}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        ) : null}
      </div>
    </section>
  );
}
