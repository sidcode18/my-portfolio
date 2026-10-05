-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "imageUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "SiteConfig" ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "fullName" TEXT NOT NULL DEFAULT 'Sidharth Saji Kutty',
ADD COLUMN     "roleTagline" TEXT NOT NULL DEFAULT 'Full-Stack Engineer',
ALTER COLUMN "heroTitle" SET DEFAULT 'I build and ship full-stack products.',
ALTER COLUMN "updatedAt" DROP DEFAULT;
