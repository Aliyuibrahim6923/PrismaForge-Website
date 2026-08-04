"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * A single ScrollTrigger.batch pass for every `.reveal` / `.img-reveal`
 * element on the page.
 *
 * One batched observer for the whole document is dramatically cheaper than
 * a ScrollTrigger per component, and it means any element anywhere can opt
 * into scroll reveal by adding a class — no wrapper component, no props.
 *
 * `data-reveal-delay` (ms) staggers individual elements.
 */
export function ScrollRevealProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reveal = (element: Element, delay: number) =>
      window.setTimeout(() => element.classList.add("is-visible"), delay);

    /**
     * Safety sweep: reveal anything already at or above the fold.
     *
     * Without this, arriving via a deep link (`/#work`), a browser-restored
     * scroll position, or find-in-page leaves every element the viewport
     * "skipped" stuck at `opacity: 0` — a `once: true` trigger never fires
     * for content that was never crossed.
     */
    const sweep = () => {
      const fold = window.innerHeight * 0.9;
      document
        .querySelectorAll(
          ".reveal:not(.is-visible), .img-reveal:not(.is-visible)",
        )
        .forEach((element) => {
          if (element.getBoundingClientRect().top < fold) {
            element.classList.add("is-visible");
          }
        });
    };

    const context = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>(
        ".reveal:not(.is-visible), .img-reveal:not(.is-visible)",
      );
      if (!targets.length) return;

      ScrollTrigger.batch(targets, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          batch.forEach((element, index) => {
            const explicit = Number(
              (element as HTMLElement).dataset.revealDelay ?? NaN,
            );
            reveal(element, Number.isNaN(explicit) ? index * 80 : explicit);
          });
        },
        // Catches elements re-entered from above after a jump.
        onEnterBack: (batch) => batch.forEach((element) => reveal(element, 0)),
      });
    });

    // Late-loading fonts and the WebGL canvas change layout height.
    const refresh = () => {
      ScrollTrigger.refresh();
      sweep();
    };
    const timer = window.setTimeout(refresh, 600);
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(refresh).catch(() => {});
    }

    // Anchor jumps and restored positions both land outside GSAP's control.
    window.addEventListener("hashchange", sweep);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", sweep);
      context.revert();
    };
  }, [pathname]);

  return <>{children}</>;
}
