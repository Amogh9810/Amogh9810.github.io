import { SECTIONS, type SectionId } from "@/data/sections";

export interface ChatbotResponse {
  /** What the assistant says back. */
  reply: string;
  /** If set, the UI opens this section's modal after showing `reply`. */
  openSection?: SectionId;
}

/**
 * ============================================================================
 * THE ONLY PLACE CHAT REPLIES ARE DECIDED.
 *
 * v1 is deliberately offline: it scores the user's text against the `keywords`
 * on each section in `src/data/sections.ts` and opens the best match. There is
 * no network call and no API key.
 *
 * To swap in a real LLM later, replace the body of this function with your API
 * call and keep the same `ChatbotResponse` shape. No UI code needs to change —
 * `ChatPanel` only ever calls this function and reads `{ reply, openSection }`.
 * (Make it `async` and `await` it at the one call site if your API needs it.)
 * ============================================================================
 */
export function getChatbotResponse(input: string): ChatbotResponse {
  const text = input.toLowerCase().trim();

  if (!text) {
    return { reply: "Type a question and I'll point you to the right window." };
  }

  if (/\b(hi|hello|hey|yo|greetings)\b/.test(text)) {
    return {
      reply: "Hello! Ask me about projects, experience, education, skills, or how to get in touch.",
    };
  }

  if (/\b(thanks|thank you|ty|cheers)\b/.test(text)) {
    return { reply: "Anytime! Anything else you'd like to see?" };
  }

  // Score every section by how many of its keywords appear in the input. Longer
  // keywords win ties, so "certificates" beats a stray "cert" style partial match.
  let best: { id: SectionId; label: string; score: number } | null = null;

  for (const section of SECTIONS) {
    let score = 0;
    for (const keyword of section.keywords) {
      if (text.includes(keyword)) score += keyword.length;
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { id: section.id, label: section.label, score };
    }
  }

  if (best) {
    return {
      reply: `Opening ${best.label} for you!`,
      openSection: best.id,
    };
  }

  return {
    reply:
      "I'm not sure about that one yet. Try asking about resume, education, experience, projects, certificates, skills, about, or contact.",
  };
}

/** Quick-reply chips shown above the chat input. */
export const QUICK_REPLIES: string[] = [
  "Show me your projects",
  "What's your education?",
  "How do I contact you?",
  "See your experience",
  "View resume",
];
