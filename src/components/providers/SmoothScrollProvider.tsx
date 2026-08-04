"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface SmoothScrollContextValue {
  lenis: Lenis | null;
  /** Scroll to an element or offset, respecting reduced-motion. */
  scrollTo: (target: string | number | HTMLElement, offset?: number) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * Lenis smooth scrolling, driven by GSAP's ticker.
 *
 * Sharing one RAF loop between Lenis and GSAP keeps ScrollTrigger perfectly
 * in phase with the smoothed scroll position — without this, scroll-driven
 * 3D and pinned sections visibly lag behind the page.
 */
export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Reduced motion: no interpolation, native scrolling only.
    if (prefersReducedMotion) {
      ScrollTrigger.refresh();
      return;
    }

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
      syncTouch: false, // native momentum feels better on touch devices
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });

    lenisRef.current = instance;
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, [prefersReducedMotion]);

  const scrollTo = (
    target: string | number | HTMLElement,
    offset = -80, // clears the fixed header
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset, duration: 1.4 });
      return;
    }

    // Reduced-motion / pre-hydration fallback
    if (typeof target === "string") {
      document
        .querySelector(target)
        ?.scrollIntoView({ behavior: "auto", block: "start" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target });
    } else {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    }
  };

  return (
    <SmoothScrollContext.Provider value={{ lenis, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
