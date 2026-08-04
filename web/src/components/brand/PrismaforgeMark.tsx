import { cn } from "@/lib/utils";

/**
 * The Prismaforge mark — a single source of truth for the logo geometry.
 *
 * A navy "P" whose counter holds an orange beam triangle: the letter is the
 * prism, the triangle is the light passing through it. Everything else that
 * shows the logo (the header lockup, favicon, apple icon, OG cards, the
 * static SVGs in /public) is generated from these same coordinates, so the
 * mark can never drift between surfaces.
 *
 * Drawn on a 64×64 grid with a 4-unit safe margin — sound down to 16px.
 *
 * NOTE: this is a vector redraw of the supplied brand logo. If you hold the
 * original vector artwork, drop it in and update this one file.
 */

/** Stem of the P. */
export const MARK_STEM = { x: 12, y: 8, width: 10, height: 48 } as const;

/**
 * Bowl of the P: an outer half-circle (r14, centred at 36,22) with the
 * counter punched out as a second sub-path. `fillRule="evenodd"` turns the
 * inner path into a hole rather than a second filled shape.
 */
export const MARK_BOWL =
  "M22 8 H36 A14 14 0 0 1 36 36 H22 Z M22 15 H36 A7 7 0 0 1 36 29 H22 Z";

/** The beam — drawn last so its tip reads over the bowl's inner edge. */
export const MARK_BEAM = "M26.5 16 L40 22 L26.5 28 Z";

interface MarkProps {
  size?: number;
  className?: string;
  /**
   * Colour of the letterform. Defaults to `currentColor` so the mark is
   * navy on light surfaces and near-white on dark ones — the literal brand
   * navy would disappear against the site's navy background.
   */
  letterColor?: string;
  beamColor?: string;
  title?: string;
}

export function PrismaforgeMark({
  size = 30,
  className,
  letterColor = "currentColor",
  beamColor = "var(--color-brand-orange, #f97316)",
  title,
}: MarkProps) {
  return (
    <svg
      width={(size * 56) / 64}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      className={cn("shrink-0", className)}
    >
      {title && <title>{title}</title>}
      <rect
        x={MARK_STEM.x}
        y={MARK_STEM.y}
        width={MARK_STEM.width}
        height={MARK_STEM.height}
        fill={letterColor}
      />
      <path d={MARK_BOWL} fill={letterColor} fillRule="evenodd" />
      <path d={MARK_BEAM} fill={beamColor} />
    </svg>
  );
}
