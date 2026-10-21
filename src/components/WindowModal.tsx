"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface WindowModalProps {
  open: boolean;
  title: string;
  icon: string;
  onClose: () => void;
  children: ReactNode;
}

/**
 * A centred OS-style window: title bar with icon + name, minimise and close buttons,
 * dark overlay, click-outside and Escape to dismiss.
 *
 * "Minimise" is intentionally just another close — the brief calls for click-to-open
 * modals, not real window management.
 *
 * On screens below `sm` the window becomes a full-screen sheet rather than a floating
 * card, since a centred window with margins wastes most of a phone display.
 *
 * AnimatePresence contract: its direct child MUST declare its own `exit`. Without one,
 * framer-motion never receives the "exit finished" signal for that child and the subtree
 * stays mounted forever — the modal then ignores close, Escape, and click-outside even
 * though React state has already flipped to closed. Reduced motion is handled by zeroing
 * the durations rather than dropping the props, so the mount/unmount contract is identical
 * in both modes.
 */
export function WindowModal({ open, title, icon, onClose, children }: WindowModalProps) {
  const reduced = usePrefersReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="window-modal"
          className="fixed inset-0 z-40 flex items-center justify-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.18 }}
        >
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={{ scale: reduced ? 1 : 0.94, y: reduced ? 0 : 12 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: reduced ? 1 : 0.96, y: reduced ? 0 : 8 }}
            transition={{ duration: reduced ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel relative flex h-full w-full flex-col overflow-hidden shadow-window sm:h-auto sm:max-h-[85vh] sm:w-full sm:max-w-2xl sm:rounded-xl"
          >
            {/* Title bar */}
            <header className="flex flex-none items-center gap-3 border-b border-slate-200/70 bg-white/70 px-4 py-3">
              <Image src={icon} alt="" width={22} height={22} className="h-[22px] w-[22px]" />
              <h2 className="flex-1 truncate text-sm font-semibold text-ink">{title}</h2>

              <div className="flex items-center gap-1.5">
                {/* Minimise is a close by design — see component docstring. */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={`Minimise ${title}`}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-slate-200/80 hover:text-ink"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={`Close ${title}`}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-red-500 hover:text-white"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path
                      d="M3 3l6 6M9 3l-6 6"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
