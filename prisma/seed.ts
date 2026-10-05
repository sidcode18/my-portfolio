import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteConfig.upsert({
    where: { id: "config" },
    update: {},
    create: {
      id: "config",
      fullName: "Sidharth Saji Kutty",
      roleTagline: "Full-Stack Engineer",
      heroTitle:
        "I build and ship full-stack products — from database schema to interface — with a focus on clean systems and deliberate design.",
      aboutText:
        "I'm a full-stack engineer who likes turning rough ideas into working products. Most of my time goes into Next.js, TypeScript, and Postgres — wiring up data models, server logic, and interfaces that stay out of the way. I care about clean architecture, fast feedback loops, and details you only notice when they're missing.",
      currentYear: 2,
    },
  });

  const githubLink = await prisma.link.findFirst({ where: { platform: "GitHub" } });
  if (!githubLink) {
    await prisma.link.create({
      data: { platform: "GitHub", url: "https://github.com/sidcode18", iconName: "github" },
    });
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    const emailLink = await prisma.link.findFirst({ where: { platform: "Email" } });
    if (!emailLink) {
      await prisma.link.create({
        data: { platform: "Email", url: `mailto:${adminEmail}`, iconName: "mail" },
      });
    }
  }

  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.create({
      data: {
        title: "Portfolio + Admin CMS",
        description:
          "This site — a Next.js portfolio backed by Postgres with a GitHub-gated admin dashboard for managing projects, links, and certificates. Server actions with zod validation keep content edits safe, and every section of the public site renders straight from the database.",
        techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
        featured: true,
        isPublished: true,
      },
    });
  }

  console.log(
    adminEmail
      ? `Seed complete. Admin access is restricted to ${adminEmail} — sign in via GitHub to create the user record.`
      : "ADMIN_EMAIL is not set. Seeded defaults only.",
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
