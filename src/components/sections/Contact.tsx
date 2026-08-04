"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { contact, socials } from "@/lib/site";
import { services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";

const INITIAL = {
  name: "",
  email: "",
  organisation: "",
  interest: services[0]?.title ?? "",
  message: "",
};

/**
 * Contact: animated form, live contact details and an embedded map.
 *
 * The form posts to `/api/contact`, which validates server-side and is the
 * one place to add your email provider. Inputs use floating labels driven
 * purely by `:placeholder-shown`, so no JS runs on keystroke.
 */
export function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const update = (field: keyof typeof INITIAL, value: string) =>
    setForm((previous) => ({ ...previous, [field]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message ?? "Could not send message");

      setStatus("success");
      setFeedback(data.message ?? "Thank you — we'll be in touch shortly.");
      setForm(INITIAL);
      trackEvent("contact_submit", { interest: form.interest });
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please email us directly.",
      );
    }
  };

  const details: { icon: IconName; label: string; value: string; href: string }[] =
    [
      {
        icon: "mail",
        label: "Email",
        value: contact.email,
        href: `mailto:${contact.email}`,
      },
      {
        icon: "phone",
        label: "Phone",
        value: contact.phone,
        href: contact.phoneHref,
      },
      {
        icon: "pin",
        label: "Office",
        value: `${contact.address.line1}, ${contact.address.city}, ${contact.address.country}`,
        href: contact.mapLink,
      },
      {
        icon: "clock",
        label: "Hours",
        value: contact.hours,
        href: contact.mapLink,
      },
    ];

  return (
    <Section id="contact" spacing="loose" className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[36rem] -translate-x-1/2 rounded-full bg-brand-sky/12 blur-[150px]"
      />

      <SectionHeading
        eyebrow="Contact"
        title="Tell us what you're trying to change."
        lead="Send a brief, book an assessment, or just ask a question. We reply within one working day."
        align="center"
      />

      <div className="mt-16 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="reveal glass border-gradient rounded-3xl p-7 sm:p-10"
          noValidate
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="name"
              label="Full name"
              value={form.name}
              onChange={(value) => update("name", value)}
              autoComplete="name"
              required
            />
            <Field
              id="email"
              label="Work email"
              type="email"
              value={form.email}
              onChange={(value) => update("email", value)}
              autoComplete="email"
              required
            />
            <Field
              id="organisation"
              label="Organisation"
              value={form.organisation}
              onChange={(value) => update("organisation", value)}
              autoComplete="organization"
              className="sm:col-span-2"
            />

            <div className="sm:col-span-2">
              <label
                htmlFor="interest"
                className="mb-2 block text-xs font-medium uppercase tracking-[0.14em] text-muted"
              >
                What can we help with?
              </label>
              <div className="relative">
                <select
                  id="interest"
                  value={form.interest}
                  onChange={(event) => update("interest", event.target.value)}
                  className="w-full appearance-none rounded-2xl border border-border-subtle bg-surface-raised/40 px-4 py-3.5 text-sm outline-none transition-colors duration-300 focus:border-brand-orange/60"
                >
                  {services.map((service) => (
                    <option key={service.slug} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                  <option value="Something else">Something else</option>
                </select>
                <Icon
                  name="chevronDown"
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </div>

            <Field
              id="message"
              label="Project brief"
              value={form.message}
              onChange={(value) => update("message", value)}
              multiline
              required
              className="sm:col-span-2"
            />
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button
              type="submit"
              size="lg"
              icon={status === "success" ? "check" : "arrowRight"}
              disabled={status === "loading"}
              magnetic={false}
            >
              {status === "loading"
                ? "Sending…"
                : status === "success"
                  ? "Message sent"
                  : "Send message"}
            </Button>

            <p className="text-xs text-muted">
              Or email{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-foreground underline decoration-brand-orange/50 underline-offset-4"
              >
                {contact.email}
              </a>
            </p>
          </div>

          {feedback && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              role="status"
              aria-live="polite"
              className={cn(
                "mt-4 rounded-xl border px-4 py-3 text-sm",
                status === "error"
                  ? "border-red-500/30 bg-red-500/10 text-red-400"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
              )}
            >
              {feedback}
            </motion.p>
          )}
        </form>

        {/* Details + map */}
        <div className="flex flex-col gap-6">
          <ul className="reveal glass grid gap-px overflow-hidden rounded-3xl sm:grid-cols-2 lg:grid-cols-1">
            {details.map((detail) => (
              <li key={detail.label}>
                <a
                  href={detail.href}
                  target={detail.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-5 transition-colors duration-300 hover:bg-foreground/4"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border-subtle text-brand-orange transition-transform duration-500 group-hover:scale-110">
                    <Icon name={detail.icon} size={17} />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                      {detail.label}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {detail.value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Map — lazy-loaded so it never blocks first paint */}
          <div className="reveal glass relative overflow-hidden rounded-3xl">
            <iframe
              title="Prismaforge location — Kaduna, Nigeria"
              src={contact.mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0 grayscale-[0.6] contrast-[1.1] transition-all duration-700 hover:grayscale-0 lg:h-72"
            />
          </div>

          <ul className="reveal flex flex-wrap gap-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition-colors duration-300 hover:text-brand-orange"
                >
                  <Icon name={social.icon as IconName} size={15} />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

/** Floating-label input. `peer` + `:placeholder-shown` keeps it CSS-only. */
function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  multiline = false,
  required = false,
  autoComplete,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  multiline?: boolean;
  required?: boolean;
  autoComplete?: string;
  className?: string;
}) {
  const shared = {
    id,
    name: id,
    value,
    required,
    autoComplete,
    placeholder: " ",
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => onChange(event.target.value),
    className:
      "peer w-full rounded-2xl border border-border-subtle bg-surface-raised/40 px-4 pb-2.5 pt-6 text-sm outline-none transition-colors duration-300 placeholder-shown:pt-3.5 placeholder-shown:pb-3.5 focus:border-brand-orange/60",
  };

  return (
    <div className={cn("relative", className)}>
      {multiline ? (
        <textarea {...shared} rows={4} className={`${shared.className} resize-none`} />
      ) : (
        <input {...shared} type={type} />
      )}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-4 top-2.5 text-[0.66rem] uppercase tracking-[0.14em] text-muted transition-all duration-300 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:top-2.5 peer-focus:text-[0.66rem] peer-focus:uppercase peer-focus:tracking-[0.14em] peer-focus:text-brand-orange"
      >
        {label}
        {required && <span className="text-brand-orange"> *</span>}
      </label>
    </div>
  );
}
