"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  /** `plain`: a year — rendered as-is, no separators and no count-up. */
  format?: "number" | "plain";
}

/**
 * Count-up animation that fires once the element scrolls into view.
 *
 * Writes to state rather than the DOM directly so the value stays correct
 * for screen readers and after re-renders; reduced-motion users get the
 * final value immediately.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
  format = "number",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const prefersReducedMotion = usePrefersReducedMotion();
  // Years are facts, not tallies: counting 0 → 2026 shows a wrong year
  // ("2014") mid-animation and "0" before hydration on slow phones.
  const isStatic = format === "plain";
  const [display, setDisplay] = useState(isStatic ? value : 0);

  useEffect(() => {
    if (isStatic) {
      setDisplay(value);
      return;
    }
    if (!inView) return;

    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, value, duration, prefersReducedMotion, isStatic]);

  const formatted =
    format === "plain" ? String(display) : display.toLocaleString("en-US");

  return (
    // `tabular-nums`: proportional digits change width as the value counts
    // up, which shifts everything beside them — layout shift for the sake
    // of an animation.
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
