"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { about, timeline } from "@/lib/content";

/**
 * About: narrative, mission/vision, and a scroll-drawn timeline.
 *
 * The timeline's spine scales with the section's own scroll progress, so
 * the line literally draws itself as the entries come into view.
 */
export function About() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Section id="about" grid spacing="loose">
      <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div>
          <SectionHeading
            eyebrow={about.eyebrow}
            title={about.title}
            lead={about.lead}
          />

          <div className="mt-8 space-y-5">
            {about.body.map((paragraph, index) => (
              <p
                key={index}
                className="reveal text-base leading-relaxed text-muted"
                data-reveal-delay={220 + index * 90}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Mission / Vision */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              { icon: "target" as const, title: "Our Mission", body: about.mission },
              { icon: "eye" as const, title: "Our Vision", body: about.vision },
            ].map((card, index) => (
              <article
                key={card.title}
                className="reveal glass border-gradient group relative overflow-hidden rounded-2xl p-6"
                data-reveal-delay={300 + index * 120}
              >
                <span className="grid size-11 place-items-center rounded-xl border border-border-subtle bg-brand-sky/10 text-brand-orange transition-transform duration-500 group-hover:scale-110">
                  <Icon name={card.icon} size={19} />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="lg:pt-10">
          <h3 className="reveal font-display text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            How we got here
          </h3>

          <ol ref={timelineRef} className="relative mt-8 space-y-10 pl-9">
            {/* Track + progress spine */}
            <span
              aria-hidden
              className="absolute left-[13px] top-2 h-[calc(100%-1rem)] w-px bg-border-subtle"
            />
            <motion.span
              aria-hidden
              style={{ scaleY }}
              className="bg-brand absolute left-[13px] top-2 h-[calc(100%-1rem)] w-px origin-top"
            />

            {timeline.map((entry, index) => (
              <li
                key={`${entry.year}-${entry.title}`}
                className="reveal relative"
                data-reveal-delay={index * 140}
              >
                <span
                  aria-hidden
                  className="absolute -left-9 top-1 grid size-[27px] place-items-center rounded-full border border-border-subtle bg-surface"
                >
                  <span className="size-2 rounded-full bg-brand-orange" />
                </span>

                <span className="font-mono text-xs tracking-widest text-brand-orange">
                  {entry.year}
                </span>
                <h4 className="mt-1.5 font-display text-lg font-semibold">
                  {entry.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {entry.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
