import { cn } from "@/lib/utils";
import { PrismaforgeMark } from "@/components/brand/PrismaforgeMark";

/**
 * Header lockup: mark + two-tone wordmark ("Prisma" in the letter colour,
 * "forge" in brand orange), matching the brand logo.
 *
 * Geometry lives in `PrismaforgeMark` so the header, favicon and social
 * cards all render the same artwork.
 */
export function Logo({
  className,
  animated = false,
  showWordmark = true,
}: {
  className?: string;
  animated?: boolean;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <PrismaforgeMark
        size={28}
        className={cn(animated && "[animation:var(--animate-float)]")}
      />

      {showWordmark && (
        <span className="font-display text-[1.05rem] font-semibold tracking-tight">
          Prisma<span className="text-brand-orange">forge</span>
        </span>
      )}
    </span>
  );
}
