import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  /** Renders the faint technical grid behind the section. */
  grid?: boolean;
  /** Vertical rhythm. `tight` for stacked/related sections. */
  spacing?: "tight" | "normal" | "loose";
  "aria-labelledby"?: string;
}

const spacings = {
  tight: "py-16 sm:py-20",
  normal: "py-24 sm:py-32",
  loose: "py-28 sm:py-40",
};

/** Semantic section wrapper with consistent rhythm and container width. */
export function Section({
  id,
  children,
  className,
  grid = false,
  spacing = "normal",
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      // Offset for the fixed header when linked to directly.
      className={cn("relative scroll-mt-24", spacings[spacing], className)}
      {...rest}
    >
      {grid && (
        <div
          aria-hidden
          className="bg-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]"
        />
      )}
      <div className="container-x">{children}</div>
    </section>
  );
}
