# Prismaforge — corporate website

An immersive marketing site for Prismaforge, built on Next.js 15 with a
WebGL hero, GSAP scroll choreography and a fully typed content layer.

All copy is sourced from the **Prismaforge Company Catalog 2026** — see
[Content](#content) for the parts that are still placeholders.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run typecheck
```

> Run `npm run build` and `npm run dev` one at a time — they share the
> `.next` directory, and a build during a dev session will break it
> (`rm -rf .next` to recover).

## Stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 15 (App Router, React 19, TypeScript strict) |
| Styling | Tailwind CSS v4 — CSS-first config in `src/app/globals.css` |
| 3D | Three.js + React Three Fiber v9 + Drei |
| Animation | GSAP + ScrollTrigger (scroll), Motion (component-level) |
| Smooth scroll | Lenis, driven by GSAP's ticker |
| Theming | next-themes (dark default, light supported) |

## Structure

```
src/
├─ app/                     Routes, metadata, generated icons & OG cards
│  ├─ page.tsx              Home — composes every section in order
│  ├─ work/[slug]/          Project detail pages (static, one per project)
│  ├─ api/contact/          Contact endpoint (validated + rate limited)
│  ├─ api/newsletter/       Newsletter endpoint
│  ├─ icon.svg              Favicon
│  ├─ apple-icon.tsx        180×180 PNG, generated
│  ├─ opengraph-image.tsx   1200×630 social card, generated
│  └─ globals.css           ← the design system lives here
├─ components/
│  ├─ sections/             One file per page section
│  ├─ three/                WebGL scene (code-split, never SSR'd)
│  ├─ layout/               Nav, footer, cursor, preloader, consent, FAB
│  ├─ providers/            Lenis, scroll-reveal, theme
│  ├─ brand/                Logo geometry — single source of truth
│  └─ ui/                   Button, RevealText, Counter, TiltCard, …
├─ lib/
│  ├─ content/              ← all site copy, typed
│  ├─ site.ts               Contact details, nav, socials
│  ├─ seo.ts                Metadata builder + JSON-LD
│  └─ analytics.ts          Consent-gated analytics
└─ types/content.ts         Content model
```

## Content

Every section reads from `src/lib/content/`, never from hard-coded JSX.
`src/lib/content/index.ts` is the CMS seam: replace its re-exports with
async loaders and nothing else needs to change.

### The marketing slot

`src/lib/content/spotlight.ts` drives the **Product Spotlight** section
directly below the hero. To promote a different product:

- reorder `spotlightItems` — the first entry shows first;
- change `projectSlug` to any slug in `projects.ts` (artwork and the detail
  link follow automatically);
- change `badge` (`New`, `Trending`, `Now shipping`, `Featured`, `In pilot`);
- delete entries you don't want — a single entry renders with no tab rail;
- set `spotlight.autoRotateSeconds` to `0` to stop the rotation.

Tab changes and CTA clicks fire `spotlight_select` / `spotlight_cta`
analytics events, so you can see which product actually earns attention.

### ⚠️ Placeholder content to replace before launch

The catalog doesn't cover these, so they are structural placeholders —
**not** real people or real client statements:

- `src/lib/content/people.ts` — team members and testimonials
- `src/lib/content/faq.ts` → `news` — the insights posts
- `src/lib/content/industries.ts` → `engagementModels` — `price` fields say
  "Fixed scope" / "Retainer" rather than figures; add real numbers only
  when a public rate card exists.

Project `outcomes` describe capabilities, not measured client results. Add
measured results (and named clients) as approvals come through.

## Brand

Navy `#1b2a5c` + orange `#f97316`, from the Prismaforge logo. Tokens are
defined once in `src/app/globals.css`; the logo geometry once in
`src/components/brand/PrismaforgeMark.tsx`. See
[`public/brand/README.md`](public/brand/README.md) for asset files, usage
rules and the **navy rule** (never use brand navy for glow, gradient text,
or any mark on a dark surface — it disappears).

## Configuration

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, JSON-LD |
| `NEXT_PUBLIC_GA_ID` | Analytics ID. Without it, analytics no-op entirely |

Both API routes log the submission and return success — wire your provider
at the single `TODO` in each file (`src/app/api/contact/route.ts`,
`src/app/api/newsletter/route.ts`).

## Performance

### The device budget

`src/lib/device-budget.ts` decides whether a visitor should pay for the
expensive parts. Phones, low-power devices, data-saver connections and
reduced-motion users get a lean build of the same site:

| | Phone (< 1024px) | Desktop |
| --- | --- | --- |
| Three.js / R3F / drei | **not downloaded** | loaded when idle |
| JS transferred | ~259 kB | ~509 kB |
| Loading curtain | skipped | shown once per session |

That single gate is the largest mobile win available here — the 3D stack is
roughly **250 kB of JavaScript plus the GPU and battery cost of a live
canvas**, and on a narrow viewport the prism sits behind the copy scrim
where it barely reads anyway.

### LCP is not allowed to wait for an animation

The hero paragraph is the LCP element on phones. It originally faded in
from `opacity: 0` after a 0.85s delay, and an element that is transparent
has not been "painted" — measured **LCP 2296 ms**.

Two fixes: the entrance stagger was cut to a tighter schedule (see
`ENTRANCE` in `Hero.tsx`), and the LCP paragraph now animates position
only, never opacity. **LCP now lands on the same frame as FCP.** Keep it
that way — if you add a fade to hero copy, you are adding that duration
directly to LCP.

Other measures: CLS ~0 (reveals use transform, counters use `tabular-nums`),
fonts self-hosted and preloaded by `next/font`, the map iframe is lazy, and
`PerformanceMonitor` degrades resolution rather than dropping frames.

## Responsiveness

Verified by measurement at 375px, 390px and 768px: no horizontal overflow,
and every interactive control meets the 44px touch target (the decorative
blur and hover-wash elements that extend past the viewport are contained by
`overflow-x: clip` on `body` — leave that rule in place).

## Accessibility

- `prefers-reduced-motion` disables Lenis, GSAP reveals, the custom cursor,
  the preloader, carousel autoplay and all 3D motion. The site stays fully
  usable and readable.
- Every section is real semantic HTML; the canvas is decorative and
  `aria-hidden`. Nothing meaningful depends on WebGL loading.
- Visible focus rings, a skip link, and keyboard support on the carousel.
