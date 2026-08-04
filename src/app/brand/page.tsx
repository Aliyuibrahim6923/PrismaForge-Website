import type { Metadata } from "next";
import { ProductMark } from "@/components/brand/ProductMark";
import { PrismaforgeMark } from "@/components/brand/PrismaforgeMark";
import { Logo } from "@/components/layout/Logo";
import { Icon } from "@/components/ui/Icon";
import { productMarkNames, productMarks } from "@/lib/brand/product-marks";
import { siteConfig } from "@/lib/site";

/**
 * Internal brand sheet.
 *
 * Not part of the marketing narrative — it exists so anyone producing a
 * deck, a proposal or a product UI can see the whole logo family at once
 * and grab the exact file. Kept out of search results and the sitemap.
 */
export const metadata: Metadata = {
  title: "Brand assets",
  description: `Logo family and usage rules for ${siteConfig.name} platforms.`,
  robots: { index: false, follow: false },
};

const PALETTE = [
  { name: "Brand navy", hex: "#1b2a5c", use: "Letterforms, surfaces, body text on light" },
  { name: "Brand sky", hex: "#3b62d9", use: "Navy lifted — glows and accents on dark" },
  { name: "Brand orange", hex: "#f97316", use: "The accent: beams, CTAs, focus" },
  { name: "Brand amber", hex: "#fba94c", use: "Gradient starts, warm highlights" },
  { name: "Brand ember", hex: "#ea580c", use: "Gradient ends, pressed states" },
];

export default function BrandPage() {
  return (
    <div className="container-x py-32">
      <header className="max-w-3xl">
        <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
          Internal
        </span>
        <h1 className="mt-5 text-[length:var(--text-display-md)] font-semibold leading-[1.03]">
          Brand <span className="text-gradient">assets</span>
        </h1>
        <p className="mt-5 leading-relaxed text-muted">
          The Prismaforge mark and one logo for every platform. All artwork is
          generated from a single geometry file, so what you download here is
          exactly what the site renders.
        </p>
      </header>

      {/* Parent mark */}
      <section className="mt-20">
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-muted">
          Company mark
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {/* No `glass` here: it sets the `background` shorthand and would
              override these swatch backgrounds. */}
          <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-border-subtle bg-white p-12 text-[#1b2a5c]">
            <Logo />
            <PrismaforgeMark size={72} />
            <span className="text-[0.68rem] uppercase tracking-[0.16em] text-[#4c5a80]">
              On light — /brand/logo.svg
            </span>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-border-subtle bg-ink-950 p-12 text-ink-50">
            <Logo />
            <PrismaforgeMark size={72} />
            <span className="text-[0.68rem] uppercase tracking-[0.16em] text-ink-300">
              On dark — /brand/logo-inverse.svg
            </span>
          </div>
        </div>
      </section>

      {/* Product family */}
      <section className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-muted">
            Platform logos
          </h2>
          <p className="text-sm text-muted">
            One accent shape each — the element that moves.
          </p>
        </div>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-3xl border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
          {productMarkNames.map((name) => {
            const mark = productMarks[name];
            return (
              <li key={name} className="flex flex-col bg-surface p-7">
                <div className="flex items-start justify-between gap-4">
                  <ProductMark name={name} size={48} labelled />
                  <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                    {mark.short}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-base font-semibold leading-snug">
                  {mark.name}
                </h3>
                <p className="mt-2.5 flex-1 text-[0.82rem] leading-relaxed text-muted">
                  {mark.rationale}
                </p>

                <div className="mt-5 flex flex-wrap gap-2 border-t border-border-subtle pt-4 text-xs">
                  <a
                    href={`/brand/${name}.svg`}
                    download
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 text-muted transition-colors hover:border-brand-orange/50 hover:text-brand-orange"
                  >
                    <Icon name="arrowDown" size={12} />
                    Navy
                  </a>
                  <a
                    href={`/brand/${name}-inverse.svg`}
                    download
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle px-3 py-1.5 text-muted transition-colors hover:border-brand-orange/50 hover:text-brand-orange"
                  >
                    <Icon name="arrowDown" size={12} />
                    Reversed
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Both treatments side by side */}
      <section className="mt-20">
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-muted">
          The family, both ways up
        </h2>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <div className="flex flex-wrap items-center justify-center gap-8 rounded-3xl border border-border-subtle bg-white p-10 text-[#1b2a5c]">
            {productMarkNames.map((name) => (
              <ProductMark key={name} name={name} size={40} />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 rounded-3xl border border-border-subtle bg-ink-950 p-10 text-ink-50">
            {productMarkNames.map((name) => (
              <ProductMark key={name} name={name} size={40} />
            ))}
          </div>
        </div>
      </section>

      {/* Palette */}
      <section className="mt-20">
        <h2 className="font-display text-xs font-semibold uppercase tracking-[0.24em] text-muted">
          Palette
        </h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {PALETTE.map((colour) => (
            <li
              key={colour.hex}
              className="overflow-hidden rounded-2xl border border-border-subtle"
            >
              <span
                className="block h-20 w-full"
                style={{ background: colour.hex }}
              />
              <span className="block p-4">
                <span className="block text-sm font-medium">{colour.name}</span>
                <span className="mt-1 block font-mono text-xs text-muted">
                  {colour.hex}
                </span>
                <span className="mt-2 block text-[0.72rem] leading-relaxed text-muted">
                  {colour.use}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-6 max-w-2xl rounded-2xl border border-brand-orange/30 bg-brand-orange/5 p-5 text-sm leading-relaxed text-muted">
          <strong className="font-medium text-foreground">The navy rule:</strong>{" "}
          never use brand navy for a glow, gradient text, or any mark placed on
          a dark surface — it disappears into the background. Use brand sky
          where blue must read on dark, and reverse the letterform to{" "}
          <span className="font-mono text-xs">#f4f7fc</span>.
        </p>
      </section>
    </div>
  );
}
