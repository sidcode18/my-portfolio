-- CreateTable
CREATE TABLE "SiteConfig" (
    "id" TEXT NOT NULL DEFAULT 'config',
    "heroTitle" TEXT NOT NULL DEFAULT 'Engineer in Progress: mostly figuring things out .',
    "aboutText" TEXT NOT NULL DEFAULT 'Trying to bring ideas to life.',
    "currentYear" INTEGER NOT NULL DEFAULT 2,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SiteConfig_pkey" PRIMARY KEY ("id")
);

-- SeedConfig
INSERT INTO "SiteConfig" ("id", "heroTitle", "aboutText", "currentYear", "updatedAt")
VALUES (
    'config',
    'Engineer in Progress: mostly figuring things out .',
    'Trying to bring ideas to life.',
    2,
    CURRENT_TIMESTAMP
)
ON CONFLICT ("id") DO NOTHING;
