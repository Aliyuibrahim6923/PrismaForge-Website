import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

/**
 * Social share card, generated at build time.
 *
 * Next wires this into the page's OG and Twitter tags automatically, so
 * links to the site unfurl on-brand rather than as a bare URL. Runs through
 * Satori — keep the markup to flexbox, plain text and inline SVG.
 */
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg, #050a1a 0%, #14224a 62%, #7c2d12 140%)",
          color: "#f4f7fc",
          fontFamily: "sans-serif",
        }}
      >
        {/* Lockup */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <rect x="12" y="8" width="10" height="48" fill="#f4f7fc" />
            <path
              d="M22 8 H36 A14 14 0 0 1 36 36 H22 Z M22 15 H36 A7 7 0 0 1 36 29 H22 Z"
              fill="#f4f7fc"
              fillRule="evenodd"
            />
            <path d="M26.5 16 L40 22 L26.5 28 Z" fill="#f97316" />
          </svg>
          <div style={{ display: "flex", fontSize: 38, fontWeight: 700 }}>
            <span>Prisma</span>
            <span style={{ color: "#f97316" }}>forge</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            <span>We build the systems</span>
            <span style={{ color: "#fba94c" }}>institutions run on.</span>
          </div>
          <div style={{ fontSize: 27, color: "#9aa6c9", maxWidth: 860 }}>
            Software engineering, e-governance platforms, capacity building and
            brand strategy — one accountable partner.
          </div>
        </div>

        {/* Footer rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(244,247,252,0.16)",
            paddingTop: 26,
            fontSize: 23,
            color: "#9aa6c9",
          }}
        >
          <span>Kaduna, Nigeria</span>
          <span style={{ color: "#f97316" }}>prismaforge.ng</span>
        </div>
      </div>
    ),
    size,
  );
}
