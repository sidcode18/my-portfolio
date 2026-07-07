import { createCertificate, deleteCertificate, updateCertificate } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({ orderBy: { date: "desc" } });

  return (
    <section className="space-y-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Content</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground">Manage Certificates</h1>
      </div>

      <form action={createCertificate} className="glass-panel grid gap-3 rounded-2xl p-5 md:grid-cols-2">
        <input name="title" placeholder="Title" className="editorial-input" required />
        <input name="issuer" placeholder="Issuer" className="editorial-input" required />
        <input type="date" name="date" className="editorial-input" required />
        <input name="url" placeholder="Credential URL" className="editorial-input" required />
        <button type="submit" className="editorial-btn-primary md:col-span-2 md:justify-self-end">
          Add Certificate
        </button>
      </form>

      <div className="space-y-3">
        {certificates.map((certificate) => (
          <article key={certificate.id} className="glass-panel space-y-2 rounded-2xl p-5">
            <form action={updateCertificate} className="grid gap-2 md:grid-cols-2">
              <input type="hidden" name="id" value={certificate.id} />
              <input name="title" defaultValue={certificate.title} className="editorial-input" required />
              <input name="issuer" defaultValue={certificate.issuer} className="editorial-input" required />
              <input
                type="date"
                name="date"
                defaultValue={certificate.date.toISOString().split("T")[0]}
                className="editorial-input"
                required
              />
              <input name="url" defaultValue={certificate.url} className="editorial-input" required />
              <button className="editorial-btn-ghost md:col-span-2 md:justify-self-start">Update</button>
            </form>
            <form action={deleteCertificate}>
              <input type="hidden" name="id" value={certificate.id} />
              <button className="editorial-btn-danger">Delete</button>
            </form>
          </article>
        ))}
      </div>
    </section>
  );
}
