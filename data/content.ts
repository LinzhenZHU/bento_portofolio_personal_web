import type {
  HeroData,
  SkillsData,
  AboutData,
  ContactEntry,
  ProjectCategory,
} from "./types";

// Re-export types so existing imports keep working.
export type { ContactEntry, Project, ProjectCategory } from "./types";

// ─── Hero ────────────────────────────────────────────────────
export const heroData: HeroData = {
  greeting: "Hi, I am Linzhen Zhu",
  titles: ["a PhD student @UMich CSE", "an Electronics Enthusiast", "a 'Nomadic' Traveler"],
};

// ─── Skills ──────────────────────────────────────────────────
export const skillsData: SkillsData = {
  skills: "Robotics, Sensing, AI/ML, Camping, Photography, Electronics, Electric Vehicles, Driving",
  highlights: ["Robotics", "Sensing", "AI/ML"],
};

// ─── About ───────────────────────────────────────────────────
export const aboutData: AboutData = {
  image: "/pic.png",
  imageAlt: " Character Illustration",
  text: `I am a first-year PhD student at EECS Department at University of Michigan, Ann Arbor, working with Professor Ke Sun at AmI lab.

My research focuses on developing novel sensing systems to solve real-world problems, which rely on phsics and engineering principles.`,
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/linzhen-zhu/CleanShot 2026-03-22 at 19.57.39@2x.pngpic.png",
    googleScholar: "https://scholar.google.com/citations?user=P_CEc8oAAAAJ&hl=en",
    github: "https://github.com/LinzhenZHU",
  },
};

// ─── Contact ─────────────────────────────────────────────────
export const contactData: ContactEntry[] = [
  {
    type: "Email",
    value: "lzzhu@umich.edu",
    href: "mailto:lzzhu@umich.edu",
  },
];

// ─── Work / Projects ─────────────────────────────────────────
export const projectCategories: ProjectCategory[] = [
  {
    workTab: "publication",
    category: "Web Development",
    projects: [
      {
        title: "XXX",
        image: "/projects/placeholder.png",
        techStack: ["GSAP", "Three.js"],
        href: "#",
      },
    ],
  },
  {
    workTab: "honorAward",
    category: "Recognition",
    projects: [
      {
        title: "Placeholder",
        image: "/projects/placeholder.png",
        techStack: ["—"],
        href: "#",
      },
    ],
  },
  {
    workTab: "service",
    category: "Community",
    projects: [
      {
        title: "Placeholder",
        image: "/projects/placeholder.png",
        techStack: ["—"],
        href: "#",
      },
    ],
  },
];
