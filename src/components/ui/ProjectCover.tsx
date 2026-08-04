import Image from "next/image";
import { Icon, type IconName } from "./Icon";
import { ProductMark } from "@/components/brand/ProductMark";
import { ProductScene } from "./ProductScene";
import type { ProductMarkName } from "@/lib/brand/product-marks";
import { cn } from "@/lib/utils";

interface ProjectCoverProps {
  gradient: [string, string];
  icon: IconName;
  /** The platform's own logo. Falls back to `icon` when absent. */
  mark?: ProductMarkName;
  /**
   * Real cover artwork — a screenshot or generated image in /public.
   * When set it replaces the illustrated scene entirely.
   */
  image?: string;
  title: string;
  className?: string;
  /** Larger treatment for the project detail hero. */
  size?: "card" | "hero";
}

/**
 * Cover art for a project.
 *
 * By default this draws an illustrated scene of the product's own
 * interface (see `ProductScene`) over the project's brand gradient —
 * vector, ~1 kB, crisp at any density and themeable, which is why it is
 * preferred to a photograph on a page that has been tuned for speed.
 *
 * To use real artwork instead, add `image: "/work/<file>.webp"` to the
 * project in `content/projects.ts`. It takes over automatically here, with
 * `next/image` handling sizing, lazy loading and AVIF/WebP conversion.
 */
export function ProjectCover({
  gradient,
  icon,
  mark,
  image,
  title,
  className,
  size = "card",
}: ProjectCoverProps) {
  const [from, to] = gradient;
  const isHero = size === "hero";

  return (
    <div
      role="img"
      aria-label={`${title} — cover artwork`}
      className={cn(
        "relative isolate overflow-hidden",
        isHero ? "aspect-21/9" : "aspect-4/3",
        className,
      )}
      style={{ backgroundImage: `linear-gradient(135deg, ${from}, ${to})` }}
    >
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          // Card is a third of the grid on desktop; hero is full width.
          sizes={isHero ? "100vw" : "(min-width: 1024px) 33vw, 100vw"}
          className="object-cover"
          priority={isHero}
        />
      ) : (
        <svg
          aria-hidden
          className="absolute inset-0 size-full"
          viewBox="0 0 400 300"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Refraction rings — the brand motif, behind the scene. */}
          <g opacity="0.35">
            {[54, 104, 154, 204].map((radius) => (
              <circle
                key={radius}
                cx="336"
                cy="34"
                r={radius}
                fill="none"
                stroke="#fff"
                strokeOpacity="0.22"
                strokeWidth="1"
              />
            ))}
          </g>
          {mark && <ProductScene mark={mark} />}
        </svg>
      )}

      {/* Scrim so the logo chip and any overlaid text stay legible. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/5 to-transparent" />

      {/* The platform's own logo, on a solid white chip.
          Not translucent glass: these marks are fine outlines, and a white
          mark on a white-tinted panel over a bright gradient disappears.
          A solid chip also lets the real two-tone logo show — the colours
          are hard-coded because the chip is white in either theme. */}
      <span
        className={cn(
          "absolute bottom-4 left-4 grid place-items-center rounded-2xl bg-white shadow-[0_8px_20px_-8px_rgb(5_10_26/0.65)] ring-1 ring-ink-950/10",
          isHero ? "size-16" : "size-12",
        )}
      >
        {mark ? (
          <ProductMark
            name={mark}
            size={isHero ? 40 : 30}
            letterColor="#1b2a5c"
            accentColor="#f97316"
          />
        ) : (
          <Icon name={icon} size={22} className="text-[#1b2a5c]" />
        )}
      </span>
    </div>
  );
}
