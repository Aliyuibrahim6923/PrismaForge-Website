"use client";

import Link from "next/link";
import { contact, footerLinks, siteConfig, socials } from "@/lib/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import { Newsletter } from "./Newsletter";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { usePathname } from "next/navigation";

export function Footer() {
  const { scrollTo } = useSmoothScroll();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const year = new Date().getFullYear();

  const handleAnchor = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!isHome || !href.startsWith("#")) return;
    event.preventDefault();
    scrollTo(href);
  };

  return (
    <footer className="relative overflow-hidden border-t border-border-subtle bg-surface-sunken">
      {/* Ambient glow anchoring the page's bottom edge */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 size-[42rem] -translate-x-1/2 rounded-full bg-brand-sky/12 blur-[140px]"
      />

      <div className="container-x relative py-20">
        <div className="grid gap-14 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-7">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.description}
            </p>
            <Newsletter />

            <ul className="flex flex-wrap gap-2.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} on ${social.label}`}
                    className="grid size-10 place-items-center rounded-full border border-border-subtle text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-orange/50 hover:text-brand-orange"
                  >
                    <Icon name={social.icon as IconName} size={17} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3">
            {footerLinks.map((column) => (
              <nav key={column.title} aria-labelledby={`footer-${column.title}`}>
                <h3
                  id={`footer-${column.title}`}
                  className="font-display text-xs font-semibold uppercase tracking-[0.2em] text-foreground"
                >
                  {column.title}
                </h3>
                {/* `min-h-11` on the links rather than list spacing: the
                    row keeps its visual rhythm while the tap target
                    reaches the 44px touch minimum. */}
                <ul className="mt-3 space-y-0.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={
                          link.href.startsWith("#") && !isHome
                            ? `/${link.href}`
                            : link.href
                        }
                        onClick={(event) => handleAnchor(event, link.href)}
                        className="group inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
                      >
                        {link.label}
                        <Icon
                          name="arrowUpRight"
                          size={13}
                          className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-60"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-16 grid gap-6 border-t border-border-subtle pt-8 sm:grid-cols-3">
          {[
            { icon: "mail" as const, label: contact.email, href: `mailto:${contact.email}` },
            { icon: "phone" as const, label: contact.phone, href: contact.phoneHref },
            {
              icon: "pin" as const,
              label: `${contact.address.city}, ${contact.address.country}`,
              href: contact.mapLink,
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
            >
              <span className="grid size-9 place-items-center rounded-full border border-border-subtle transition-colors group-hover:border-brand-orange/50 group-hover:text-brand-orange">
                <Icon name={item.icon} size={15} />
              </span>
              {item.label}
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 text-xs text-muted sm:flex-row">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 [animation:var(--animate-pulse-ring)]" />
              <span className="relative inline-flex size-1.5 rounded-full bg-emerald-400" />
            </span>
            Available for new engagements
          </p>
        </div>
      </div>

      {/* Oversized wordmark watermark */}
      <div
        aria-hidden
        className="pointer-events-none select-none overflow-hidden px-4"
      >
        <p className="translate-y-[22%] bg-gradient-to-b from-foreground/8 to-transparent bg-clip-text text-center font-display text-[clamp(3.5rem,17vw,15rem)] font-bold leading-none tracking-tighter text-transparent">
          {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
