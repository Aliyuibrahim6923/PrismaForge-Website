"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { services } from "@/lib/content";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { cn } from "@/lib/utils";

/**
 * Services: four expandable competency cards.
 *
 * One card is open at a time — an accordion rather than independent toggles,
 * which keeps the section's height stable and stops the page from turning
 * into a wall of text.
 */
export function Services() {
  const [openSlug, setOpenSlug] = useState<string | null>(services[0]?.slug ?? null);
  const { scrollTo } = useSmoothScroll();

  return (
    <Section id="services" spacing="loose" className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-1/4 -z-10 size-[30rem] rounded-full bg-brand-amber/10 blur-[130px]"
      />

      <SectionHeading
        eyebrow="Core competencies"
        title="Four practice areas. One accountable partner."
        lead="From software development to training, branding to consultancy — we cover the full arc so nothing falls between vendors."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-2">
        {services.map((service, index) => {
          const isOpen = openSlug === service.slug;

          return (
            <TiltCard
              key={service.slug}
              intensity={4}
              className="reveal h-full"
              // Staggered so the grid assembles rather than snapping in.
            >
              <article
                data-reveal-delay={index * 110}
                className={cn(
                  "glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-500 sm:p-9",
                  isOpen && "border-brand-orange/30",
                )}
              >
                {/* Accent glow, tinted per service */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full opacity-25 blur-[70px] transition-opacity duration-700 group-hover:opacity-50"
                  style={{ background: service.accent }}
                />

                <div className="flex items-start justify-between gap-4">
                  <span
                    className="grid size-13 place-items-center rounded-2xl border border-border-subtle p-3 transition-transform duration-500 [transition-timing-function:var(--ease-spring)] group-hover:scale-110 group-hover:rotate-3"
                    style={{ color: service.accent }}
                  >
                    <Icon name={service.icon} size={24} />
                  </span>
                  <span className="font-mono text-xs tracking-[0.2em] text-muted">
                    {service.index}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold leading-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {service.description}
                </p>

                {/* Capability chips */}
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="rounded-full border border-border-subtle px-3 py-1 text-[0.7rem] text-muted transition-colors duration-300 group-hover:border-brand-orange/30"
                    >
                      {capability}
                    </li>
                  ))}
                </ul>

                {/* Expandable detail */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="detail"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-6 space-y-4 border-t border-border-subtle pt-6">
                        {service.items.map((item) => (
                          <li key={item.name} className="flex gap-3">
                            <Icon
                              name="check"
                              size={15}
                              className="mt-1 text-brand-orange"
                            />
                            <div>
                              <h4 className="text-sm font-medium">{item.name}</h4>
                              <p className="mt-1 text-[0.82rem] leading-relaxed text-muted">
                                {item.description}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-7 flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setOpenSlug(isOpen ? null : service.slug)}
                    aria-expanded={isOpen}
                    className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-foreground transition-colors hover:text-brand-orange"
                  >
                    {isOpen ? "Show less" : "Explore this practice"}
                    <Icon
                      name="chevronDown"
                      size={15}
                      className={cn(
                        "transition-transform duration-500",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>

                  <span aria-hidden className="mx-1 text-border-subtle">·</span>

                  <button
                    type="button"
                    onClick={() => scrollTo("#contact")}
                    className="inline-flex min-h-11 items-center gap-1.5 py-2 text-sm text-muted transition-colors hover:text-foreground"
                  >
                    Enquire
                    <Icon name="arrowUpRight" size={14} />
                  </button>
                </div>

                <p className="mt-5 border-t border-border-subtle pt-5 text-xs italic text-muted/80">
                  {service.tagline}
                </p>
              </article>
            </TiltCard>
          );
        })}
      </div>

      <div className="reveal mt-12 flex justify-center">
        <Button variant="secondary" size="lg" icon="arrowRight" href="#work">
          See the platforms we build
        </Button>
      </div>
    </Section>
  );
}
