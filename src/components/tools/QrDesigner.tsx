"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { trackEvent } from "@/lib/analytics";
import {
  DEFAULT_QR_STYLE,
  buildQrSvg,
  contrastWarning,
  svgToDataUrl,
  svgToPngBlob,
  type DotStyle,
} from "@/lib/tools/qr-render";
import { downloadBlob, type ProcessedImage } from "@/lib/tools/image";
import { ColorField, ImageUpload } from "./fields";

const DOT_STYLES: { value: DotStyle; label: string }[] = [
  { value: "square", label: "Square" },
  { value: "rounded", label: "Rounded" },
  { value: "dots", label: "Dots" },
];

const PNG_SIZES = [512, 1024, 2048] as const;

interface QrDesignerProps {
  /** The exact string to encode, or null while the form is incomplete. */
  payload: string | null;
  /** Why there is no payload yet. */
  emptyMessage: string;
  /** Download file name without extension. */
  fileBase: string;
  /** Analytics label. */
  tool: "vcard" | "qr";
  logo: ProcessedImage | null;
  /** When given, the designer shows its own logo upload. */
  onLogoChange?: (logo: ProcessedImage | null) => void;
  /** Extra actions under the downloads (e.g. "Download .vcf"). */
  children?: React.ReactNode;
}

