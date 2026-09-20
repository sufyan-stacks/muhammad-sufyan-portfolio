import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

// -----------------------------------------------------------------------------
// Setup required (see README.md):
//   GMAIL_USER            the Gmail address that sends the mail
//   GMAIL_APP_PASSWORD    a 16-character Gmail "App Password" (NOT your login password)
//   CONTACT_TO_EMAIL      where briefs/intro requests land (defaults to GMAIL_USER)
// Put these in a local .env.local file (see .env.local.example) — never commit them.
// -----------------------------------------------------------------------------

const briefSchema = z.object({
  kind: z.literal("brief"),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  company: z.string().trim().max(160).optional().default(""),
  need: z.string().trim().max(80),
  message: z.string().trim().min(20).max(4000),
  // Honeypot field. Real visitors never fill it in.
  website: z.string().max(200).optional().default(""),
});

const introSchema = z.object({
  kind: z.literal("intro"),
  email: z.string().trim().email(),
});

const bodySchema = z.union([briefSchema, introSchema]);

// Very small in-memory rate limiter — resets on server restart / cold start.
// Good enough to blunt casual abuse on a low-traffic portfolio site.
const hits = new Map<string, { count: number; windowStart: number }>();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 8;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) {
    throw new Error("Email is not configured on the server yet.");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Try again later." }, { status: 429 });
  }

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 400 });
  }

  const data = parsed.data;

  // A filled honeypot means a bot. Reply "ok" so it learns nothing, and send nothing.
  if (data.kind === "brief" && data.website) {
    return NextResponse.json({ ok: true });
  }

  const to = process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER;

  let subject: string;
  let text: string;
  let html: string;

  if (data.kind === "brief") {
    subject = `New enquiry (${data.need}) from ${data.name}`;
    text = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Company: ${data.company || "not given"}`,
      `Need: ${data.need}`,
      "",
      data.message,
    ].join("\n");
    html = `
      <div style="font-family:sans-serif;line-height:1.5;">
        <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(data.company || "not given")}</p>
        <p><strong>Need:</strong> ${escapeHtml(data.need)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
      </div>
    `;
  } else {
    subject = `15-minute call request from ${data.email}`;
    text = `Requested a 15-minute call.\nEmail: ${data.email}`;
    html = `<p>Requested a 15-minute call.</p><p><strong>Email:</strong> ${escapeHtml(data.email)}</p>`;
  }

  try {
    const transporter = getTransporter();
    await transporter.verify();
    const result = await transporter.sendMail({
      from: `"Portfolio site" <${process.env.GMAIL_USER}>`,
      to,
      replyTo: data.email,
      subject,
      text,
      html,
    });

    console.info("contact email accepted by SMTP", {
      messageId: result.messageId,
      accepted: result.accepted,
      rejected: result.rejected,
    });

    if (!result.accepted.length || result.rejected.length) {
      return NextResponse.json(
        { error: "The mail service did not accept the recipient address." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("contact form send failed", err);
    return NextResponse.json(
      { error: "Could not send right now. Please email me directly instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
