# Desktop Portfolio

A personal portfolio styled as a clean Windows 11 / macOS-style desktop. Icons on a wallpaper
open centred, OS-window-style modals; a frosted taskbar carries a Start menu, a live clock, and
an assistant widget.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

---

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

Deploys to Vercel with no configuration — the page is statically prerendered.

---

## ⚠️ Replacing the placeholder content

**All copy in this project is placeholder text.** Everything lives in two files — you should not
need to touch any component to swap in your real details.

### 1. `src/data/content.ts` — all section content

| Export | Fills |
| --- | --- |
| `INTRO` | title + subtitle on the large welcome note |
| `ABOUT` | About Me bio paragraph |
| `EDUCATION` | 2 entries: institute, degree, dates, CGPA, coursework tags |
| `EXPERIENCE` | 2 entries: company, role, dates, location, bullet points |
| `PROJECTS` | 4 cards: name, tech stack, description, `repoUrl` / `liveUrl` |
| `CERTIFICATES` | 2 slots: title, issuer, date, credential link |
| `SKILL_GROUPS` | 4 category groups, each with skill tags |
| `CONTACT` | email, phone, GitHub, LinkedIn |

Social buttons live separately in **`src/data/social.ts`** (`SOCIAL_LINKS`) — each entry is
`{ icon, href, label }`, all hrefs placeholders.
| `RESUME` | resume file path + preview blurb |

Every `"#"` link and `// TODO` comment in that file marks something to replace.

### 2. `src/data/sections.ts` — which sections exist

The registry the icon grid, Start menu, **and** the assistant's intent matching all read from.
Add, remove, or rename a section here and every surface updates. Each entry also carries
`keywords`, which is what the assistant matches typed input against.


### 3. Your resume PDF

Drop it at `public/resume.pdf` — the Resume window's download button points there.

---

## Structure

```
public/icons/           The 9 supplied SVGs (referenced via next/image)
src/
├─ app/
│  ├─ layout.tsx        Metadata, fonts, favicon
│  ├─ page.tsx          Renders <Desktop />
│  └─ globals.css       Wallpaper, frosted-glass and chip utilities
├─ components/
│  ├─ Desktop.tsx       Owns all UI state (which window is open, assistant visibility)
│  ├─ Wallpaper.tsx     Decorative texture + slow drifting light (non-interactive)
│  ├─ IntroNote.tsx     Large pinned welcome note (handwriting font)
│  ├─ StickyNote.tsx    Small pinned "Click an icon to explore" note
│  ├─ SocialLinks.tsx   Phone / LinkedIn / GitHub / Instagram buttons
│  ├─ DesktopIcons.tsx  Top-left icon grid
│  ├─ WindowModal.tsx   Generic OS window shell
│  ├─ SectionContent.tsx Maps a section id to its rendered body
│  ├─ Taskbar.tsx       Start menu, live clock, assistant button
│  ├─ ChatPanel.tsx     Assistant widget UI
│  └─ ContactForm.tsx   mailto-based form
├─ data/                content.ts + sections.ts  ← edit these
├─ hooks/               useFocusTrap, usePrefersReducedMotion
└─ lib/chatbot.ts       getChatbotResponse()
```

---

## The assistant

Navigation-only in v1 — no LLM call. `getChatbotResponse(input)` in `src/lib/chatbot.ts` does
keyword matching against the `keywords` arrays in `sections.ts` and returns:

```ts
{ reply: string; openSection: SectionId | null }
```

The UI only ever reads those two fields, so **swapping in a real LLM means rewriting that one
function and nothing else**. The file documents the exact swap point.

Quick replies ("Show me your projects", "What's your education?", …) are defined in
`QUICK_REPLIES` in the same file.

The assistant opens automatically on load to greet visitors — change `useState(true)` to
`useState(false)` for `chatOpen` in `src/components/Desktop.tsx` if you'd rather it start closed.

---

## Accessibility & behaviour notes

- Only one window open at a time — every entry point routes through `openSection`, so it's
  structural rather than per-caller bookkeeping.
- Escape closes the window; the overlay is click-to-close; "minimise" is a close by design
  (the brief calls for click-to-open modals, not real window management).
- Focus is trapped inside an open window and restored to the trigger on close.
- `prefers-reduced-motion` zeroes the animation durations rather than dropping Framer Motion's
  `initial`/`animate`/`exit` props, so the mount/unmount contract stays identical in both modes.
- Below `sm`, windows become full-screen sheets and the assistant becomes a bottom sheet; the
  icon grid reflows to 3 columns but keeps the desktop metaphor.

### One implementation gotcha worth preserving

`AnimatePresence`'s direct child **must** declare its own `exit`. Without one, Framer Motion
never gets the "exit finished" signal and the window stays mounted forever — close, Escape, and
click-outside all appear dead even though React state has already flipped to closed. If you
restructure `WindowModal`, keep the `exit` prop on the outermost `motion.div`.

---

## Fonts

Two Google fonts, both self-hosted at build time via `next/font/google` in `src/app/layout.tsx`:

- **Inter** — all UI text (`font-sans`).
- **Caveat** — the two pinned paper notes (`font-hand`), so they read as handwritten rather
  than typed. Both notes use it, at different sizes.

Swapping the handwriting face means changing the import in `layout.tsx` and the `hand` entry
in `tailwind.config.ts` — nothing else references it directly.
