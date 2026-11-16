"use server";

import { headers } from "next/headers";
import { site } from "@/lib/site";
import { readInquiry, validateInquiry, type FieldErrors } from "@/lib/contact/schema";
import { EmailNotConfiguredError, sendInquiryConfirmation, sendInquiryNotification } from "@/lib/contact/email";
import { isHoneypotTripped, isRateLimited, isTooFast, verifyTurnstile } from "@/lib/contact/spam";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: FieldErrors;
  firstName?: string;
};

const fallback = `Please email me directly at ${site.email} and I’ll get right back to you.`;

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  const h = await headers();
  const ip = (h.get("x-forwarded-for")?.split(",")[0] || h.get("x-real-ip") || "").trim() || undefined;

  // Bots: refuse quietly, without sending anything.
  if (isHoneypotTripped(formData)) {
    return { status: "error", message: `Your message couldn’t be sent. ${fallback}` };
  }
  if (isTooFast(formData)) {
    return {
      status: "error",
      message: "That was quicker than expected — please take another look at your details and send it again.",
    };
  }
  if (isRateLimited(ip ?? "unknown")) {
    return { status: "error", message: `Too many messages in a short time. Please wait a few minutes, or ${fallback.charAt(0).toLowerCase()}${fallback.slice(1)}` };
  }
  if (!(await verifyTurnstile(formData, ip))) {
    return { status: "error", message: "Please complete the quick security check and try again." };
  }

  const { data, errors } = validateInquiry(readInquiry(formData));
  if (!data) {
    return { status: "error", message: "A few details need your attention.", errors };
  }

  try {
    await sendInquiryNotification(data, { ip });
  } catch (error) {
    if (error instanceof EmailNotConfiguredError) {
      console.error("[inquiry] Email delivery is not configured:", error.message);
    } else {
      console.error("[inquiry] Failed to send inquiry:", error);
    }
    return { status: "error", message: `Something went wrong on my end and your message wasn’t sent. ${fallback}` };
  }

  // A receipt for the visitor is optional and never blocks success.
  try {
    await sendInquiryConfirmation(data);
  } catch (error) {
    console.error("[inquiry] Confirmation email failed (inquiry was delivered):", error);
  }

  return { status: "success", firstName: data.name.split(/\s+/)[0] };
}
