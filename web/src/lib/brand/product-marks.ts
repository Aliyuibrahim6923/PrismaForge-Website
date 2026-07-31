/**
 * PRODUCT MARK SYSTEM
 *
 * One logo per Prismaforge platform, drawn as a family so the set reads as
 * one company's product line rather than ten unrelated icons.
 *
 * The rules every mark follows:
 *
 *   1. Same 64×64 grid, same ~6-unit safe margin.
 *   2. One consistent line weight (`STROKE`) for every outlined form, so
 *      no mark looks heavier or flimsier than its siblings.
 *   3. Two tones only. `letter` is the structure (the institution) and
 *      inherits `currentColor` — navy on light, near-white on dark.
 *      `accent` is the single active element (the thing that moves, the
 *      thing being tracked) and is always brand orange.
 *   4. One accent idea per mark. If everything is highlighted, nothing is.
 *
 * Geometry lives here and nowhere else: the React component, the
 * downloadable SVG route and the brand sheet all render from this file.
 */

/** Shared outline weight. One number governs the whole family's texture. */
export const STROKE = 3.4;

interface ShapeBase {
  tone: "letter" | "accent";
  /** Outline weight. Omit for a solid filled shape. */
  stroke?: number;
  /** Raw SVG transform, e.g. `rotate(-20 32 32)`. */
  transform?: string;
}

export interface MarkRect extends ShapeBase {
  kind: "rect";
  x: number;
  y: number;
  w: number;
  h: number;
  /** Corner radius. */
  r?: number;
}

export interface MarkPath extends ShapeBase {
  kind: "path";
  d: string;
  /** Treat inner sub-paths as holes rather than filled shapes. */
  evenodd?: boolean;
}

export interface MarkCircle extends ShapeBase {
  kind: "circle";
  cx: number;
  cy: number;
  r: number;
}

export interface MarkEllipse extends ShapeBase {
  kind: "ellipse";
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}

export type MarkShape = MarkRect | MarkPath | MarkCircle | MarkEllipse;

export interface ProductMarkDef {
  /** Full product name, as used in the catalog. */
  name: string;
  /** Short label for tight spaces. */
  short: string;
  /** What the mark depicts, and why — for whoever maintains this next. */
  rationale: string;
  shapes: MarkShape[];
}

