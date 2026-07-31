/**
 * PRODUCT MARK SYSTEM
 *
 * One logo per Prismaforge platform, drawn as siblings of the parent
 * Prismaforge mark so the family reads as one company's product line.
 *
 * The rules every mark follows:
 *
 *   1. Same 64×64 grid, same ~6-unit safe margin.
 *   2. Same visual mass — forms are 8–12 units thick, matching the parent
 *      mark's stem. Nothing hairline, nothing that dies at 16px.
 *   3. Two tones only. `letter` is the structure (the institution) and
 *      inherits `currentColor` — navy on light, near-white on dark.
 *      `accent` is the single active element (the thing that moves, the
 *      thing being tracked) and is always brand orange.
 *   4. Exactly one accent shape per mark. If everything is highlighted,
 *      nothing is.
 *
 * Geometry lives here and nowhere else: the React component, the
 * downloadable SVG route and the brand sheet all render from this file.
 */

export interface MarkRect {
  kind: "rect";
  x: number;
  y: number;
  w: number;
  h: number;
  /** Corner radius. */
  r?: number;
  tone: "letter" | "accent";
}

export interface MarkPath {
  kind: "path";
  d: string;
  tone: "letter" | "accent";
  /** Treat inner sub-paths as holes rather than filled shapes. */
  evenodd?: boolean;
}

export type MarkShape = MarkRect | MarkPath;

export interface ProductMarkDef {
  /** Full product name, as used in the catalog. */
  name: string;
  /** Short label for tight spaces. */
  short: string;
  /** What the mark depicts, and why — for whoever maintains this next. */
  rationale: string;
  shapes: MarkShape[];
}

