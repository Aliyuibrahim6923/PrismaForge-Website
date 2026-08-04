import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Validates and rate-limits, then hands off to your mail provider. The
 * delivery step is deliberately left as a single marked TODO so wiring
 * Resend / SendGrid / Nodemailer is a five-line change — everything around
 * it (validation, limits, error shape) is already production-shaped.
 */

export const runtime = "nodejs";

interface ContactPayload {
  name?: string;
  email?: string;
  organisation?: string;
  interest?: string;
  message?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * In-memory sliding window: 5 submissions per IP per 10 minutes.
 * Fine for a single instance; move to Redis/Upstash if you scale out.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow unbounded.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time > WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { message: "Too many messages. Please try again shortly." },
      { status: 429 },
    );
  }

  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const message = payload.message?.trim() ?? "";

  const errors: string[] = [];
  if (name.length < 2) errors.push("a name");
  if (!EMAIL_PATTERN.test(email)) errors.push("a valid email address");
  if (message.length < 10) errors.push("a slightly longer brief");

  if (errors.length) {
    return NextResponse.json(
      { message: `Please provide ${errors.join(", ")}.` },
      { status: 400 },
    );
  }

  // Cheap guard against oversized payloads.
  if (message.length > 5000) {
    return NextResponse.json(
      { message: "That brief is too long — please summarise or email us." },
      { status: 413 },
    );
  }

  // TODO: deliver the enquiry. Example with Resend:
  //
  //   await resend.emails.send({
  //     from: "site@prismaforge.ng",
  //     to: "info@prismaforge.ng",
  //     replyTo: email,
  //     subject: `New enquiry — ${payload.interest ?? "General"}`,
  //     text: `${name} (${payload.organisation ?? "—"})\n\n${message}`,
  //   });
  //
  // Until then the submission is logged server-side so nothing is lost
  // silently during staging.
  console.info("[contact] enquiry received", {
    name,
    email,
    organisation: payload.organisation ?? null,
    interest: payload.interest ?? null,
    length: message.length,
  });

  return NextResponse.json({
    message: "Thank you — your brief is with us. We'll reply within one working day.",
  });
}
