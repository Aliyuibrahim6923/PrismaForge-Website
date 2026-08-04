# Prismaforge brand assets

Vector redraws of the Prismaforge logo, generated from a single set of path
coordinates in [`src/components/brand/PrismaforgeMark.tsx`](../../src/components/brand/PrismaforgeMark.tsx).
If you hold the original vector artwork, replace the paths in that one file
and every surface below updates with it.

## Files

| File | Use |
| --- | --- |
| `logo.svg` | Primary lockup (mark + wordmark) — light backgrounds |
| `logo-inverse.svg` | Reversed lockup — navy/dark backgrounds |
| `logo-mark.svg` | Mark only — avatars, tiles, stamps, anywhere under ~120px |

Generated automatically by the app (no files to maintain):

| Route | Output |
| --- | --- |
| `src/app/icon.svg` | Favicon |
| `src/app/apple-icon.tsx` | 180×180 iOS touch icon (PNG) |
| `src/app/opengraph-image.tsx` | 1200×630 social card (PNG) |
| `src/app/twitter-image.tsx` | Same card for X/Twitter |

## Platform logos

One logo per platform, all siblings of the company mark. Geometry lives in
[`src/lib/brand/product-marks.ts`](../../src/lib/brand/product-marks.ts);
browse them all at **`/brand`** (internal, not indexed).

| Platform | Download | The mark |
| --- | --- | --- |
| Learning Management System | `/brand/lms.svg` | Open book, bookmark down the spine |
| Student Management System | `/brand/sms.svg` | Roster of three records, first one active |
| E-TRACK E-Governance Suite | `/brand/etrack.svg` | Four modules, one under scrutiny |
| Land Administration System | `/brand/land.svg` | Cadastral subdivision, one parcel registered |
| Project Management & ERP | `/brand/erp.svg` | Three delivery lanes, a card in flight |
| Virtual Meeting Application | `/brand/meet.svg` | Screen and lens wedge |
| Distance Learning Platform | `/brand/distance.svg` | Globe crossed by a transmission band |
| Security Intelligence | `/brand/security.svg` | Shield holding a signal |
| Business & Digital Presence | `/brand/brand.svg` | Megaphone throwing signal bars |
| Prismaforge Academy | `/brand/academy.svg` | Mortarboard and tassel |

Append `-inverse` for the reversed version (`/brand/lms-inverse.svg`).

### The four family rules

1. Same 64×64 grid, same ~6-unit safe margin.
2. Same visual mass — forms are 8–12 units thick, matching the company
   mark's stem. Nothing hairline; nothing that dies at 16px.
3. Two tones only. Navy is the structure (the institution); orange is the
   single active element (the thing that moves, the thing being tracked).
4. **Exactly one accent shape per mark.** If everything is highlighted,
   nothing is.

Adding a platform? Add an entry to `product-marks.ts` following those
rules — the React component, the download route and the brand sheet all
pick it up automatically.

## Colours

| Token | Hex | Use |
| --- | --- | --- |
| Brand navy | `#1b2a5c` | Letterform, surfaces, body text on light |
| Brand sky | `#3b62d9` | Navy lifted for dark surfaces — glows, secondary accents |
| Brand orange | `#f97316` | The beam, CTAs, highlights, focus |
| Brand amber | `#fba94c` | Orange lightened — gradient starts, warm accents |
| Brand ember | `#ea580c` | Orange deepened — gradient ends, pressed states |

**The navy rule:** never use brand navy for glow, gradient text or any mark
on a dark surface — it disappears into the background. Use `brand-sky` where
blue must read on dark, and reverse the letterform to `#f4f7fc`.

## Clear space and minimum size

Keep clear space of at least the height of the P's stem-width (1/5 of the
mark height) on all sides. Minimum sizes: lockup 120px wide, mark 16px.

## Don'ts

- Don't recolour the beam triangle — it is the only orange in the mark.
- Don't stretch: the mark is drawn on a square 64×64 grid.
- Don't place the navy lockup on any surface darker than `#c7d0e4`; use
  `logo-inverse.svg` instead.
