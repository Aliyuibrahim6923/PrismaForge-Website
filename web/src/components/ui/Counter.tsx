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
  /** Years must not be formatted with thousands separators. */
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
  const [display, setDisplay] = useState(0);

  useEffect(() => {
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
  }, [inView, value, duration, prefersReducedMotion]);

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
