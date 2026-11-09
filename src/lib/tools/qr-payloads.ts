/**
 * Payload builders for general-purpose QR codes.
 *
 * Each builder produces the exact string phone cameras understand natively
 * (URL, mailto:, tel:, SMSTO:, WIFI:), so the QR works without any app or
 * redirect service — and never expires.
 */

import { normalizePhone, normalizeUrl } from "./vcard";

export type QrType = "url" | "text" | "email" | "phone" | "sms" | "whatsapp" | "wifi";

export interface QrFields {
  url: string;
  text: string;
  email: string;
  subject: string;
  body: string;
  phone: string;
  message: string;
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

export const EMPTY_QR_FIELDS: QrFields = {
  url: "",
  text: "",
  email: "",
  subject: "",
  body: "",
  phone: "",
  message: "",
  ssid: "",
  password: "",
  encryption: "WPA",
  hidden: false,
};

/** Escapes the WIFI: special characters `\ ; , : "`. */
export function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

export type PayloadResult = { ok: true; payload: string } | { ok: false; error: string };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function buildPayload(type: QrType, f: QrFields): PayloadResult {
  switch (type) {
    case "url": {
      const url = normalizeUrl(f.url);
      if (!url) return { ok: false, error: "Enter a link." };
      try {
        const parsed = new URL(url);
        if (!["http:", "https:"].includes(parsed.protocol) || !parsed.hostname.includes(".")) {
          throw new Error();
        }
      } catch {
        return { ok: false, error: "That doesn't look like a valid web address." };
      }
      return { ok: true, payload: url };
    }

    case "text": {
      if (!f.text.trim()) return { ok: false, error: "Enter some text." };
      return { ok: true, payload: f.text };
    }

    case "email": {
      const email = f.email.trim();
      if (!EMAIL_PATTERN.test(email)) return { ok: false, error: "Enter a valid email address." };
      const params = new URLSearchParams();
      if (f.subject.trim()) params.set("subject", f.subject.trim());
      if (f.body.trim()) params.set("body", f.body.trim());
      // URLSearchParams encodes spaces as "+", which mail apps show literally.
      const query = params.toString().replace(/\+/g, "%20");
      return { ok: true, payload: `mailto:${email}${query ? `?${query}` : ""}` };
    }

    case "phone": {
      const phone = normalizePhone(f.phone);
      if (phone.replace("+", "").length < 5) return { ok: false, error: "Enter a phone number." };
      return { ok: true, payload: `tel:${phone}` };
    }

    case "sms": {
      const phone = normalizePhone(f.phone);
      if (phone.replace("+", "").length < 5) return { ok: false, error: "Enter a phone number." };
      return { ok: true, payload: `SMSTO:${phone}:${f.message.trim()}` };
    }

    case "whatsapp": {
      // wa.me wants the international number with no "+" or leading zeros.
      const digits = normalizePhone(f.phone).replace("+", "");
      if (digits.length < 8) {
        return { ok: false, error: "Enter the number in international format, e.g. +234 813 000 0000." };
      }
      const text = f.message.trim();
      return {
        ok: true,
        payload: `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`,
      };
    }

    case "wifi": {
      if (!f.ssid) return { ok: false, error: "Enter the network name (SSID)." };
      if (f.encryption !== "nopass" && !f.password) {
        return { ok: false, error: "Enter the Wi-Fi password, or choose “No password”." };
      }
      const parts = [`T:${f.encryption}`, `S:${escapeWifi(f.ssid)}`];
      if (f.encryption !== "nopass") parts.push(`P:${escapeWifi(f.password)}`);
      if (f.hidden) parts.push("H:true");
      return { ok: true, payload: `WIFI:${parts.join(";")};;` };
    }
  }
}
