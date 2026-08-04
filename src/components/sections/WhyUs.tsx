import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { advantages, whyUs } from "@/lib/content";

/**
 * Why Prismaforge — the six advantages from the catalog.
 *
 * A pure server component: no interactivity beyond CSS hover, so none of
 * this ships JavaScript.
 */
export function WhyUs() {
  return (
    <Section id="why" grid spacing="loose" className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-15%] top-1/3 -z-10 size-[28rem] rounded-full bg-brand-orange/10 blur-[130px]"
      />

      <SectionHeading
        eyebrow={whyUs.eyebrow}
        title={whyUs.title}
        lead={whyUs.lead}
        align="center"
      />

      <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
        {advantages.map((advantage, index) => (
          <article
            key={advantage.title}
            className="reveal group relative bg-surface p-8 transition-colors duration-500 hover:bg-surface-raised/60"
            data-reveal-delay={index * 90}
          >
            {/* Corner accent that draws in on hover */}
            <span
              aria-hidden
              className="absolute left-0 top-0 h-px w-0 bg-gradient-to-r from-brand-orange to-transparent transition-all duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:w-full"
            />

            <span className="grid size-12 place-items-center rounded-2xl border border-border-subtle text-brand-orange transition-all duration-500 [transition-timing-function:var(--ease-spring)] group-hover:-translate-y-1 group-hover:border-brand-orange/40">
              <Icon name={advantage.icon} size={21} />
            </span>

            <h3 className="mt-6 font-display text-lg font-semibold">
              {advantage.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">
              {advantage.description}
            </p>

            <span
              aria-hidden
              className="pointer-events-none absolute bottom-5 right-6 font-mono text-xs text-muted/40"
            >
              0{index + 1}
            </span>
          </article>
        ))}
      </div>

      <p className="reveal mt-12 text-center font-display text-xl font-medium tracking-tight sm:text-2xl">
        <span className="text-gradient">{whyUs.closing}</span>
      </p>
    </Section>
  );
}
