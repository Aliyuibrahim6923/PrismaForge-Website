/**
 * vCard 3.0 builder for the free contact-card tool.
 *
 * Version 3.0 rather than 4.0 on purpose: it is the version iOS Contacts,
 * Android (Google Contacts) and Outlook all import reliably, including the
 * inline base64 PHOTO / LOGO properties.
 *
 * Everything here is pure and runs in the browser — no contact data is ever
 * sent to a server.
 */

export interface VCardData {
  firstName: string;
  lastName: string;
  organization: string;
  title: string;
  department: string;
  mobile: string;
  workPhone: string;
  email: string;
  website: string;
  street: string;
  city: string;
  region: string;
  postcode: string;
  country: string;
  linkedin: string;
  twitter: string;
  note: string;
}

export const EMPTY_VCARD: VCardData = {
  firstName: "",
  lastName: "",
  organization: "",
  title: "",
  department: "",
  mobile: "",
  workPhone: "",
  email: "",
  website: "",
  street: "",
  city: "",
  region: "",
  postcode: "",
  country: "",
  linkedin: "",
  twitter: "",
  note: "",
};

/** An inline image already encoded as base64 (no `data:` prefix). */
export interface VCardImage {
  type: "JPEG" | "PNG";
  base64: string;
}

export interface VCardImages {
  /** Shown as the contact's picture on phones. */
  photo?: VCardImage | null;
  /** Company logo — kept by Outlook and some Android builds. */
  logo?: VCardImage | null;
}

/** Escapes a text value per RFC 2426 §5 (backslash, comma, semicolon, newline). */
export function escapeValue(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r\n|\r|\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

const encoder = new TextEncoder();

/**
 * Folds a content line at 75 octets with CRLF + space, never splitting a
 * multi-byte UTF-8 character (names in Hausa, Yoruba or Arabic stay intact).
 */
export function foldLine(line: string): string {
  if (encoder.encode(line).length <= 75) return line;

  const parts: string[] = [];
  let current = "";
  let currentBytes = 0;
  // First line may hold 75 octets; continuation lines 74 + the leading space.
  let limit = 75;

  for (const char of line) {
    const size = encoder.encode(char).length;
    if (currentBytes + size > limit) {
      parts.push(current);
      current = "";
      currentBytes = 0;
      limit = 74;
    }
    current += char;
    currentBytes += size;
  }
  parts.push(current);

  return parts.join("\r\n ");
}

/** Adds `https://` to bare domains so phones render them as links. */
export function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /^[a-z][a-z0-9+.-]*:/i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/** Keeps a leading `+` and digits only — the form every dialer accepts. */
export function normalizePhone(value: string): string {
  const trimmed = value.trim();
  const digits = trimmed.replace(/[^\d]/g, "");
  if (!digits) return "";
  return trimmed.startsWith("+") ? `+${digits}` : digits;
}

export function fullName(data: Pick<VCardData, "firstName" | "lastName">) {
  return [data.firstName.trim(), data.lastName.trim()].filter(Boolean).join(" ");
}

/** A card needs at least a name or an organization to be importable. */
export function hasIdentity(data: VCardData) {
  return Boolean(fullName(data) || data.organization.trim());
}

/**
 * Builds the vCard text.
 *
 * Pass `images` for the downloadable `.vcf`; omit them for the QR payload,
 * where every byte counts and inline images would never fit.
 */
export function buildVCard(data: VCardData, images: VCardImages = {}): string {
  const t = (value: string) => escapeValue(value.trim());
  const name = fullName(data);
  const lines: string[] = ["BEGIN:VCARD", "VERSION:3.0"];

  lines.push(`N:${t(data.lastName)};${t(data.firstName)};;;`);
  lines.push(`FN:${t(name || data.organization)}`);

  if (data.organization.trim() || data.department.trim()) {
    const org = [t(data.organization)];
    if (data.department.trim()) org.push(t(data.department));
    lines.push(`ORG:${org.join(";")}`);
  }
  if (data.title.trim()) lines.push(`TITLE:${t(data.title)}`);

  const mobile = normalizePhone(data.mobile);
  const work = normalizePhone(data.workPhone);
  if (mobile) lines.push(`TEL;TYPE=CELL,VOICE:${mobile}`);
  if (work) lines.push(`TEL;TYPE=WORK,VOICE:${work}`);

  if (data.email.trim()) lines.push(`EMAIL;TYPE=INTERNET,WORK:${t(data.email)}`);

  const website = normalizeUrl(data.website);
  if (website) lines.push(`URL;TYPE=WORK:${escapeValue(website)}`);

  const address = [data.street, data.city, data.region, data.postcode, data.country];
  if (address.some((part) => part.trim())) {
    // ADR: PO box; extended; street; locality; region; postal code; country
    lines.push(`ADR;TYPE=WORK:;;${address.map(t).join(";")}`);
  }

  const linkedin = normalizeUrl(data.linkedin);
  if (linkedin) {
    lines.push(`X-SOCIALPROFILE;TYPE=linkedin:${escapeValue(linkedin)}`);
  }
  const twitter = twitterUrl(data.twitter);
  if (twitter) {
    lines.push(`X-SOCIALPROFILE;TYPE=twitter:${escapeValue(twitter)}`);
  }

  if (data.note.trim()) lines.push(`NOTE:${t(data.note)}`);

  const photo = images.photo ?? images.logo;
  if (photo) lines.push(`PHOTO;ENCODING=b;TYPE=${photo.type}:${photo.base64}`);
  if (images.logo) {
    lines.push(`LOGO;ENCODING=b;TYPE=${images.logo.type}:${images.logo.base64}`);
  }

  lines.push(`REV:${new Date().toISOString().replace(/\.\d{3}/, "")}`);
  lines.push("END:VCARD");

  return lines.map(foldLine).join("\r\n") + "\r\n";
}

/**
 * The compact variant encoded into the QR code: no images, no REV and no
 * note, so the code stays small enough to scan reliably when printed.
 */
export function buildVCardForQr(data: VCardData): string {
  return buildVCard({ ...data, note: "" })
    .split("\r\n")
    .filter((line) => !line.startsWith("REV:"))
    .join("\r\n");
}

/** `@handle`, `handle` or a full URL → profile URL. */
function twitterUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed) || trimmed.includes(".")) return normalizeUrl(trimmed);
  return `https://x.com/${trimmed.replace(/^@/, "")}`;
}

/** Safe file name for the download, e.g. `ada-lovelace.vcf`. */
export function vcardFileName(data: VCardData): string {
  const base = (fullName(data) || data.organization || "contact")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${base || "contact"}.vcf`;
}
