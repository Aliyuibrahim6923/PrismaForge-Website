import type { MetadataRoute } from "next";
import { getProjectSlugs } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...["/tools", "/tools/vcard", "/tools/qr"].map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...getProjectSlugs().map((slug) => ({
      url: `${siteConfig.url}/work/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
