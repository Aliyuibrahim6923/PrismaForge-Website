import { Icon, type IconName } from "./Icon";
import { ProductMark } from "@/components/brand/ProductMark";
import type { ProductMarkName } from "@/lib/brand/product-marks";
import { cn } from "@/lib/utils";

interface ProjectCoverProps {
  gradient: [string, string];
  icon: IconName;
  /** The platform's own logo. Falls back to `icon` when absent. */
  mark?: ProductMarkName;
  title: string;
  className?: string;
  /** Larger treatment for the project detail hero. */
  size?: "card" | "hero";
}

/**
 * Generated cover art for a project.
 *
 * Deliberately not a photograph: the artwork is derived from the project's
 * own gradient and icon, so the portfolio stays visually coherent, weighs
 * nothing, scales to any density, and needs no asset pipeline. Swap this
 * for `next/image` once real screenshots are cleared for publication.
 */
export function ProjectCover({
  gradient,
  icon,
  mark,
  title,
  className,
  size = "card",
}: ProjectCoverProps) {
  const [from, to] = gradient;

  return (
    <div
      role="img"
      aria-label={`${title} — cover artwork`}
      className={cn(
        "relative isolate overflow-hidden",
        size === "card" ? "aspect-4/3" : "aspect-21/9",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
      }}
    >
      {/* Concentric rings — the "refraction" motif */}
      <svg
        aria-hidden
        className="absolute inset-0 size-full opacity-40 mix-blend-soft-light"
        viewBox="0 0 400 300"
        // Anchor to the top-right so the refraction rings stay in frame on
        // the wide 21:9 hero crop as well as the 4:3 card crop.
        preserveAspectRatio="xMaxYMin slice"
      >
        <defs>
          <radialGradient id={`glow-${title.replace(/\W/g, "")}`}>
            <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {[40, 78, 116, 154, 192].map((radius) => (
          <circle
            key={radius}
            cx="310"
            cy="60"
            r={radius}
            fill="none"
            stroke="#fff"
            strokeOpacity="0.28"
            strokeWidth="1"
          />
        ))}
        <circle
          cx="90"
          cy="240"
          r="140"
          fill={`url(#glow-${title.replace(/\W/g, "")})`}
        />
      </svg>

      {/* Dark scrim so the icon and any overlaid text stay legible */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/10 to-transparent" />

      {/* The platform's own logo on a glass chip. Rendered monochrome here
          on purpose: several covers end on brand orange, and a full-colour
          accent would sink into its own background. The two-tone logo is
          for solid surfaces — see /brand. */}
      <span
        className={cn(
          "absolute bottom-4 left-4 grid place-items-center rounded-2xl border border-white/25 bg-white/12 text-white backdrop-blur-md",
          size === "hero" ? "size-14" : "size-11",
        )}
      >
        {mark ? (
          <ProductMark
            name={mark}
            size={size === "hero" ? 30 : 24}
            accentColor="#ffffff"
          />
        ) : (
          <Icon name={icon} size={20} />
        )}
      </span>
    </div>
  );
}
