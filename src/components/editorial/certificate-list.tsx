import { SpotlightCard } from "@/components/editorial/spotlight-card";

type CertificateItem = {
  id: string;
  title: string;
  issuer: string;
  url: string;
};

type CertificateListProps = {
  certificates: CertificateItem[];
  showHeader?: boolean;
};

export function CertificateList({ certificates, showHeader = true }: CertificateListProps) {
  return (
    <SpotlightCard>
      <div className="glass-panel h-full rounded-2xl p-6">
        {showHeader ? (
          <>
            <h3 className="font-serif text-xl font-semibold text-foreground">Recent Certificates</h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-muted">Credentials</p>
          </>
        ) : null}
        <ul className={showHeader ? "mt-5 space-y-3" : "space-y-3"}>
          {certificates.map((certificate) => (
            <li key={certificate.id}>
              <a
                href={certificate.url}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-lg border border-transparent px-2 py-2 transition hover:border-neutral-200 hover:bg-white/40"
              >
                <span className="font-serif text-base text-foreground transition group-hover:text-accent">
                  {certificate.title}
                </span>
                <span className="mt-0.5 block font-mono text-xs text-muted">{certificate.issuer}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </SpotlightCard>
  );
}
