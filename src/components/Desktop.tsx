"use client";

import { useCallback, useState } from "react";
import { ChatPanel } from "@/components/ChatPanel";
import { IntroNote } from "@/components/IntroNote";
import { DesktopIcons } from "@/components/DesktopIcons";
import { SectionContent } from "@/components/SectionContent";
import { SocialLinks } from "@/components/SocialLinks";
import { StickyNote } from "@/components/StickyNote";
import { Taskbar } from "@/components/Taskbar";
import { Wallpaper } from "@/components/Wallpaper";
import { WindowModal } from "@/components/WindowModal";
import { getSection, type SectionId } from "@/data/sections";

/**
 * Owns the only piece of global UI state: which section window is open (at most one) and
 * whether the chat widget is showing. Opening a section from anywhere — icon grid, Start
 * menu, or chatbot — routes through `openSection`, so "only one modal at a time" is
 * structural rather than something each caller has to remember.
 */
export function Desktop() {
  const [openId, setOpenId] = useState<SectionId | null>(null);
  const [chatOpen, setChatOpen] = useState(true); // assistant greets visitors on load

  const openSection = useCallback((id: SectionId) => setOpenId(id), []);
  const closeSection = useCallback(() => setOpenId(null), []);

  const active = openId ? getSection(openId) : null;

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden">
      {/* Decorative layer, behind everything and non-interactive. */}
      <Wallpaper />

      {/* Desktop surface. Bottom padding clears the fixed taskbar. */}
      <main className="relative h-full overflow-y-auto px-4 pb-24 pt-6 sm:px-6 sm:pt-8">
        <h1 className="sr-only">Portfolio</h1>
        <DesktopIcons onOpen={openSection} />

        {/* Annotation sits just under the icon cluster. */}
        <div className="mt-6 sm:mt-8">
          <StickyNote />
        </div>

        {/*
          The welcome note is the page's anchor, so it gets the empty middle to itself.

          In normal flow up to `md` — at those widths an absolutely centred note would land
          on the icon grid. The `md` right padding reserves the chat panel's width so the
          note re-centres beside it rather than underneath. From `lg` it floats in the middle
          of the wallpaper, nudged left of true centre to clear the same panel.
        */}
        <div className="mt-10 flex justify-center md:pr-[22rem] lg:absolute lg:left-[46%] lg:top-1/2 lg:mt-0 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:pr-0">
          <IntroNote />
        </div>

        <SocialLinks />
      </main>

      <WindowModal
        open={active !== null}
        title={active?.label ?? ""}
        icon={active?.icon ?? "/icons/about.svg"}
        onClose={closeSection}
      >
        {active && <SectionContent id={active.id} />}
      </WindowModal>

      <ChatPanel
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        onOpenSection={(id) => {
          openSection(id);
          // Keep the panel open on desktop, but a full-screen sheet would cover the modal.
          if (window.matchMedia("(max-width: 639px)").matches) setChatOpen(false);
        }}
      />

      <Taskbar
        onOpen={openSection}
        onToggleChat={() => setChatOpen((o) => !o)}
        chatOpen={chatOpen}
      />
    </div>
  );
}
