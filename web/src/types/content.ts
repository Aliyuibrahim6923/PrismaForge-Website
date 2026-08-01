/**
 * Content model for the PrismaForge site.
 *
 * Every section of the site reads from a typed module in `src/lib/content`.
 * The shapes below intentionally mirror what a headless CMS (Sanity, Payload,
 * Contentful) would return, so swapping the static modules for a `fetch()`
 * is a drop-in change — see `src/lib/content/index.ts`.
 */

import type { IconName } from "@/components/ui/Icon";
import type { ProductMarkName } from "@/lib/brand/product-marks";

export interface Stat {
  /** Numeric portion — animated by the <Counter /> component. */
  value: number;
  /** Rendered after the number, e.g. "+" or "%". */
  suffix?: string;
  /** Rendered before the number, e.g. "₦". */
  prefix?: string;
  label: string;
}

export interface ServiceItem {
  name: string;
  description: string;
}

export interface Service {
  slug: string;
  /** "01" … "04" — the catalog's core-competency numbering. */
  index: string;
  title: string;
  tagline: string;
  description: string;
  icon: IconName;
  /** Expandable detail rows inside the service card. */
  items: ServiceItem[];
  /** Short capability chips shown on hover. */
  capabilities: string[];
  accent: string;
}

export type ProjectCategory =
  | "Education"
  | "Government"
  | "Enterprise"
  | "Branding";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  /** One-line summary used on the card. */
  summary: string;
  /** Long-form copy for the detail page. */
  overview: string;
  year: string;
  client: string;
  /** Tailwind gradient stops used for the generated cover art. */
  gradient: [string, string];
  /** Fallback glyph, used where the product logo would be too detailed. */
  icon: IconName;
  /** The platform's own logo — see `lib/brand/product-marks.ts`. */
  mark: ProductMarkName;
  /**
   * Real cover artwork in /public, e.g. "/work/lms.webp". Optional: when
   * absent the cover draws the illustrated product scene instead. Set this
   * to drop in screenshots or generated imagery with no code change.
   */
  image?: string;
  tags: string[];
  challenge: string;
  solution: string;
  outcomes: string[];
  features: ServiceItem[];
  stack: string[];
}

export interface Industry {
  name: string;
  description: string;
  icon: IconName;
  highlights: string[];
}

export interface Advantage {
  title: string;
  description: string;
  icon: IconName;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  /** Rendered as a monogram avatar — no image asset required. */
  initials: string;
  focus: string[];
  socials?: { label: string; href: string }[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  organisation: string;
  initials: string;
}

export interface EngagementModel {
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  featured?: boolean;
  cta: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  category: string;
}

export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}
