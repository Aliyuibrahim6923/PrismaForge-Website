/**
 * Consent-gated analytics.
 *
 * Nothing is loaded or sent until `setAnalyticsConsent(true)` runs, which
 * only happens when a visitor accepts in the cookie banner. Events fired
 * before consent are dropped rather than queued, so declining leaves no
 * residual data.
 *
 * To wire a provider, set NEXT_PUBLIC_GA_ID (or replace `loadProvider`
 * with your own snippet — Plausible, Fathom, PostHog all fit this shape).
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

let consentGranted = false;
let loaded = false;

function loadProvider() {
  if (loaded || !MEASUREMENT_ID || typeof window === "undefined") return;
  loaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: true,
  });
}

export function setAnalyticsConsent(granted: boolean) {
  consentGranted = granted;
  if (granted) loadProvider();
}

export const hasAnalyticsConsent = () => consentGranted;

/** Track a custom event. No-ops without consent or a configured provider. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!consentGranted || typeof window === "undefined") return;
  window.gtag?.("event", name, params ?? {});
}
