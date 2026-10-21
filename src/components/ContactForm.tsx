"use client";

import { useState } from "react";
import { CONTACT } from "@/data/content";

/**
 * Composes a pre-filled message and hands off to the visitor's own mail client, so the
 * site stays a static deploy with no backend to run. Swap `handleSubmit` for a POST to a
 * form service if you'd rather collect submissions server-side.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}${email ? `\n${email}` : ""}`);
    window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
  };

  const field =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-faint transition-colors focus:border-accent focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-slate-200 bg-white/80 p-4">
      <p className="text-sm font-semibold text-ink">Send a message</p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="mb-1 block text-xs font-medium text-ink-faint">
            Name
          </label>
          <input
            id="cf-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={field}
            placeholder="Your name"
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="mb-1 block text-xs font-medium text-ink-faint">
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className="mb-1 block text-xs font-medium text-ink-faint">
          Message
        </label>
        <textarea
          id="cf-message"
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={`${field} resize-y`}
          placeholder="Write your message..."
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Send
      </button>
      <p className="text-center text-xs text-ink-faint">Opens in your mail client.</p>
    </form>
  );
}
