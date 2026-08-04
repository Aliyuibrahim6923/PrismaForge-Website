"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { processSteps } from "@/lib/content";

/**
 * Process: the five-step methodology as a scroll-drawn timeline.
 *
 * The connecting rail fills with scroll progress, and each step's number
 * counts up the page — the section reads as a single continuous motion
 * rather than five independent reveals.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 65%", "end 75%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <Section id="process" grid spacing="loose">
      <SectionHeading
        eyebrow="Our approach"
        title="Every engagement follows the same disciplined methodology."
        lead="Five steps, each with named deliverables — so you always know what is being produced, and when."
        align="center"
      />

      <div ref={ref} className="relative mt-20">
        {/* Rail */}
        <span
          aria-hidden
          className="absolute left-6 top-0 h-full w-px bg-border-subtle lg:left-1/2"
        />
        <motion.span
          aria-hidden
          style={{ scaleY }}
          className="bg-brand absolute left-6 top-0 h-full w-px origin-top lg:left-1/2"
        />

        <ol className="space-y-14">
          {processSteps.map((step, index) => {
            const isEven = index % 2 === 0;

            return (
              <li
                key={step.step}
                className="reveal relative pl-16 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0"
                data-reveal-delay={index * 110}
              >
                {/* Node */}
                <span
                  aria-hidden
                  className="absolute left-6 top-1 grid size-[26px] -translate-x-1/2 place-items-center rounded-full border border-border-subtle bg-surface lg:left-1/2"
                >
                  <span className="size-2 rounded-full bg-brand-orange" />
                </span>

                <div
                  className={
                    isEven
                      ? "lg:col-start-1 lg:pr-4 lg:text-right"
                      : "lg:col-start-2 lg:pl-4"
                  }
                >
                  <span className="font-mono text-xs tracking-[0.25em] text-brand-orange">
                    STEP {step.step}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>

                  <ul
                    className={`mt-5 flex flex-wrap gap-2 ${
                      isEven ? "lg:justify-end" : ""
                    }`}
                  >
                    {step.deliverables.map((deliverable) => (
                      <li
                        key={deliverable}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1 text-[0.7rem] text-muted"
                      >
                        <Icon
                          name="check"
                          size={11}
                          className="text-brand-orange"
                        />
                        {deliverable}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
