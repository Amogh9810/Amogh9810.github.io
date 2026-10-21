"use client";

import { motion } from "framer-motion";
import { SOCIAL_LINKS } from "@/data/social";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Frosted social buttons.
 *
 * Sits in the top-right of the desktop from `sm` up. On phones the top-right corner belongs
 * to the icon grid, so the row instead rides along at the end of the centre stack, above the
 * taskbar. It stays in normal flow there rather than being fixed: a fixed strip over a
 * scrolling desktop inevitably lands on top of the notes at some scroll position.
 *
 * All hrefs are placeholders — see `src/data/social.ts`.
 */
export function SocialLinks() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.nav
      aria-label="Social links"
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
      animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.45, delay: 0.3, ease: "easeOut" }}
      className="mt-6 flex justify-center gap-2 sm:absolute sm:right-6 sm:top-6 sm:mt-0 lg:right-10"
    >
      {SOCIAL_LINKS.map(({ icon: Icon, href, label, external }) => (
        <a
          key={label}
          href={href}
          title={label}
          aria-label={label}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/40 bg-white/25 text-white shadow-[0_6px_16px_-6px_rgba(15,23,42,0.5)] backdrop-blur-os transition-all duration-200 hover:scale-110 hover:border-white/70 hover:bg-white/40 hover:shadow-[0_0_18px_-2px_rgba(255,255,255,0.65)]"
        >
          <Icon className="h-[1.05rem] w-[1.05rem] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
        </a>
      ))}
    </motion.nav>
  );
}
