"use client";

import {
  ABOUT,
  CERTIFICATES,
  CONTACT,
  EDUCATION,
  EXPERIENCE,
  PROJECTS,
  RESUME,
  SKILLS,
} from "@/data/content";
import type { SectionId } from "@/data/sections";
import { ContactForm } from "@/components/ContactForm";

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-ink">{children}</h3>;
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white/80 p-4 shadow-sm">
      {children}
    </article>
  );
}

function Bullet() {
  return (
    <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-accent" />
  );
}

function Resume() {
  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-slate-200 bg-white/80 p-5">
        <p className="text-lg font-semibold text-ink">{RESUME.headline}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{RESUME.summary}</p>
        <ul className="mt-4 space-y-2">
          {RESUME.highlights.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-ink-soft">
              <Bullet />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={RESUME.fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 sm:w-auto"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          <path
            d="M8 2v8m0 0l3-3m-3 3L5 7M3 13h10"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Download Resume
      </a>
    </div>
  );
}

function Education() {
  return (
    <div className="space-y-4">
      {EDUCATION.map((item, i) => (
        <Card key={i}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <CardTitle>{item.institute}</CardTitle>
            <span className="text-xs font-medium text-ink-faint">{item.dateRange}</span>
          </div>
          <p className="mt-1 text-sm text-ink-soft">{item.degree}</p>
          <p className="mt-1 text-sm font-medium text-accent">{item.cgpa}</p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">
            Coursework
          </p>
          <ul className="mt-2 flex flex-wrap gap-2">
            {item.coursework.map((course) => (
              <li key={course} className="chip">
                {course}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

function Experience() {
  return (
    <div className="space-y-4">
      {EXPERIENCE.map((item, i) => (
        <Card key={i}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <CardTitle>{item.company}</CardTitle>
            <span className="text-xs font-medium text-ink-faint">{item.dateRange}</span>
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            {item.role} <span className="text-ink-faint">· {item.location}</span>
          </p>
          <ul className="mt-3 space-y-2">
            {item.points.map((point, j) => (
              <li key={j} className="flex gap-2 text-sm leading-relaxed text-ink-soft">
                <Bullet />
                {point}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

function Projects() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {PROJECTS.map((project, i) => (
        <Card key={i}>
          <CardTitle>{project.name}</CardTitle>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{project.description}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li key={tech} className="chip">
                {tech}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-4">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent transition-colors hover:text-blue-700"
              >
                GitHub &rarr;
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent transition-colors hover:text-blue-700"
              >
                Live Demo &rarr;
              </a>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}

function Certificates() {
  if (CERTIFICATES.length === 0) {
    return <p className="text-sm text-ink-soft">Certificates coming soon.</p>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {CERTIFICATES.map((cert, i) => (
        <Card key={i}>
          <CardTitle>{cert.title}</CardTitle>
          <p className="mt-1 text-sm text-ink-soft">{cert.issuer}</p>
          <p className="mt-0.5 text-xs text-ink-faint">{cert.date}</p>
          <a
            href={cert.credentialUrl}
            className="mt-4 inline-block text-sm font-medium text-accent transition-colors hover:text-blue-700"
          >
            View credential &rarr;
          </a>
        </Card>
      ))}
    </div>
  );
}

function Skills() {
  return (
    <div className="space-y-4">
      {SKILLS.map((group) => (
        <Card key={group.category}>
          <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
            {group.category}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {group.items.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-xs font-medium text-blue-800"
              >
                {skill}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </div>
  );
}

function About() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-lg font-semibold text-ink">{ABOUT.name}</p>
        <p className="text-sm text-accent">{ABOUT.title}</p>
      </div>
      <p className="text-sm leading-relaxed text-ink-soft">{ABOUT.bio}</p>
      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {ABOUT.facts.map((fact) => (
          <div key={fact.label} className="rounded-lg border border-slate-200 bg-white/80 p-3">
            <dt className="text-xs font-semibold uppercase tracking-wide text-ink-faint">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Contact() {
  const links = [
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: "Phone", value: CONTACT.phone, href: `tel:${CONTACT.phone.replace(/\s+/g, "")}` },
    { label: "GitHub", value: CONTACT.github.replace("https://", ""), href: CONTACT.github },
    { label: "LinkedIn", value: CONTACT.linkedin.replace("https://www.", ""), href: CONTACT.linkedin },
  ];

  return (
    <div className="space-y-5">
      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="block rounded-lg border border-slate-200 bg-white/80 p-3 transition-colors hover:border-accent/50 hover:bg-accent-soft/40"
            >
              <span className="block text-xs font-semibold uppercase tracking-wide text-ink-faint">
                {link.label}
              </span>
              <span className="mt-1 block break-all text-sm text-ink">{link.value}</span>
            </a>
          </li>
        ))}
      </ul>

      <ContactForm />
    </div>
  );
}

/** Maps a section id to its body, so `Desktop` stays a thin shell. */
export function SectionContent({ id }: { id: SectionId }) {
  switch (id) {
    case "resume":
      return <Resume />;
    case "education":
      return <Education />;
    case "experience":
      return <Experience />;
    case "projects":
      return <Projects />;
    case "certificates":
      return <Certificates />;
    case "skills":
      return <Skills />;
    case "about":
      return <About />;
    case "contact":
      return <Contact />;
  }
}
