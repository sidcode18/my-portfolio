import { createLink, deleteLink, updateLink } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

export default async function AdminLinksPage() {
  const links = await prisma.link.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <section className="space-y-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Content</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground">Manage Links</h1>
      </div>

      <form action={createLink} className="glass-panel grid gap-3 rounded-2xl p-5 md:grid-cols-3">
        <input name="platform" placeholder="Platform" className="editorial-input" required />
        <input name="url" placeholder="URL" className="editorial-input" required />
        <input name="iconName" placeholder="Icon name" className="editorial-input" required />
        <button type="submit" className="editorial-btn-primary md:col-span-3 md:justify-self-end">
          Add Link
        </button>
      </form>

      <div className="space-y-3">
        {links.map((link) => (
          <article key={link.id} className="glass-panel space-y-2 rounded-2xl p-5">
            <form action={updateLink} className="grid gap-2 md:grid-cols-3">
              <input type="hidden" name="id" value={link.id} />
              <input name="platform" defaultValue={link.platform} className="editorial-input" required />
              <input name="url" defaultValue={link.url} className="editorial-input" required />
              <input name="iconName" defaultValue={link.iconName} className="editorial-input" required />
              <button className="editorial-btn-ghost md:col-span-3 md:justify-self-start">Update</button>
            </form>
            <form action={deleteLink}>
              <input type="hidden" name="id" value={link.id} />
              <button className="editorial-btn-danger">Delete</button>
            </form>
          </article>
        ))}
      </div>
    </section>
  );
}
