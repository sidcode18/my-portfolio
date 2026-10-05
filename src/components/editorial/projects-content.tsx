import { ProjectCard } from "@/components/editorial/project-card";
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

type ProjectsContentProps = {
  projects: Project[];
};

export function ProjectsContent({ projects }: ProjectsContentProps) {
  return (
    <section className="pb-8">
      <p className="eyebrow">Archive</p>
      <h1 className="mt-3 text-4xl tracking-tight text-foreground md:text-5xl">
        Projects
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted">
        Everything I&apos;ve published — experiments, coursework, and products built end to end.
      </p>

      {projects.length > 0 ? (
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.04}>
              <ProjectCard
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                imageUrl={project.imageUrl || undefined}
                liveLink={project.liveLink}
                repoLink={project.repoLink}
              />
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <p className="mt-12 rounded-2xl border border-dashed border-line px-6 py-14 text-center text-sm text-faint">
          No projects published yet. Check back soon.
        </p>
      )}
    </section>
  );
}
