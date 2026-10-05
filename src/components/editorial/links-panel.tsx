import { ArrowUpRight } from "lucide-react";
import { LinkIcon } from "@/components/icons/link-icon";

type LinkItem = {
  id: string;
  platform: string;
  url: string;
  iconName: string;
};

type LinksPanelProps = {
  links: LinkItem[];
};

export function LinksPanel({ links }: LinksPanelProps) {
  return (
    <div className="panel rounded-2xl p-6">
      <div className="flex items-baseline justify-between">
        <div>
          <p className="eyebrow">Connect</p>
          <h3 className="mt-1.5 text-xl tracking-tight text-foreground">Find me online</h3>
        </div>
        <span className="text-xs text-faint">{links.length} links</span>
      </div>

      <ul className="mt-5 space-y-1.5">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors duration-200 hover:border-line hover:bg-surface-muted"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-muted text-muted transition-colors duration-200 group-hover:text-accent-strong">
                <LinkIcon name={link.iconName} className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-foreground">
                  {link.platform}
                </span>
                <span className="block truncate text-xs text-faint">
                  {link.url.replace(/^https?:\/\/(www\.)?/, "")}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 -translate-x-1 translate-y-1 text-faint opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-accent-strong group-hover:opacity-100" />
            </a>
          </li>
        ))}
        {links.length === 0 ? (
          <li className="rounded-xl border border-dashed border-line px-3 py-6 text-center text-xs text-faint">
            No links added yet.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
