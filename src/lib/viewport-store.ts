"use client";

/**
 * A tiny mutable store for pointer and scroll state.
 *
 * The 3D scene needs both values every frame. Putting them in React state
 * would re-render the tree 60 times a second; a module-level object read
 * inside `useFrame` costs nothing and keeps the render graph stable.
 */
export const viewport = {
  /** Pointer position normalised to -1…1, origin at viewport centre. */
  pointer: { x: 0, y: 0 },
  /** Smoothed pointer — the scene follows this, not the raw value. */
  smoothPointer: { x: 0, y: 0 },
  /** Whole-document scroll progress, 0…1. */
  scroll: 0,
  /** Progress through the hero section specifically, 0…1. */
  heroScroll: 0,
};

let listening = false;

/** Idempotent global listeners; safe to call from several components. */
export function startViewportTracking() {
  if (listening || typeof window === "undefined") return () => {};
  listening = true;

  const onPointerMove = (event: PointerEvent) => {
    viewport.pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    viewport.pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
  };

  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    viewport.scroll = max > 0 ? window.scrollY / max : 0;
    viewport.heroScroll = Math.min(1, window.scrollY / window.innerHeight);
  };

  onScroll();
  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  return () => {
    listening = false;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
  };
}
