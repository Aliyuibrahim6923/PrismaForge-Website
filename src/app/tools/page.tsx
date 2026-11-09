import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { ToolHeader } from "@/components/tools/ToolHeader";

export const metadata: Metadata = buildMetadata({
  title: "Free business tools",
  description:
    "Free tools from Prismaforge: a vCard and contact QR generator with your logo, and a QR code generator for links, Wi-Fi, WhatsApp and more.",
  path: "/tools",
});

const tools: {
  href: string;
  icon: IconName;
  title: string;
  body: string;
  points: string[];
}[] = [
  {
    href: "/tools/vcard",
    icon: "idCard",
    title: "vCard & contact QR",
    body: "A digital business card with your logo. Scanning the QR saves your details straight to the phone.",
    points: ["Logo and profile photo", ".vcf file for iPhone, Android and Outlook", "Branded QR in PNG or SVG"],
  },
  {
    href: "/tools/qr",
    icon: "qr",
    title: "QR code generator",
    body: "QR codes for websites, text, email, calls, SMS, WhatsApp chats and Wi-Fi logins.",
    points: ["Custom colours and dot styles", "Your logo in the centre", "Never expires, no scan limits"],
  },
];

export default function ToolsPage() {
  return (
    <div className="pb-24 pt-32">
      <div className="container-x">
        <ToolHeader
          crumbs={[{ label: "Home", href: "/" }, { label: "Free tools" }]}
          eyebrow="Free · no sign-up"
          title="Free tools for your business."
          lead="Everything runs in your browser. Your details and logo never leave your device."
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <li key={tool.href}>
              <Link
                href={tool.href}
                data-cursor="view"
                className="glass border-gradient group flex h-full flex-col rounded-3xl p-8 transition-colors duration-500 hover:border-brand-orange/30"
              >
                <span className="grid size-12 place-items-center rounded-2xl border border-border-subtle text-brand-orange">
                  <Icon name={tool.icon} size={22} />
                </span>
                <h2 className="mt-6 font-display text-2xl font-semibold transition-colors group-hover:text-brand-orange">
                  {tool.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted">{tool.body}</p>
                <ul className="mt-6 grid gap-2.5 text-sm text-muted">
                  {tool.points.map((point) => (
                    <li key={point} className="flex gap-2.5">
                      <Icon name="check" size={16} className="mt-0.5 text-brand-orange" />
                      {point}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
                  Open tool
                  <Icon
                    name="arrowRight"
                    size={16}
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <section className="glass mt-16 rounded-3xl p-8 text-center sm:p-12">
          <h2 className="font-display text-[length:var(--text-display-sm)] font-semibold">
            Need this for your <span className="text-gradient">whole team?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            We build managed staff-card platforms with editable QR codes, admin dashboards
            and your own domain.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/#contact" size="lg" icon="arrowRight">
              Talk to us
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