/** Live QR preview, styling controls and PNG/SVG downloads. */
export function QrDesigner({
  payload,
  emptyMessage,
  fileBase,
  tool,
  logo,
  onLogoChange,
  children,
}: QrDesignerProps) {
  const [foreground, setForeground] = useState(DEFAULT_QR_STYLE.foreground);
  const [background, setBackground] = useState(DEFAULT_QR_STYLE.background);
  const [dotStyle, setDotStyle] = useState<DotStyle>(DEFAULT_QR_STYLE.dotStyle);
  const [showLogo, setShowLogo] = useState(true);
  const [logoScale, setLogoScale] = useState(DEFAULT_QR_STYLE.logoScale);
  const [pngSize, setPngSize] = useState<(typeof PNG_SIZES)[number]>(1024);
  const [downloadError, setDownloadError] = useState("");

  // Typing stays responsive; the QR re-renders a beat behind.
  const deferredPayload = useDeferredValue(payload);

  const result = useMemo(() => {
    if (!deferredPayload) return null;
    return buildQrSvg(deferredPayload, {
      foreground,
      background,
      dotStyle,
      logo: showLogo && logo ? logo.previewUrl : null,
      logoScale,
    });
  }, [deferredPayload, foreground, background, dotStyle, showLogo, logo, logoScale]);

  const warning = contrastWarning(foreground, background);
  const ready = result?.ok === true && payload !== null;

  const downloadPng = async () => {
    if (!result?.ok) return;
    setDownloadError("");
    try {
      downloadBlob(await svgToPngBlob(result.svg, pngSize), `${fileBase}-qr.png`);
      trackEvent("tool_download", { tool, format: "png" });
    } catch {
      setDownloadError("Your browser couldn't create the PNG. Try the SVG download instead.");
    }
  };

  const downloadSvg = () => {
    if (!result?.ok) return;
    downloadBlob(new Blob([result.svg], { type: "image/svg+xml" }), `${fileBase}-qr.svg`);
    trackEvent("tool_download", { tool, format: "svg" });
  };

  return (
    <div className="glass border-gradient rounded-3xl p-5 sm:p-7">
      {/* Preview */}
      <div
        className="relative mx-auto aspect-square w-full max-w-[20rem] overflow-hidden rounded-2xl border border-border-subtle"
        style={{ backgroundColor: background }}
      >
        {result?.ok ? (
          // eslint-disable-next-line @next/next/no-img-element -- generated data URL
          <img
            src={svgToDataUrl(result.svg)}
            alt="QR code preview"
            className={cn(
              "size-full transition-opacity duration-300",
              payload !== deferredPayload && "opacity-70",
            )}
          />
        ) : (
          <div className="grid size-full place-items-center bg-surface-raised/60 p-8 text-center">
            <div>
              <Icon name="qr" size={40} className="mx-auto text-muted/60" />
              <p className="mt-3 text-sm text-muted">
                {result && !result.ok ? result.error : emptyMessage}
              </p>
            </div>
          </div>
        )}
      </div>

      {result?.ok && result.modules > 69 && (
        <p className="mt-3 text-center text-xs text-muted">
          This is a dense code — print it at least 3.5 cm wide.
        </p>
      )}

      {/* Downloads */}
      <div className="mt-6 grid gap-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={downloadPng}
            disabled={!ready}
            className="bg-brand inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-sm font-medium text-white shadow-[0_10px_40px_-12px_rgba(249,115,22,0.75)] transition-opacity disabled:opacity-40"
          >
            <Icon name="download" size={17} />
            Download PNG
          </button>
          <label className="sr-only" htmlFor={`${tool}-png-size`}>
            PNG size
          </label>
          <select
            id={`${tool}-png-size`}
            value={pngSize}
            onChange={(event) =>
              setPngSize(Number(event.target.value) as (typeof PNG_SIZES)[number])
            }
            className="h-12 rounded-full border border-border-subtle bg-surface-raised/40 px-3 text-sm outline-none focus:border-brand-orange/60"
          >
            {PNG_SIZES.map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={downloadSvg}
          disabled={!ready}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border-subtle text-sm font-medium transition-colors hover:bg-foreground/5 disabled:opacity-40"
        >
          <Icon name="download" size={17} />
          Download SVG <span className="text-muted">(for print)</span>
        </button>
        {children}
        {downloadError && (
          <p role="alert" className="text-xs text-red-400">
            {downloadError}
          </p>
        )}
      </div>

      {/* Style */}
      <details className="group mt-7 border-t border-border-subtle pt-5" open>
        <summary className="flex cursor-pointer list-none items-center justify-between font-display text-sm font-semibold uppercase tracking-[0.16em]">
          Customise
          <Icon
            name="chevronDown"
            size={16}
            className="text-muted transition-transform group-open:rotate-180"
          />
        </summary>

        <div className="mt-5 grid gap-4">
          <div className="grid grid-cols-2 gap-3">
            <ColorField label="Dots" value={foreground} onChange={setForeground} />
            <ColorField label="Background" value={background} onChange={setBackground} />
          </div>
          {warning && (
            <p role="status" className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-500">
              {warning}
            </p>
          )}

          <div role="radiogroup" aria-label="Dot style" className="grid grid-cols-3 gap-2">
            {DOT_STYLES.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={dotStyle === option.value}
                onClick={() => setDotStyle(option.value)}
                className={cn(
                  "h-10 rounded-full border text-sm transition-colors",
                  dotStyle === option.value
                    ? "border-brand-orange/60 bg-brand-orange/10 text-foreground"
                    : "border-border-subtle text-muted hover:text-foreground",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          {onLogoChange && (
            <ImageUpload
              label="Logo in the centre (optional)"
              image={logo}
              onChange={onLogoChange}
            />
          )}

          {logo && (
            <div className="grid gap-3">
              {!onLogoChange && (
                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={showLogo}
                    onChange={(event) => setShowLogo(event.target.checked)}
                    className="size-4 accent-[var(--color-brand-orange)]"
                  />
                  Show my logo in the centre of the QR
                </label>
              )}
              {showLogo && (
                <label className="grid gap-1.5 text-xs uppercase tracking-[0.14em] text-muted">
                  Logo size
                  <input
                    type="range"
                    min={0.14}
                    max={0.26}
                    step={0.02}
                    value={logoScale}
                    onChange={(event) => setLogoScale(Number(event.target.value))}
                    className="accent-[var(--color-brand-orange)]"
                  />
                </label>
              )}
            </div>
          )}
        </div>
      </details>

      <p className="mt-6 flex items-start gap-2 text-xs leading-relaxed text-muted">
        <Icon name="lock" size={14} className="mt-0.5" />
        Generated on your device. Nothing you type or upload is sent to our servers,
        and the QR never expires.
      </p>
    </div>
  );
}
