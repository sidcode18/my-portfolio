"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  DEFAULT_SITE_CONFIG,
  SITE_CONFIG_ID,
  parseAcademicYear,
} from "@/lib/site-config";
import type { ActionState } from "@/lib/action-state";

const urlField = (required: boolean, label: string) =>
  z
    .string()
    .trim()
    .max(2048)
    .refine((value) => {
      if (!value) return !required;
      return /^https?:\/\/\S+$/i.test(value);
    }, `${label} must be a valid http(s) URL`);

const optionalEmail = z
  .string()
  .trim()
  .max(320)
  .refine(
    (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    "Contact email is not valid",
  );

const contactUrlField = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(2048)
    .refine(
      (value) => /^(https?:\/\/\S+|mailto:\S+@\S+)$/i.test(value),
      `${label} must be a valid http(s) or mailto URL`,
    );

const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120),
  description: z.string().trim().min(1, "Description is required").max(4000),
  techStack: z
    .string()
    .transform((value) =>
      value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 24),
    )
    .refine((items) => items.length > 0, "Add at least one technology"),
  imageUrl: urlField(false, "Image URL"),
  liveLink: urlField(false, "Live link"),
  repoLink: urlField(false, "Repository link"),
  featured: z.boolean(),
  isPublished: z.boolean(),
});

const linkSchema = z.object({
  platform: z.string().trim().min(1, "Platform is required").max(60),
  url: contactUrlField("URL"),
  iconName: z.string().trim().min(1, "Icon is required").max(40),
});

const certificateSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(160),
  issuer: z.string().trim().min(1, "Issuer is required").max(160),
  date: z
    .string()
    .trim()
    .min(1, "Date is required")
    .refine((value) => !Number.isNaN(new Date(value).getTime()), "Date is invalid"),
  url: urlField(true, "Credential URL"),
});

const siteConfigSchema = z.object({
  fullName: z.string().trim().min(1, "Name is required").max(120),
  roleTagline: z.string().trim().min(1, "Role is required").max(120),
  avatarUrl: urlField(false, "Avatar URL"),
  contactEmail: optionalEmail,
  heroTitle: z.string().trim().min(1, "Headline is required").max(400),
  aboutText: z.string().trim().min(1, "About text is required").max(4000),
  academicYear: z.string().trim().min(1, "Academic year is required"),
});

function toFieldErrors(error: z.ZodError): string {
  return error.issues.map((issue) => issue.message).join(" · ");
}

function isUniqueConstraintError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2002"
  );
}

function errorState(error: unknown, fallback: string): ActionState {
  if (isUniqueConstraintError(error)) {
    return { status: "error", message: "A record with these details already exists." };
  }
  console.error(error);
  return { status: "error", message: fallback };
}

// ─── Site config ─────────────────────────────────────────────────────────────

export async function updateSiteConfig(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = siteConfigSchema.safeParse({
    fullName: formData.get("fullName") ?? "",
    roleTagline: formData.get("roleTagline") ?? "",
    avatarUrl: formData.get("avatarUrl") ?? "",
    contactEmail: formData.get("contactEmail") ?? "",
    heroTitle: formData.get("heroTitle") ?? "",
    aboutText: formData.get("aboutText") ?? "",
    academicYear: formData.get("academicYear") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: toFieldErrors(parsed.error) };
  }

  try {
    const existing = await prisma.siteConfig.findUnique({
      where: { id: SITE_CONFIG_ID },
      select: { currentYear: true },
    });

    const data = parsed.data;
    const currentYear = parseAcademicYear(
      data.academicYear,
      existing?.currentYear ?? DEFAULT_SITE_CONFIG.currentYear,
    );

    await prisma.siteConfig.upsert({
      where: { id: SITE_CONFIG_ID },
      update: {
        fullName: data.fullName,
        roleTagline: data.roleTagline,
        avatarUrl: data.avatarUrl || null,
        contactEmail: data.contactEmail || null,
        heroTitle: data.heroTitle,
        aboutText: data.aboutText,
        currentYear,
      },
      create: {
        id: SITE_CONFIG_ID,
        fullName: data.fullName,
        roleTagline: data.roleTagline,
        avatarUrl: data.avatarUrl || null,
        contactEmail: data.contactEmail || null,
        heroTitle: data.heroTitle,
        aboutText: data.aboutText,
        currentYear,
      },
    });
  } catch (error) {
    return errorState(error, "Could not save settings. Please try again.");
  }

  revalidatePath("/", "layout");

  return { status: "success", message: "Settings saved.", savedAt: Date.now() };
}

// ─── Projects ────────────────────────────────────────────────────────────────

export async function createProject(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = projectSchema.safeParse({
    title: formData.get("title") ?? "",
    description: formData.get("description") ?? "",
    techStack: formData.get("techStack") ?? "",
    imageUrl: formData.get("imageUrl") ?? "",
    liveLink: formData.get("liveLink") ?? "",
    repoLink: formData.get("repoLink") ?? "",
    featured: formData.get("featured") === "on",
    isPublished: formData.get("isPublished") === "on",
  });

  if (!parsed.success) {
    return { status: "error", message: toFieldErrors(parsed.error) };
  }

  try {
    const { featured, isPublished, ...data } = parsed.data;

    await prisma.project.create({
      data: {
        ...data,
        imageUrl: data.imageUrl || null,
        liveLink: data.liveLink || null,
        repoLink: data.repoLink || null,
        featured: featured && isPublished,
        isPublished,
      },
    });
  } catch (error) {
    return errorState(error, "Could not create the project. Please try again.");
  }

  revalidatePath("/", "layout");

  return { status: "success", message: "Project created.", savedAt: Date.now() };
}

