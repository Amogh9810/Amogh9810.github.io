"use client";

import { useEffect, useState } from "react";

/**
 * True when the visitor has asked the OS to minimise animation.
 *
 * Returns `false` on the server and on the first client render, then settles in an effect —
 * reading `matchMedia` during render would desync server and client markup and trip
 * React's hydration check.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return reduced;
}
