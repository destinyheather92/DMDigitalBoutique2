/**
 * Project inquiry fields and validation — shared by the browser (instant
 * feedback) and the server (the real gatekeeper). Kept dependency-free so
 * it adds almost nothing to the page's JavaScript.
 */

export const serviceOptions = [
  "New Website",
  "Website Redesign",
  "Business Automation",
  "Custom Software",
  "Website Maintenance",
  "Other",
] as const;

/** Adjust these ranges any time — they're just options on the form. */
export const budgetOptions = [
  "Under $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
] as const;

export type ServiceOption = (typeof serviceOptions)[number];
export type BudgetOption = (typeof budgetOptions)[number];

export type InquiryInput = {
  name: string;
  business: string;
  email: string;
  phone: string;
  service: ServiceOption;
  budget: BudgetOption;
  message: string;
};

export type InquiryField = keyof InquiryInput;
export type FieldErrors = Partial<Record<InquiryField, string>>;

/** Spam-protection field names, shared by the form and the server. */
export const HONEYPOT_FIELD = "website_url";
export const STARTED_AT_FIELD = "form_started_at";

export const fieldOrder: InquiryField[] = ["name", "business", "email", "phone", "service", "budget", "message"];

export const limits = {
  name: 100,
  business: 120,
  email: 254,
  phone: 30,
  messageMin: 20,
  messageMax: 4000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^[+()\-.\s\d]{7,30}$/;

const clean = (v: unknown) => (typeof v === "string" ? v.replace(/\u0000/g, "").trim() : "");

export function readInquiry(source: FormData | Record<string, unknown>): Record<InquiryField, string> {
  const get = (k: string) => (source instanceof FormData ? source.get(k) : source[k]);
  return {
    name: clean(get("name")),
    business: clean(get("business")),
    email: clean(get("email")),
    phone: clean(get("phone")),
    service: clean(get("service")),
    budget: clean(get("budget")),
    message: clean(get("message")),
  };
}

export function validateField(field: InquiryField, value: string): string | undefined {
  switch (field) {
    case "name":
      if (!value) return "Please tell me your name.";
      if (value.length > limits.name) return "That name is a little long — please shorten it.";
      return;
    case "business":
      if (!value) return "Please add your business name (or “Not yet” if you’re just getting started).";
      if (value.length > limits.business) return "Please shorten the business name.";
      return;
    case "email":
      if (!value) return "I’ll need an email address to reply.";
      if (value.length > limits.email || !emailPattern.test(value)) return "That email address doesn’t look quite right.";
      return;
    case "phone":
      if (value && !phonePattern.test(value)) return "Please use digits, spaces, or ( ) + - only — or leave it blank.";
      return;
    case "service":
      if (!(serviceOptions as readonly string[]).includes(value)) return "Choose the option closest to what you need.";
      return;
    case "budget":
      if (!(budgetOptions as readonly string[]).includes(value)) return "Choose a budget range — “Not sure yet” is perfectly fine.";
      return;
    case "message":
      if (!value) return "Tell me a little about your project.";
      if (value.length < limits.messageMin) return "A sentence or two more would help me understand what you need.";
      if (value.length > limits.messageMax) return `Please keep this under ${limits.messageMax.toLocaleString()} characters.`;
      return;
  }
}

export function validateInquiry(raw: Record<InquiryField, string>): { data?: InquiryInput; errors: FieldErrors } {
  const errors: FieldErrors = {};
  for (const field of fieldOrder) {
    const message = validateField(field, raw[field]);
    if (message) errors[field] = message;
  }
  if (Object.keys(errors).length) return { errors };
  return { data: raw as InquiryInput, errors };
}
