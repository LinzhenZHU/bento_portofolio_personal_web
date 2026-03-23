// Shared types used by both content.ts (local data) and Sanity (CMS data).

export type HeroData = {
  greeting: string;
  titles: string[];
};

export type SkillsData = {
  skills: string;
  highlights: string[];
};

export type AboutSocialLinks = {
  linkedin?: string;
  googleScholar?: string;
  github?: string;
};

export type AboutData = {
  image: string;
  imageAlt: string;
  text: string;
  /** Optional profile URLs; omit or leave empty to hide an icon */
  socialLinks?: AboutSocialLinks;
};

export type ContactEntry = {
  type: string;
  value: string;
  href: string;
};

export type Project = {
  title: string;
  image: string;
  techStack: string[];
  href?: string;
};

/** Tabs in the Work panel; each project group is tagged with one */
export type WorkTabId = "publication" | "honorAward" | "service";

export type ProjectCategory = {
  /** Defaults to `publication` when omitted (e.g. legacy Sanity docs) */
  workTab?: WorkTabId;
  category: string;
  projects: Project[];
};

export type SiteData = {
  hero: HeroData;
  skills: SkillsData;
  about: AboutData;
  contact: ContactEntry[];
  projectCategories: ProjectCategory[];
};
