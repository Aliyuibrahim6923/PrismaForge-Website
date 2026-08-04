"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

/**
 * Dark/light switch.
 *
 * Renders a fixed-size placeholder until mounted — the resolved theme is
 * unknown on the server, and swapping the icon after hydration would either
 * mismatch or shift the header layout.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} mode`
          : "Toggle colour theme"
      }
      className={cn(
        "group relative grid size-10 place-items-center rounded-full border border-border-subtle",
        "transition-colors duration-300 hover:border-brand-orange/50 hover:bg-foreground/5",
        className,
      )}
    >
      {mounted && (
        <>
          <Icon
            name="sun"
            size={17}
            className={cn(
              "absolute transition-all duration-500 [transition-timing-function:var(--ease-spring)]",
              isDark
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-50 opacity-0",
            )}
          />
          <Icon
            name="moon"
            size={17}
            className={cn(
              "absolute transition-all duration-500 [transition-timing-function:var(--ease-spring)]",
              isDark
                ? "rotate-90 scale-50 opacity-0"
                : "rotate-0 scale-100 opacity-100",
            )}
          />
        </>
      )}
    </button>
  );
}
