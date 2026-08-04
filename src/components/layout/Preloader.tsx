"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { shouldShowPreloader } from "@/lib/device-budget";
import { Logo } from "./Logo";

/**
 * First-visit loading curtain.
 *
 * Counts to 100 while the page settles, then splits away vertically to
 * reveal the hero. Shown once per browser session — repeat navigations
 * within the session skip it, which keeps the site feeling fast rather
 * than ceremonial.
 */
export function Preloader() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const seen = sessionStorage.getItem("pf-preloaded");
    // Skipped on phones and constrained connections: there the curtain is
    // just a delay in front of the content the visitor came for.
    if (seen || !shouldShowPreloader({ prefersReducedMotion })) {
      setVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    let value = 0;
    const interval = window.setInterval(() => {
      // Ease the counter out so it decelerates toward 100.
      value = Math.min(100, value + Math.max(1, (100 - value) * 0.12));
      setProgress(Math.round(value));

      if (value >= 99.5) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          setVisible(false);
          sessionStorage.setItem("pf-preloaded", "1");
          document.body.style.overflow = "";
        }, 320);
      }
    }, 34);

    return () => {
      window.clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-ink-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
        >
          {/* Split curtains */}
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-ink-950"
            exit={{ y: "-100%" }}
            transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
          />
          <motion.span
            className="absolute inset-x-0 bottom-0 h-1/2 bg-ink-950"
            exit={{ y: "100%" }}
            transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center gap-8"
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.4 }}
          >
            <Logo className="text-ink-50" animated />

            <div className="h-px w-56 overflow-hidden bg-white/10 sm:w-72">
              <motion.span
                className="bg-brand block h-full origin-left"
                style={{ scaleX: progress / 100 }}
              />
            </div>

            <div className="flex w-56 items-baseline justify-between font-mono text-[0.7rem] uppercase tracking-[0.25em] text-ink-300 sm:w-72">
              <span>Loading experience</span>
              <span className="tabular-nums text-ink-50">{progress}%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
