import { cn } from "@/lib/utils";
import {
  paintAttrs,
  productMarks,
  type ProductMarkName,
} from "@/lib/brand/product-marks";

interface ProductMarkProps {
  name: ProductMarkName;
  size?: number;
  className?: string;
  /**
   * Structure colour. Defaults to `currentColor` so the mark inherits the
   * surface it sits on — navy on light, near-white on dark. Brand navy is
   * never hard-coded here; it would vanish on the site's navy sections.
   */
  letterColor?: string;
  accentColor?: string;
  /** Set when the mark is the only label — otherwise it stays decorative. */
  labelled?: boolean;
}

/**
 * Renders a platform logo from the shared geometry registry.
 * See `src/lib/brand/product-marks.ts` for the family rules.
 */
export function ProductMark({
  name,
  size = 32,
  className,
  letterColor = "currentColor",
  accentColor = "var(--color-brand-orange, #f97316)",
  labelled = false,
}: ProductMarkProps) {
  const mark = productMarks[name];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      role={labelled ? "img" : undefined}
      aria-label={labelled ? mark.name : undefined}
      aria-hidden={labelled ? undefined : true}
      className={cn("shrink-0", className)}
    >
      {labelled && <title>{mark.name}</title>}

      {mark.shapes.map((shape, index) => {
        const colour = shape.tone === "accent" ? accentColor : letterColor;
        const paint = paintAttrs(shape, colour);
        const transform = shape.transform;

        switch (shape.kind) {
          case "rect":
            return (
              <rect
                key={index}
                x={shape.x}
                y={shape.y}
                width={shape.w}
                height={shape.h}
                rx={shape.r}
                transform={transform}
                {...paint}
              />
            );
          case "circle":
            return (
              <circle
                key={index}
                cx={shape.cx}
                cy={shape.cy}
                r={shape.r}
                transform={transform}
                {...paint}
              />
            );
          case "ellipse":
            return (
              <ellipse
                key={index}
                cx={shape.cx}
                cy={shape.cy}
                rx={shape.rx}
                ry={shape.ry}
                transform={transform}
                {...paint}
              />
            );
          default:
            return (
              <path
                key={index}
                d={shape.d}
                fillRule={shape.evenodd ? "evenodd" : undefined}
                transform={transform}
                {...paint}
              />
            );
        }
      })}
    </svg>
  );
}
