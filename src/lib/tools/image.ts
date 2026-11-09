/**
 * Browser-side image processing for uploaded logos and photos.
 *
 * Uploads never leave the device: the file is decoded, downscaled on a
 * canvas and re-encoded, which also strips EXIF metadata such as GPS tags.
 */

import type { VCardImage } from "./vcard";

export const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export interface ProcessedImage {
  /** PNG data URL, transparency kept — used in the QR and card preview. */
  previewUrl: string;
  /** Small JPEG for the vCard (phones ignore large inline images). */
  vcard: VCardImage;
  fileName: string;
}

export async function processImage(file: File): Promise<ProcessedImage> {
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Use a PNG, JPG, WebP or SVG image.");
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error("That image is larger than 5 MB. Please use a smaller file.");
  }

  const source = await loadImage(file);

  const previewUrl = drawContained(source, 512, null).toDataURL("image/png");
  // vCard photos are shown in a circle/square at small sizes; 320px JPEG on a
  // white plate keeps the file small and avoids black backgrounds behind
  // transparent PNG logos on iOS.
  const jpeg = drawContained(source, 320, "#ffffff").toDataURL("image/jpeg", 0.86);

  return {
    previewUrl,
    vcard: { type: "JPEG", base64: jpeg.slice(jpeg.indexOf(",") + 1) },
    fileName: file.name,
  };
}

async function loadImage(file: File): Promise<HTMLImageElement> {
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.src = url;
    await image.decode();
    if (!image.naturalWidth || !image.naturalHeight) {
      // SVGs without width/height decode to 0×0; give them a default box.
      image.width = 512;
      image.height = 512;
    }
    return image;
  } catch {
    throw new Error("That file couldn't be read as an image.");
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Draws the image centred inside a square canvas, preserving aspect ratio. */
function drawContained(image: HTMLImageElement, size: number, fill: string | null) {
  const width = image.naturalWidth || image.width || size;
  const height = image.naturalHeight || image.height || size;
  const scale = Math.min(size / width, size / height);
  const w = Math.round(width * scale);
  const h = Math.round(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not supported in this browser.");

  if (fill) {
    context.fillStyle = fill;
    context.fillRect(0, 0, size, size);
  }
  context.imageSmoothingQuality = "high";
  context.drawImage(image, (size - w) / 2, (size - h) / 2, w, h);
  return canvas;
}

/** Triggers a download of a blob with the given file name. */
export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Give Safari a moment to start the download before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
