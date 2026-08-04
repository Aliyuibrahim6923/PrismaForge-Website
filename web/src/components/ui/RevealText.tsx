"use client";

import { createElement, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/** Restricted to text-bearing tags — keeps the polymorphic types tractable. */
type RevealTag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

interface RevealTextProps {
  text: string;
  as?: RevealTag;
  className?: string;
  /** Seconds before the first word animates. */
  delay?: number;
  /** Per-word stagger in seconds. */
  stagger?: number;
  /** Play on mount instead of when scrolled into view. */
  immediate?: boolean;
  /**
   * Paint the words with the prism gradient.
   *
   * Must be a prop rather than a `text-gradient` class on the parent:
   * each word sits inside an `overflow: hidden` mask, and Chromium leaves
   * text inside an overflow-clipped descendant out of an ancestor's
   * `background-clip: text` geometry — the heading renders invisible.
   * Applying the gradient to the word spans themselves avoids that.
   */
  gradient?: boolean;
}

/**
 * Word-by-word masked text reveal.
 *
 * Each word sits in an `overflow-hidden` span and slides up from below its
 * own mask, which reads far more cinematic than a plain fade. The full
 * string stays in the DOM as a single text node for screen readers via
 * `aria-label`, with the animated words hidden from the accessibility tree.
 */
export function RevealText({
  text,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.055,
  immediate = false,
  gradient = false,
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !ref.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const words = ref.current?.querySelectorAll<HTMLElement>("[data-word]");
      if (!words?.length) return;

      gsap.set(words, { yPercent: 120, opacity: 0 });
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 1.05,
        delay,
        stagger,
        ease: "expo.out",
        scrollTrigger: immediate
          ? undefined
          : { trigger: ref.current, start: "top 85%", once: true },
      });
    }, ref);

    return () => context.revert();
  }, [delay, stagger, immediate, prefersReducedMotion, text]);

  const words = text.split(" ");

  // `createElement` instead of a JSX `<Tag>`: rendering a union of intrinsic
  // elements through JSX makes TypeScript resolve every possible prop
  // signature at once, which blows past its complexity limit.
  return createElement(
    Tag,
    {
      ref: ref as React.Ref<never>,
      className: cn("block", className),
      "aria-label": text,
    },
    words.map((word, index) => (
      <span
        key={`${word}-${index}`}
        aria-hidden
        className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
      >
        {/* No `will-change` here either: promoting a word to its own
            compositing layer breaks the same gradient painting. GSAP
            animates the transform fine without it. */}
        <span data-word className={cn("inline-block", gradient && "text-gradient")}>
          {word}
        </span>
        {index < words.length - 1 && <span>&nbsp;</span>}
      </span>
    )),
  );
}
