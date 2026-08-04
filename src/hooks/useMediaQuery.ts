"use client";

import { useEffect, useState } from "react";

/** SSR-safe media query subscription. */
export function useMediaQuery(query: string, defaultValue = false) {
  const [matches, setMatches] = useState(defaultValue);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True on devices whose primary input is a real, hoverable pointer. */
export const useHasPointer = () =>
  useMediaQuery("(hover: hover) and (pointer: fine)");

export const useIsDesktop = () => useMediaQuery("(min-width: 1024px)");
