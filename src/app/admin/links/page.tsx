import { Link2 } from "lucide-react";
import { createLink, deleteLink, updateLink } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminItemCard } from "@/components/admin/admin-item-card";
import { DeleteForm } from "@/components/admin/delete-form";
import { SubmitButton } from "@/components/admin/submit-button";
import { LinkIcon, LINK_ICON_OPTIONS } from "@/components/icons/link-icon";

function IconSelect({ defaultValue }: { defaultValue?: string }) {
  return (
    <label className="block">
      <span className="field-label mb-1.5">Icon</span>
      <select name="iconName" defaultValue={defaultValue ?? "globe"} className="field-input">
        {LINK_ICON_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function LinkFields({
  link,
}: {
  link?: { id: string; platform: string; url: string; iconName: string };
}) {
  return (
    <>
      {link ? <input type="hidden" name="id" value={link.id} /> : null}
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block">
          <span className="field-label mb-1.5">Platform</span>
          <input
            name="platform"
            defaultValue={link?.platform}
            className="field-input"
            placeholder="GitHub"
            required
            maxLength={60}
          />
        </label>

        <label className="block md:col-span-2">
          <span className="field-label mb-1.5">URL</span>
          <input
            name="url"
            type="url"
            defaultValue={link?.url}
            className="field-input"
            placeholder="https://github.com/sidcode18"
            required
          />
        </label>

        <IconSelect defaultValue={link?.iconName} />
      </div>
    </>
  );
}

export default async function AdminLinksPage() {
  const links = await prisma.link.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <section className="space-y-8">
      <header>
        <p className="eyebrow">Content</p>
        <h1 className="mt-2 text-3xl text-foreground">Links</h1>
        <p className="mt-2 text-xs text-muted">
          {links.length} total · shown in the footer and links panel
        </p>
      </header>

      <AdminForm action={createLink} resetOnSuccess className="panel space-y-5 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface-muted text-accent-strong">
            <Link2 className="h-4 w-4" />
          </span>
          <h2 className="text-lg text-foreground">New link</h2>
        </div>

        <LinkFields />

        <div className="flex justify-end">
          <SubmitButton pendingLabel="Creating…">Create link</SubmitButton>
        </div>
      </AdminForm>

      <div className="space-y-3">
        {links.length === 0 ? (
          <p className="panel rounded-2xl p-6 text-center text-sm text-muted">
            No links yet — add your GitHub, LinkedIn, or anything else.
          </p>
        ) : (
          links.map((link) => (
            <AdminItemCard
              key={link.id}
              title={link.platform}
              subtitle={link.url.replace(/^https?:\/\//, "")}
              badges={
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-surface-muted text-muted">
                  <LinkIcon name={link.iconName} className="h-3.5 w-3.5" />
                </span>
              }
            >
              <div className="space-y-5">
                <AdminForm action={updateLink} className="space-y-5">
                  <LinkFields link={link} />
                  <div className="flex justify-end">
                    <SubmitButton pendingLabel="Updating…">Update link</SubmitButton>
                  </div>
                </AdminForm>
                <div className="flex items-center border-t border-line pt-4">
                  <DeleteForm
                    action={deleteLink}
                    id={link.id}
                    confirmMessage={`Delete the ${link.platform} link? This cannot be undone.`}
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
