import { BadgeCheck, ExternalLink } from "lucide-react";

type CertificateItem = {
  id: string;
  title: string;
  issuer: string;
  url: string;
  date: Date;
};

type CertificateListProps = {
  certificates: CertificateItem[];
  showHeader?: boolean;
};

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  year: "numeric",
});

export function CertificateList({ certificates, showHeader = true }: CertificateListProps) {
  return (
    <div className="panel h-full rounded-2xl p-6">
      {showHeader ? (
        <>
          <p className="eyebrow">Credentials</p>
          <h3 className="mt-1.5 text-xl tracking-tight text-foreground">Certifications</h3>
        </>
      ) : null}

      <ul className={showHeader ? "mt-5 space-y-1.5" : "space-y-1.5"}>
        {certificates.map((certificate) => (
          <li key={certificate.id}>
            <a
              href={certificate.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 transition-colors duration-200 hover:border-line hover:bg-surface-muted"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-surface-muted text-muted transition-colors duration-200 group-hover:text-accent-strong">
                <BadgeCheck className="h-4 w-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-medium text-foreground">
                  {certificate.title}
                </span>
                <span className="block truncate text-xs text-faint">{certificate.issuer}</span>
              </span>
              <span className="shrink-0 text-xs text-faint">
                {dateFormatter.format(certificate.date)}
              </span>
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-faint opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
            </a>
          </li>
        ))}
        {certificates.length === 0 ? (
          <li className="rounded-xl border border-dashed border-line px-3 py-6 text-center text-xs text-faint">
            No certificates added yet.
          </li>
        ) : null}
      </ul>
    </div>
  );
}
