"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * A small pinned paper note sitting just below the icon cluster — a desktop annotation
 * rather than a tutorial overlay.
 *
 * Fades in after the icons have settled so it reads as a second beat, and can be dismissed.
 * Hidden below `sm`: on a phone the icon grid already fills the usable area, and squeezing a
 * rotated note alongside it just crowds the shortcuts.
 */
export function StickyNote() {
  const reduced = usePrefersReducedMotion();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <motion.aside
      // Rotation lives in `animate` (not a CSS class) so it composes with the fade rather
      // than being overwritten by Framer's transform handling.
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10, rotate: -3 }}
      animate={reduced ? { opacity: 1, rotate: -3 } : { opacity: 1, y: 0, rotate: -3 }}
      transition={reduced ? { duration: 0 } : { duration: 0.5, delay: 0.7, ease: "easeOut" }}
      className="relative w-44 select-none rounded-sm bg-amber-100/95 px-4 pb-4 pt-5 shadow-[0_10px_24px_-8px_rgba(15,23,42,0.55)]"
      aria-label="Desktop note"
    >
      {/* Pin */}
      <span
        aria-hidden="true"
        className="absolute -top-1.5 left-1/2 h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-red-500 shadow-[0_2px_4px_rgba(0,0,0,0.45),inset_0_-1px_2px_rgba(0,0,0,0.25)]"
      />
      <span
        aria-hidden="true"
        className="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-[3px] rounded-full bg-white/70"
      />

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss note"
        className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded text-amber-700/60 transition-colors hover:bg-amber-200/80 hover:text-amber-900"
      >
        <svg width="9" height="9" viewBox="0 0 9 9" aria-hidden="true">
          <path d="M1.5 1.5l6 6M7.5 1.5l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </button>

      {/* Same handwriting face as the big welcome note, so the two read as one hand. */}
      <p className="text-center font-hand text-lg font-semibold leading-snug text-amber-900">
        Click an icon to explore &rarr;
      </p>
    </motion.aside>
  );
}