/**
 * Declared explicitly rather than inferred from the object below: an
 * inferred key type would also infer each entry's exact shape list, which
 * drops optional fields like `stroke` from the union.
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
      "An open book with a ribbon down the spine — the accent marks the learner's place, the one thing that moves as a course progresses.",
    shapes: [
      // Left and right pages, drawn as open outlines meeting at the spine.
      {
        kind: "path",
        d: "M32 17 C25 11.5 15 10 7.5 11 V46 C15 45 25 46.5 32 52",
        tone: "letter",
        stroke: STROKE,
      },
      {
        kind: "path",
        d: "M32 17 C39 11.5 49 10 56.5 11 V46 C49 45 39 46.5 32 52",
        tone: "letter",
        stroke: STROKE,
      },
      { kind: "path", d: "M32 17 V52", tone: "letter", stroke: STROKE },
      // Bookmark ribbon, notched at the foot.
      {
        kind: "path",
        d: "M27.5 12 H36.5 V35 L32 30.5 L27.5 35 Z",
        tone: "accent",
      },
    ],
  },

  sms: {
    name: "Student Management System",
    short: "SMS",
    rationale:
      "A roster of enrolled records, the first one active. Reads as admissions and attendance rather than as generic 'people'.",
    shapes: [
      // Row 1 — the active record.
      { kind: "rect", x: 7, y: 11, w: 50, h: 14, r: 7, tone: "letter", stroke: STROKE },
      { kind: "circle", cx: 18, cy: 18, r: 4.2, tone: "accent" },
      { kind: "rect", x: 28, y: 16.5, w: 21, h: 3, r: 1.5, tone: "letter" },
      // Row 2
      { kind: "rect", x: 7, y: 27.5, w: 50, h: 14, r: 7, tone: "letter", stroke: STROKE },
      { kind: "circle", cx: 18, cy: 34.5, r: 4.2, tone: "letter" },
      { kind: "rect", x: 28, y: 33, w: 21, h: 3, r: 1.5, tone: "letter" },
      // Row 3
      { kind: "rect", x: 7, y: 44, w: 50, h: 14, r: 7, tone: "letter", stroke: STROKE },
      { kind: "circle", cx: 18, cy: 51, r: 4.2, tone: "letter" },
      { kind: "rect", x: 28, y: 49.5, w: 21, h: 3, r: 1.5, tone: "letter" },
    ],
  },

  etrack: {
    name: "E-TRACK E-Governance Suite",
    short: "E-TRACK",
    rationale:
      "The four modules — Finance, Project, Procurement, Meetings — as one grid, with the module under scrutiny lit. Uniform blocks say 'one data model'.",
    shapes: [
      { kind: "rect", x: 8, y: 8, w: 22, h: 22, r: 6, tone: "letter" },
      { kind: "rect", x: 34, y: 8, w: 22, h: 22, r: 6, tone: "accent" },
      { kind: "rect", x: 8, y: 34, w: 22, h: 22, r: 6, tone: "letter" },
      { kind: "rect", x: 34, y: 34, w: 22, h: 22, r: 6, tone: "letter" },
    ],
  },

  land: {
    name: "Land Administration System",
    short: "Land",
    rationale:
      "A cadastral sheet: irregular parcel boundaries inside a survey frame, with one parcel registered and pinned.",
    shapes: [
      { kind: "rect", x: 7, y: 7, w: 50, h: 50, r: 2, tone: "letter", stroke: STROKE },
      // Parcel boundaries — deliberately irregular, so it never reads as
      // the E-TRACK grid.
      { kind: "path", d: "M7 22 L26 17 L44 27 L57 23", tone: "letter", stroke: STROKE },
      { kind: "path", d: "M26 17 L29 7", tone: "letter", stroke: STROKE },
      { kind: "path", d: "M44 27 L47 57", tone: "letter", stroke: STROKE },
      { kind: "path", d: "M7 44 L27 41", tone: "letter", stroke: STROKE },
      // The registered parcel.
      { kind: "path", d: "M28 23 L44 27 L45.6 41 L29.5 38 Z", tone: "accent" },
      // Pin, in the structure tone so it reads out of the orange parcel.
      {
        kind: "path",
        d: "M37 26.5 A4 4 0 0 0 33 30.5 C33 33.4 37 37.5 37 37.5 C37 37.5 41 33.4 41 30.5 A4 4 0 0 0 37 26.5 Z",
        tone: "letter",
      },
    ],
  },

  erp: {
    name: "Project Management & ERP System",
    short: "ERP",
    rationale:
      "A schedule of work in flight — three tracks running right, the one in delivery lit. Planning and operations in the same frame.",
    // Staggered bar lengths, so it reads as a schedule rather than three
    // identical arrows. The accent track is the longest — the one in flight.
    shapes: [
      { kind: "rect", x: 8, y: 13, w: 26, h: 8, r: 4, tone: "letter" },
      { kind: "path", d: "M37 11 L50 17 L37 23 Z", tone: "letter" },
      { kind: "rect", x: 8, y: 28, w: 34, h: 8, r: 4, tone: "accent" },
      { kind: "path", d: "M45 26 L58 32 L45 38 Z", tone: "accent" },
      { kind: "rect", x: 8, y: 43, w: 21, h: 8, r: 4, tone: "letter" },
      { kind: "path", d: "M32 41 L45 47 L32 53 Z", tone: "letter" },
    ],
  },

  meet: {
    name: "Virtual Meeting Application",
    short: "Meet",
    rationale:
      "A screen holding a camera. The accent is the lens wedge — the same beam geometry as the parent Prismaforge mark, turned into an optic.",
    shapes: [
      { kind: "rect", x: 6, y: 10, w: 52, h: 37, r: 6, tone: "letter", stroke: STROKE },
      { kind: "path", d: "M32 47 V54", tone: "letter", stroke: STROKE },
      { kind: "path", d: "M23 54 H41", tone: "letter", stroke: STROKE },
      { kind: "rect", x: 16, y: 22.5, w: 17, h: 13, r: 3.5, tone: "letter" },
      { kind: "path", d: "M35 25 L47 20.5 V37.5 L35 33 Z", tone: "accent" },
    ],
  },

  distance: {
    name: "Distance Learning Platform",
    short: "Distance",
    rationale:
      "A globe with something in orbit around it — quality teaching reaching past the campus it came from.",
    shapes: [
      { kind: "circle", cx: 32, cy: 32, r: 20, tone: "letter", stroke: STROKE },
      { kind: "path", d: "M12 32 H52", tone: "letter", stroke: STROKE },
      {
        kind: "path",
        d: "M32 12 C24 18 24 46 32 52 C40 46 40 18 32 12 Z",
        tone: "letter",
        stroke: STROKE,
      },
      // Orbit, tilted. Drawn after the globe so it reads as passing in front.
      {
        kind: "ellipse",
        cx: 32,
        cy: 32,
        rx: 27,
        ry: 9.5,
        tone: "accent",
        stroke: STROKE,
        transform: "rotate(-22 32 32)",
      },
      { kind: "circle", cx: 51, cy: 23.5, r: 3.6, tone: "accent" },
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
        d: "M32 5.5 L54 14 V32 C54 45 44.5 54.5 32 58.5 C19.5 54.5 10 45 10 32 V14 Z",
        tone: "letter",
        stroke: STROKE,
      },
      { kind: "path", d: "M21.5 30 C27.5 24.5 36.5 24.5 42.5 30", tone: "accent", stroke: STROKE },
      { kind: "path", d: "M26.5 36 C29.5 33 34.5 33 37.5 36", tone: "accent", stroke: STROKE },
      { kind: "circle", cx: 32, cy: 42.5, r: 2.8, tone: "accent" },
    ],
  },

  brand: {
    name: "Business Solutions & Digital Presence",
    short: "Brand",
    rationale:
      "A megaphone throwing signal — attention leaving the organisation and landing somewhere, which is what the practice sells.",
    shapes: [
      { kind: "rect", x: 5, y: 25, w: 8, h: 14, r: 3, tone: "letter" },
      { kind: "path", d: "M12 24 L34 13 V51 L12 40 Z", tone: "letter" },
      { kind: "rect", x: 41, y: 20, w: 4.5, h: 24, r: 2.25, tone: "accent" },
      { kind: "rect", x: 49, y: 25, w: 4.5, h: 14, r: 2.25, tone: "accent" },
      { kind: "rect", x: 57, y: 29, w: 4.5, h: 6, r: 2.25, tone: "accent" },
    ],
  },

  academy: {
    name: "Prismaforge Academy",
    short: "Academy",
    rationale:
      "Mortarboard and tassel. The accent is the tassel — the part that only moves when someone actually finishes.",
    shapes: [
      { kind: "path", d: "M32 8 L60 20 L32 32 L4 20 Z", tone: "letter" },
      {
        kind: "path",
        d: "M16 25.5 V40 C16 40 22 47.5 32 47.5 C42 47.5 48 40 48 40 V25.5 L32 32 Z",
        tone: "letter",
      },
      {
        kind: "path",
        d: "M46 23 C52 26 53 30 53 39",
        tone: "accent",
        stroke: STROKE,
      },
      { kind: "circle", cx: 53, cy: 43, r: 4, tone: "accent" },
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

/** Shared paint attributes, so both renderers treat a shape identically. */
function paintAttrs(shape: MarkShape, colour: string) {
  return shape.stroke
    ? {
        fill: "none",
        stroke: colour,
        strokeWidth: shape.stroke,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
      }
    : { fill: colour };
}

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
      const colour = shape.tone === "accent" ? accentColor : letterColor;
      const paint = shape.stroke
        ? `fill="none" stroke="${colour}" stroke-width="${shape.stroke}" stroke-linecap="round" stroke-linejoin="round"`
        : `fill="${colour}"`;
      const transform = shape.transform
        ? ` transform="${escapeXml(shape.transform)}"`
        : "";

      switch (shape.kind) {
        case "rect": {
          const radius = shape.r ? ` rx="${shape.r}"` : "";
          return `  <rect x="${shape.x}" y="${shape.y}" width="${shape.w}" height="${shape.h}"${radius} ${paint}${transform}/>`;
        }
        case "circle":
          return `  <circle cx="${shape.cx}" cy="${shape.cy}" r="${shape.r}" ${paint}${transform}/>`;
        case "ellipse":
          return `  <ellipse cx="${shape.cx}" cy="${shape.cy}" rx="${shape.rx}" ry="${shape.ry}" ${paint}${transform}/>`;
        default: {
          const rule = shape.evenodd ? ' fill-rule="evenodd"' : "";
          return `  <path d="${shape.d}"${rule} ${paint}${transform}/>`;
        }
      }
    })
    .join("\n");

  const label = escapeXml(mark.name);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}" role="img" aria-label="${label}">
  <title>${label}</title>
${body}
</svg>
`;
}

export { paintAttrs };
