import { TiltCard } from "@/components/motion/tilt-card";
import { SpotlightCard } from "@/components/editorial/spotlight-card";

type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
};

export function ProjectCard({ title, description, techStack }: ProjectCardProps) {
  return (
    <TiltCard>
      <SpotlightCard>
        <article className="glass-panel h-full rounded-2xl p-5">
          <h2 className="font-serif text-xl font-semibold text-foreground">{title}</h2>
          <p className="mt-3 font-mono text-sm leading-relaxed text-muted">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-neutral-200 bg-white/50 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </article>
      </SpotlightCard>
    </TiltCard>
  );
}
