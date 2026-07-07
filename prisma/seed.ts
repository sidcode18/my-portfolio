import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteConfig.upsert({
    where: { id: "config" },
    update: {},
    create: {
      id: "config",
      heroTitle: "Engineer in Progress: mostly figuring things out .",
      aboutText: "Trying to bring ideas to life.",
      currentYear: 2,
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    console.warn("ADMIN_EMAIL is not set. Skipping seed.");
    return;
  }

  console.log(
    `Admin access is restricted to ${adminEmail}. Sign in via GitHub to create the user record.`,
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
