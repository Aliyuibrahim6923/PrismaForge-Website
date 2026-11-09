import { describe, expect, it } from "vitest";
import { EMPTY_QR_FIELDS, buildPayload, escapeWifi } from "./qr-payloads";

const f = (overrides: Partial<typeof EMPTY_QR_FIELDS>) => ({ ...EMPTY_QR_FIELDS, ...overrides });
const BS = "\\";

describe("QR payloads", () => {
  it("normalizes and validates URLs", () => {
    expect(buildPayload("url", f({ url: "prismaforge.ng" }))).toEqual({
      ok: true,
      payload: "https://prismaforge.ng",
    });
    expect(buildPayload("url", f({ url: "javascript:alert(1)" })).ok).toBe(false);
    expect(buildPayload("url", f({ url: "" })).ok).toBe(false);
  });

  it("builds mailto links with encoded spaces", () => {
    expect(buildPayload("email", f({ email: "a@b.co", subject: "Hello there" }))).toEqual({
      ok: true,
      payload: "mailto:a@b.co?subject=Hello%20there",
    });
    expect(buildPayload("email", f({ email: "not-an-email" })).ok).toBe(false);
  });

  it("builds tel, SMS and WhatsApp payloads", () => {
    expect(buildPayload("phone", f({ phone: "+234 813 281 5411" }))).toEqual({
      ok: true,
      payload: "tel:+2348132815411",
    });
    expect(buildPayload("sms", f({ phone: "08132815411", message: "Hi" }))).toEqual({
      ok: true,
      payload: "SMSTO:08132815411:Hi",
    });
    expect(buildPayload("whatsapp", f({ phone: "+234 813 281 5411", message: "Hi there" }))).toEqual({
      ok: true,
      payload: "https://wa.me/2348132815411?text=Hi%20there",
    });
  });

  it("escapes Wi-Fi special characters", () => {
    expect(escapeWifi(`a;b,c:d"e${BS}f`)).toBe(`a${BS};b${BS},c${BS}:d${BS}"e${BS}${BS}f`);
    expect(
      buildPayload("wifi", f({ ssid: "Office;5G", password: "p:ss", encryption: "WPA", hidden: true })),
    ).toEqual({ ok: true, payload: `WIFI:T:WPA;S:Office${BS};5G;P:p${BS}:ss;H:true;;` });
    expect(buildPayload("wifi", f({ ssid: "Guest", encryption: "nopass" }))).toEqual({
      ok: true,
      payload: "WIFI:T:nopass;S:Guest;;",
    });
    expect(buildPayload("wifi", f({ ssid: "Guest", encryption: "WPA" })).ok).toBe(false);
  });
});
