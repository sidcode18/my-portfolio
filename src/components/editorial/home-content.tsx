import { Terminal } from "@/components/Terminal";
import { CertificateList } from "@/components/editorial/certificate-list";
import { HeroSection } from "@/components/editorial/hero-section";
import { LinksPanel } from "@/components/editorial/links-panel";
import { ProjectCard } from "@/components/editorial/project-card";
import { ViewAllCta } from "@/components/editorial/view-all-cta";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
};

type LinkItem = {
  id: string;
  platform: string;
  url: string;
};

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  url: string;
};

type HomeContentProps = {
  projects: Project[];
  links: LinkItem[];
  certificates: Certificate[];
  aboutText: string;
  academicYear: string;
};

export function HomeContent({
  projects,
  links,
  certificates,
  aboutText,
  academicYear,
}: HomeContentProps) {
  return (
    <section className="pb-16">
      <div className="space-y-10">
        <HeroSection academicYear={academicYear} />

        <ScrollReveal>
          <Terminal key={aboutText} aboutText={aboutText} />
        </ScrollReveal>
      </div>

      <div className="mt-20 space-y-20">
        <ScrollReveal delay={0.05}>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Portfolio</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Selected Work
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                techStack={project.techStack}
              />
            ))}
          </div>
          <ViewAllCta href="/projects" label="View All Projects" />
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <LinksPanel links={links} />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Recognition</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Certificates
            </h2>
          </div>
          <div className="mt-8">
            <CertificateList certificates={certificates} showHeader={false} />
          </div>
          <ViewAllCta href="/certificates" label="View All Certificates" />
        </ScrollReveal>
      </div>
    </section>
  );
}
