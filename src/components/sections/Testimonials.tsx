"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { testimonials } from "@/lib/content";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Testimonial carousel.
 *
 * Autoplays on an 8s cycle, pauses on hover or focus, and supports arrow
 * keys — a carousel that traps keyboard users is worse than no carousel.
 */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const go = useCallback((next: number) => {
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const timer = window.setInterval(() => go(index + 1), 8000);
    return () => window.clearInterval(timer);
  }, [index, paused, prefersReducedMotion, go]);

  const active = testimonials[index]!;

  return (
    <Section id="testimonials" spacing="loose" className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/4 -z-10 mx-auto size-[32rem] rounded-full bg-brand-sky/10 blur-[140px]"
      />

      <SectionHeading
        eyebrow="Testimonials"
        title="What partnership looks like from the other side."
        align="center"
      />

      <div
        className="reveal relative mx-auto mt-14 max-w-3xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") go(index + 1);
          if (event.key === "ArrowLeft") go(index - 1);
        }}
      >
        <div className="glass border-gradient relative overflow-hidden rounded-3xl px-7 py-12 sm:px-14">
          <Icon
            name="quote"
            size={44}
            className="mx-auto text-brand-orange/40"
            aria-hidden
          />

          <div className="relative mt-8 min-h-52 sm:min-h-44">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={index}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <p className="font-display text-xl leading-relaxed tracking-tight sm:text-2xl">
                  “{active.quote}”
                </p>

                <footer className="mt-8 flex items-center justify-center gap-3.5">
                  <span
                    aria-hidden
                    className="bg-brand grid size-11 place-items-center rounded-full text-sm font-semibold text-white"
                  >
                    {active.initials}
                  </span>
                  <div className="text-left">
                    <cite className="block text-sm font-medium not-italic">
                      {active.name}
                    </cite>
                    <span className="text-xs text-muted">
                      {active.role} · {active.organisation}
                    </span>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous testimonial"
              className="grid size-11 place-items-center rounded-full border border-border-subtle transition-colors hover:border-brand-orange/50 hover:text-brand-orange"
            >
              <Icon name="arrowRight" size={15} className="rotate-180" />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((testimonial, dotIndex) => (
                <button
                  key={testimonial.quote.slice(0, 12)}
                  role="tab"
                  aria-selected={dotIndex === index}
                  aria-label={`Testimonial ${dotIndex + 1}`}
                  onClick={() => go(dotIndex)}
                  // The dot stays 6px; the button around it is 44px tall
                  // so it is actually tappable on a phone.
                  className="group/dot flex h-11 items-center px-1"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-500",
                      dotIndex === index
                        ? "bg-brand w-7"
                        : "w-1.5 bg-foreground/25 group-hover/dot:bg-foreground/50",
                    )}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next testimonial"
              className="grid size-11 place-items-center rounded-full border border-border-subtle transition-colors hover:border-brand-orange/50 hover:text-brand-orange"
            >
              <Icon name="arrowRight" size={15} />
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
