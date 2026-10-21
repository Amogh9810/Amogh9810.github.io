/**
 * The single registry of desktop sections.
 *
 * Everything that enumerates sections — the desktop icon grid, the Start menu, and the
 * chatbot's intent matcher — reads from this one array, so adding or removing a section is
 * a one-line change here rather than an edit in four places.
 *
 * `icon` points at a file in /public/icons. All nine SVGs ship with the project; if you
 * rename or remove one, update the path here too.
 */
export type SectionId =
  | "resume"
  | "education"
  | "experience"
  | "projects"
  | "certificates"
  | "skills"
  | "about"
  | "contact";

export interface SectionMeta {
  id: SectionId;
  label: string;
  icon: string;
  /** Plain-language hints the chatbot matches against. Lowercase. */
  keywords: string[];
}

export const SECTIONS: SectionMeta[] = [
  {
    id: "resume",
    label: "Resume",
    icon: "/icons/resume.svg",
    keywords: ["resume", "cv", "download"],
  },
  {
    id: "education",
    label: "Education",
    icon: "/icons/education.svg",
    keywords: ["education", "study", "studied", "college", "university", "degree", "school", "cgpa"],
  },
  {
    id: "experience",
    label: "Experience",
    icon: "/icons/experience.svg",
    keywords: ["experience", "work", "job", "intern", "internship", "career", "employment"],
  },
  {
    id: "projects",
    label: "Projects",
    icon: "/icons/projects.svg",
    keywords: ["project", "projects", "portfolio", "built", "build", "made"],
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: "/icons/certificates.svg",
    keywords: ["certificate", "certificates", "certification", "credential", "course"],
  },
  {
    id: "skills",
    label: "Skills",
    icon: "/icons/skills.svg",
    keywords: ["skill", "skills", "tech", "stack", "technology", "languages", "tools"],
  },
  {
    id: "about",
    label: "About Me",
    icon: "/icons/about.svg",
    keywords: ["about", "who", "yourself", "bio", "introduce", "intro"],
  },
  {
    id: "contact",
    label: "Contact",
    icon: "/icons/contact.svg",
    keywords: ["contact", "email", "reach", "phone", "hire", "linkedin", "github", "connect"],
  },
];

export const CHATBOT_ICON = "/icons/chatbot.svg";

export function getSection(id: SectionId): SectionMeta {
  const found = SECTIONS.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown section: ${id}`);
  return found;
}
