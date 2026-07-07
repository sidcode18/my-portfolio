import { prisma } from "@/lib/prisma";
import { createProject, deleteProject, updateProject } from "@/app/admin/actions";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <section className="space-y-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Content</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground">Manage Projects</h1>
      </div>

      <form action={createProject} className="glass-panel grid gap-3 rounded-2xl p-5 md:grid-cols-2">
        <input name="title" placeholder="Title" className="editorial-input" required />
        <input name="imageUrl" placeholder="Image URL" className="editorial-input" required />
        <input name="liveLink" placeholder="Live Link" className="editorial-input" />
        <input name="repoLink" placeholder="Repo Link" className="editorial-input" />
        <input
          name="techStack"
          placeholder="Tech stack (comma separated)"
          className="editorial-input md:col-span-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="editorial-input min-h-24 md:col-span-2"
          required
        />
        <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
          <input type="checkbox" name="isPublished" /> Published
        </label>
        <button type="submit" className="editorial-btn-primary md:justify-self-end">
          Add Project
        </button>
      </form>

      <div className="space-y-4">
        {projects.map((project) => (
          <article key={project.id} className="glass-panel space-y-3 rounded-2xl p-5">
            <form action={updateProject} className="grid gap-2 md:grid-cols-2">
              <input type="hidden" name="id" value={project.id} />
              <input name="title" defaultValue={project.title} className="editorial-input" required />
              <input name="imageUrl" defaultValue={project.imageUrl} className="editorial-input" required />
              <input name="liveLink" defaultValue={project.liveLink ?? ""} className="editorial-input" />
              <input name="repoLink" defaultValue={project.repoLink ?? ""} className="editorial-input" />
              <input
                name="techStack"
                defaultValue={project.techStack.join(", ")}
                className="editorial-input md:col-span-2"
                required
              />
              <textarea
                name="description"
                defaultValue={project.description}
                className="editorial-input min-h-20 md:col-span-2"
                required
              />
              <label className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
                <input type="checkbox" name="isPublished" defaultChecked={project.isPublished} />
                Published
              </label>
              <button className="editorial-btn-ghost md:justify-self-end">Update</button>
            </form>
            <form action={deleteProject}>
              <input type="hidden" name="id" value={project.id} />
              <button className="editorial-btn-danger">Delete</button>
            </form>
          </article>
        ))}
      </div>
    </section>
  );
}
