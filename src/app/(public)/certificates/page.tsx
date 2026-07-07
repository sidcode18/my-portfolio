import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/motion/page-transition";
import { CertificatesContent } from "@/components/editorial/certificates-content";

export default async function CertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <PageTransition>
      <CertificatesContent certificates={certificates} />
    </PageTransition>
  );
}
