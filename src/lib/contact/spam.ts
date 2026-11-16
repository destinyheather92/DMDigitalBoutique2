import "server-only";
import { HONEYPOT_FIELD, STARTED_AT_FIELD } from "./schema";

/**
 * Layered, low-friction spam protection for the inquiry form:
 *  1. Honeypot field  – hidden from people, irresistible to bots.
 *  2. Timing check    – real people take more than a few seconds to fill it in.
 *  3. Rate limiting   – per-IP, in memory (best-effort on serverless hosts).
 *  4. Cloudflare Turnstile – optional; enabled when both keys are set.
 */

const MIN_FILL_MS = 3500;

export function isHoneypotTripped(formData: FormData) {
  const v = formData.get(HONEYPOT_FIELD);
  return typeof v === "string" && v.trim().length > 0;
}

/** Only enforced when the browser recorded a start time (i.e. JS ran). */
export function isTooFast(formData: FormData, now = Date.now()) {
  const raw = formData.get(STARTED_AT_FIELD);
  if (typeof raw !== "string" || !raw) return false;
  const started = Number(raw);
  if (!Number.isFinite(started)) return false;
  return now - started < MIN_FILL_MS;
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    // keep memory bounded
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  }
  return false;
}

export function turnstileEnabled() {
  return Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}

export async function verifyTurnstile(formData: FormData, ip?: string) {
  if (!turnstileEnabled()) return true;
  const token = formData.get("cf-turnstile-response");
  if (typeof token !== "string" || !token) return false;
  const body = new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY!, response: token });
  if (ip) body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      cache: "no-store",
    });
    const json = (await res.json()) as { success?: boolean };
    return Boolean(json.success);
  } catch {
    return false;
  }
}
