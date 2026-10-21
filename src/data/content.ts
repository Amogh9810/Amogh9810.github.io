/**
 * ============================================================================
 * ALL PLACEHOLDER CONTENT LIVES HERE.
 *
 * Replace the dummy values below with your real details. Nothing in this file
 * affects component logic — the UI reads whatever you put here, so you can edit
 * freely without touching any component.
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/* RESUME                                                                      */
/* -------------------------------------------------------------------------- */

export const RESUME = {
  /** TODO: drop your real PDF at /public/resume.pdf (or change this path). */
  fileUrl: "/resume.pdf",
  headline: "Your Name — Your Title",
  summary:
    "Placeholder summary line. Replace this with a one or two sentence professional summary that sits above the download button.",
  highlights: [
    "Placeholder highlight one",
    "Placeholder highlight two",
    "Placeholder highlight three",
  ],
};

/* -------------------------------------------------------------------------- */
/* EDUCATION                                                                   */
/* -------------------------------------------------------------------------- */

export interface EducationEntry {
  institute: string;
  degree: string;
  dateRange: string;
  cgpa: string;
  coursework: string[];
}

export const EDUCATION: EducationEntry[] = [
  {
    institute: "Institute Name Placeholder 1",
    degree: "Degree Placeholder 1",
    dateRange: "Month Year — Month Year",
    cgpa: "CGPA 0.0",
    coursework: ["Course One", "Course Two", "Course Three", "Course Four", "Course Five"],
  },
  {
    institute: "Institute Name Placeholder 2",
    degree: "Degree Placeholder 2",
    dateRange: "Month Year — Month Year",
    cgpa: "CGPA 0.0",
    coursework: ["Course One", "Course Two", "Course Three", "Course Four"],
  },
];

/* -------------------------------------------------------------------------- */
/* EXPERIENCE                                                                  */
/* -------------------------------------------------------------------------- */

export interface ExperienceEntry {
  company: string;
  role: string;
  dateRange: string;
  location: string;
  points: string[];
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "Company Name Placeholder 1",
    role: "Role Placeholder 1",
    dateRange: "Month Year — Present",
    location: "Location Placeholder",
    points: [
      "Placeholder bullet point describing a responsibility or achievement.",
      "Placeholder bullet point describing a responsibility or achievement.",
      "Placeholder bullet point describing a responsibility or achievement.",
      "Placeholder bullet point describing a responsibility or achievement.",
    ],
  },
  {
    company: "Company Name Placeholder 2",
    role: "Role Placeholder 2",
    dateRange: "Month Year — Month Year",
    location: "Location Placeholder",
    points: [
      "Placeholder bullet point describing a responsibility or achievement.",
      "Placeholder bullet point describing a responsibility or achievement.",
      "Placeholder bullet point describing a responsibility or achievement.",
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* PROJECTS                                                                    */
/* -------------------------------------------------------------------------- */

export interface ProjectEntry {
  name: string;
  description: string;
  stack: string[];
  repoUrl: string;
  liveUrl: string;
}

export const PROJECTS: ProjectEntry[] = [
  {
    name: "Project Name Placeholder 1",
    description: "Short placeholder description of what this project does and why it exists.",
    stack: ["Tech One", "Tech Two", "Tech Three"],
    repoUrl: "#", // TODO: add link
    liveUrl: "#", // TODO: add link
  },
  {
    name: "Project Name Placeholder 2",
    description: "Short placeholder description of what this project does and why it exists.",
    stack: ["Tech One", "Tech Two"],
    repoUrl: "#", // TODO: add link
    liveUrl: "#", // TODO: add link
  },
  {
    name: "Project Name Placeholder 3",
    description: "Short placeholder description of what this project does and why it exists.",
    stack: ["Tech One", "Tech Two", "Tech Three", "Tech Four"],
    repoUrl: "#", // TODO: add link
    liveUrl: "#", // TODO: add link
  },
  {
    name: "Project Name Placeholder 4",
    description: "Short placeholder description of what this project does and why it exists.",
    stack: ["Tech One", "Tech Two"],
    repoUrl: "#", // TODO: add link
    liveUrl: "#", // TODO: add link
  },
];

/* -------------------------------------------------------------------------- */
/* CERTIFICATES                                                                */
/* -------------------------------------------------------------------------- */

export interface CertificateEntry {
  title: string;
  issuer: string;
  date: string;
  credentialUrl: string;
}

export const CERTIFICATES: CertificateEntry[] = [
  {
    title: "Certificate Title Placeholder 1",
    issuer: "Issuer Placeholder",
    date: "Month Year",
    credentialUrl: "#", // TODO: add link
  },
  {
    title: "Certificate Title Placeholder 2",
    issuer: "Issuer Placeholder",
    date: "Month Year",
    credentialUrl: "#", // TODO: add link
  },
];

/* -------------------------------------------------------------------------- */
/* SKILLS                                                                      */
/* -------------------------------------------------------------------------- */

export interface SkillGroup {
  category: string;
  items: string[];
}

export const SKILLS: SkillGroup[] = [
  { category: "Category 1", items: ["Skill A", "Skill B", "Skill C", "Skill D"] },
  { category: "Category 2", items: ["Skill A", "Skill B", "Skill C"] },
  { category: "Category 3", items: ["Skill A", "Skill B", "Skill C", "Skill D", "Skill E"] },
  { category: "Category 4", items: ["Skill A", "Skill B", "Skill C"] },
];

/* -------------------------------------------------------------------------- */
/* ABOUT                                                                       */
/* -------------------------------------------------------------------------- */

/**
 * The large welcome note pinned in the middle of the desktop — the first thing a visitor
 * reads. Edit these two lines to change the headline of the whole page.
 */
export const INTRO = {
  title: "Amogh Sharma's Portfolio",
  subtitle: "Frontend Developer & Data Scientist",
};

export const ABOUT = {
  name: "Your Name Placeholder",
  title: "Your Title Placeholder",
  bio: "This is placeholder About Me text. Write two or three sentences about who you are, what you build, and what you are currently working towards. Replace this paragraph with your own words.",
  facts: [
    { label: "Location", value: "Placeholder City" },
    { label: "Focus", value: "Placeholder Focus" },
    { label: "Status", value: "Placeholder Status" },
  ],
};

/* -------------------------------------------------------------------------- */
/* CONTACT                                                                     */
/* -------------------------------------------------------------------------- */

export const CONTACT = {
  email: "placeholder@example.com", // TODO: add real email
  phone: "+00 00000 00000", // TODO: add real phone
  github: "#", // TODO: add link
  linkedin: "#", // TODO: add link
};