/** Circle expressed as a path, so every shape is either a rect or a path. */
const circle = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy} a${r} ${r} 0 1 0 ${r * 2} 0 a${r} ${r} 0 1 0 ${-r * 2} 0 Z`;

/**
 * Declared explicitly rather than inferred from the object below: an
 * inferred key type would also infer each entry's exact shape list, which
 * drops optional fields like `evenodd` from the union.
 */
export type ProductMarkName =
  | "lms"
  | "sms"
  | "etrack"
  | "land"
  | "erp"
  | "meet"
  | "distance"
  | "security"
  | "brand"
  | "academy";

export const productMarks: Record<ProductMarkName, ProductMarkDef> = {
  lms: {
    name: "Learning Management System",
    short: "LMS",
    rationale:
      "An open book with a bookmark down the spine — the accent marks the learner's place, the one thing that moves as a course progresses.",
    shapes: [
      { kind: "path", d: "M6 15 L29 10 V51 L6 56 Z", tone: "letter" },
      { kind: "path", d: "M58 15 L35 10 V51 L58 56 Z", tone: "letter" },
      { kind: "path", d: "M28 6 H36 V34 L32 29 L28 34 Z", tone: "accent" },
    ],
  },

  sms: {
    name: "Student Management System",
    short: "SMS",
    rationale:
      "A roster: three enrolled records, the first one active. Reads as admissions and attendance rather than as generic 'people'.",
    shapes: [
      { kind: "path", d: circle(14, 17, 6), tone: "accent" },
      { kind: "rect", x: 26, y: 13, w: 32, h: 8, r: 4, tone: "letter" },
      { kind: "path", d: circle(14, 32, 6), tone: "letter" },
      { kind: "rect", x: 26, y: 28, w: 32, h: 8, r: 4, tone: "letter" },
      { kind: "path", d: circle(14, 47, 6), tone: "letter" },
      { kind: "rect", x: 26, y: 43, w: 32, h: 8, r: 4, tone: "letter" },
    ],
  },

  etrack: {
    name: "E-TRACK E-Governance Suite",
    short: "E-TRACK",
    rationale:
      "The four modules — Finance, Project, Procurement, Meetings — as one grid, with the module currently under scrutiny lit. Uniform blocks say 'one data model'.",
    shapes: [
      { kind: "rect", x: 8, y: 8, w: 21, h: 21, r: 5, tone: "letter" },
      { kind: "rect", x: 35, y: 8, w: 21, h: 21, r: 5, tone: "letter" },
      { kind: "rect", x: 8, y: 35, w: 21, h: 21, r: 5, tone: "letter" },
      { kind: "rect", x: 35, y: 35, w: 21, h: 21, r: 5, tone: "accent" },
    ],
  },

  land: {
    name: "Land Administration System",
    short: "Land",
    rationale:
      "A cadastral subdivision — parcels of unequal size, one registered. Deliberately irregular so it never reads as the E-TRACK grid.",
    shapes: [
      { kind: "rect", x: 6, y: 6, w: 24, h: 25, r: 3, tone: "letter" },
      { kind: "rect", x: 34, y: 6, w: 24, h: 16, r: 3, tone: "letter" },
      { kind: "rect", x: 34, y: 26, w: 24, h: 15, r: 3, tone: "accent" },
      { kind: "rect", x: 6, y: 35, w: 24, h: 23, r: 3, tone: "letter" },
      { kind: "rect", x: 34, y: 45, w: 24, h: 13, r: 3, tone: "letter" },
    ],
  },

  erp: {
    name: "Project Management & ERP System",
    short: "ERP",
    rationale:
      "Three delivery lanes with a card in flight — planning and operations in the same frame, which is exactly what the platform bridges.",
    shapes: [
      { kind: "rect", x: 6, y: 9, w: 15, h: 46, r: 4, tone: "letter" },
      { kind: "rect", x: 24.5, y: 9, w: 15, h: 46, r: 4, tone: "letter" },
      { kind: "rect", x: 43, y: 9, w: 15, h: 46, r: 4, tone: "letter" },
      { kind: "rect", x: 27.5, y: 15, w: 9, h: 13, r: 2.5, tone: "accent" },
    ],
  },

  meet: {
    name: "Virtual Meeting Application",
    short: "Meet",
    rationale:
      "Screen plus lens wedge. The accent is the optic — the same beam geometry as the parent mark, rotated into a camera.",
    shapes: [
      { kind: "rect", x: 5, y: 18, w: 35, h: 28, r: 7, tone: "letter" },
      { kind: "path", d: "M45 32 L59 21 V43 Z", tone: "accent" },
    ],
  },

  distance: {
    name: "Distance Learning Platform",
    short: "Distance",
    rationale:
      "A globe crossed by a transmission band — quality teaching reaching past the campus it came from.",
    shapes: [
      {
        kind: "path",
        d: `${circle(32, 32, 23)} ${circle(32, 32, 15)}`,
        tone: "letter",
        evenodd: true,
      },
      { kind: "rect", x: 6, y: 28, w: 52, h: 8, r: 4, tone: "accent" },
    ],
  },

  security: {
    name: "Security Intelligence Software",
    short: "Security",
    rationale:
      "A shield holding a signal. The accent is the thing found in the noise — the product's actual output, not the protection around it.",
    shapes: [
      {
        kind: "path",
        d: "M32 5 L55 14 V32 C55 45.5 44.5 55 32 59 C19.5 55 9 45.5 9 32 V14 Z",
        tone: "letter",
      },
      { kind: "path", d: "M32 19 L44 41 H20 Z", tone: "accent" },
    ],
  },

  brand: {
    name: "Business Solutions & Digital Presence",
    short: "Brand",
    rationale:
      "A megaphone throwing two signal bars — attention leaving the organisation and landing somewhere, which is what the practice sells.",
    shapes: [
      { kind: "path", d: "M6 25 H21 L40 12 V52 L21 39 H6 Z", tone: "letter" },
      { kind: "rect", x: 46, y: 22, w: 5, h: 20, r: 2.5, tone: "accent" },
      { kind: "rect", x: 55, y: 27, w: 5, h: 10, r: 2.5, tone: "accent" },
    ],
  },

  academy: {
    name: "Prismaforge Academy",
    short: "Academy",
    rationale:
      "Mortarboard and tassel. The accent is the tassel — the part that only moves when someone actually finishes.",
    shapes: [
      { kind: "path", d: "M32 9 L60 21 L32 33 L4 21 Z", tone: "letter" },
      {
        kind: "path",
        d: "M15 26 V41 C15 41 22 49 32 49 C42 49 49 41 49 41 V26 L32 33 Z",
        tone: "letter",
      },
      { kind: "rect", x: 54.5, y: 23, w: 3, h: 15, r: 1.5, tone: "accent" },
      { kind: "path", d: circle(56, 41, 3.5), tone: "accent" },
    ],
  },
};

export const productMarkNames = Object.keys(productMarks) as ProductMarkName[];

/**
 * Escape text destined for XML content or an attribute value.
 *
 * Not optional: product names like "Project Management & ERP System"
 * contain an ampersand, and a raw `&` makes the SVG malformed XML — the
 * file still downloads and still serves 200, but every image decoder
 * refuses to render it, so the logo silently disappears.
 */
const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/**
 * Serialise a mark to a standalone SVG document.
 *
 * Used by the download route so the files handed to designers, printers
 * and third parties are generated from the same geometry the site renders
 * — they can never drift.
 */
export function renderMarkSvg(
  name: ProductMarkName,
  {
    letterColor = "#1b2a5c",
    accentColor = "#f97316",
    size = 64,
  }: { letterColor?: string; accentColor?: string; size?: number } = {},
) {
  const mark = productMarks[name];

  const body = mark.shapes
    .map((shape) => {
      const fill = shape.tone === "accent" ? accentColor : letterColor;
      if (shape.kind === "rect") {
        const radius = shape.r ? ` rx="${shape.r}"` : "";
        return `  <rect x="${shape.x}" y="${shape.y}" width="${shape.w}" height="${shape.h}"${radius} fill="${fill}"/>`;
      }
      const rule = shape.evenodd ? ' fill-rule="evenodd"' : "";
      return `  <path d="${shape.d}"${rule} fill="${fill}"/>`;
    })
    .join("\n");

  const label = escapeXml(mark.name);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}" role="img" aria-label="${label}">
  <title>${label}</title>
${body}
</svg>
`;
}
