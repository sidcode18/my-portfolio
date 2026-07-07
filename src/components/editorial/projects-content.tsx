import { ProjectCard } from "@/components/editorial/project-card";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
};

type ProjectsContentProps = {
  projects: Project[];
};

export function ProjectsContent({ projects }: ProjectsContentProps) {
  return (
    <section className="pb-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Archive</p>
      <h1 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">Projects</h1>
      <p className="mt-3 max-w-xl font-mono text-sm text-muted">
        Published portfolio projects.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.04}>
            <ProjectCard
              title={project.title}
              description={project.description}
              techStack={project.techStack}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
