import { ImageResponse } from "next/og";

/**
 * Apple touch icon, rendered to PNG at build time.
 *
 * iOS requires a raster icon, so this is generated rather than shipped as
 * an SVG — same geometry as `icon.svg`, no binary asset to keep in sync.
 */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0c1836",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="8" width="10" height="48" fill="#f4f7fc" />
          <path
            d="M22 8 H36 A14 14 0 0 1 36 36 H22 Z M22 15 H36 A7 7 0 0 1 36 29 H22 Z"
            fill="#f4f7fc"
            fillRule="evenodd"
          />
          <path d="M26.5 16 L40 22 L26.5 28 Z" fill="#f97316" />
        </svg>
      </div>
    ),
    size,
  );
}