export async function updateProject(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { status: "error", message: "Missing project id." };
  }

  const parsed = projectSchema.safeParse({
    title: formData.get("title") ?? "",
    description: formData.get("description") ?? "",
    techStack: formData.get("techStack") ?? "",
    imageUrl: formData.get("imageUrl") ?? "",
    liveLink: formData.get("liveLink") ?? "",
    repoLink: formData.get("repoLink") ?? "",
    featured: formData.get("featured") === "on",
    isPublished: formData.get("isPublished") === "on",
  });

  if (!parsed.success) {
    return { status: "error", message: toFieldErrors(parsed.error) };
  }

  try {
    const { featured, isPublished, ...data } = parsed.data;

    await prisma.project.update({
      where: { id },
      data: {
        ...data,
        imageUrl: data.imageUrl || null,
        liveLink: data.liveLink || null,
        repoLink: data.repoLink || null,
        featured: featured && isPublished,
        isPublished,
      },
    });
  } catch (error) {
    return errorState(error, "Could not update the project. Please try again.");
  }

  revalidatePath("/", "layout");

  return { status: "success", message: "Project updated.", savedAt: Date.now() };
}

export async function deleteProject(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { status: "error", message: "Missing project id." };
  }

  try {
    await prisma.project.delete({ where: { id } });
  } catch (error) {
    return errorState(error, "Could not delete the project.");
  }

  revalidatePath("/", "layout");

  return { status: "success", message: "Project deleted.", savedAt: Date.now() };
}

// ─── Links ───────────────────────────────────────────────────────────────────

export async function createLink(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = linkSchema.safeParse({
    platform: formData.get("platform") ?? "",
    url: formData.get("url") ?? "",
    iconName: formData.get("iconName") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: toFieldErrors(parsed.error) };
  }

  try {
    await prisma.link.create({ data: parsed.data });
  } catch (error) {
    return errorState(error, "Could not create the link. Please try again.");
  }

  revalidatePath("/", "layout");

  return { status: "success", message: "Link created.", savedAt: Date.now() };
}

export async function updateLink(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { status: "error", message: "Missing link id." };
  }

  const parsed = linkSchema.safeParse({
    platform: formData.get("platform") ?? "",
    url: formData.get("url") ?? "",
    iconName: formData.get("iconName") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: toFieldErrors(parsed.error) };
  }

  try {
    await prisma.link.update({ where: { id }, data: parsed.data });
  } catch (error) {
    return errorState(error, "Could not update the link. Please try again.");
  }

  revalidatePath("/", "layout");

  return { status: "success", message: "Link updated.", savedAt: Date.now() };
}

export async function deleteLink(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { status: "error", message: "Missing link id." };
  }

  try {
    await prisma.link.delete({ where: { id } });
  } catch (error) {
    return errorState(error, "Could not delete the link.");
  }

  revalidatePath("/", "layout");

  return { status: "success", message: "Link deleted.", savedAt: Date.now() };
}

// ─── Certificates ────────────────────────────────────────────────────────────

export async function createCertificate(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsed = certificateSchema.safeParse({
    title: formData.get("title") ?? "",
    issuer: formData.get("issuer") ?? "",
    date: formData.get("date") ?? "",
    url: formData.get("url") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: toFieldErrors(parsed.error) };
  }

  try {
    await prisma.certificate.create({
      data: {
        title: parsed.data.title,
        issuer: parsed.data.issuer,
        date: new Date(parsed.data.date),
        url: parsed.data.url,
      },
    });
  } catch (error) {
    return errorState(error, "Could not create the certificate. Please try again.");
  }

  revalidatePath("/", "layout");

  return { status: "success", message: "Certificate created.", savedAt: Date.now() };
}

export async function updateCertificate(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { status: "error", message: "Missing certificate id." };
  }

  const parsed = certificateSchema.safeParse({
    title: formData.get("title") ?? "",
    issuer: formData.get("issuer") ?? "",
    date: formData.get("date") ?? "",
    url: formData.get("url") ?? "",
  });

  if (!parsed.success) {
    return { status: "error", message: toFieldErrors(parsed.error) };
  }

  try {
    await prisma.certificate.update({
      where: { id },
      data: {
        title: parsed.data.title,
        issuer: parsed.data.issuer,
        date: new Date(parsed.data.date),
        url: parsed.data.url,
      },
    });
  } catch (error) {
    return errorState(error, "Could not update the certificate. Please try again.");
  }

  revalidatePath("/", "layout");

  return { status: "success", message: "Certificate updated.", savedAt: Date.now() };
}

export async function deleteCertificate(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const id = String(formData.get("id") ?? "");
  if (!id) {
    return { status: "error", message: "Missing certificate id." };
  }

  try {
    await prisma.certificate.delete({ where: { id } });
  } catch (error) {
    return errorState(error, "Could not delete the certificate.");
  }

  revalidatePath("/", "layout");

  return { status: "success", message: "Certificate deleted.", savedAt: Date.now() };
}
