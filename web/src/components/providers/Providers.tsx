"use client";

import { ThemeProvider } from "next-themes";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { ScrollRevealProvider } from "./ScrollRevealProvider";

/**
 * Client provider stack, mounted once in the root layout so that
 * `layout.tsx` itself stays a server component.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      <SmoothScrollProvider>
        <ScrollRevealProvider>{children}</ScrollRevealProvider>
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
