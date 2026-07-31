"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Icon } from "@/components/ui/Icon";
import { contact } from "@/lib/site";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { cn } from "@/lib/utils";

/**
 * Floating action cluster: expandable contact shortcuts plus back-to-top.
 *
 * The live-chat entry is a placeholder that opens WhatsApp — swap the
 * handler for your chat widget's `open()` when one is installed.
 */
export function FloatingActions() {
  const [expanded, setExpanded] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const actions = [
    {
      label: "Live chat",
      icon: "whatsapp" as const,
      href: contact.whatsapp,
      hint: "Typically replies within a few hours",
    },
    { label: "Email us", icon: "mail" as const, href: `mailto:${contact.email}` },
    { label: "Call us", icon: "phone" as const, href: contact.phoneHref },
  ];

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {showTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            onClick={() => scrollTo(0, 0)}
            aria-label="Back to top"
            className="glass grid size-11 place-items-center rounded-full transition-colors hover:text-brand-orange"
          >
            <Icon name="arrowDown" size={17} className="rotate-180" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {expanded && (
          <motion.ul
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-end gap-2.5"
          >
            {actions.map((action, index) => (
              <motion.li
                key={action.label}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ delay: index * 0.05, duration: 0.28 }}
              >
                <a
                  href={action.href}
                  target={action.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  title={action.hint}
                  className="glass flex items-center gap-2.5 rounded-full py-2 pl-4 pr-2 text-sm font-medium transition-colors hover:text-brand-orange"
                >
                  {action.label}
                  <span className="grid size-8 place-items-center rounded-full bg-foreground/8">
                    <Icon name={action.icon} size={15} />
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-label={expanded ? "Close contact options" : "Open contact options"}
        className="bg-brand relative grid size-14 place-items-center rounded-full text-white shadow-[0_14px_40px_-10px_rgba(46,107,255,0.8)] transition-transform duration-300 hover:scale-105"
      >
        {!expanded && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-brand-orange/40 [animation:var(--animate-pulse-ring)]"
          />
        )}
        <Icon
          name={expanded ? "close" : "sparkles"}
          size={21}
          className={cn(
            "relative transition-transform duration-500",
            expanded && "rotate-90",
          )}
        />
      </button>
    </div>
  );
}
