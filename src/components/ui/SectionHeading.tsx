import { cn } from "@/lib/utils";
import { RevealText } from "./RevealText";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
  /** Renders the title with the prism gradient. */
  gradient?: boolean;
}

/** Shared section header: eyebrow chip, animated title, supporting lead. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  gradient = false,
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="reveal inline-flex w-fit items-center gap-2.5 rounded-full border border-border-subtle px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-muted">
          <span className="relative flex size-1.5">
            <span className="absolute inline-flex size-full rounded-full bg-brand-orange opacity-75 [animation:var(--animate-pulse-ring)]" />
            <span className="relative inline-flex size-1.5 rounded-full bg-brand-orange" />
          </span>
          {eyebrow}
        </span>
      )}

      <RevealText
        as="h2"
        text={title}
        gradient={gradient}
        className={cn(
          "max-w-4xl text-[length:var(--text-display-md)] font-semibold leading-[1.03]",
          align === "center" && "mx-auto",
        )}
      />

      {lead && (
        <p
          className="reveal max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
          data-reveal-delay="180"
        >
          {lead}
        </p>
      )}
    </header>
  );
}
