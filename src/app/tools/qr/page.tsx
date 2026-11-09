import type { Metadata } from "next";
import { buildMetadata, jsonLdScript } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { QrGenerator } from "@/components/tools/QrGenerator";

const title = "Free QR code generator";
const description =
  "Make QR codes for websites, text, email, phone calls, SMS, WhatsApp and Wi-Fi. Add your logo and colours and download PNG or print-ready SVG. Free, no sign-up, never expires.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/tools/qr",
  keywords: ["QR code generator", "free QR code", "WiFi QR code", "WhatsApp QR code", "QR code with logo"],
});

export default function QrToolPage() {
  return (
    <div className="pb-24 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: title,
          description,
          url: `${siteConfig.url}/tools/qr`,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
          publisher: { "@id": `${siteConfig.url}/#organization` },
        })}
      />
      <div className="container-x">
        <ToolHeader
          crumbs={[{ label: "Home", href: "/" }, { label: "Free tools", href: "/tools" }, { label: "QR generator" }]}
          eyebrow="Free tool"
          title="QR codes for anything, with your brand on them."
          lead="Links, Wi-Fi, WhatsApp, email and more. Pick your colours, drop in a logo and download a sharp PNG or a print-ready SVG."
        />
        <div className="mt-14">
          <QrGenerator />
        </div>
      </div>
    </div>
  );
}
