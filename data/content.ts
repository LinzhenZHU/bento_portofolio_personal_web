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
  titles: ["a Ph.D. Candidate @UMich", "an Electronics Enthusiast", "a 'Nomadic' Traveler"],
  links: [
    { label: "CV (PDF)", href: "/Linzhen_Zhu_CV.pdf" },
    { label: "AmI Lab", href: "https://ambient-intelligence-lab-umich-eecs.github.io/ami_lab_website/" },
  ],
};

// ─── Skills ──────────────────────────────────────────────────
export const skillsData: SkillsData = {
  skills: "Robotics, Sensing, AI/ML, Camping, Photography, Electronics, Electric Vehicles, Roadtrip (Prefer FSD 😂)",
  highlights: ["Robotics", "Sensing", "AI/ML"],
};

// ─── About ───────────────────────────────────────────────────
export const aboutData: AboutData = {
  image: "/pic.png",
  imageAlt: "Illustration of Linzhen Zhu",
  text: `I am a Ph.D. Candidate in Computer Science and Engineering at the University of Michigan, Ann Arbor, advised by Prof. Ke Sun in the Ambient Intelligence (AmI) Lab. My research spans optical and tactile sensing, mobile and ubiquitous computing, and human–computer interaction.

I design sensing and sensor–actuator systems that combine physical principles, embedded hardware, and computational methods to understand and interact with the physical world.

I joined the Ph.D. program in September 2025 and received my M.S.E. in Computer Science and Engineering from Michigan in April 2026. I earned a First Class B.Eng. in Electrical and Electronic Engineering from the University of Nottingham Ningbo China in July 2024.`,
  socialLinks: {
    linkedin: "https://www.linkedin.com/in/linzhen-zhu/",
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

// Published and accepted work, reconciled with the October 2026 CV.
// Link public project pages only; unpublished projects are intentionally omitted.
const moireLensPage = "https://ambient-intelligence-lab-umich-eecs.github.io/MoireLens-Page/";
const moireSkinPage = "https://ambient-intelligence-lab-umich-eecs.github.io/MoireSkin-Page/";

export const projectCategories: ProjectCategory[] = [
  {
    workTab: "publication",
    category: "Conference Papers",
    projects: [
      {
        title: "MoiréSkin: Ultra-Sensitive Sensor–Actuator Visuo-Tactile Skin Using Moiré Patterns",
        authors: "Zhu, L., Xing, L., Wang, R., and Sun, K.",
        description: "Moiré-based tactile sensing with pneumatic actuation and adjustable compliance.",
        techStack: ["ACM MobiCom 2026", "Accepted full paper"],
        href: moireSkinPage,
        links: [
          { label: "Project page", href: moireSkinPage },
          { label: "Paper", href: "https://doi.org/10.1145/3795866.3844463" },
        ],
      },
      {
        title: "MoiréLens: Bringing Schlieren Imaging into Real-World Environments Using Moiré Patterns",
        authors: "Zhu, L.*, Wang, R.*, Rong, Y., and Sun, K.",
        description: "Visualizing invisible gas flows using Moiré-embedded backgrounds and a commodity camera.",
        techStack: ["ACM/IEEE SenSys 2026", "Co-first author"],
        href: moireLensPage,
        links: [
          { label: "Project page", href: moireLensPage },
          { label: "Paper", href: "https://doi.org/10.1145/3774906.3802765" },
          { label: "Code", href: "https://github.com/Ambient-Intelligence-Lab-UMich-EECS/MoireLens-Code" },
        ],
      },
      {
        title: "Neural Active Sensing Vision and Manipulation for Cooperative Agents",
        authors: "Wang, C., Tan, C., Zhu, L., Yang, R., and Hong, J.",
        techStack: ["IEEE ICBASE 2024"],
        href: "https://doi.org/10.1109/ICBASE63199.2024.10762162",
        links: [{ label: "Paper", href: "https://doi.org/10.1109/ICBASE63199.2024.10762162" }],
      },
      {
        title: "Enhancing DF-INS for Accurate Zero-Velocity Detection in ILBS: A Dual Foot Synergistic Method",
        authors: "Wu, R., Lee, B. G., Pike, M., Zhu, L., Chai, X., and Wang, Y.",
        techStack: ["IEEE SENSORS 2023"],
        href: "https://doi.org/10.1109/SENSORS56945.2023.10325168",
        links: [{ label: "Paper", href: "https://doi.org/10.1109/SENSORS56945.2023.10325168" }],
      },
    ],
  },
  {
    workTab: "publication",
    category: "Journal Articles",
    projects: [
      {
        title: "Throughout Maximization for IRS-Assisted WPCN With Hybrid TDMA-NOMA Scheme",
        authors: "Ma, Y., Wu, R., Zhang, Y., Shang, Y., and Zhu, L.",
        techStack: ["IEEE Access 2025", "13, 23384–23398"],
        href: "https://doi.org/10.1109/ACCESS.2025.3537988",
        links: [{ label: "Paper", href: "https://doi.org/10.1109/ACCESS.2025.3537988" }],
      },
      {
        title: "FEGAN: A Feature-Oriented Enhanced GAN for Enhancing Thermal Image Super-Resolution",
        authors: "Zhu, L., Wu, R., Lee, B. G., Nkenyereye, L., Chung, W. Y., and Xu, G.",
        techStack: ["IEEE Signal Processing Letters 2024", "31, 541–545"],
        href: "https://doi.org/10.1109/LSP.2024.3356751",
        links: [
          { label: "Paper", href: "https://doi.org/10.1109/LSP.2024.3356751" },
          { label: "Code", href: "https://github.com/LinzhenZHU/FEGAN" },
        ],
      },
      {
        title: "IOAM: A Novel Sensor Fusion-Based Wearable for Localization and Mapping",
        authors: "Wu, R., Lee, B. G., Pike, M., Zhu, L., Chai, X., Huang, L., and Wu, X.",
        techStack: ["Remote Sensing 2022", "14(23), 6081"],
        href: "https://doi.org/10.3390/rs14236081",
        links: [{ label: "Paper", href: "https://doi.org/10.3390/rs14236081" }],
      },
    ],
  },
  {
    workTab: "publication",
    category: "Demonstration Papers & Extended Abstracts",
    projects: [
      {
        title: "Demo: MoiréLens: Invisible Flow Visualization using Moiré Patterns",
        authors: "Zhu, L.*, Wang, R.*, Rong, Y., and Sun, K.",
        techStack: ["ACM MobiCom 2026", "Accepted demo", "Co-first author"],
        href: moireLensPage,
        links: [
          { label: "Project page", href: moireLensPage },
          { label: "Paper", href: "https://doi.org/10.1145/3795866.3848448" },
        ],
      },
      {
        title: "Demo: MoiréSkin: Ultra-Sensitive Sensor–Actuator Visuo-Tactile Skin Using Moiré Patterns",
        authors: "Zhu, L., Xing, L., Wang, R., and Sun, K.",
        techStack: ["ACM MobiCom 2026", "Accepted demo"],
        href: moireSkinPage,
        links: [
          { label: "Project page", href: moireSkinPage },
          { label: "Paper", href: "https://doi.org/10.1145/3795866.3848452" },
        ],
      },
      {
        title: "Demo: Towards Fine-Grained Deformation Sensing through Naturally Occurring Moiré Patterns in Everyday Woven Surfaces",
        authors: "Zhu, L., Li, Z., Jin, W., Park, H., Sample, A., and Sun, K.",
        techStack: ["ACM MobiCom 2026", "Accepted demo"],
        href: "https://doi.org/10.1145/3795866.3848426",
        links: [{ label: "Paper", href: "https://doi.org/10.1145/3795866.3848426" }],
      },
      {
        title: "Exploring the Impact of Haptic Feedback Locations and Mid-air Haptic Technology on Driver's Takeover Performance in Automated Vehicles",
        authors: "Lan, R., Sun, X., Zhu, L., Wang, Q., and Liu, B.",
        techStack: ["ACM CHI Extended Abstracts 2025"],
        href: "https://doi.org/10.1145/3706599.3719994",
        links: [{ label: "Paper", href: "https://doi.org/10.1145/3706599.3719994" }],
      },
    ],
  },
  {
    workTab: "honorAward",
    category: "Fellowships & Scholarships",
    projects: [
      {
        title: "Wang Kuo Tong Memorial Fellowship",
        description: "University of Michigan",
        techStack: ["Fellowship"],
      },
      {
        title: "President’s Scholarship",
        description: "University of Nottingham Ningbo China",
        techStack: ["Scholarship"],
      },
      {
        title: "Dream Scholarship: Science & Technology",
        description: "University of Nottingham Ningbo China",
        techStack: ["Scholarship"],
      },
      {
        title: "Li DakSum Innovation Fellowship",
        description: "University of Nottingham Ningbo China",
        techStack: ["Innovation fellowship"],
      },
    ],
  },
  {
    workTab: "honorAward",
    category: "Academic Honors",
    projects: [
      {
        title: "Provincial Outstanding Graduate",
        description: "Zhejiang, China",
        techStack: ["Graduate honor"],
      },
      {
        title: "Best Performer of the Year",
        description: "University of Nottingham Ningbo China",
        techStack: ["Academic honor"],
      },
      {
        title: "Outstanding Student",
        description: "University of Nottingham Ningbo China",
        techStack: ["Academic honor"],
      },
    ],
  },
  {
    workTab: "service",
    category: "Peer Review",
    projects: [
      {
        title: "ACM IMWUT",
        description: "Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous Technologies",
        techStack: ["Reviewer", "2026"],
      },
      {
        title: "IEEE Transactions on Systems, Man, and Cybernetics: Systems",
        techStack: ["Reviewer", "2026"],
      },
    ],
  },
];
