type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
};

export function SectionHeading({ eyebrow, title, description, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-2xl tracking-tight text-foreground md:text-3xl">
          {title}
        </h2>
        {description ? <p className="mt-2 text-sm text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
