"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Gradient reading-progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="bg-brand fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
    />
  );
}
