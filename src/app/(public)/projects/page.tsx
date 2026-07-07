import { prisma } from "@/lib/prisma";
import { PageTransition } from "@/components/motion/page-transition";
import { ProjectsContent } from "@/components/editorial/projects-content";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <PageTransition>
      <ProjectsContent projects={projects} />
    </PageTransition>
  );
}
