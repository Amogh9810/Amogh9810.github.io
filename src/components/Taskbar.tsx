"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CHATBOT_ICON, SECTIONS, type SectionId } from "@/data/sections";

/**
 * Live clock.
 *
 * Renders an empty placeholder until mounted: the server has no idea what time it is in the
 * visitor's timezone, so rendering a time during SSR guarantees a hydration mismatch. The
 * reserved width keeps the taskbar from shifting when the real time appears.
 */
function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-w-[68px] text-right leading-tight sm:min-w-[86px]" aria-live="off">
      <p className="text-xs font-semibold tabular-nums text-ink sm:text-sm">
        {now
          ? now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
          : " "}
      </p>
      <p className="hidden text-[0.65rem] text-ink-faint sm:block">
        {now ? now.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" }) : " "}
      </p>
    </div>
  );
}

interface TaskbarProps {
  onOpen: (id: SectionId) => void;
  onToggleChat: () => void;
  chatOpen: boolean;
}

export function Taskbar({ onOpen, onToggleChat, chatOpen }: TaskbarProps) {
  const [startOpen, setStartOpen] = useState(false);
  const startRef = useRef<HTMLDivElement>(null);

  // Close the Start menu on outside click or Escape.
  useEffect(() => {
    if (!startOpen) return;
    const onClick = (e: MouseEvent) => {
      if (startRef.current && !startRef.current.contains(e.target as Node)) setStartOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setStartOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [startOpen]);

  return (
    <footer className="glass-bar fixed inset-x-0 bottom-0 z-30 shadow-taskbar">
      <div className="flex items-center gap-2 px-2 py-2 sm:px-3">
        {/* Start */}
        <div ref={startRef} className="relative">
          <button
            type="button"
            onClick={() => setStartOpen((o) => !o)}
            aria-expanded={startOpen}
            aria-haspopup="menu"
            className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-ink transition-colors hover:bg-white/60 sm:px-3"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
              <rect x="1" y="1" width="7" height="7" rx="1.4" fill="#2563eb" />
              <rect x="10" y="1" width="7" height="7" rx="1.4" fill="#3b82f6" />
              <rect x="1" y="10" width="7" height="7" rx="1.4" fill="#3b82f6" />
              <rect x="10" y="10" width="7" height="7" rx="1.4" fill="#60a5fa" />
            </svg>
            <span className="hidden sm:inline">Start</span>
          </button>

          {startOpen && (
            <div
              role="menu"
              aria-label="All sections"
              className="glass-panel absolute bottom-[calc(100%+8px)] left-0 w-56 overflow-hidden rounded-xl p-1.5 shadow-window"
            >
              <p className="px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-wide text-ink-faint">
                All sections
              </p>
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  role="menuitem"
                  type="button"
                  onClick={() => {
                    setStartOpen(false);
                    onOpen(section.id);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-ink transition-colors hover:bg-accent-soft"
                >
                  <Image src={section.icon} alt="" width={20} height={20} className="h-5 w-5" />
                  {section.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1" />

        <Clock />

        {/* Chatbot */}
        <button
          type="button"
          onClick={onToggleChat}
          aria-expanded={chatOpen}
          aria-label={chatOpen ? "Close assistant" : "Open assistant"}
          className={`ml-1 flex h-10 w-10 items-center justify-center rounded-lg transition-colors ${
            chatOpen ? "bg-accent-soft" : "hover:bg-white/60"
          }`}
        >
          <Image src={CHATBOT_ICON} alt="" width={28} height={28} className="h-7 w-7" />
        </button>
      </div>
    </footer>
  );
}
