"use client";

import { useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { ACCEPTED_IMAGE_TYPES, processImage, type ProcessedImage } from "@/lib/tools/image";

const inputClass =
  "w-full rounded-2xl border border-border-subtle bg-surface-raised/40 px-4 py-3 text-sm outline-none transition-colors duration-300 placeholder:text-muted/60 focus:border-brand-orange/60";

const labelClass = "mb-1.5 block text-xs font-medium uppercase tracking-[0.14em] text-muted";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  multiline?: boolean;
  maxLength?: number;
  hint?: string;
  className?: string;
}

/** Labelled input with a stacked label — denser than the floating-label contact form. */
export function TextField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  multiline = false,
  maxLength = 300,
  hint,
  className,
}: TextFieldProps) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={3}
          className={cn(inputClass, "resize-y")}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          className={inputClass}
        />
      )}
      {hint && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
  className,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  className?: string;
}) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value as T)}
          className={cn(inputClass, "appearance-none pr-10")}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevronDown"
          size={16}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </div>
  );
}

export function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <div className="flex items-center gap-3 rounded-2xl border border-border-subtle bg-surface-raised/40 px-3 py-2">
        <input
          id={id}
          type="color"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="size-8 shrink-0 cursor-pointer rounded-lg border-0 bg-transparent p-0"
        />
        <span className="font-mono text-xs uppercase text-muted">{value}</span>
      </div>
    </div>
  );
}

/** Uploads, validates and downscales an image entirely in the browser. */
export function ImageUpload({
  label,
  hint,
  image,
  onChange,
}: {
  label: string;
  hint?: string;
  image: ProcessedImage | null;
  onChange: (image: ProcessedImage | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const id = useId();

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    setBusy(true);
    try {
      onChange(await processImage(file));
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "Couldn't use that image.");
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <span id={`${id}-label`} className={labelClass}>
        {label}
      </span>
      <div
        className="flex items-center gap-4 rounded-2xl border border-dashed border-border-subtle bg-surface-raised/30 p-3"
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          void handleFile(event.dataTransfer.files[0]);
        }}
      >
        <span className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-border-subtle bg-white">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element -- local data URL
            <img src={image.previewUrl} alt="" className="size-full object-contain p-1" />
          ) : (
            <Icon name="image" size={22} className="text-ink-400" />
          )}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              aria-describedby={`${id}-label`}
              disabled={busy}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border-subtle px-4 text-sm transition-colors hover:border-brand-orange/50 hover:text-brand-orange disabled:opacity-50"
            >
              <Icon name="upload" size={15} />
              {busy ? "Processing…" : image ? "Replace" : "Upload"}
            </button>
            {image && (
              <button
                type="button"
                onClick={() => onChange(null)}
                className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm text-muted transition-colors hover:text-foreground"
              >
                <Icon name="trash" size={15} />
                Remove
              </button>
            )}
          </div>
          <p className="mt-1.5 truncate text-xs text-muted">
            {image ? image.fileName : (hint ?? "PNG, JPG, WebP or SVG · up to 5 MB")}
          </p>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          className="sr-only"
          tabIndex={-1}
          aria-hidden
          onChange={(event) => void handleFile(event.target.files?.[0])}
        />
      </div>
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

/** Titled group inside a generator form. */
export function FieldGroup({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <fieldset className={cn("grid gap-4 sm:grid-cols-2", className)}>
      <legend className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}
