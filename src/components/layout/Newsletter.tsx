"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

/**
 * Newsletter capture.
 *
 * Posts to `/api/newsletter`, which currently logs and returns success —
 * swap that route's body for your ESP (Mailchimp, Klaviyo, Resend) and this
 * component needs no changes.
 */
export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message ?? "Subscription failed");

      setStatus("success");
      setMessage(data.message ?? "You're subscribed.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm">
      <label
        htmlFor="newsletter-email"
        className="text-xs font-medium uppercase tracking-[0.18em] text-muted"
      >
        Insights, quarterly
      </label>

      <div
        className={cn(
          "mt-3 flex items-center gap-2 rounded-full border border-border-subtle bg-surface-raised/50 p-1.5 pl-4",
          "transition-colors duration-300 focus-within:border-brand-orange/60",
        )}
      >
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@organisation.org"
          autoComplete="email"
          disabled={status === "loading" || status === "success"}
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted/60"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          aria-label="Subscribe to the newsletter"
          className="bg-brand grid size-11 shrink-0 place-items-center rounded-full text-white transition-transform duration-300 hover:scale-105 disabled:opacity-60"
        >
          <Icon
            name={status === "success" ? "check" : "arrowRight"}
            size={16}
            className={status === "loading" ? "animate-pulse" : undefined}
          />
        </button>
      </div>

      {message && (
        <p
          role="status"
          className={cn(
            "mt-2.5 text-xs",
            status === "error" ? "text-red-400" : "text-emerald-400",
          )}
        >
          {message}
        </p>
      )}
    </form>
  );
}
