/**
 * Global site configuration — the single place to change brand-level facts.
 * Anything that appears in more than one section belongs here.
 */

export const siteConfig = {
  name: "Prismaforge",
  legalName: "Prismaforge Limited",
  /** Used for canonical URLs, sitemap and OG tags. Override with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://prismaforge.ng",
  tagline: "Technology, training and strategy — one accountable partner.",
  description:
    "Prismaforge is a technology and consulting firm driving digital transformation across Nigeria's public and private sectors — software engineering, e-governance platforms, capacity building and brand strategy.",
  founded: "2026",
  locale: "en_NG",
  keywords: [
    "digital transformation Nigeria",
    "learning management system Nigeria",
    "e-governance software",
    "student management system",
    "land administration system",
    "ERP Nigeria",
    "corporate training Kaduna",
    "IT consulting Nigeria",
  ],
} as const;

export const contact = {
  email: "info@prismaforge.ng",
  phone: "0813 281 5411",
  phoneHref: "tel:+2348132815411",
  whatsapp: "https://wa.me/2348132815411",
  address: {
    line1: "Prismaforge Campus",
    city: "Kaduna",
    country: "Nigeria",
  },
  hours: "Mon – Fri · 09:00 – 17:00 WAT",
  /**
   * Google Maps embed. Swap the query for exact coordinates once the
   * office pin is published on Google Business Profile.
   */
  mapEmbedSrc:
    "https://www.google.com/maps?q=Kaduna%2C%20Nigeria&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Kaduna%2C+Nigeria",
} as const;

export const socials = [
  {
    label: "Facebook",
    handle: "Prismaforge NG",
    href: "https://facebook.com/prismaforgeng",
    icon: "facebook",
  },
  {
    label: "X",
    handle: "Prismaforge Ltd",
    href: "https://x.com/prismaforgeltd",
    icon: "twitter",
  },
  {
    label: "LinkedIn",
    handle: "Prismaforge",
    href: "https://linkedin.com/company/prismaforge",
    icon: "linkedin",
  },
  {
    label: "WhatsApp",
    handle: "Chat with us",
    href: "https://wa.me/2348132815411",
    icon: "whatsapp",
  },
] as const;

/** Primary navigation — each `href` maps to a section id on the home page. */
export const navLinks = [
  { label: "Spotlight", href: "#spotlight" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Team", href: "#team" },
  { label: "Insights", href: "#news" },
] as const;

export const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Why Prismaforge", href: "#why" },
      { label: "Team", href: "#team" },
      { label: "Insights", href: "#news" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Competencies",
    links: [
      { label: "Software Development", href: "#services" },
      { label: "Mega Solutions", href: "#services" },
      { label: "Consultancy & Training", href: "#services" },
      { label: "Business & Digital Presence", href: "#services" },
    ],
  },
  {
    title: "Platforms",
    links: [
      { label: "Learning Management System", href: "/work/learning-management-system" },
      { label: "Student Management System", href: "/work/student-management-system" },
      { label: "E-TRACK E-Governance", href: "/work/e-track-governance-suite" },
      { label: "Land Administration", href: "/work/land-administration-system" },
    ],
  },
] as const;
