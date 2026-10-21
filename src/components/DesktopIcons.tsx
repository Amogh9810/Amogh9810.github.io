"use client";

import Image from "next/image";
import { SECTIONS, type SectionId } from "@/data/sections";

interface DesktopIconsProps {
  onOpen: (id: SectionId) => void;
}

/**
 * The desktop icon grid — top-left aligned like a real OS desktop.

 *
 * Single click opens (standard web pattern, per the brief), and each icon is a real
 * `<button>` so it is reachable and activatable by keyboard.
 *
 * The grid reflows to fewer columns on small screens but keeps the same desktop metaphor
 * rather than collapsing into a list.
 */
export function DesktopIcons({ onOpen }: DesktopIconsProps) {
  return (
    <ul
      className="grid w-fit grid-cols-3 gap-x-2 gap-y-4 sm:grid-cols-2 sm:gap-x-3 sm:gap-y-5"
      aria-label="Desktop shortcuts"
    >
      {SECTIONS.map((section) => (
        <li key={section.id}>
          <button
            type="button"
            onClick={() => onOpen(section.id)}
            className="group flex w-full flex-col items-center gap-2 rounded-lg px-0.5 py-3 transition-colors hover:bg-white/20 focus-visible:bg-white/20 sm:w-[4.5rem]"
          >
            <span className="drop-shadow-icon transition-transform duration-200 group-hover:scale-105">
              <Image
                src={section.icon}
                alt=""
                width={56}
                height={56}
                className="h-12 w-12 sm:h-14 sm:w-14"
                priority
              />
            </span>
            <span className="text-center text-[0.7rem] font-medium leading-tight text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.65)] sm:text-xs">
              {section.label}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
