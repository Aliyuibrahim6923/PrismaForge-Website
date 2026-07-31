"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useHasPointer } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees on each axis. */
  intensity?: number;
  /** Adds a cursor-following radial glow. */
  glare?: boolean;
}

/**
 * 3D tilt on hover, driven by CSS custom properties.
 *
 * Transforms are written straight to the element's style in the pointer
 * handler — no React state — so the interaction never triggers a render and
 * stays pinned to the compositor.
 */
export function TiltCard({
  children,
  className,
  intensity = 8,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const hasPointer = useHasPointer();
  const prefersReducedMotion = usePrefersReducedMotion();
  const enabled = hasPointer && !prefersReducedMotion;

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;

    ref.current.style.setProperty("--rx", `${(0.5 - py) * intensity * 2}deg`);
    ref.current.style.setProperty("--ry", `${(px - 0.5) * intensity * 2}deg`);
    ref.current.style.setProperty("--mx", `${px * 100}%`);
    ref.current.style.setProperty("--my", `${py * 100}%`);
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "group/tilt relative [transform-style:preserve-3d] [perspective:1200px]",
        "transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]",
        "[transform:perspective(1200px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))]",
        className,
      )}
    >
      {children}
      {glare && enabled && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/tilt:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(249,115,22,0.16), transparent 60%)",
          }}
        />
      )}
    </div>
  );
}
