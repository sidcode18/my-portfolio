import { CertificateList } from "@/components/editorial/certificate-list";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  url: string;
};

type CertificatesContentProps = {
  certificates: Certificate[];
};

export function CertificatesContent({ certificates }: CertificatesContentProps) {
  return (
    <section className="pb-16">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Credentials</p>
      <h1 className="mt-2 font-serif text-4xl font-bold text-foreground md:text-5xl">Certificates</h1>
      <p className="mt-3 max-w-xl font-mono text-sm text-muted">
        Professional certifications and credentials.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, index) => (
          <ScrollReveal key={certificate.id} delay={index * 0.04}>
            <CertificateList certificates={[certificate]} showHeader={false} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
