export const SITE_CONFIG_ID = "config";

export const DEFAULT_SITE_CONFIG = {
  id: SITE_CONFIG_ID,
  heroTitle: "Engineer in Progress: mostly figuring things out .",
  aboutText: "Trying to bring ideas to life.",
  currentYear: 2,
} as const;

const YEAR_LABELS: Record<number, string> = {
  1: "First Year",
  2: "Second Year",
  3: "Third Year",
  4: "Fourth Year",
};

const YEAR_WORDS: Record<string, number> = {
  first: 1,
  second: 2,
  third: 3,
  fourth: 4,
};

export function formatAcademicYear(currentYear: number) {
  const normalizedYear = Number.isFinite(currentYear) ? Math.trunc(currentYear) : 0;
  return YEAR_LABELS[normalizedYear] ?? `${normalizedYear} Year`;
}

export function parseAcademicYear(
  input: string,
  fallbackYear: number = DEFAULT_SITE_CONFIG.currentYear,
) {
  const normalizedInput = input.trim().toLowerCase();
  const wordMatch = Object.entries(YEAR_WORDS).find(([word]) => normalizedInput.includes(word));

  if (wordMatch) {
    return wordMatch[1];
  }

  const numberMatch = normalizedInput.match(/\d+/);
  if (numberMatch) {
    return Number(numberMatch[0]);
  }

  return fallbackYear;
}
