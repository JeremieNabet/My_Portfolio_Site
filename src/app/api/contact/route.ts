import nodemailer from "nodemailer";
import { NextResponse, type NextRequest } from "next/server";
import { SITE_URL } from "@/i18n";
import { MAX_FILL_MS, MIN_FILL_MS, contactSchema } from "@/lib/contact-schema";
import { allowRequest } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const reply = (status: number, error?: string) =>
  NextResponse.json(error ? { ok: false, error } : { ok: true }, {
    status,
    headers: { "Cache-Control": "no-store" },
  });

function allowedOrigins(): Set<string> {
  const origins = new Set<string>();
  const site = new URL(SITE_URL);
  origins.add(site.origin);
  origins.add(site.hostname.startsWith("www.") ? `${site.protocol}//${site.hostname.slice(4)}` : `${site.protocol}//www.${site.hostname}`);
  if (process.env.VERCEL_URL) origins.add(`https://${process.env.VERCEL_URL}`);
  if (process.env.NODE_ENV !== "production") {
    origins.add("http://localhost:3000");
    origins.add("http://127.0.0.1:3000");
  }
  return origins;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (forwarded ? forwarded.split(",")[0].trim() : request.headers.get("x-real-ip")) || "unknown";
}

export async function POST(request: NextRequest) {
  // 1. Origine : les navigateurs envoient toujours Origin sur un POST fetch.
  const origin = request.headers.get("origin");
  if (!origin || !allowedOrigins().has(origin)) return reply(403, "forbidden");

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return reply(400, "invalid");
  }
  if (!raw || typeof raw !== "object") return reply(400, "invalid");

  // 2. Champ piège : faux succès pour ne rien apprendre au bot.
  const trap = (raw as Record<string, unknown>).hp_website;
  if (typeof trap === "string" && trap.trim() !== "") return reply(200);

  // 3. Délai minimum de remplissage.
  const ts = Number((raw as Record<string, unknown>).ts);
  const elapsed = Date.now() - ts;
  if (!Number.isFinite(ts) || elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) return reply(400, "too-fast");

  // 4. Validation.
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return reply(422, "invalid");
  const data = parsed.data;

  // 5. Limite d'envois par IP.
  const ip = clientIp(request);
  if (!(await allowRequest(ip))) return reply(429, "rate-limited");

  // 6. Cloudflare Turnstile.
  const captcha = await verifyTurnstile(data.turnstileToken, ip);
  if (captcha === "not-configured" && process.env.NODE_ENV === "production") {
    console.error("TURNSTILE_SECRET_KEY manquant : formulaire de contact désactivé.");
    return reply(503, "unavailable");
  }
  if (captcha === "failed") return reply(400, "captcha");

  // Envoi
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 587);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_TO_EMAIL || "jeremie.nabett@gmail.com";
  const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser || toEmail;

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.error("Configuration SMTP manquante (SMTP_HOST / SMTP_USER / SMTP_PASS).");
    return reply(500, "server");
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `Portfolio Jérémie Nabet <${fromEmail}>`,
      to: toEmail,
      subject: "Nouvelle demande de projet - Portfolio",
      text: [
        "Nouvelle demande via le portfolio de Jérémie Nabet",
        "",
        `Nom complet: ${data.fullName}`,
        `Téléphone: ${data.phone}`,
        `Entreprise: ${data.company || "-"}`,
        `Type de service: ${data.serviceType}`,
        "Message:",
        data.message || "-",
      ].join("\n"),
    });
  } catch (error) {
    console.error("Erreur d'envoi SMTP", error);
    return reply(500, "server");
  }

  return reply(200);
}

export function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}
