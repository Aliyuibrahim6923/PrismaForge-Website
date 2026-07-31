import type { Metadata } from "next";
import { contact, siteConfig, socials } from "./site";
import { faqs } from "./content";

/** Shared metadata builder so every route gets consistent OG/Twitter tags. */
export function buildMetadata({
  title,
  description,
  path = "/",
  keywords,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
}): Metadata {
  const url = `${siteConfig.url}${path}`;

  return {
    title,
    description,
    keywords: keywords ?? [...siteConfig.keywords],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: siteConfig.name,
      title,
      description,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/** Organization + website JSON-LD for the home page. */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        foundingDate: siteConfig.founded,
        email: contact.email,
        telephone: contact.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: contact.address.city,
          addressCountry: "NG",
        },
        sameAs: socials.map((social) => social.href),
        areaServed: "NG",
        knowsAbout: [
          "Software development",
          "E-governance",
          "Learning management systems",
          "Land administration",
          "Corporate training",
          "Digital marketing",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: siteConfig.url,
        name: siteConfig.name,
        publisher: { "@id": `${siteConfig.url}/#organization` },
        inLanguage: "en-NG",
      },
    ],
  };
}

/** FAQPage JSON-LD generated from the same source the section renders. */
export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

/** Serialises JSON-LD safely for embedding in a script tag. */
export const jsonLdScript = (data: unknown) => ({
  __html: JSON.stringify(data).replace(/</g, "\\u003c"),
});
