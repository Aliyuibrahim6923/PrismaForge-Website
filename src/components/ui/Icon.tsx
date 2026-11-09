import { cn } from "@/lib/utils";

/**
 * A tiny, dependency-free icon set.
 *
 * Using an inline registry instead of an icon package keeps the client bundle
 * small (no per-icon component, no tree-shaking guesswork) and guarantees every
 * icon shares the same 24px grid, stroke width and line joins.
 */
const paths = {
  code: "m8 6-6 6 6 6M16 6l6 6-6 6",
  layers: "m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5",
  shield: "M12 3 5 6v6c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-3Z",
  users:
    "M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20M9 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM22 20v-1.5a4 4 0 0 0-3-3.87M16 3.6a4 4 0 0 1 0 7.75",
  sparkles:
    "m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3ZM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z",
  graduation: "M3 9l9-4 9 4-9 4-9-4Zm3 5.5V19c0 1.1 2.7 2 6 2s6-.9 6-2v-4.5",
  landmark: "M3 21h18M5 21V10m14 11V10M9 21V10m6 11V10M12 3l9 5H3l9-5Z",
  building:
    "M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16M14 21V9h4a2 2 0 0 1 2 2v10M8 7h2M8 11h2M8 15h2M2 21h20",
  heart:
    "M12 20s-7-4.3-9-8.5C1.5 8.2 3.3 5 6.6 5 8.7 5 10.4 6.1 12 8c1.6-1.9 3.3-3 5.4-3 3.3 0 5.1 3.2 3.6 6.5C19 15.7 12 20 12 20Z",
  map: "M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Zm0 0v13m6-10.5v13",
  arrowRight: "M4 12h16m-6-6 6 6-6 6",
  arrowUpRight: "M7 17 17 7M8 7h9v9",
  arrowDown: "M12 4v16m-6-6 6 6 6-6",
  plus: "M12 5v14M5 12h14",
  minus: "M5 12h14",
  check: "m4 12.5 5 5L20 7",
  mail: "M3 6.5h18v11H3v-11Zm0 .5 9 6.5L21 7",
  phone:
    "M6.5 3h3l1.5 4.5-2 1.5a11.5 11.5 0 0 0 6 6l1.5-2L21 14.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6.5 3Z",
  pin: "M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5.2l3.3 2",
  quote:
    "M9 6C6.2 7 4.5 9.6 4.5 13v5h6v-6H7.6C7.9 10 8.9 8.7 10.5 8L9 6Zm10 0c-2.8 1-4.5 3.6-4.5 7v5h6v-6h-2.9C17.9 10 18.9 8.7 20.5 8L19 6Z",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-14v2m0 14v2M3 12h2m14 0h2M5.6 5.6 7 7m10 10 1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4",
  moon: "M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z",
  chevronDown: "m6 9 6 6 6-6",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-4.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0-3.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  eye: "M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Zm10 2.6a2.6 2.6 0 1 0 0-5.2 2.6 2.6 0 0 0 0 5.2Z",
  gauge: "M12 20a8 8 0 1 1 8-8m-8 0 4.5-3.5M4 12h2m12 0h2",
  lock: "M6 11h12v9H6v-9Zm2.5 0V7.5a3.5 3.5 0 1 1 7 0V11",
  cloud:
    "M7 19a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17.2 10 3.5 3.5 0 0 1 17 19H7Z",
  database:
    "M12 7c4.4 0 8-1.1 8-2.5S16.4 2 12 2 4 3.1 4 4.5 7.6 7 12 7Zm8-2.5v15c0 1.4-3.6 2.5-8 2.5s-8-1.1-8-2.5v-15M20 12c0 1.4-3.6 2.5-8 2.5S4 13.4 4 12",
  workflow:
    "M4 4h6v6H4V4Zm10 10h6v6h-6v-6ZM7 10v4a3 3 0 0 0 3 3h4",
  chart: "M4 20V10m5 10V4m5 16v-7m5 7V8",
  palette:
    "M12 21a9 9 0 1 1 9-9c0 2-1.6 2.5-3 2.5h-1.5a2 2 0 0 0-1.3 3.5 1.8 1.8 0 0 1-1.2 3H12Zm-4.5-9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm3-3.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  megaphone: "M4 10v4h3l8 4V6l-8 4H4Zm11 0a3 3 0 0 1 0 4M7 14v5h3v-5",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 5 5",
  video: "M3 7h11v10H3V7Zm11 4 7-3.5v9L14 13",
  calendar: "M4 6h16v14H4V6Zm4-3v4m8-4v4M4 10h16",
  briefcase:
    "M3 8h18v12H3V8Zm6 0V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm3.5-12.5-2 5.5-5.5 2 2-5.5 5.5-2Z",
  rocket:
    "M12 3c3.5 2 5.5 5.5 5.5 9.5L15 15H9l-2.5-2.5C6.5 8.5 8.5 5 12 3Zm0 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM9 15l-2 4 4-1.5M15 15l2 4-4-1.5",
  handshake: "m8 12 3 3 5-5 3 3M3 10l5-5 4 3M21 10l-3-3",
  facebook:
    "M14 8.5V7a1.5 1.5 0 0 1 1.5-1.5H17V2.5h-2.5A4.5 4.5 0 0 0 10 7v1.5H7.5V12H10v9.5h4V12h2.5l.5-3.5H14Z",
  twitter: "m3 3 7.5 9.8L3.4 21h2.2l5.9-6.7 5 6.7H21l-7.9-10.4L20.4 3h-2.2l-5.5 6.2L8 3H3Z",
  linkedin:
    "M5.5 8.5v12M5.5 4.5v.02M10.5 20.5v-12m0 4c0-2 1.6-3 3.5-3s4 1 4 4.5v6.5",
  whatsapp:
    "M3.5 20.5 5 16.4A8.2 8.2 0 1 1 8 19.3l-4.5 1.2Zm5.8-9.8c.3 2 2 3.7 4 4l1-1.3 2 .9v1.4c-3.3.4-6.4-2.7-6.9-6l1.4-.5.5 1.5Z",
  spark: "M12 2v6m0 8v6M2 12h6m8 0h6M5.6 5.6 9 9m6 6 3.4 3.4M18.4 5.6 15 9m-6 6-3.4 3.4",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-18c-3 3-3 15 0 18M3.5 9h17M3.5 15h17",
  download: "M12 4v11m-5-5 5 5 5-5M4 19h16",
  upload: "M12 16V5m-5 5 5-5 5 5M4 19h16",
  qr: "M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h2v2h-2v-2Zm4 0h2v2h-2v-2Zm-4 4h2v2h-2v-2Zm4 0h2v2h-2v-2Z",
  idCard: "M3 5h18v14H3V5Zm5.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM5 16.5c.6-1.6 2-2.5 3.5-2.5s2.9.9 3.5 2.5M14 9h4m-4 3.5h4",
  wifi: "M2.5 8.8a14 14 0 0 1 19 0M5.6 12.2a9.5 9.5 0 0 1 12.8 0m-9.7 3.4a5 5 0 0 1 6.6 0M12 19h.01",
  text: "M5 6h14M5 10h14M5 14h10M5 18h7",
  message: "M4 5h16v11H9l-5 4V5Z",
  share: "M12 3v12m-4-8 4-4 4 4M5 13v7h14v-7",
  trash: "M4 7h16M9 7V4h6v3m-8 0 1 13h8l1-13",
  image: "M3 5h18v14H3V5Zm0 11 5-5 4 4 3-3 6 6M15.5 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
} as const;

export type IconName = keyof typeof paths;

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  /** Rendered size in px. Defaults to 24. */
  size?: number;
}

export function Icon({ name, size = 24, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
