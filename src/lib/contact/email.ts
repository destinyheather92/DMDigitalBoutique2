import "server-only";
import { site } from "@/lib/site";
import type { InquiryInput } from "./schema";

/**
 * Sends inquiry emails through Resend's HTTP API (no SDK needed).
 *
 * Required environment variables:
 *   RESEND_API_KEY      – from resend.com
 *   CONTACT_FROM_EMAIL  – a sender on a domain verified in Resend,
 *                         e.g. "DM Digital Boutique <hello@dmdigitalboutique.com>"
 * Optional:
 *   CONTACT_TO_EMAIL           – where inquiries go (defaults to the site email)
 *   CONTACT_SEND_CONFIRMATION  – "true" to email the visitor a short receipt
 *   RESEND_API_URL             – override the API endpoint (testing/proxies only)
 */

export class EmailNotConfiguredError extends Error {}

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

function config() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim() || site.email;
  if (!apiKey || !from) throw new EmailNotConfiguredError("RESEND_API_KEY and CONTACT_FROM_EMAIL must be set.");
  return { apiKey, from, to };
}

async function send(payload: Record<string, unknown>) {
  const { apiKey } = config();
  const endpoint = process.env.RESEND_API_URL?.trim() || "https://api.resend.com/emails";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend responded ${res.status}: ${detail.slice(0, 300)}`);
  }
}

export async function sendInquiryNotification(data: InquiryInput, meta: { ip?: string }) {
  const { from, to } = config();
  const rows: Array<[string, string]> = [
    ["Name", data.name],
    ["Business", data.business],
    ["Email", data.email],
    ["Phone", data.phone || "—"],
    ["Service", data.service],
    ["Budget", data.budget],
  ];

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;padding:28px;background:#f3ede7;color:#171518">
    <p style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#94566d;margin:0 0 8px">New project inquiry</p>
    <h1 style="font-family:Georgia,serif;font-weight:normal;font-size:26px;margin:0 0 20px">${escapeHtml(data.name)} · ${escapeHtml(data.business)}</h1>
    <table style="width:100%;border-collapse:collapse;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:8px 0;border-bottom:1px solid #e0d4c8;color:#6b6168;width:120px">${k}</td><td style="padding:8px 0;border-bottom:1px solid #e0d4c8">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <h2 style="font-family:Georgia,serif;font-weight:normal;font-size:18px;margin:24px 0 8px">Project details</h2>
    <p style="white-space:pre-wrap;line-height:1.6;font-size:15px;margin:0">${escapeHtml(data.message)}</p>
    <p style="font-size:12px;color:#8c8189;margin-top:28px">Reply directly to this email to respond to ${escapeHtml(data.name)}.${meta.ip ? ` · Sent from IP ${escapeHtml(meta.ip)}` : ""}</p>
  </div>`;

  const text = [
    "New project inquiry",
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Project details:",
    data.message,
  ].join("\n");

  await send({
    from,
    to: [to],
    reply_to: data.email,
    subject: `New inquiry: ${data.service} — ${data.business}`,
    html,
    text,
  });
}

export async function sendInquiryConfirmation(data: InquiryInput) {
  if (process.env.CONTACT_SEND_CONFIRMATION !== "true") return;
  const { from, to } = config();
  const firstName = data.name.split(/\s+/)[0];
  await send({
    from,
    to: [data.email],
    reply_to: to,
    subject: "I received your project inquiry — DM Digital Boutique",
    text: `Hi ${firstName},\n\nThanks for reaching out about your project. Your inquiry came through and I'll read it personally and reply from ${to}.\n\nIn the meantime, if anything else comes to mind, just reply to this email.\n\n— Destiny\nDM Digital Boutique\n${site.url}`,
    html: `<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:28px;color:#171518;line-height:1.6">
      <p>Hi ${escapeHtml(firstName)},</p>
      <p>Thanks for reaching out about your project. Your inquiry came through, and I’ll read it personally and reply from <a href="mailto:${escapeHtml(to)}" style="color:#94566d">${escapeHtml(to)}</a>.</p>
      <p>In the meantime, if anything else comes to mind, just reply to this email.</p>
      <p style="margin-top:28px">— Destiny<br/><span style="color:#94566d">DM Digital Boutique</span></p>
    </div>`,
  });
}
