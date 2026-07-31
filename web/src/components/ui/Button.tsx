"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "./Icon";
import { useHasPointer } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_10px_40px_-12px_rgba(249,115,22,0.75)] hover:shadow-[0_18px_60px_-12px_rgba(249,115,22,0.85)]",
  secondary:
    "glass text-foreground hover:border-[color:var(--color-brand-orange)]/40",
  outline:
    "border border-border-subtle text-foreground hover:bg-foreground/5",
  ghost: "text-foreground/80 hover:text-foreground hover:bg-foreground/5",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-12 px-6 text-[0.95rem] gap-2",
  lg: "h-14 px-8 text-base gap-2.5",
};

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Cursor-following pull. Disabled automatically without a fine pointer. */
  magnetic?: boolean;
  "aria-label"?: string;
}

/**
 * The site's single button primitive.
 *
 * Renders a `next/link`, an anchor or a `<button>` depending on `href`, and
 * layers three micro-interactions: a magnetic pull toward the cursor, a
 * sweeping specular highlight, and an icon that slides on hover.
 */
export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  icon,
  className,
  type = "button",
  disabled,
  magnetic = true,
  ...rest
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const hasPointer = useHasPointer();
  const prefersReducedMotion = usePrefersReducedMotion();
  const magnetEnabled = magnetic && hasPointer && !prefersReducedMotion;

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!magnetEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    // 0.28 keeps the pull noticeable without detaching from the label.
    ref.current.style.transform = `translate3d(${x * 0.28}px, ${y * 0.34}px, 0)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0, 0, 0)";
  };

  const classes = cn(
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium",
    "transition-[transform,box-shadow,background-color,border-color,color] duration-500 [transition-timing-function:var(--ease-out-expo)]",
    "will-change-transform disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );

  const inner = (
    <>
      {/* Specular sweep */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-full"
      />
      <span className="relative z-10 flex items-center gap-[inherit]">
        {children}
        {icon && (
          <Icon
            name={icon}
            size={size === "lg" ? 19 : 17}
            className="transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1"
          />
        )}
      </span>
    </>
  );

  const shared = {
    className: classes,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
    ...rest,
  };

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (external) {
      return (
        <a
          {...shared}
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link {...shared} ref={ref as React.Ref<HTMLAnchorElement>} href={href}>
        {inner}
      </Link>
    );
  }

  return (
    <button
      {...shared}
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
    >
      {inner}
    </button>
  );
}
