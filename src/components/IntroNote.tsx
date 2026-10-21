"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { INTRO } from "@/data/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * The large pinned welcome note — the visual anchor of the desktop.
 *
 * Shares the paper language of the small note (tack, rotation, drop shadow) but scaled up
 * and tilted the other way, so the two read as a pair rather than a repeat. Animates in
 * first, ahead of the smaller note and the corner shortcut.
 *
 * Copy comes from `INTRO` in `src/data/content.ts`.
 */
export function IntroNote() {
  const reduced = usePrefersReducedMotion();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.aside
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 14, rotate: 2 }}
      animate={reduced ? { opacity: 1, rotate: 2 } : { opacity: 1, scale: 1, y: 0, rotate: 2 }}
      transition={reduced ? { duration: 0 } : { duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-[17rem] select-none rounded-sm bg-amber-100/95 px-6 pb-7 pt-8 text-center shadow-[0_18px_38px_-12px_rgba(15,23,42,0.6)] sm:w-[21rem] sm:px-8 sm:pb-8 sm:pt-9"
      aria-label="Welcome note"
    >
      {/* Tack — same construction as the small note, scaled up. */}
      <span
        aria-hidden="true"
        className="absolute -top-2 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-red-500 shadow-[0_3px_6px_rgba(0,0,0,0.45),inset_0_-1px_3px_rgba(0,0,0,0.28)]"
      />
      <span
        aria-hidden="true"
        className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-[5px] rounded-full bg-white/75"
      />

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss welcome note"
        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded text-amber-700/60 transition-colors hover:bg-amber-200/80 hover:text-amber-900"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Handwriting face (Caveat) so the note reads as written, not typed. Sizes are
          bumped a step because script faces have a smaller apparent x-height. */}
      <p className="font-hand text-3xl font-bold leading-tight text-amber-950 sm:text-4xl">
        {INTRO.title}
      </p>
      <p className="mt-1.5 font-hand text-lg font-medium text-amber-800/90 sm:text-xl">
        {INTRO.subtitle}
      </p>
    </motion.aside>
  );
}
