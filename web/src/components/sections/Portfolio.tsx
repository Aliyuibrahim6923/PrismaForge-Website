"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/Icon";
import { TiltCard } from "@/components/ui/TiltCard";
import { ProjectCover } from "@/components/ui/ProjectCover";
import { projectCategories, projects } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { ProjectCategory } from "@/types/content";

type Filter = "All" | ProjectCategory;

/**
 * Portfolio with category filtering.
 *
 * Cards animate between filter states with a shared `layout` prop, so
 * filtering reflows rather than cutting — the grid rearranges itself and
 * the eye can follow individual cards to their new positions.
 */
export function Portfolio() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter],
  );

  return (
    <Section id="work" spacing="loose" className="relative">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Portfolio"
          title="Platforms we design, build and support."
          lead="Each of these is a product line, deployed and extended for institutions with real operational constraints."
          className="lg:max-w-2xl"
        />

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filter projects by sector"
          className="reveal flex flex-wrap gap-2"
        >
          {projectCategories.map((category) => {
            const isActive = filter === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(category)}
                className={cn(
                  "relative inline-flex min-h-11 items-center rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-300",
                  isActive
                    ? "border-transparent text-ink-950"
                    : "border-border-subtle text-muted hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolio-filter"
                    className="bg-brand absolute inset-0 -z-10 rounded-full"
                    transition={{ type: "spring", stiffness: 360, damping: 32 }}
                  />
                )}
                {category}
              </button>
            );
          })}
        </div>
      </div>

      <motion.ul
        layout
        className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, index) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.5,
                delay: index * 0.04,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <TiltCard intensity={6} className="h-full">
                <Link
                  href={`/work/${project.slug}`}
                  data-cursor="view"
                  data-cursor-label="View"
                  className="glass group flex h-full flex-col overflow-hidden rounded-3xl transition-colors duration-500 hover:border-brand-orange/30"
                >
                  <div className="overflow-hidden">
                    <ProjectCover
                      gradient={project.gradient}
                      icon={project.icon}
                      mark={project.mark}
                      image={project.image}
                      title={project.title}
                      className="transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2.5 text-xs text-muted">
                      <span className="rounded-full border border-border-subtle px-2.5 py-0.5">
                        {project.category}
                      </span>
                      <span>{project.year}</span>
                    </div>

                    <h3 className="mt-4 font-display text-lg font-semibold leading-snug transition-colors duration-300 group-hover:text-brand-orange">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                      {project.summary}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-border-subtle pt-4">
                      <ul className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 2).map((tag) => (
                          <li
                            key={tag}
                            className="text-[0.68rem] uppercase tracking-[0.12em] text-muted"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      <span className="grid size-8 place-items-center rounded-full border border-border-subtle transition-all duration-500 group-hover:border-brand-orange/50 group-hover:bg-brand-orange/10 group-hover:text-brand-orange">
                        <Icon name="arrowUpRight" size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </Section>
  );
}
