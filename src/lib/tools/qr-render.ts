/**
 * QR renderer for the free tools.
 *
 * `qrcode` only computes the module matrix; drawing is done here so the
 * preview, the SVG download and the PNG download are pixel-identical and
 * can carry a centred logo.
 */

import QRCode from "qrcode";

export type DotStyle = "square" | "rounded" | "dots";

export interface QrStyle {
  foreground: string;
  background: string;
  dotStyle: DotStyle;
  /** Data URL of the logo to place in the centre, or null. */
  logo: string | null;
  /** Logo width as a fraction of the code width (0.14 – 0.26). */
  logoScale: number;
}

export const DEFAULT_QR_STYLE: QrStyle = {
  foreground: "#0c1836",
  background: "#ffffff",
  dotStyle: "square",
  logo: null,
  logoScale: 0.22,
};

/** Quiet zone in modules — the QR spec minimum. */
const MARGIN = 4;

export type QrSvgResult =
  | { ok: true; svg: string; modules: number }
  | { ok: false; error: string };

/**
 * Builds a standalone SVG string. A logo forces error-correction level H
 * (30% recovery), which is what lets the centre modules be covered.
 */
export function buildQrSvg(payload: string, style: QrStyle): QrSvgResult {
  let matrix: QRCode.QRCode;
  try {
    matrix = QRCode.create(payload, {
      errorCorrectionLevel: style.logo ? "H" : "M",
    });
  } catch {
    return {
      ok: false,
      error: style.logo
        ? "Too much content for a QR code with a logo. Remove the logo or shorten some fields."
        : "Too much content for a QR code. Shorten some fields.",
    };
  }

  const n = matrix.modules.size;
  const data = matrix.modules.data;
  const total = n + MARGIN * 2;

  // Logo box, centred and aligned to whole modules. Same parity as `n` keeps
  // it exactly centred; one module of padding keeps dots off the logo edge.
  let logoBox: { start: number; size: number } | null = null;
  if (style.logo) {
    let size = Math.round(n * clampScale(style.logoScale));
    if (size % 2 !== n % 2) size += 1;
    logoBox = { start: (n - size) / 2, size };
  }

  const inFinder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  const inLogo = (r: number, c: number) =>
    logoBox !== null &&
    r >= logoBox.start - 1 &&
    r < logoBox.start + logoBox.size + 1 &&
    c >= logoBox.start - 1 &&
    c < logoBox.start + logoBox.size + 1;

  const parts: string[] = [];

  // Data modules
  const dots: string[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (!data[r * n + c] || inFinder(r, c) || inLogo(r, c)) continue;
      const x = c + MARGIN;
      const y = r + MARGIN;
      if (style.dotStyle === "dots") {
        // Full-size circles: smaller dots leave gaps that confuse
        // the binarisers in some scanner apps.
        dots.push(`M${x + 0.5} ${y}a0.5 0.5 0 1 1 0 1a0.5 0.5 0 1 1 0-1Z`);
      } else if (style.dotStyle === "rounded") {
        dots.push(roundedRectPath(x + 0.04, y + 0.04, 0.92, 0.92, 0.3));
      } else {
        dots.push(`M${x} ${y}h1v1h-1Z`);
      }
    }
  }
  parts.push(`<path fill="${attr(style.foreground)}" d="${dots.join("")}"/>`);

  // Finder patterns ("eyes"), drawn as shapes so they can be rounded too.
  const outerRadius = style.dotStyle === "square" ? 0 : 1.6;
  const innerRadius = style.dotStyle === "square" ? 0 : 0.9;
  for (const [r, c] of [
    [0, 0],
    [0, n - 7],
    [n - 7, 0],
  ] as const) {
    const x = c + MARGIN;
    const y = r + MARGIN;
    const ring =
      roundedRectPath(x, y, 7, 7, outerRadius) +
      roundedRectPath(x + 1, y + 1, 5, 5, Math.max(0, outerRadius - 0.6));
    parts.push(`<path fill="${attr(style.foreground)}" fill-rule="evenodd" d="${ring}"/>`);
    parts.push(
      `<path fill="${attr(style.foreground)}" d="${roundedRectPath(x + 2, y + 2, 3, 3, innerRadius)}"/>`,
    );
  }

  // Logo on a rounded plate in the background colour.
  if (logoBox && style.logo) {
    const x = logoBox.start + MARGIN;
    const size = logoBox.size;
    const inset = size * 0.08;
    parts.push(
      `<rect x="${x}" y="${x}" width="${size}" height="${size}" rx="${size * 0.18}" fill="${attr(style.background)}"/>`,
    );
    parts.push(
      `<image href="${attr(style.logo)}" x="${x + inset}" y="${x + inset}" width="${size - inset * 2}" height="${size - inset * 2}" preserveAspectRatio="xMidYMid meet"/>`,
    );
  }

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" width="1024" height="1024" shape-rendering="${style.dotStyle === "square" ? "crispEdges" : "geometricPrecision"}">` +
    `<rect width="${total}" height="${total}" fill="${attr(style.background)}"/>` +
    parts.join("") +
    `</svg>`;

  return { ok: true, svg, modules: n };
}

function roundedRectPath(x: number, y: number, w: number, h: number, r: number) {
  if (r <= 0) return `M${x} ${y}h${w}v${h}h${-w}Z`;
  const rr = Math.min(r, w / 2, h / 2);
  return (
    `M${x + rr} ${y}h${w - 2 * rr}a${rr} ${rr} 0 0 1 ${rr} ${rr}` +
    `v${h - 2 * rr}a${rr} ${rr} 0 0 1 ${-rr} ${rr}` +
    `h${-(w - 2 * rr)}a${rr} ${rr} 0 0 1 ${-rr} ${-rr}` +
    `v${-(h - 2 * rr)}a${rr} ${rr} 0 0 1 ${rr} ${-rr}Z`
  );
}

const clampScale = (value: number) => Math.min(Math.max(value, 0.14), 0.26);

/** Escapes a value for an XML attribute. */
function attr(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function svgToDataUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

/** Rasterises the SVG in the browser. Only data: URLs are embedded, so the canvas is never tainted. */
export async function svgToPngBlob(svg: string, size: number): Promise<Blob> {
  const image = new Image();
  image.decoding = "async";
  image.src = svgToDataUrl(svg);
  await image.decode();

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not supported in this browser.");
  context.imageSmoothingEnabled = false;
  context.drawImage(image, 0, 0, size, size);

  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Could not create the PNG."))),
      "image/png",
    ),
  );
}

/* ---------------------------------------------------------------- *
 * Colour contrast — dark-on-light with enough contrast scans best.
 * ---------------------------------------------------------------- */

function luminance(hex: string): number | null {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!match) return null;
  const value = parseInt(match[1]!, 16);
  const channels = [(value >> 16) & 255, (value >> 8) & 255, value & 255].map((channel) => {
    const s = channel / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0]! + 0.7152 * channels[1]! + 0.0722 * channels[2]!;
}

/** Returns a warning when the colours are likely to scan poorly, else null. */
export function contrastWarning(foreground: string, background: string): string | null {
  const fg = luminance(foreground);
  const bg = luminance(background);
  if (fg === null || bg === null) return null;
  if (fg > bg) {
    return "Light dots on a dark background don't scan on many phones. Use a darker dot colour.";
  }
  const ratio = (bg + 0.05) / (fg + 0.05);
  if (ratio < 4) {
    return "The colours are too close in brightness. Increase the contrast so phones can read it.";
  }
  return null;
}
