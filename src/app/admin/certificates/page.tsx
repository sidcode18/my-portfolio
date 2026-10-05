import { Award } from "lucide-react";
import { createCertificate, deleteCertificate, updateCertificate } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminItemCard } from "@/components/admin/admin-item-card";
import { DeleteForm } from "@/components/admin/delete-form";
import { SubmitButton } from "@/components/admin/submit-button";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" });

type CertificateShape = {
  id: string;
  title: string;
  issuer: string;
  date: Date;
  url: string;
};

function CertificateFields({ certificate }: { certificate?: CertificateShape }) {
  return (
    <>
      {certificate ? <input type="hidden" name="id" value={certificate.id} /> : null}
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="field-label mb-1.5">Title</span>
          <input
            name="title"
            defaultValue={certificate?.title}
            className="field-input"
            placeholder="AWS Certified Developer – Associate"
            required
            maxLength={160}
          />
        </label>

        <label className="block">
          <span className="field-label mb-1.5">Issuer</span>
          <input
            name="issuer"
            defaultValue={certificate?.issuer}
            className="field-input"
            placeholder="Amazon Web Services"
            required
            maxLength={160}
          />
        </label>

        <label className="block">
          <span className="field-label mb-1.5">Issue date</span>
          <input
            type="date"
            name="date"
            defaultValue={certificate ? certificate.date.toISOString().split("T")[0] : undefined}
            className="field-input"
            required
          />
        </label>

        <label className="block">
          <span className="field-label mb-1.5">Credential URL</span>
          <input
            name="url"
            type="url"
            defaultValue={certificate?.url}
            className="field-input"
            placeholder="https://credential.example.com/…"
            required
          />
        </label>
      </div>
    </>
  );
}

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({ orderBy: { date: "desc" } });

  return (
    <section className="space-y-8">
      <header>
        <p className="eyebrow">Content</p>
        <h1 className="mt-2 text-3xl text-foreground">Certificates</h1>
        <p className="mt-2 text-xs text-muted">
          {certificates.length} total · shown newest first
        </p>
      </header>

      <AdminForm
        action={createCertificate}
        resetOnSuccess
        className="panel space-y-5 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface-muted text-accent-strong">
            <Award className="h-4 w-4" />
          </span>
          <h2 className="text-lg text-foreground">New certificate</h2>
        </div>

        <CertificateFields />

        <div className="flex justify-end">
          <SubmitButton pendingLabel="Creating…">Create certificate</SubmitButton>
        </div>
      </AdminForm>

      <div className="space-y-3">
        {certificates.length === 0 ? (
          <p className="panel rounded-2xl p-6 text-center text-sm text-muted">
            No certificates yet — add your first credential above.
          </p>
        ) : (
          certificates.map((certificate) => (
            <AdminItemCard
              key={certificate.id}
              title={certificate.title}
              subtitle={`${certificate.issuer} · ${dateFormatter.format(certificate.date)}`}
            >
              <div className="space-y-5">
                <AdminForm action={updateCertificate} className="space-y-5">
                  <CertificateFields certificate={certificate} />
                  <div className="flex justify-end">
                    <SubmitButton pendingLabel="Updating…">Update certificate</SubmitButton>
                  </div>
                </AdminForm>
                <div className="flex items-center border-t border-line pt-4">
                  <DeleteForm
                    action={deleteCertificate}
                    id={certificate.id}
                    confirmMessage={`Delete “${certificate.title}”? This cannot be undone.`}
                  />
                </div>
              </div>
            </AdminItemCard>
          ))
        )}
      </div>
    </section>
  );
}
