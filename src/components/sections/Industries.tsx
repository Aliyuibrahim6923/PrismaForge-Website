"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { industries } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Industries: an interactive list where hovering a sector expands its row.
 *
 * Rows rather than cards — the catalog presents this as a "Sector / How We
 * Help" table, and a list preserves that scannability while still giving
 * each row a considered hover state.
 */
export function Industries() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <Section id="industries" spacing="normal" className="relative">
      <SectionHeading
        eyebrow="Who we serve"
        title="Industries we serve"
        lead="Five sectors, each with its own platforms, compliance realities and delivery rhythm."
      />

      <ul className="mt-14 border-t border-border-subtle">
        {industries.map((industry, index) => {
          const isActive = activeIndex === index;

          return (
            <li
              key={industry.name}
              className="reveal border-b border-border-subtle"
              data-reveal-delay={index * 90}
            >
              <button
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                aria-expanded={isActive}
                className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-5 py-7 text-left transition-colors duration-500 sm:gap-8"
              >
                {/* Sliding highlight */}
                {isActive && (
                  <motion.span
                    layoutId="industry-highlight"
                    aria-hidden
                    className="pointer-events-none absolute inset-x-[-1rem] inset-y-0 -z-10 rounded-2xl bg-foreground/4"
                    transition={{ type: "spring", stiffness: 320, damping: 34 }}
                  />
                )}

                <span
                  className={cn(
                    "grid size-12 shrink-0 place-items-center rounded-2xl border transition-all duration-500",
                    isActive
                      ? "border-brand-orange/40 text-brand-orange"
                      : "border-border-subtle text-muted",
                  )}
                >
                  <Icon name={industry.icon} size={21} />
                </span>

                <div className="min-w-0">
                  <h3
                    className={cn(
                      "font-display text-xl font-semibold transition-colors duration-500 sm:text-2xl",
                      isActive ? "text-foreground" : "text-muted",
                    )}
                  >
                    {industry.name}
                  </h3>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pt-2.5 text-sm leading-relaxed text-muted sm:max-w-2xl">
                      {industry.description}
                    </p>
                    <ul className="flex flex-wrap gap-2 pt-3.5">
                      {industry.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="rounded-full border border-border-subtle px-3 py-1 text-[0.7rem] text-muted"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                <span className="font-mono text-xs text-muted">
                  0{index + 1}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
