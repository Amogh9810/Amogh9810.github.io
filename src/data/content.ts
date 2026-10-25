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
  /** Hosted on Google Drive — swap for "/resume.pdf" if you later drop the file into /public instead. */
  fileUrl: "https://drive.google.com/file/d/1tm7iBPQJ_PR5KjEql2VBqu9LqfPB2MUU/view?usp=sharing",
  headline: "Amogh Sharma — Frontend Developer & Data Scientist",
  summary:
    "Dual-degree student (IIT Madras + JIIT Noida) working across frontend development, full-stack engineering, and machine learning — currently a Frontend Developer Intern at Atomity.",
  highlights: [
    "Frontend Developer Intern at Atomity, building production UIs in Next.js, React, and TypeScript",
    "Shipped full-stack projects spanning AI/OCR pipelines, hospital management systems, and gamified learning platforms",
    "Strong foundation in data science and ML — NumPy, Pandas, Scikit-Learn, PyTorch",
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
    institute: "Indian Institute of Technology, Madras",
    degree: "Bachelor of Science in Data Science and Applications",
    dateRange: "May 2024 — June 2028",
    cgpa: "CGPA 7.2",
    coursework: [
      "Python Programming",
      "Data Structures and Algorithms",
      "Linear Algebra",
      "Probability Theory and Statistics",
      "Database Management Systems (SQL)",
      "Exploratory Data Analysis",
      "Machine Learning",
      "Data Visualization Techniques",
      "Software Engineering",
    ],
  },
  {
    institute: "Jaypee Institute of Information Technology",
    degree: "Bachelor of Technology in Mathematics and Computer Science",
    dateRange: "May 2024 — May 2028",
    cgpa: "CGPA 7.5",
    coursework: [
      "Data Structures & Algorithms",
      "Discrete Mathematics",
      "Linear Algebra",
      "Probability Theory & Statistics",
      "Differential Calculus",
      "Numerical Methods",
      "Object-Oriented Programming",
      "Database Management Systems",
      "Computer Networks",
      "Machine Learning",
      "Optimization Techniques",
      "Graph Theory",
    ],
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
    company: "Atomity",
    role: "Frontend Developer Intern",
    dateRange: "July 2026 — Present",
    location: "Remote",
    points: [
      "Developed and enhanced responsive user interfaces using Next.js, React, TypeScript, and Tailwind CSS.",
      "Built reusable UI components including News pages, CTA sections, layouts, and responsive interfaces following the company's design system.",
      "Improved frontend performance and maintainability by fixing UI inconsistencies, responsive layout issues, spacing, and styling bugs across multiple pages.",
      "Collaborated using Git/GitLab workflow, working on feature branches and delivering production-ready code for the Atomity platform.",
    ],
  },
  {
    company: "Cognifyz Technologies",
    role: "Software Engineering Intern",
    dateRange: "May 2025 — June 2025",
    location: "Remote",
    points: [
      "Implemented 6 end-to-end applications using Python including games, CRUD systems, file handling, automation, and web scraping projects.",
      "Developed a Task Manager using Object-Oriented Programming and persistent file storage with modular architecture.",
      "Created a web scraper processing 100+ records per execution while maintaining clean, reusable Python code.",
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
    name: "SmartPrep AI (AI Study Planner)",
    description:
      "AI-powered study planner with automated syllabus management. Uses an OCR + NLP pipeline (EasyOCR + spaCy) to extract and structure topics from uploaded syllabus documents — a 2,000+ LOC full-stack system.",
    stack: ["Next.js", "FastAPI", "Supabase", "EasyOCR", "spaCy"],
    repoUrl: "https://github.com/Amogh9810/SmartPrepAI",
    liveUrl: "", // no live deployment yet
  },
  {
    name: "MediFlow (Hospital Appointment & Queue Management System)",
    description:
      "Full-stack hospital management platform. Resolved critical security vulnerabilities (JWT issues, SQL injection, authorization bypasses, credential exposure) and fixed backend N+1 queries, race conditions, and frontend memory leaks across 1,500+ LOC covering queue management, appointment booking, and physician scheduling.",
    stack: ["Next.js", "Node.js", "Express", "PostgreSQL", "Prisma"],
    repoUrl: "https://github.com/Amogh9810/MediFlow",
    liveUrl: "https://mediflow-1-s528.onrender.com/",
  },
  {
    name: "QuestED",
    description: "Gamified learning platform — over 1,200 lines of code.",
    stack: ["React", "JavaScript"],
    repoUrl: "https://github.com/Amogh9810/QuestED-Gamified-Learning-Collaboration-Hub",
    liveUrl: "", // no live deployment yet
  },
  {
    name: "Eco-Ride",
    description: "Travel planner built with a React frontend and Flask backend — over 1,500 lines of code.",
    stack: ["React", "Flask"],
    repoUrl: "https://github.com/Amogh9810/Eco-travel-Project-In-Process-",
    liveUrl: "", // no live deployment yet
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
    title: "Foundation Certificate",
    issuer: "IIT Madras",
    date: "", // add month/year if you like
    credentialUrl: "https://drive.google.com/file/d/17nlDfreR6DVZOcPEhMXcm54o3SXPgEQr/view?usp=sharing",
  },
  {
    title: "Advanced Certificate",
    issuer: "IIT Madras",
    date: "",
    credentialUrl: "https://drive.google.com/file/d/1GirFNvRX1FyW6uejpkLFt8vTGxvGKFb1/view?usp=sharing",
  },
  {
    title: "Diploma in Data Science",
    issuer: "IIT Madras",
    date: "",
    credentialUrl: "https://drive.google.com/file/d/1KsOnvtgtGFaR0thAVpaYiooEmUrPzG1E/view?usp=sharing",
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
  {
    category: "Languages",
    items: ["C++", "Python", "Java", "SQL", "TypeScript", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Figma"],
  },
  {
    category: "Data & ML",
    items: ["NumPy", "Pandas", "Matplotlib", "Scikit-Learn", "PyTorch", "Jupyter Notebook"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "GitHub", "Docker", "VS Code", "Postman", "Anaconda"],
  },
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
  subtitle: "20 — Engineer, Builder",
};

export const ABOUT = {
  name: "Amogh Sharma",
  title: "Frontend Developer & Data Scientist",
  bio: "I'm a dual-degree student pursuing a BS in Data Science and Applications at IIT Madras alongside a BTech in Mathematics and Computer Science at JIIT Noida. My work spans frontend development, full-stack engineering, and machine learning — currently building production UIs as a Frontend Developer Intern at Atomity.",
  facts: [
    { label: "Location", value: "Delhi, India" },
    { label: "Focus", value: "Frontend & Data Science" },
    { label: "Status", value: "Frontend Intern @ Atomity" },
  ],
};

/* -------------------------------------------------------------------------- */
/* CONTACT                                                                     */
/* -------------------------------------------------------------------------- */

export const CONTACT = {
  email: "sharmaamogh1010@gmail.com",
  phone: "+91 97179 10874",
  github: "https://github.com/Amogh9810",
  linkedin: "https://www.linkedin.com/in/amogh-sharma-27137a322/",
};

