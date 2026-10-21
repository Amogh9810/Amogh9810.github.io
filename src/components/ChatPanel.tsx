"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { CHATBOT_ICON, type SectionId } from "@/data/sections";
import { getChatbotResponse, QUICK_REPLIES } from "@/lib/chatbot";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
}

const WELCOME: Message = {
  id: 0,
  from: "bot",
  text: "Hi! I can open any part of this desktop for you. Pick a suggestion or type a question.",
};

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
  onOpenSection: (id: SectionId) => void;
}

/**
 * Bottom-right chat widget (full-width sheet on mobile).
 *
 * All reply logic lives in `getChatbotResponse` — this component only renders messages and
 * forwards any `openSection` it gets back. That keeps the swap to a real LLM a one-function
 * change with no UI edits.
 */
export function ChatPanel({ open, onClose, onOpenSection }: ChatPanelProps) {
  const reduced = usePrefersReducedMotion();
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const nextId = useRef(1);
  const listRef = useRef<HTMLDivElement>(null);

  // Keep the newest message in view.
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: nextId.current++, from: "user", text: trimmed };
    const { reply, openSection } = getChatbotResponse(trimmed);
    const botMsg: Message = { id: nextId.current++, from: "bot", text: reply };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");

    // Let the reply paint before the modal takes over the screen.
    if (openSection) {
      window.setTimeout(() => onOpenSection(openSection), 450);
    }
  };

  const panelMotion = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 16, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 12, scale: 0.98 },
        transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          {...panelMotion}
          role="dialog"
          aria-label="Assistant"
          className="glass-panel fixed inset-x-0 bottom-[60px] z-40 flex h-[65vh] flex-col overflow-hidden rounded-t-2xl shadow-chat sm:inset-x-auto sm:right-4 sm:bottom-[68px] sm:h-[26rem] sm:w-[22rem] sm:rounded-2xl"
        >
          <header className="flex flex-none items-center gap-2.5 border-b border-slate-200/70 bg-white/70 px-4 py-3">
            <Image src={CHATBOT_ICON} alt="" width={22} height={22} className="h-[22px] w-[22px]" />
            <p className="flex-1 text-sm font-semibold text-ink">Assistant</p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close assistant"
              className="flex h-7 w-7 items-center justify-center rounded-md text-ink-faint transition-colors hover:bg-slate-200/80 hover:text-ink"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                <path d="M3 3l6 6M9 3l-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-2.5 overflow-y-auto px-3 py-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <p
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    msg.from === "user"
                      ? "rounded-br-sm bg-accent text-white"
                      : "rounded-bl-sm bg-white text-ink-soft shadow-sm"
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          {/* Quick replies */}
          <div className="flex flex-none flex-wrap gap-1.5 border-t border-slate-200/70 px-3 pt-2.5">
            {QUICK_REPLIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => send(q)}
                className="rounded-full border border-accent/30 bg-accent-soft/60 px-2.5 py-1 text-[0.7rem] font-medium text-blue-800 transition-colors hover:bg-accent-soft"
              >
                {q}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex flex-none items-center gap-2 px-3 pb-3 pt-2.5"
          >
            <label htmlFor="chat-input" className="sr-only">
              Message the assistant
            </label>
            <input
              id="chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills..."
              className="flex-1 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-blue-700"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="M2 8h11m0 0l-4-4m4 4l-4 4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
