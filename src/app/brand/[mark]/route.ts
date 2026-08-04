import {
  productMarkNames,
  renderMarkSvg,
  type ProductMarkName,
} from "@/lib/brand/product-marks";

/**
 * Downloadable product logos, generated from the shared geometry.
 *
 *   /brand/lms.svg           navy mark, for light backgrounds
 *   /brand/lms-inverse.svg   paper-white mark, for navy/dark backgrounds
 *
 * Serving these from the registry rather than committing static files
 * means the artwork designers download is always the artwork the site
 * renders — they cannot drift apart.
 */

const INVERSE_SUFFIX = "-inverse.svg";
const SUFFIX = ".svg";

export function generateStaticParams() {
  return productMarkNames.flatMap((name) => [
    { mark: `${name}${SUFFIX}` },
    { mark: `${name}${INVERSE_SUFFIX}` },
  ]);
}

export const dynamicParams = false;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ mark: string }> },
) {
  const { mark } = await params;

  const inverse = mark.endsWith(INVERSE_SUFFIX);
  const name = mark.slice(
    0,
    -(inverse ? INVERSE_SUFFIX.length : SUFFIX.length),
  ) as ProductMarkName;

  if (!productMarkNames.includes(name)) {
    return new Response("Not found", { status: 404 });
  }

  const svg = renderMarkSvg(name, {
    letterColor: inverse ? "#f4f7fc" : "#1b2a5c",
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
