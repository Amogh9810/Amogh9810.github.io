"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Decorative desktop wallpaper: a generated texture over the base gradient, plus a few very
 * large, very soft blobs drifting on a ~24-30s loop.
 *
 * Everything here is deliberately low-contrast — it exists to stop the middle of the screen
 * reading as flat dead space, not to draw the eye. All of it is CSS/SVG generated, so there
 * is no image payload, and the whole layer is `aria-hidden` + non-interactive so it never
 * intercepts a click meant for an icon.
 *
 * Under `prefers-reduced-motion` the blobs render in their resting position with no
 * animation at all — the texture stays, the movement stops.
 */
export function Wallpaper() {
  const reduced = usePrefersReducedMotion();

  /** Blob definitions: position, size, tint, and drift offsets. */
  const blobs = [
    {
      className: "left-[-12%] top-[-10%] h-[46rem] w-[46rem]",
      tint: "rgba(147, 197, 253, 0.30)",
      drift: { x: [0, 60, -20, 0], y: [0, 40, 70, 0] },
      duration: 30,
    },
    {
      className: "right-[-16%] top-[18%] h-[40rem] w-[40rem]",
      tint: "rgba(96, 165, 250, 0.24)",
      drift: { x: [0, -50, 25, 0], y: [0, 55, -30, 0] },
      duration: 26,
    },
    {
      className: "bottom-[-20%] left-[28%] h-[38rem] w-[38rem]",
      tint: "rgba(191, 219, 254, 0.22)",
      drift: { x: [0, 40, -35, 0], y: [0, -45, 20, 0] },
      duration: 34,
    },
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Drifting soft light — sits directly on the body gradient. */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          style={{
            background: `radial-gradient(circle, ${blob.tint} 0%, transparent 68%)`,
          }}
          animate={reduced ? undefined : { x: blob.drift.x, y: blob.drift.y }}
          transition={
            reduced
              ? undefined
              : {
                  duration: blob.duration,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }
          }
        />
      ))}

      {/* Topographic contour lines + dot grid, both generated inline. */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="wp-dots" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.1" fill="rgba(255,255,255,0.16)" />
          </pattern>

          {/* One tile of stacked wavy lines; repeating it reads as contour topography. */}
          <pattern id="wp-topo" width="320" height="180" patternUnits="userSpaceOnUse">
            <g fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth="1.1">
              <path d="M-20 30 C 60 6, 120 54, 200 30 S 300 6, 340 30" />
              <path d="M-20 66 C 60 42, 120 90, 200 66 S 300 42, 340 66" />
              <path d="M-20 102 C 60 78, 120 126, 200 102 S 300 78, 340 102" />
              <path d="M-20 138 C 60 114, 120 162, 200 138 S 300 114, 340 138" />
              <path d="M-20 174 C 60 150, 120 198, 200 174 S 300 150, 340 174" />
            </g>
          </pattern>

          {/* Fades the texture out toward the bottom-right so the taskbar stays clean. */}
          <linearGradient id="wp-fade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
            <stop offset="55%" stopColor="#fff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0.12" />
          </linearGradient>
          <mask id="wp-mask">
            <rect width="100%" height="100%" fill="url(#wp-fade)" />
          </mask>
        </defs>

        <g mask="url(#wp-mask)">
          <rect width="100%" height="100%" fill="url(#wp-topo)" />
          <rect width="100%" height="100%" fill="url(#wp-dots)" />
        </g>
      </svg>

      {/* Vignette: keeps the edges settled so the texture never fights the icon labels. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 40%, transparent 40%, rgba(15, 23, 42, 0.22) 100%)",
        }}
      />
    </div>
  );
}
