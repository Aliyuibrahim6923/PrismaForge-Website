import type { Metadata } from "next";
import { buildMetadata, jsonLdScript } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { ToolHeader } from "@/components/tools/ToolHeader";
import { VCardGenerator } from "@/components/tools/VCardGenerator";

const title = "Free vCard & contact QR code generator";
const description =
  "Create a digital business card with your logo, download it as a .vcf contact file and get a QR code that saves your details straight to any phone. Free, no sign-up.";

export const metadata: Metadata = buildMetadata({
  title,
  description,
  path: "/tools/vcard",
  keywords: ["vCard generator", "QR business card", "contact QR code", "vcf generator", "free QR code Nigeria"],
});

export default function VCardToolPage() {
  return (
    <div className="pb-24 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: title,
          description,
          url: `${siteConfig.url}/tools/vcard`,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          offers: { "@type": "Offer", price: "0", priceCurrency: "NGN" },
          publisher: { "@id": `${siteConfig.url}/#organization` },
        })}
      />
      <div className="container-x">
        <ToolHeader
          crumbs={[{ label: "Home", href: "/" }, { label: "Free tools", href: "/tools" }, { label: "vCard & QR" }]}
          eyebrow="Free tool"
          title="Your business card, one scan away."
          lead="Add your details and logo, then download a contact file and a QR code. Anyone who scans it can save you to their phone in one tap. No account needed."
        />
        <div className="mt-14">
          <VCardGenerator />
        </div>
      </div>
    </div>
  );
}
