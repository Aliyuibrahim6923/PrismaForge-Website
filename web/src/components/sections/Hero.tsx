"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { LazyHeroScene } from "@/components/three/LazyHeroScene";
import { Button } from "@/components/ui/Button";
import { RevealText } from "@/components/ui/RevealText";
import { Marquee } from "@/components/ui/Marquee";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { stats } from "@/lib/content";
import { Counter } from "@/components/ui/Counter";

/**
 * Hero entrance timings.
 *
 * These are deliberately tight. The hero copy is the LCP element, and an
 * element animating up from `opacity: 0` does not count as painted until
 * it is actually visible — so every 100ms of delay here is 100ms added
 * directly to Largest Contentful Paint. Generous delays measured at 2.3s
 * LCP on a phone; this schedule lands the paragraph by ~0.8s while still
 * reading as a staged entrance.
 *
 * On desktop the preloader covers the first moment anyway, so nothing is
 * lost by keeping the stagger short.
 */
const ENTRANCE = {
  badge: 0.05,
  headline: 0.12,
  headlineSecond: 0.22,
  lead: 0.3,
  actions: 0.4,
  stats: 0.5,
  scrollCue: 0.9,
} as const;

const CAPABILITIES = [
  "Software Development",
  "E-Governance",
  "Learning Platforms",
  "Land Administration",
  "ERP & Project Management",
  "Consultancy & Training",
  "Brand & Digital Presence",
] as const;

/**
 * Fullscreen hero.
 *
 * Layered back to front: aurora gradient wash → WebGL prism → grid overlay
 * → content. The copy is real HTML text (not canvas), so LCP, SEO and
 * screen readers are unaffected by whether WebGL ever loads.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Parallax the content out as the hero scrolls away.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const { scrollTo } = useSmoothScroll();

  return (
    <section
      ref={ref}
      id="hero"
      className="noise relative flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28"
      aria-label="Introduction"
    >
      {/* Aurora wash */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute left-[8%] top-[6%] size-[34rem] rounded-full bg-brand-sky/25 blur-[120px] [animation:var(--animate-aurora)]" />
        <div className="absolute right-[4%] top-[28%] size-[28rem] rounded-full bg-brand-amber/20 blur-[130px] [animation:var(--animate-aurora)] [animation-delay:-8s]" />
        <div className="absolute bottom-[4%] left-[38%] size-[26rem] rounded-full bg-brand-orange/15 blur-[120px] [animation:var(--animate-aurora)] [animation-delay:-15s]" />
      </div>

      {/* WebGL layer */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <LazyHeroScene />
      </div>

      {/* Grid + vignette */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_70%)]"
      />
      {/* Left scrim — guarantees headline contrast over the WebGL layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full bg-gradient-to-r from-surface via-surface/70 to-transparent lg:w-3/5"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-t from-surface to-transparent"
      />

      <motion.div style={{ y, opacity }} className="container-x relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: ENTRANCE.badge, ease: [0.16, 1, 0.3, 1] }}
          className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium tracking-wide"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full rounded-full bg-brand-orange opacity-75 [animation:var(--animate-pulse-ring)]" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand-orange" />
          </span>
          Technology · Training · Strategy
          <span className="hidden text-muted sm:inline">— under one roof</span>
        </motion.span>

        <h1 className="mt-7 max-w-4xl text-[length:var(--text-display-lg)] font-semibold leading-[0.95]">
          <RevealText text="We build the systems" immediate delay={ENTRANCE.headline} />
          <RevealText
            text="institutions run on."
            immediate
            delay={ENTRANCE.headlineSecond}
            gradient
          />
        </h1>

        {/* This paragraph is the LCP element on phones, so it animates
            position only — never opacity. Text that starts transparent is
            not "painted" until the fade finishes, which was costing about
            a full second of LCP for a purely decorative fade. */}
        <motion.p
          initial={{ y: 14 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: ENTRANCE.lead, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Prismaforge drives digital transformation across Nigeria&apos;s public
          and private sectors — combining software engineering, organizational
          development and capacity building in one accountable partner.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: ENTRANCE.actions, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button
            size="lg"
            icon="arrowRight"
            onClick={() => scrollTo("#contact")}
          >
            Start a project
          </Button>
          <Button
            size="lg"
            variant="secondary"
            icon="arrowDown"
            onClick={() => scrollTo("#services")}
          >
            Explore capabilities
          </Button>
        </motion.div>

        {/* Stats strip */}
        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: ENTRANCE.stats, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-subtle bg-border-subtle sm:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-surface/60 px-5 py-6 backdrop-blur-sm"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-semibold tracking-tight">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  prefix={stat.prefix}
                  format={stat.value > 1900 ? "plain" : "number"}
                />
              </dd>
              <p className="mt-1.5 text-xs uppercase tracking-[0.14em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      {/* Capability marquee */}
      <div className="relative z-10 mt-16">
        <Marquee items={CAPABILITIES} speed={38} />
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => scrollTo("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ENTRANCE.scrollCue, duration: 0.8 }}
        aria-label="Scroll to about section"
        className="group absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[0.62rem] uppercase tracking-[0.3em] text-muted">
          Scroll
        </span>
        <span className="relative flex h-11 w-6 justify-center rounded-full border border-border-subtle transition-colors group-hover:border-brand-orange/60">
          <motion.span
            className="mt-1.5 block h-2 w-1 rounded-full bg-brand-orange"
            animate={{ y: [0, 14, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>
    </section>
  );
}
