import { NextResponse } from "next/server";
import { normalize, validateContact } from "@/lib/contact";

/**
 * Contact form endpoint. Sends mail through Resend (https://resend.com) when configured:
 *   RESEND_API_KEY      – API key from the Resend dashboard (server-only)
 *   CONTACT_TO_EMAIL    – inbox that receives messages
 *   CONTACT_FROM_EMAIL  – verified sender, e.g. "Portfolio <hello@yourdomain.com>"
 *                         (defaults to Resend's onboarding sender, which only delivers to your own account email)
 * Without RESEND_API_KEY/CONTACT_TO_EMAIL it returns 503 so the UI can offer the mailto fallback.
 */

const MAX_BODY_BYTES = 10_000;

export async function POST(request: Request) {
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Message is too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const data = normalize(body as Record<string, unknown>);

  // Honeypot filled: pretend success so bots don't retry.
  if (data.company) return NextResponse.json({ ok: true });

  const errors = validateContact(data);
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", fields: errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "The contact form isn't configured yet. Please email me directly.", code: "NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: data.email,
        subject: `[Portfolio] ${data.subject || `Message from ${data.name}`}`.slice(0, 160),
        // Plain text only: user input is never rendered as HTML.
        text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      console.error("Contact form: Resend responded", res.status, await res.text().catch(() => ""));
      return NextResponse.json({ error: "Your message couldn't be sent right now. Please try again or email me directly." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form: send failed", err);
    return NextResponse.json({ error: "Your message couldn't be sent right now. Please try again or email me directly." }, { status: 502 });
  }
}
