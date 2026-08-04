"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { setAnalyticsConsent } from "@/lib/analytics";

const STORAGE_KEY = "pf-cookie-consent";

/**
 * Cookie consent banner.
 *
 * Analytics stay dormant until consent is explicitly granted — see
 * `lib/analytics.ts`, which only loads a provider after `setAnalyticsConsent`
 * is called with `true`. Declining is a one-click action given equal weight
 * to accepting.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") {
      setAnalyticsConsent(true);
      return;
    }
    if (stored === "denied") return;

    // Let the hero land before interrupting.
    const timer = window.setTimeout(() => setVisible(true), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  const decide = (granted: boolean) => {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    setAnalyticsConsent(granted);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 left-5 z-[70] w-[min(24rem,calc(100vw-2.5rem))]"
        >
          {/* Near-opaque: the banner sits over content, and a translucent
              panel makes both it and the page underneath unreadable. Built
              from parts rather than the `glass` utility — `glass` sets the
              `background` shorthand, which would override this one. */}
          <div className="rounded-2xl border border-border-subtle bg-surface/95 p-5 shadow-[0_24px_60px_-20px_rgb(5_10_26/0.7)] backdrop-blur-xl">
            <h2 className="font-display text-sm font-semibold">
              We use cookies
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Essential cookies keep this site working. With your consent we
              also measure anonymous usage to improve it. No tracking runs
              until you choose.
            </p>
            <div className="mt-4 flex gap-2">
              <Button size="sm" onClick={() => decide(true)} magnetic={false}>
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => decide(false)}
                magnetic={false}
              >
                Decline
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
