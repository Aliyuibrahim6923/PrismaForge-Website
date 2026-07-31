import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: readonly string[];
  className?: string;
  /** Seconds for one full loop. */
  speed?: number;
  reverse?: boolean;
}

/**
 * Infinite horizontal marquee.
 *
 * The item list is rendered twice and translated by exactly -50%, so the
 * loop point is seamless regardless of content width. CSS-only — no JS,
 * no layout reads, and it pauses under `prefers-reduced-motion`.
 */
export function Marquee({
  items,
  className,
  speed = 42,
  reverse = false,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative flex overflow-hidden",
        "[mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]",
        className,
      )}
    >
      <div
        className="flex w-max shrink-0 items-center [animation:var(--animate-marquee)] group-hover:[animation-play-state:paused]"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-8 whitespace-nowrap px-8 text-sm font-medium uppercase tracking-[0.2em] text-muted"
          >
            {item}
            <span aria-hidden className="size-1 rounded-full bg-brand-orange/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
