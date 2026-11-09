"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { navLinks, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

/**
 * Fixed header with scroll-aware glass treatment, scroll-spy active state
 * and a full-screen mobile menu.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();
  const isHome = pathname === "/";

  // Condense the header once the hero starts leaving.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: IntersectionObserver is far cheaper than measuring on scroll.
  useEffect(() => {
    if (!isHome) return;

    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => Boolean(el));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome, pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!isHome) return; // let Next handle cross-page navigation
    event.preventDefault();
    setOpen(false);
    scrollTo(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)]",
          scrolled ? "py-2.5" : "py-5",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "container-x flex items-center justify-between rounded-full transition-all duration-500",
            scrolled &&
              "glass mx-auto !max-w-6xl !px-4 py-2.5 sm:!px-5",
          )}
        >
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="transition-opacity duration-300 hover:opacity-80"
          >
            <Logo />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={isHome ? link.href : `/${link.href}`}
                  onClick={(event) => handleNavClick(event, link.href)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                    active === link.href
                      ? "text-foreground"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-foreground/8"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/tools"
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                  pathname.startsWith("/tools")
                    ? "bg-foreground/8 text-foreground"
                    : "text-muted hover:text-foreground",
                )}
              >
                Free tools
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              href={isHome ? "#contact" : "/#contact"}
              size="sm"
              className="hidden sm:inline-flex"
              icon="arrowUpRight"
              onClick={(event) => {
                if (!isHome) return;
                event.preventDefault();
                scrollTo("#contact");
              }}
            >
              Start a project
            </Button>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid size-10 place-items-center rounded-full border border-border-subtle transition-colors hover:bg-foreground/5 lg:hidden"
            >
              <Icon name={open ? "close" : "menu"} size={18} />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-surface/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="container-x flex min-h-full flex-col justify-center gap-2 pb-8 pt-24">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{
                    delay: 0.06 * index,
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={isHome ? link.href : `/${link.href}`}
                    onClick={(event) => handleNavClick(event, link.href)}
                    className="flex items-baseline gap-4 border-b border-border-subtle py-4 font-display text-3xl font-semibold tracking-tight transition-colors hover:text-brand-orange"
                  >
                    <span className="font-mono text-xs text-muted">
                      0{index + 1}
                    </span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ delay: 0.06 * navLinks.length, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href="/tools"
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-border-subtle py-4 font-display text-3xl font-semibold tracking-tight transition-colors hover:text-brand-orange"
                >
                  <span className="font-mono text-xs text-muted">
                    0{navLinks.length + 1}
                  </span>
                  Free tools
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-8"
              >
                <Button
                  href={isHome ? "#contact" : "/#contact"}
                  size="lg"
                  icon="arrowRight"
                  className="w-full"
                  onClick={(event) => {
                    setOpen(false);
                    if (!isHome) return;
                    event.preventDefault();
                    scrollTo("#contact");
                  }}
                >
                  Start a project
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
