type LinkItem = {
  id: string;
  platform: string;
  url: string;
};

type LinksPanelProps = {
  links: LinkItem[];
};

export function LinksPanel({ links }: LinksPanelProps) {
  return (
    <div className="glass-panel h-full rounded-2xl p-6">
      <h3 className="font-serif text-xl font-semibold text-foreground">Quick Links</h3>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">Connect</p>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-lg border border-transparent px-2 py-2 font-mono text-sm text-muted transition hover:border-neutral-200 hover:bg-white/40 hover:text-foreground"
            >
              <span>{link.platform}</span>
              <span className="text-accent opacity-0 transition group-hover:opacity-100">→</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
