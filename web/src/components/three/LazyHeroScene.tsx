"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { shouldRenderWebgl } from "@/lib/device-budget";

/**
 * Code-split entry point for the WebGL hero.
 *
 * Three.js, R3F and drei are by far the heaviest dependencies in the app.
 * Three things keep them off the critical path:
 *
 *  1. `ssr: false` keeps them out of the server render and the initial
 *     bundle — the chunk is only requested if this component decides to
 *     mount the scene.
 *  2. `shouldRenderWebgl` refuses outright on phones, low-power devices,
 *     data-saver connections and reduced-motion. Those visitors never
 *     download Three.js at all.
 *  3. Even when allowed, mounting waits for the browser to go idle, so the
 *     hero's HTML and CSS decide LCP — never the 3D bundle.
 */
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export function LazyHeroScene() {
  const [ready, setReady] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!shouldRenderWebgl({ prefersReducedMotion })) return;

    // `requestIdleCallback` isn't in Safari < 16.4.
    const schedule =
      window.requestIdleCallback ??
      ((cb: () => void) => window.setTimeout(cb, 320));
    const handle = schedule(() => setReady(true));

    return () => {
      if (window.cancelIdleCallback && typeof handle === "number") {
        window.cancelIdleCallback(handle);
      }
    };
  }, [prefersReducedMotion]);

  if (!ready) return null;
  return <HeroScene />;
}
