import { describe, expect, it } from "vitest";
import {
  EMPTY_VCARD,
  buildVCard,
  buildVCardForQr,
  escapeValue,
  foldLine,
  normalizePhone,
  vcardFileName,
} from "./vcard";

const sample = {
  ...EMPTY_VCARD,
  firstName: "Amina",
  lastName: "Bello",
  organization: "Acme, Ltd; Kaduna",
  title: "Head of Ops",
  mobile: "+234 (813) 281-5411",
  email: "amina@acme.ng",
  website: "acme.ng",
  city: "Kaduna",
  country: "Nigeria",
  note: "Line one\nLine two",
};

const BS = "\\";

describe("vCard builder", () => {
  it("escapes RFC 2426 special characters", () => {
    expect(escapeValue(`a,b;c${BS}d\ne`)).toBe(`a${BS},b${BS};c${BS}${BS}d${BS}ne`);
  });

  it("produces a valid vCard 3.0 with CRLF line endings", () => {
    const card = buildVCard(sample);
    expect(card.startsWith("BEGIN:VCARD\r\nVERSION:3.0\r\n")).toBe(true);
    expect(card.endsWith("END:VCARD\r\n")).toBe(true);
    expect(card).toContain("N:Bello;Amina;;;");
    expect(card).toContain("FN:Amina Bello");
    expect(card).toContain(`ORG:Acme${BS}, Ltd${BS}; Kaduna`);
    expect(card).toContain("TEL;TYPE=CELL,VOICE:+2348132815411");
    expect(card).toContain("URL;TYPE=WORK:https://acme.ng");
    expect(card).toContain("ADR;TYPE=WORK:;;;Kaduna;;;Nigeria");
    expect(card).toContain(`NOTE:Line one${BS}nLine two`);
    expect(card.replace(/\r\n/g, "")).not.toMatch(/\n/);
  });

  it("embeds photo and logo only in the file version", () => {
    const image = { type: "JPEG" as const, base64: "A".repeat(400) };
    const card = buildVCard(sample, { logo: image });
    expect(card).toContain("PHOTO;ENCODING=b;TYPE=JPEG:");
    expect(card).toContain("LOGO;ENCODING=b;TYPE=JPEG:");

    const qr = buildVCardForQr(sample);
    expect(qr).not.toContain("PHOTO");
    expect(qr).not.toContain("NOTE");
    expect(qr).not.toContain("REV:");
  });

  it("folds long lines at 75 octets without splitting UTF-8 characters", () => {
    const line = `NOTE:${"ẹ".repeat(60)}`;
    const folded = foldLine(line);
    const encoder = new TextEncoder();
    for (const part of folded.split("\r\n")) {
      expect(encoder.encode(part).length).toBeLessThanOrEqual(75);
    }
    const unfolded = folded
      .split("\r\n")
      .map((part, index) => (index ? part.slice(1) : part))
      .join("");
    expect(unfolded).toBe(line);
  });

  it("normalizes phone numbers and file names", () => {
    expect(normalizePhone("0813 281 5411")).toBe("08132815411");
    expect(normalizePhone("+234-813")).toBe("+234813");
    expect(vcardFileName(sample)).toBe("amina-bello.vcf");
    expect(vcardFileName(EMPTY_VCARD)).toBe("contact.vcf");
  });
});
