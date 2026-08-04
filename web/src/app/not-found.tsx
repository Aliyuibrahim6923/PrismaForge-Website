import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 -z-10 size-[32rem] -translate-x-1/2 rounded-full bg-brand-sky/15 blur-[140px]"
      />

      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">
        Error 404
      </p>
      <h1 className="mt-6 text-[length:var(--text-display-md)] font-semibold leading-tight">
        This beam didn&apos;t <span className="text-gradient">refract.</span>
      </h1>
      <p className="mt-5 max-w-md text-muted">
        The page you&apos;re looking for has moved or never existed. Let&apos;s
        get you back to something solid.
      </p>

      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Button href="/" size="lg" icon="arrowRight">
          Back home
        </Button>
        <Button href="/#contact" size="lg" variant="secondary">
          Contact us
        </Button>
      </div>

      <Link
        href="/#work"
        className="mt-8 text-sm text-muted underline decoration-brand-orange/40 underline-offset-4 transition-colors hover:text-foreground"
      >
        Or browse our platforms
      </Link>
    </section>
  );
}
