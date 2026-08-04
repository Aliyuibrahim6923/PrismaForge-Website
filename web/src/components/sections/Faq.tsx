"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { faqs } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * FAQ with category filtering and an animated accordion.
 *
 * Built from buttons and `aria-expanded` rather than `<details>` so the
 * open/close height can be animated; the questions remain in the DOM for
 * crawlers either way, and the same list feeds the FAQPage JSON-LD.
 */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(faqs.map((faq) => faq.category)))],
    [],
  );

  const visible = useMemo(
    () =>
      category === "All"
        ? faqs
        : faqs.filter((faq) => faq.category === category),
    [category],
  );

  return (
    <Section id="faq" spacing="loose">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions we're asked before every engagement."
            lead="If yours isn't here, ask it directly — we answer within one working day."
          />

          <div className="reveal mt-8 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setCategory(item);
                  setOpenIndex(0);
                }}
                className={cn(
                  "inline-flex min-h-10 items-center rounded-full border px-4 py-2 text-xs font-medium transition-colors duration-300",
                  category === item
                    ? "border-brand-orange/50 bg-brand-orange/10 text-brand-orange"
                    : "border-border-subtle text-muted hover:text-foreground",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <ul className="divide-y divide-[color:var(--border-subtle)] border-y border-border-subtle">
          {visible.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <li key={faq.question} className="reveal" data-reveal-delay={index * 60}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start gap-5 py-6 text-left"
                  >
                    <span
                      className={cn(
                        "mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        isOpen
                          ? "rotate-180 border-brand-orange/50 bg-brand-orange/10 text-brand-orange"
                          : "border-border-subtle text-muted group-hover:text-foreground",
                      )}
                    >
                      <Icon name={isOpen ? "minus" : "plus"} size={13} />
                    </span>

                    <span
                      className={cn(
                        "flex-1 font-display text-base font-medium transition-colors duration-300 sm:text-lg",
                        isOpen ? "text-foreground" : "group-hover:text-foreground",
                      )}
                    >
                      {faq.question}
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pl-12 pr-2 text-sm leading-relaxed text-muted">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
