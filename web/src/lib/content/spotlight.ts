import type { IconName } from "@/components/ui/Icon";

/**
 * PRODUCT SPOTLIGHT — the marketing slot.
 *
 * This is the one section built to be changed often. To promote a different
 * product, edit `spotlightItems` below:
 *
 *   · Reorder the array — the first entry is shown first.
 *   · Change `projectSlug` to any slug in `projects.ts`; the cover artwork
 *     and detail-page link follow automatically.
 *   · Change `badge` to reflect the moment ("New", "Trending", …).
 *   · Remove entries you don't want on the site — one entry renders as a
 *     single feature with no tab rail.
 *
 * Nothing else in the codebase needs to change to run a new campaign.
 */

export type SpotlightBadge =
  | "New"
  | "Trending"
  | "Now shipping"
  | "Featured"
  | "In pilot";

export interface SpotlightItem {
  /** Must match a `slug` in `projects.ts` — supplies artwork and the link. */
  projectSlug: string;
  /** Short label for the tab rail. */
  tabLabel: string;
  badge: SpotlightBadge;
  /** Marketing headline — overrides the project's own title. */
  headline: string;
  /** The pitch: one paragraph, benefit-first. */
  pitch: string;
  /** Three or four proof points. Keep them concrete. */
  bullets: string[];
  /** Chips rendered over the artwork. Facts, not invented metrics. */
  highlights: { label: string; value: string; icon: IconName }[];
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export const spotlight = {
  eyebrow: "Product spotlight",
  title: "What we're shipping right now.",
  lead: "The platforms drawing the most interest from institutions this quarter — see one working against your own processes.",
  /** Seconds between automatic tab changes. Set to 0 to disable rotation. */
  autoRotateSeconds: 9,
} as const;

export const spotlightItems: SpotlightItem[] = [
  {
    projectSlug: "e-track-governance-suite",
    tabLabel: "E-TRACK",
    badge: "Trending",
    headline: "Trace every naira from budget line to project site.",
    pitch:
      "E-TRACK is the e-governance suite governing bodies are adopting fastest — four modules over one data model, so finance, projects, procurement and decisions stop living in separate silos and start answering each other.",
    bullets: [
      "E-Finance Track: allocations, releases and expenditure in real time",
      "E-Project Track: every project geo-referenced and progress-mapped",
      "E-Procurement Track: tender to award, auditable by design",
      "E-Meetings: minutes and resolutions linked to what they govern",
    ],
    highlights: [
      { label: "Integrated modules", value: "4", icon: "layers" },
      { label: "Project tracking", value: "GIS-enabled", icon: "map" },
      { label: "Audit trail", value: "Built in", icon: "shield" },
    ],
    primaryCta: { label: "Book a walkthrough", href: "#contact" },
    secondaryCta: {
      label: "Explore E-TRACK",
      href: "/work/e-track-governance-suite",
    },
  },
  {
    projectSlug: "learning-management-system",
    tabLabel: "LMS",
    badge: "New",
    headline: "Run an accredited programme online, end to end.",
    pitch:
      "Course building, assessment integrity and live classrooms in a single platform — so institutions stop stitching together five tools and start issuing certificates the moment a learner earns one.",
    bullets: [
      "Drag-and-drop course builder — no technical staff to publish",
      "Automated assessments with plagiarism detection",
      "Live classrooms via Zoom and Google Meet, attached to the course",
      "Rule-based certificate generation and verification",
    ],
    highlights: [
      { label: "Delivery modes", value: "Live + self-paced", icon: "video" },
      { label: "Marking", value: "Automated", icon: "check" },
      { label: "Certification", value: "Rule-driven", icon: "graduation" },
    ],
    primaryCta: { label: "Request a demo", href: "#contact" },
    secondaryCta: {
      label: "Explore the LMS",
      href: "/work/learning-management-system",
    },
  },
  {
    projectSlug: "land-administration-system",
    tabLabel: "Land Administration",
    badge: "Featured",
    headline: "Make land ownership provable, not contested.",
    pitch:
      "A digital registry, cadastral management and property administration in one system — cutting the disputes that paper records and fragmented survey data create.",
    bullets: [
      "One authoritative digital record of parcels and ownership",
      "Cadastral boundaries maintained spatially, not on paper",
      "Transfers and applications through auditable workflows",
      "Verifiable searches for citizens and institutions",
    ],
    highlights: [
      { label: "Registry", value: "Fully digital", icon: "database" },
      { label: "Boundaries", value: "Spatial", icon: "map" },
      { label: "Coverage", value: "Statewide", icon: "landmark" },
    ],
    primaryCta: { label: "Talk to us", href: "#contact" },
    secondaryCta: {
      label: "Explore the platform",
      href: "/work/land-administration-system",
    },
  },
];
