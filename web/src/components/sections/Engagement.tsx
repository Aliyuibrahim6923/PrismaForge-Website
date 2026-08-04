"use client";

import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { engagementModels } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

/**
 * "How we work" — four engagement models.
 *
 * Presented as models rather than a rate card: scope is quoted per
 * organization, and publishing invented figures would be worse than
 * honest placeholders. Swap `price` in `content/industries.ts` when a
 * public rate card exists.
 */
export function Engagement() {
  const { scrollTo } = useSmoothScroll();

  return (
    <Section id="engagement" grid spacing="loose">
      <SectionHeading
        eyebrow="How we work"
        title="Four ways to work with us."
        lead="From a single project to a full capacity-building partnership — choose what fits your organization's needs."
        align="center"
      />

      <div className="mt-16 grid gap-5 lg:grid-cols-4 lg:gap-4">
        {engagementModels.map((model, index) => (
          <article
            key={model.name}
            className={cn(
              "reveal group relative flex flex-col overflow-hidden rounded-3xl p-7 transition-all duration-500",
              model.featured
                ? "glass border-brand-orange/35 lg:-mt-4 lg:mb-[-1rem]"
                : "border border-border-subtle hover:border-foreground/20",
            )}
            data-reveal-delay={index * 100}
          >
            {model.featured && (
              <>
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-14 -top-14 size-40 rounded-full bg-brand-orange/25 blur-[60px]"
                />
                <span className="bg-brand absolute right-5 top-5 rounded-full px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-white">
                  Most requested
                </span>
              </>
            )}

            <h3 className="font-display text-lg font-semibold">{model.name}</h3>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-3xl font-semibold tracking-tight">
                {model.price}
              </span>
            </div>
            <span className="mt-1 text-xs text-muted">{model.cadence}</span>

            <p className="mt-5 text-sm leading-relaxed text-muted">
              {model.description}
            </p>

            <ul className="mt-6 flex-1 space-y-3 border-t border-border-subtle pt-6">
              {model.features.map((feature) => (
                <li key={feature} className="flex gap-2.5 text-sm text-muted">
                  <Icon
                    name="check"
                    size={14}
                    className="mt-1 shrink-0 text-brand-orange"
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              variant={model.featured ? "primary" : "outline"}
              size="sm"
              className="mt-7 w-full"
              icon="arrowRight"
              magnetic={false}
              onClick={() => scrollTo("#contact")}
            >
              {model.cta}
            </Button>
          </article>
        ))}
      </div>

      <p className="reveal mt-10 text-center text-sm text-muted">
        Every engagement is measured against clear KPIs agreed before work
        begins.{" "}
        <button
          type="button"
          onClick={() => scrollTo("#contact")}
          className="inline-flex min-h-11 items-center py-2 font-medium text-foreground underline decoration-brand-orange/50 underline-offset-4 transition-colors hover:text-brand-orange"
        >
          Talk to us about scope
        </button>
      </p>
    </Section>
  );
}
