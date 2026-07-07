"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  DEFAULT_SITE_CONFIG,
  SITE_CONFIG_ID,
  parseAcademicYear,
} from "@/lib/site-config";

export async function updateSiteConfig(formData: FormData) {
  const existingConfig = await prisma.siteConfig.findUnique({
    where: { id: SITE_CONFIG_ID },
    select: { currentYear: true },
  });
  const aboutText = String(formData.get("aboutText") ?? "").trim();
  const currentYear = parseAcademicYear(
    String(formData.get("academicYear") ?? ""),
    existingConfig?.currentYear ?? DEFAULT_SITE_CONFIG.currentYear,
  );

  await prisma.siteConfig.upsert({
    where: { id: SITE_CONFIG_ID },
    update: {
      aboutText: aboutText || DEFAULT_SITE_CONFIG.aboutText,
      currentYear,
    },
    create: {
      id: SITE_CONFIG_ID,
      heroTitle: DEFAULT_SITE_CONFIG.heroTitle,
      aboutText: aboutText || DEFAULT_SITE_CONFIG.aboutText,
      currentYear,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin");
}

export async function createProject(formData: FormData) {
  const techStack = String(formData.get("techStack") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  await prisma.project.create({
    data: {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      imageUrl: String(formData.get("imageUrl") ?? ""),
      liveLink: String(formData.get("liveLink") ?? "") || null,
      repoLink: String(formData.get("repoLink") ?? "") || null,
      techStack,
      isPublished: formData.get("isPublished") === "on",
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function deleteProject(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function updateProject(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const techStack = String(formData.get("techStack") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  await prisma.project.update({
    where: { id },
    data: {
      title: String(formData.get("title") ?? ""),
      description: String(formData.get("description") ?? ""),
      imageUrl: String(formData.get("imageUrl") ?? ""),
      liveLink: String(formData.get("liveLink") ?? "") || null,
      repoLink: String(formData.get("repoLink") ?? "") || null,
      techStack,
      isPublished: formData.get("isPublished") === "on",
    },
  });

  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath("/admin/projects");
}

export async function createLink(formData: FormData) {
  await prisma.link.create({
    data: {
      platform: String(formData.get("platform") ?? ""),
      url: String(formData.get("url") ?? ""),
      iconName: String(formData.get("iconName") ?? ""),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/links");
}

export async function deleteLink(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  await prisma.link.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/links");
}

export async function updateLink(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  await prisma.link.update({
    where: { id },
    data: {
      platform: String(formData.get("platform") ?? ""),
      url: String(formData.get("url") ?? ""),
      iconName: String(formData.get("iconName") ?? ""),
    },
  });
  revalidatePath("/");
  revalidatePath("/admin/links");
}

export async function createCertificate(formData: FormData) {
  await prisma.certificate.create({
    data: {
      title: String(formData.get("title") ?? ""),
      issuer: String(formData.get("issuer") ?? ""),
      date: new Date(String(formData.get("date") ?? "")),
      url: String(formData.get("url") ?? ""),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/certificates");
}

export async function deleteCertificate(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  await prisma.certificate.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/certificates");
}

export async function updateCertificate(formData: FormData) {
  const id = String(formData.get("id") ?? "");

  await prisma.certificate.update({
    where: { id },
    data: {
      title: String(formData.get("title") ?? ""),
      issuer: String(formData.get("issuer") ?? ""),
      date: new Date(String(formData.get("date") ?? "")),
      url: String(formData.get("url") ?? ""),
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/certificates");
}
