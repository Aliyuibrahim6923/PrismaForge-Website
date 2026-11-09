"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { trackEvent } from "@/lib/analytics";
import { downloadBlob, type ProcessedImage } from "@/lib/tools/image";
import {
  EMPTY_VCARD,
  buildVCard,
  buildVCardForQr,
  fullName,
  hasIdentity,
  normalizeUrl,
  vcardFileName,
  type VCardData,
} from "@/lib/tools/vcard";
import { FieldGroup, ImageUpload, TextField } from "./fields";
import { QrDesigner } from "./QrDesigner";

/**
 * Free vCard + QR generator.
 *
 * The QR encodes the contact itself (not a link), so scanning it opens the
 * phone's "Add contact" screen directly — no server, no expiry. The `.vcf`
 * download additionally carries the uploaded logo/photo.
 */
export function VCardGenerator() {
  const [data, setData] = useState<VCardData>(EMPTY_VCARD);
  const [logo, setLogo] = useState<ProcessedImage | null>(null);
  const [photo, setPhoto] = useState<ProcessedImage | null>(null);
  const [notice, setNotice] = useState("");

  const set = (field: keyof VCardData) => (value: string) =>
    setData((previous) => ({ ...previous, [field]: value }));

  const ready = hasIdentity(data);
  const qrPayload = useMemo(() => (ready ? buildVCardForQr(data) : null), [data, ready]);
  const fileName = vcardFileName(data);
  const fileBase = fileName.replace(/\.vcf$/, "");

  const vcfBlob = () =>
    new Blob([buildVCard(data, { logo: logo?.vcard, photo: photo?.vcard })], {
      type: "text/vcard;charset=utf-8",
    });

  const downloadVcf = () => {
    downloadBlob(vcfBlob(), fileName);
    trackEvent("tool_download", { tool: "vcard", format: "vcf" });
  };

  // On phones, the share sheet is the most reliable way to land the card in
  // Contacts (Android in particular handles downloaded .vcf files poorly).
  // Detected after mount so server and client markup match.
  const [canShare, setCanShare] = useState(false);
  useEffect(() => {
    try {
      setCanShare(
        typeof navigator.canShare === "function" &&
          navigator.canShare({ files: [new File([""], "contact.vcf", { type: "text/vcard" })] }),
      );
    } catch {
      setCanShare(false);
    }
  }, []);

  const shareVcf = async () => {
    setNotice("");
    const file = new File([vcfBlob()], fileName, { type: "text/vcard" });
    try {
      await navigator.share({ files: [file], title: fullName(data) || data.organization });
      trackEvent("tool_download", { tool: "vcard", format: "share" });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setNotice("Sharing isn't available here — use “Download .vcf” instead.");
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start">
      <form
        className="glass rounded-3xl p-6 sm:p-9"
        onSubmit={(event) => event.preventDefault()}
        noValidate
      >
        <div className="grid gap-10">
          <FieldGroup title="Branding">
            <ImageUpload
              label="Company logo"
              hint="Shown on the card and in the QR centre"
              image={logo}
              onChange={setLogo}
            />
            <ImageUpload
              label="Profile photo (optional)"
              hint="Used as the contact picture on phones"
              image={photo}
              onChange={setPhoto}
            />
          </FieldGroup>

          <FieldGroup title="Who">
            <TextField label="First name" value={data.firstName} onChange={set("firstName")} autoComplete="given-name" />
            <TextField label="Last name" value={data.lastName} onChange={set("lastName")} autoComplete="family-name" />
            <TextField label="Job title" value={data.title} onChange={set("title")} autoComplete="organization-title" />
            <TextField label="Organisation" value={data.organization} onChange={set("organization")} autoComplete="organization" />
            <TextField label="Department" value={data.department} onChange={set("department")} className="sm:col-span-2" />
          </FieldGroup>

          <FieldGroup title="Contact">
            <TextField label="Mobile" type="tel" inputMode="tel" value={data.mobile} onChange={set("mobile")} placeholder="+234 800 000 0000" autoComplete="tel" />
            <TextField label="Work phone" type="tel" inputMode="tel" value={data.workPhone} onChange={set("workPhone")} placeholder="+234 …" />
            <TextField label="Email" type="email" inputMode="email" value={data.email} onChange={set("email")} placeholder="you@company.com" autoComplete="email" />
            <TextField label="Website" type="url" inputMode="url" value={data.website} onChange={set("website")} placeholder="company.com" autoComplete="url" />
          </FieldGroup>

          <FieldGroup title="Address">
            <TextField label="Street" value={data.street} onChange={set("street")} autoComplete="street-address" className="sm:col-span-2" />
            <TextField label="City" value={data.city} onChange={set("city")} autoComplete="address-level2" />
            <TextField label="State / region" value={data.region} onChange={set("region")} autoComplete="address-level1" />
            <TextField label="Postcode" value={data.postcode} onChange={set("postcode")} autoComplete="postal-code" />
            <TextField label="Country" value={data.country} onChange={set("country")} autoComplete="country-name" />
          </FieldGroup>

          <FieldGroup title="Social & notes">
            <TextField label="LinkedIn URL" value={data.linkedin} onChange={set("linkedin")} placeholder="linkedin.com/in/…" />
            <TextField label="X / Twitter" value={data.twitter} onChange={set("twitter")} placeholder="@handle" />
            <TextField
              label="Note"
              value={data.note}
              onChange={set("note")}
              multiline
              maxLength={500}
              hint="Included in the .vcf file only, to keep the QR small."
              className="sm:col-span-2"
            />
          </FieldGroup>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => {
                setData(EMPTY_VCARD);
                setLogo(null);
                setPhoto(null);
              }}
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <Icon name="trash" size={15} />
              Clear form
            </button>
          </div>
        </div>
      </form>

      <aside className="grid gap-6 lg:sticky lg:top-28">
        <CardPreview data={data} logo={logo} photo={photo} />
        <QrDesigner
          payload={qrPayload}
          emptyMessage="Add a name or organisation to generate your contact QR."
          fileBase={fileBase}
          tool="vcard"
          logo={logo}
        >
          <div className="grid grid-cols-1 gap-2 border-t border-border-subtle pt-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={downloadVcf}
              disabled={!ready}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-brand-orange/50 text-sm font-medium text-foreground transition-colors hover:bg-brand-orange/10 disabled:opacity-40"
            >
              <Icon name="idCard" size={17} />
              Download .vcf
            </button>
            {canShare && (
              <button
                type="button"
                onClick={shareVcf}
                disabled={!ready}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border-subtle text-sm font-medium transition-colors hover:bg-foreground/5 disabled:opacity-40"
              >
                <Icon name="share" size={17} />
                Share / save
              </button>
            )}
          </div>
          {notice && <p className="text-xs text-muted">{notice}</p>}
        </QrDesigner>
      </aside>
    </div>
  );
}

