"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/ui/Icon";
import type { ProcessedImage } from "@/lib/tools/image";
import {
  EMPTY_QR_FIELDS,
  buildPayload,
  type QrFields,
  type QrType,
} from "@/lib/tools/qr-payloads";
import { SelectField, TextField } from "./fields";
import { QrDesigner } from "./QrDesigner";

const TYPES: { value: QrType; label: string; icon: IconName }[] = [
  { value: "url", label: "Website", icon: "globe" },
  { value: "text", label: "Text", icon: "text" },
  { value: "email", label: "Email", icon: "mail" },
  { value: "phone", label: "Call", icon: "phone" },
  { value: "sms", label: "SMS", icon: "message" },
  { value: "whatsapp", label: "WhatsApp", icon: "whatsapp" },
  { value: "wifi", label: "Wi-Fi", icon: "wifi" },
];

/** General-purpose QR generator: links, text, email, phone, SMS, WhatsApp and Wi-Fi. */
export function QrGenerator() {
  const [type, setType] = useState<QrType>("url");
  const [fields, setFields] = useState<QrFields>(EMPTY_QR_FIELDS);
  const [logo, setLogo] = useState<ProcessedImage | null>(null);

  const set =
    <K extends keyof QrFields>(field: K) =>
    (value: QrFields[K]) =>
      setFields((previous) => ({ ...previous, [field]: value }));

  const result = useMemo(() => buildPayload(type, fields), [type, fields]);
  const touched = useMemo(() => {
    const relevant: Record<QrType, (keyof QrFields)[]> = {
      url: ["url"],
      text: ["text"],
      email: ["email"],
      phone: ["phone"],
      sms: ["phone"],
      whatsapp: ["phone"],
      wifi: ["ssid", "password"],
    };
    return relevant[type].some((key) => String(fields[key]).trim() !== "");
  }, [type, fields]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start">
      <div className="glass rounded-3xl p-6 sm:p-9">
        <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em]">
          What should the QR do?
        </h2>
        <div role="tablist" aria-label="QR code type" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {TYPES.map((option) => (
            <button
              key={option.value}
              type="button"
              role="tab"
              aria-selected={type === option.value}
              onClick={() => setType(option.value)}
              className={cn(
                "flex h-12 items-center justify-center gap-2 rounded-2xl border text-sm transition-colors",
                type === option.value
                  ? "border-brand-orange/60 bg-brand-orange/10 text-foreground"
                  : "border-border-subtle text-muted hover:text-foreground",
              )}
            >
              <Icon name={option.icon} size={16} />
              {option.label}
            </button>
          ))}
        </div>

        <form
          className="mt-8 grid gap-4 sm:grid-cols-2"
          onSubmit={(event) => event.preventDefault()}
          noValidate
        >
          {type === "url" && (
            <TextField
              label="Web address"
              type="url"
              inputMode="url"
              value={fields.url}
              onChange={set("url")}
              placeholder="https://example.com"
              maxLength={1500}
              className="sm:col-span-2"
            />
          )}

          {type === "text" && (
            <TextField
              label="Text"
              value={fields.text}
              onChange={set("text")}
              multiline
              maxLength={1000}
              hint={`${fields.text.length}/1000 characters — shorter text gives an easier-to-scan code.`}
              className="sm:col-span-2"
            />
          )}

          {type === "email" && (
            <>
              <TextField label="Send to" type="email" inputMode="email" value={fields.email} onChange={set("email")} placeholder="hello@company.com" className="sm:col-span-2" />
              <TextField label="Subject (optional)" value={fields.subject} onChange={set("subject")} className="sm:col-span-2" />
              <TextField label="Message (optional)" value={fields.body} onChange={set("body")} multiline maxLength={500} className="sm:col-span-2" />
            </>
          )}

          {(type === "phone" || type === "sms" || type === "whatsapp") && (
            <TextField
              label={type === "whatsapp" ? "WhatsApp number" : "Phone number"}
              type="tel"
              inputMode="tel"
              value={fields.phone}
              onChange={set("phone")}
              placeholder="+234 813 000 0000"
              hint={type === "whatsapp" ? "Include the country code." : undefined}
              className="sm:col-span-2"
            />
          )}

          {(type === "sms" || type === "whatsapp") && (
            <TextField
              label="Pre-filled message (optional)"
              value={fields.message}
              onChange={set("message")}
              multiline
              maxLength={500}
              className="sm:col-span-2"
            />
          )}

          {type === "wifi" && (
            <>
              <TextField label="Network name (SSID)" value={fields.ssid} onChange={set("ssid")} maxLength={64} />
              <SelectField
                label="Security"
                value={fields.encryption}
                onChange={set("encryption")}
                options={[
                  { value: "WPA", label: "WPA / WPA2 / WPA3" },
                  { value: "WEP", label: "WEP" },
                  { value: "nopass", label: "No password" },
                ]}
              />
              {fields.encryption !== "nopass" && (
                <TextField label="Password" value={fields.password} onChange={set("password")} maxLength={64} autoComplete="off" />
              )}
              <label className="flex items-center gap-3 self-end pb-3 text-sm">
                <input
                  type="checkbox"
                  checked={fields.hidden}
                  onChange={(event) => set("hidden")(event.target.checked)}
                  className="size-4 accent-[var(--color-brand-orange)]"
                />
                Hidden network
              </label>
            </>
          )}
        </form>

        {touched && !result.ok && (
          <p role="status" className="mt-4 text-sm text-amber-500">
            {result.error}
          </p>
        )}

        <div className="mt-10 rounded-2xl border border-border-subtle bg-surface-raised/30 p-5 text-sm leading-relaxed text-muted">
          <p className="flex items-center gap-2 font-medium text-foreground">
            <Icon name="check" size={16} className="text-brand-orange" />
            Static, permanent codes
          </p>
          <p className="mt-2">
            The content is stored inside the QR itself, so it works offline, has no
            scan limits and never expires. To change where a printed code points, generate
            a new one.
          </p>
        </div>
      </div>

      <aside className="lg:sticky lg:top-28">
        <QrDesigner
          payload={result.ok ? result.payload : null}
          emptyMessage="Fill in the details to see your QR code."
          fileBase={type}
          tool="qr"
          logo={logo}
          onLogoChange={setLogo}
        />
      </aside>
    </div>
  );
}
