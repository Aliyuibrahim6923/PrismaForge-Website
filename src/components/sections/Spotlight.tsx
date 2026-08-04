"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { TiltCard } from "@/components/ui/TiltCard";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { getProject } from "@/lib/content";
import { spotlight, spotlightItems } from "@/lib/content/spotlight";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { trackEvent } from "@/lib/analytics";

/**
 * Product spotlight — the marketing slot.
 *
 * Promotes whatever is new or trending, driven entirely by
 * `lib/content/spotlight.ts`. With one entry it renders as a single
 * feature; with several it grows a tab rail that auto-rotates (paused on
 * hover, focus, or under reduced-motion).
 *
 * Tab changes and CTA clicks fire analytics events so marketing can see
 * which product actually earns attention.
 */
export function Spotlight() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { scrollTo } = useSmoothScroll();

  const multiple = spotlightItems.length > 1;
  const item = spotlightItems[index];
  const project = item ? getProject(item.projectSlug) : undefined;

  const select = useCallback((next: number, source: "auto" | "click") => {
    const target = (next + spotlightItems.length) % spotlightItems.length;
    setIndex(target);
    if (source === "click") {
      trackEvent("spotlight_select", {
        product: spotlightItems[target]?.tabLabel,
      });
    }
  }, []);

  useEffect(() => {
    const seconds = spotlight.autoRotateSeconds;
    if (!multiple || paused || prefersReducedMotion || seconds <= 0) return;

    const timer = window.setInterval(
      () => select(index + 1, "auto"),
      seconds * 1000,
    );
    return () => window.clearInterval(timer);
  }, [index, multiple, paused, prefersReducedMotion, select]);

  // A slug typo in the content file shouldn't take the page down.
  if (!item || !project) return null;

  const handleCta = (href: string, label: string) => {
    trackEvent("spotlight_cta", { product: item.tabLabel, cta: label });
    if (href.startsWith("#")) scrollTo(href);
  };

  return (
    <Section id="spotlight" spacing="loose" className="relative">
      {/* Warm wash — this section should feel like the shop window. */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-8%] top-1/4 -z-10 size-[34rem] rounded-full bg-brand-orange/10 blur-[150px]"
      />

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow={spotlight.eyebrow}
          title={spotlight.title}
          lead={spotlight.lead}
          className="lg:max-w-2xl"
        />

        {multiple && (
          <div
            role="tablist"
            aria-label="Featured products"
            className="reveal flex flex-wrap gap-2"
          >
            {spotlightItems.map((entry, entryIndex) => {
              const isActive = entryIndex === index;
              return (
                <button
                  key={entry.projectSlug}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => select(entryIndex, "click")}
                  className={cn(
                    "relative flex min-h-11 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-300",
                    isActive
                      ? "border-brand-orange/45 text-foreground"
                      : "border-border-subtle text-muted hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "size-1.5 rounded-full transition-colors duration-300",
                      isActive ? "bg-brand-orange" : "bg-foreground/25",
                    )}
                  />
                  {entry.tabLabel}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div
        className="reveal mt-14"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={item.projectSlug}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="glass border-gradient grid gap-10 overflow-hidden rounded-3xl p-7 sm:p-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14 lg:p-12"
          >
            {/* Copy */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/40 bg-brand-orange/10 px-3.5 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-brand-orange">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full rounded-full bg-brand-orange opacity-75 [animation:var(--animate-pulse-ring)]" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-brand-orange" />
                </span>
                {item.badge}
              </span>

              <h3 className="mt-5 font-display text-[length:var(--text-display-sm)] font-semibold leading-[1.08]">
                {item.headline}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                {item.pitch}
              </p>

              <ul className="mt-7 space-y-3">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3 text-sm text-muted">
                    <Icon
                      name="check"
                      size={15}
                      className="mt-0.5 shrink-0 text-brand-orange"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap gap-3">
                <Button
                  size="lg"
                  icon="arrowRight"
                  href={
                    item.primaryCta.href.startsWith("#")
                      ? undefined
                      : item.primaryCta.href
                  }
                  onClick={() =>
                    handleCta(item.primaryCta.href, item.primaryCta.label)
                  }
                >
                  {item.primaryCta.label}
                </Button>

                {item.secondaryCta && (
                  <Button
                    size="lg"
                    variant="outline"
                    icon="arrowUpRight"
                    href={item.secondaryCta.href}
                    onClick={() =>
                      handleCta(
                        item.secondaryCta!.href,
                        item.secondaryCta!.label,
                      )
                    }
                  >
                    {item.secondaryCta.label}
                  </Button>
                )}
              </div>
            </div>

            {/* Artwork + highlight chips */}
            <TiltCard intensity={5} className="relative">
              <ProjectCover
                size="hero"
                gradient={project.gradient}
                icon={project.icon}
                mark={project.mark}
                image={project.image}
                title={project.title}
                className="rounded-3xl shadow-[0_30px_70px_-30px_rgba(5,10,26,0.9)]"
              />

              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {item.highlights.map((highlight) => (
                  <li
                    key={highlight.label}
                    className="flex min-w-0 flex-col rounded-2xl border border-border-subtle bg-surface/60 p-4 backdrop-blur-sm"
                  >
                    <Icon
                      name={highlight.icon}
                      size={16}
                      className="text-brand-orange"
                    />
                    <p className="mt-2.5 font-display text-[0.95rem] font-semibold leading-snug text-balance">
                      {highlight.value}
                    </p>
                    <p className="mt-auto pt-1.5 text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                      {highlight.label}
                    </p>
                  </li>
                ))}
              </ul>
            </TiltCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
