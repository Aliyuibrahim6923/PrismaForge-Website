"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

/** Route-level error boundary. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with your error reporter (Sentry, Highlight) when available.
    console.error("[route error]", error);
  }, [error]);

  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
        Something broke
      </p>
      <h1 className="mt-6 text-[length:var(--text-display-sm)] font-semibold">
        We hit an unexpected error.
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted">
        The issue has been logged. Try again, or get in touch if it persists.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={reset} size="lg" icon="arrowRight">
          Try again
        </Button>
        <Button href="/" size="lg" variant="secondary">
          Back home
        </Button>
      </div>
    </section>
  );
}
