"use client";

/**
 * Device capability budget.
 *
 * One place to decide whether this device should pay for the expensive
 * parts of the experience. Used by the WebGL hero and the preloader —
 * the two features that cost the most before a visitor sees anything.
 *
 * The judgement is deliberately conservative: when in doubt, skip the
 * flourish. A phone on a slow connection wants the content, not the
 * cinema, and the site is designed to be complete without either.
 */

interface NetworkInformation {
  saveData?: boolean;
  effectiveType?: string;
}

/**
 * Breakpoints, expressed as media queries rather than `window.innerWidth`.
 *
 * `matchMedia` uses the layout viewport, which is what the CSS breakpoints
 * use — so these gates and the `lg:` / `md:` utilities can never disagree.
 * `innerWidth` also includes the scrollbar and misreports under device
 * emulation, which made it unreliable to verify.
 */
const WEBGL_MIN = "(min-width: 1024px)";
const PRELOADER_MIN = "(min-width: 768px)";

const matches = (query: string) =>
  typeof window !== "undefined" && window.matchMedia(query).matches;

function connection(): NetworkInformation | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { connection?: NetworkInformation })
    .connection;
}

/** True when the visitor has asked for reduced data use, or is on 2G/3G. */
export function isConstrainedNetwork() {
  const net = connection();
  if (!net) return false;
  if (net.saveData) return true;
  return net.effectiveType === "slow-2g" || net.effectiveType === "2g";
}

/** True for low-memory or low-core devices, where WebGL stutters. */
export function isLowPowerDevice() {
  if (typeof navigator === "undefined") return false;
  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  if (typeof memory === "number" && memory <= 4) return true;
  if (typeof navigator.hardwareConcurrency === "number") {
    return navigator.hardwareConcurrency <= 4;
  }
  return false;
}

export function hasWebglSupport() {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl")),
    );
  } catch {
    return false;
  }
}

/**
 * Should this device load and run the 3D hero?
 *
 * Phones are excluded outright: on a narrow viewport the prism sits behind
 * the copy scrim where it barely reads, while Three.js is by far the
 * largest script on the page and the canvas is the biggest battery draw.
 * Skipping it there is the single largest mobile performance win available.
 */
export function shouldRenderWebgl({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion) return false;
  if (!matches(WEBGL_MIN)) return false;
  if (isConstrainedNetwork()) return false;
  if (isLowPowerDevice()) return false;
  return hasWebglSupport();
}

/** Should the loading curtain run? Never when it would just delay content. */
export function shouldShowPreloader({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion) return false;
  if (isConstrainedNetwork()) return false;
  // On phones the curtain is pure delay in front of the content.
  return matches(PRELOADER_MIN);
}