/** Business-card style preview of what the contact will contain. */
function CardPreview({
  data,
  logo,
  photo,
}: {
  data: VCardData;
  logo: ProcessedImage | null;
  photo: ProcessedImage | null;
}) {
  const name = fullName(data);
  const role = [data.title, data.organization].map((part) => part.trim()).filter(Boolean).join(" · ");
  const address = [data.city, data.region, data.country].map((part) => part.trim()).filter(Boolean).join(", ");

  const rows: { icon: IconName; value: string }[] = [
    { icon: "phone" as const, value: data.mobile || data.workPhone },
    { icon: "mail" as const, value: data.email },
    { icon: "globe" as const, value: data.website ? normalizeUrl(data.website).replace(/^https?:\/\//, "") : "" },
    { icon: "pin" as const, value: address },
  ].filter((row) => row.value.trim());

  return (
    <div className="relative overflow-hidden rounded-3xl bg-white p-6 text-ink-900 shadow-[0_24px_60px_-20px_rgb(2_6_23/0.55)]">
      <div aria-hidden className="bg-brand absolute inset-x-0 top-0 h-1.5" />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate font-display text-xl font-semibold tracking-tight">
            {name || data.organization || "Your name"}
          </p>
          <p className="mt-1 truncate text-sm text-ink-400">{role || "Job title · Organisation"}</p>
        </div>
        {(photo || logo) && (
          // eslint-disable-next-line @next/next/no-img-element -- local data URL
          <img
            src={(photo ?? logo)!.previewUrl}
            alt=""
            className={photo ? "size-14 shrink-0 rounded-full object-cover" : "size-14 shrink-0 object-contain"}
          />
        )}
      </div>

      <ul className="mt-5 grid gap-2 text-sm">
        {rows.length ? (
          rows.map((row) => (
            <li key={row.icon} className="flex items-center gap-2.5 text-ink-600">
              <Icon name={row.icon} size={15} className="text-brand-orange" />
              <span className="truncate">{row.value}</span>
            </li>
          ))
        ) : (
          <li className="text-ink-300">Phone, email and website appear here.</li>
        )}
      </ul>

      {photo && logo && (
        // eslint-disable-next-line @next/next/no-img-element -- local data URL
        <img src={logo.previewUrl} alt="" className="mt-5 h-8 w-auto object-contain" />
      )}
    </div>
  );
}
