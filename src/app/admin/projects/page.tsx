import { FolderKanban } from "lucide-react";
import { createProject, deleteProject, updateProject } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/admin-form";
import { AdminItemCard } from "@/components/admin/admin-item-card";
import { DeleteForm } from "@/components/admin/delete-form";
import { SubmitButton } from "@/components/admin/submit-button";

function StatusBadges({ isPublished, featured }: { isPublished: boolean; featured: boolean }) {
  return (
    <>
      {featured ? (
        <span className="rounded-full border border-[#c96442]/25 bg-[#c96442]/10 px-2 py-0.5 text-[11px] font-medium text-accent-strong">
          Featured
        </span>
      ) : null}
      <span
        className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
          isPublished
            ? "border border-[#067647]/20 bg-[#ecfdf3] text-[#067647]"
            : "border border-line bg-surface-muted text-muted"
        }`}
      >
        {isPublished ? "Published" : "Draft"}
      </span>
    </>
  );
}

function ProjectFields({
  project,
}: {
  project?: {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    imageUrl: string | null;
    liveLink: string | null;
    repoLink: string | null;
    featured: boolean;
    isPublished: boolean;
  };
}) {
  return (
    <>
      {project ? <input type="hidden" name="id" value={project.id} /> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="field-label mb-1.5">Title</span>
          <input
            name="title"
            defaultValue={project?.title}
            className="field-input"
            placeholder="Project title"
            required
            maxLength={120}
          />
        </label>

        <label className="block">
          <span className="field-label mb-1.5">Tech stack (comma separated)</span>
          <input
            name="techStack"
            defaultValue={project?.techStack.join(", ")}
            className="field-input"
            placeholder="Next.js, Prisma, PostgreSQL"
            required
          />
        </label>

        <label className="block">
          <span className="field-label mb-1.5">Image URL</span>
          <input
            name="imageUrl"
            type="url"
            defaultValue={project?.imageUrl ?? ""}
            className="field-input"
            placeholder="https://…/cover.png"
          />
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="field-label mb-1.5">Live link</span>
            <input
              name="liveLink"
              type="url"
              defaultValue={project?.liveLink ?? ""}
              className="field-input"
              placeholder="https://…"
            />
          </label>
          <label className="block">
            <span className="field-label mb-1.5">Repo link</span>
            <input
              name="repoLink"
              type="url"
              defaultValue={project?.repoLink ?? ""}
              className="field-input"
              placeholder="https://github.com/…"
            />
          </label>
        </div>

        <label className="block md:col-span-2">
          <span className="field-label mb-1.5">Description</span>
          <textarea
            name="description"
            defaultValue={project?.description}
            className="field-input min-h-24 leading-relaxed"
            placeholder="What it does, problems solved, key results…"
            required
            maxLength={4000}
          />
        </label>

        <div className="flex flex-wrap items-center gap-6 md:col-span-2">
          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              name="isPublished"
              defaultChecked={project?.isPublished ?? true}
              className="h-4 w-4 accent-[#c96442]"
            />
            <span className="text-xs text-muted">Published</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={project?.featured ?? false}
              className="h-4 w-4 accent-[#c96442]"
            />
            <span className="text-xs text-muted">Featured on homepage</span>
          </label>
        </div>
      </div>
    </>
  );
}

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <section className="space-y-8">
      <header>
        <p className="eyebrow">Content</p>
        <h1 className="mt-2 text-3xl text-foreground">Projects</h1>
        <p className="mt-2 text-xs text-muted">
          {projects.length} total · manage what appears in the work grid
        </p>
      </header>

      <AdminForm action={createProject} resetOnSuccess className="panel space-y-5 rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface-muted text-accent-strong">
            <FolderKanban className="h-4 w-4" />
          </span>
          <h2 className="text-lg text-foreground">New project</h2>
        </div>

        <ProjectFields />

        <div className="flex justify-end">
          <SubmitButton pendingLabel="Creating…">Create project</SubmitButton>
        </div>
      </AdminForm>

      <div className="space-y-3">
        {projects.length === 0 ? (
          <p className="panel rounded-2xl p-6 text-center text-sm text-muted">
            No projects yet — create the first one above.
          </p>
        ) : (
          projects.map((project) => (
            <AdminItemCard
              key={project.id}
              title={project.title}
              subtitle={project.techStack.join(" · ")}
              badges={<StatusBadges isPublished={project.isPublished} featured={project.featured} />}
            >
              <div className="space-y-5">
                <AdminForm action={updateProject} className="space-y-5">
                  <ProjectFields project={project} />
                  <div className="flex justify-end">
                    <SubmitButton pendingLabel="Updating…">Update project</SubmitButton>
                  </div>
                </AdminForm>
                <div className="flex items-center border-t border-line pt-4">
                  <DeleteForm
                    action={deleteProject}
                    id={project.id}
                    confirmMessage={`Delete “${project.title}”? This cannot be undone.`}
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
