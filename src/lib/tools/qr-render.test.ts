import { describe, expect, it } from "vitest";
import { DEFAULT_QR_STYLE, buildQrSvg, contrastWarning } from "./qr-render";

describe("QR renderer", () => {
  it("renders an SVG for normal payloads", () => {
    const result = buildQrSvg("https://prismaforge.ng", DEFAULT_QR_STYLE);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.svg.startsWith("<svg")).toBe(true);
      expect(result.svg).not.toContain("<image");
    }
  });

  it("embeds the logo and escapes attribute values", () => {
    const result = buildQrSvg("hello", { ...DEFAULT_QR_STYLE, logo: 'data:image/png;base64,AA"><script>' });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.svg).toContain("<image");
      expect(result.svg).not.toContain("<script>");
    }
  });

  it("reports oversize content instead of throwing", () => {
    const result = buildQrSvg("x".repeat(4000), DEFAULT_QR_STYLE);
    expect(result.ok).toBe(false);
  });

  it("warns about inverted or low-contrast colours", () => {
    expect(contrastWarning("#000000", "#ffffff")).toBeNull();
    expect(contrastWarning("#ffffff", "#000000")).not.toBeNull();
    expect(contrastWarning("#999999", "#aaaaaa")).not.toBeNull();
  });
});
