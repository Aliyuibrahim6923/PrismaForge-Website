import { NextResponse } from "next/server";

/**
 * Newsletter subscription endpoint.
 *
 * Validates the address and returns a friendly confirmation. Point the
 * marked TODO at your ESP (Mailchimp, Klaviyo, Resend Audiences) — the
 * client component needs no changes.
 */

export const runtime = "nodejs";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let email = "";

  try {
    const body = (await request.json()) as { email?: string };
    email = body.email?.trim() ?? "";
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // TODO: forward to your email service provider's audience API.
  console.info("[newsletter] subscription", { email });

  return NextResponse.json({ message: "You're on the list. Welcome aboard." });
}
