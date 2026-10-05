import { ExternalLink, GitBranch } from "lucide-react";

type ProjectCardProps = {
  title: string;
  description: string;
  techStack: string[];
  imageUrl?: string;
  liveLink?: string | null;
  repoLink?: string | null;
};

export function ProjectCard({
  title,
  description,
  techStack,
  imageUrl,
  liveLink,
  repoLink,
}: ProjectCardProps) {
  return (
    <article className="panel panel-interactive group flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-muted">
        {imageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg tracking-tight text-foreground">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {techStack.map((tech) => (
            <span key={tech} className="chip">
              {tech}
            </span>
          ))}
        </div>

        {liveLink || repoLink ? (
          <div className="mt-auto flex items-center gap-2 pt-5">
            {liveLink ? (
              <a
                href={liveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs text-muted transition hover:border-line-strong hover:bg-surface-muted hover:text-foreground"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live
              </a>
            ) : null}
            {repoLink ? (
              <a
                href={repoLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-line px-2.5 py-1.5 text-xs text-muted transition hover:border-line-strong hover:bg-surface-muted hover:text-foreground"
              >
                <GitBranch className="h-3.5 w-3.5" />
                Code
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
