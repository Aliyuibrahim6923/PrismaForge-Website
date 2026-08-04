"use client";

import { useEffect, useRef } from "react";
import { useHasPointer } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { lerp } from "@/lib/utils";

/**
 * Two-part custom cursor: a 1:1 dot and a lagging ring.
 *
 * The ring interpolates toward the pointer each frame, which is what makes
 * the cursor feel weighted rather than glued. Elements can change its state
 * declaratively with `data-cursor="hover" | "view" | "hidden"`.
 *
 * Mounts only for fine pointers with motion enabled — touch users and
 * reduced-motion users keep their native cursor.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const hasPointer = useHasPointer();
  const prefersReducedMotion = usePrefersReducedMotion();
  const enabled = hasPointer && !prefersReducedMotion;

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("has-custom-cursor");

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { ...pointer };
    let scale = 1;
    let targetScale = 1;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button, input, textarea, select, [role='button']",
      );
      const state = target?.dataset.cursor ?? (target ? "hover" : "default");

      targetScale = state === "view" ? 3.2 : state === "hover" ? 2 : 1;

      if (ringRef.current) {
        ringRef.current.dataset.state = state;
      }
      if (labelRef.current) {
        labelRef.current.textContent =
          state === "view" ? (target?.dataset.cursorLabel ?? "View") : "";
      }
    };

    const onLeave = () => {
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };
    const onEnter = () => {
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (dotRef.current) dotRef.current.style.opacity = "1";
    };

    const render = () => {
      // Ring trails the dot; 0.16 is the sweet spot between snappy and floaty.
      ring.x = lerp(ring.x, pointer.x, 0.16);
      ring.y = lerp(ring.y, pointer.y, 0.16);
      scale = lerp(scale, targetScale, 0.16);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 size-1.5 rounded-full bg-brand-orange transition-opacity duration-300"
      />
      <div
        ref={ringRef}
        data-state="default"
        className="absolute left-0 top-0 flex size-9 items-center justify-center rounded-full border border-brand-orange/60 transition-[background-color,border-color,opacity] duration-300 data-[state=view]:border-transparent data-[state=view]:bg-brand-orange/15 data-[state=hover]:bg-brand-orange/10"
      >
        <span
          ref={labelRef}
          className="text-[0.3rem] font-medium uppercase tracking-[0.15em] text-foreground"
        />
      </div>
    </div>
  );
}
