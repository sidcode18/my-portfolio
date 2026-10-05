import { CertificateList } from "@/components/editorial/certificate-list";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

type Certificate = {
  id: string;
  title: string;
  issuer: string;
  url: string;
  date: Date;
};

type CertificatesContentProps = {
  certificates: Certificate[];
};

export function CertificatesContent({ certificates }: CertificatesContentProps) {
  return (
    <section className="pb-8">
      <p className="eyebrow">Credentials</p>
      <h1 className="mt-3 text-4xl tracking-tight text-foreground md:text-5xl">
        Certificates
      </h1>
      <p className="mt-4 max-w-xl text-base text-muted">
        Verified certifications and completed programs. Click any entry to view the credential.
      </p>

      <div className="mt-12 max-w-3xl">
        <ScrollReveal>
          <CertificateList certificates={certificates} showHeader={false} />
        </ScrollReveal>
      </div>
    </section>
  );
}
