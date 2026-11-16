"use client";

import Script from "next/script";
import { startTransition, useActionState, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { submitInquiry, type InquiryState } from "@/app/contact/actions";
import { ArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";
import {
  HONEYPOT_FIELD,
  STARTED_AT_FIELD,
  budgetOptions,
  fieldOrder,
  limits,
  readInquiry,
  serviceOptions,
  validateField,
  validateInquiry,
  type FieldErrors,
  type InquiryField,
} from "@/lib/contact/schema";
import { site } from "@/lib/site";
import { EmailText } from "@/components/ui/EmailText";

const labels: Record<InquiryField, string> = {
  name: "Full name",
  business: "Business name",
  email: "Email address",
  phone: "Phone number",
  service: "Service needed",
  budget: "Estimated budget",
  message: "Project description",
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string; reset: (id?: string) => void };
  }
}

/** Wrapper that lets "Send another inquiry" start completely fresh. */
export function ProjectInquiryForm({ defaultService }: { defaultService?: string }) {
  const [round, setRound] = useState(0);
  return <InquiryForm key={round} defaultService={defaultService} onReset={() => setRound((r) => r + 1)} />;
}

function InquiryForm({ defaultService, onReset }: { defaultService?: string; onReset: () => void }) {
  const [state, formAction, pending] = useActionState<InquiryState, FormData>(submitInquiry, { status: "idle" });
  // Errors found in the browser; server results are layered underneath.
  const [clientErrors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<InquiryField, boolean>>>({});
  const [messageLength, setMessageLength] = useState(0);
  const [summaryRequested, setSummaryRequested] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;

  // Record when the visitor started (used by the server's timing check).
  // Kept in a ref, not a hidden input: re-renders would reset an input's value.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const serverErrors: FieldErrors = state.status === "error" ? (state.errors ?? {}) : {};
  const errors: FieldErrors = { ...serverErrors, ...clientErrors };
  const showSummary = summaryRequested || state.status === "error";

  // Move focus to the result of each server response.
  useEffect(() => {
    if (state.status === "error") {
      requestAnimationFrame(() => summaryRef.current?.focus());
      if (turnstileSiteKey) window.turnstile?.reset();
    }
    if (state.status === "success") requestAnimationFrame(() => successRef.current?.focus());
  }, [state]);

  const renderTurnstile = () => {
    if (turnstileSiteKey && turnstileRef.current && window.turnstile && !turnstileRef.current.hasChildNodes()) {
      window.turnstile.render(turnstileRef.current, { sitekey: turnstileSiteKey, theme: "light" });
    }
  };
  useEffect(renderTurnstile, []);

  const checkField = (field: InquiryField) => {
    if (!formRef.current) return;
    const value = readInquiry(new FormData(formRef.current))[field];
    setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
  };

  const onBlur = (field: InquiryField) => {
    setTouched((t) => ({ ...t, [field]: true }));
    checkField(field);
  };

  const onChange = (field: InquiryField) => {
    if (touched[field] || errors[field]) checkField(field);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const { errors: found } = validateInquiry(readInquiry(fd));
    setErrors(found);
    setTouched(Object.fromEntries(fieldOrder.map((f) => [f, true])));
    const first = fieldOrder.find((f) => found[f]);
    if (first) {
      setSummaryRequested(true);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setSummaryRequested(false);
    if (startedAt.current) fd.set(STARTED_AT_FIELD, String(startedAt.current));
    startTransition(() => formAction(fd));
  };

  if (state.status === "success") {
    return (
      <div className="py-6" role="status">
        <p className="kicker text-gold-deep">Inquiry received</p>
        <h2 ref={successRef} tabIndex={-1} className="mt-5 font-display text-[2.6rem] leading-tight text-ink outline-none sm:text-[3.2rem]">
          Thank you{state.firstName ? `, ${state.firstName}` : ""}. <em className="italic text-rose-deep">It’s in my inbox.</em>
        </h2>
        <p className="mt-6 max-w-lg text-ink/72">
          I read every inquiry personally, and I’ll reply by email to talk through your project and next steps. If
          anything else comes to mind in the meantime, you can always write to{" "}
          <a href={`mailto:${site.email}`} className="text-rose-deep underline decoration-gold/60 underline-offset-4 [overflow-wrap:anywhere]">
            <EmailText email={site.email} />
          </a>
          .
        </p>
        <button type="button" onClick={onReset} className="btn btn-outline-dark mt-10">
          <span>Send another inquiry</span>
        </button>
      </div>
    );
  }

  const summaryErrors = fieldOrder.filter((f) => errors[f]);
  const err = (f: InquiryField) => (touched[f] || state.status === "error" ? errors[f] : undefined);

  return (
    <form ref={formRef} action={formAction} onSubmit={onSubmit} noValidate aria-describedby={id("intro")} className="relative">
      <p id={id("intro")} className="sr-only">
        All fields are required except phone number.
      </p>

      {showSummary && (state.message || summaryErrors.length > 0) && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="mb-10 rounded-[4px] border border-rose-deep/40 bg-blush-pale/60 p-6 outline-none"
        >
          <p className="font-medium text-ink">{summaryErrors.length > 0 ? "A few details need your attention:" : state.message}</p>
          {summaryErrors.length > 0 && (
            <ul className="mt-3 space-y-1.5 text-[0.95rem]">
              {summaryErrors.map((f) => (
                <li key={f}>
                  <a href={`#${id(f)}`} className="text-rose-deep underline decoration-rose/40 underline-offset-4">
                    {labels[f]}: {errors[f]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2">
        <TextField id={id("name")} name="name" label={labels.name} autoComplete="name" maxLength={limits.name} error={err("name")} onBlur={() => onBlur("name")} onChange={() => onChange("name")} />
        <TextField id={id("business")} name="business" label={labels.business} autoComplete="organization" maxLength={limits.business} error={err("business")} onBlur={() => onBlur("business")} onChange={() => onChange("business")} />
        <TextField id={id("email")} name="email" type="email" label={labels.email} autoComplete="email" inputMode="email" maxLength={limits.email} error={err("email")} onBlur={() => onBlur("email")} onChange={() => onChange("email")} />
        <TextField id={id("phone")} name="phone" type="tel" label={labels.phone} optional autoComplete="tel" inputMode="tel" maxLength={limits.phone} error={err("phone")} onBlur={() => onBlur("phone")} onChange={() => onChange("phone")} />
      </div>

      <ChoiceGroup
        id={id("service")}
        name="service"
        legend={labels.service}
        options={serviceOptions}
        defaultValue={defaultService}
        error={err("service")}
        onChange={() => {
          setTouched((t) => ({ ...t, service: true }));
          checkField("service");
        }}
      />
      <ChoiceGroup
        id={id("budget")}
        name="budget"
        legend={labels.budget}
        options={budgetOptions}
        error={err("budget")}
        onChange={() => {
          setTouched((t) => ({ ...t, budget: true }));
          checkField("budget");
        }}
      />

      <div className="mt-10">
        <div className="flex items-baseline justify-between gap-4">
          <label htmlFor={id("message")} className="text-[0.9rem] font-medium text-ink">
            {labels.message}
          </label>
          <span className={cn("font-mono text-[0.7rem]", messageLength > limits.messageMax ? "text-rose-deep" : "text-ink/68")} aria-hidden="true">
            {messageLength.toLocaleString()} / {limits.messageMax.toLocaleString()}
          </span>
        </div>
        <p id={id("message-hint")} className="mt-1 text-[0.85rem] text-ink/68">
          What does your business do, and what would you like your website or system to handle?
        </p>
        <textarea
          id={id("message")}
          name="message"
          rows={6}
          maxLength={limits.messageMax + 200}
          required
          aria-required="true"
          aria-invalid={Boolean(err("message"))}
          aria-describedby={cn(id("message-hint"), err("message") && id("message-error"))}
          onBlur={() => onBlur("message")}
          onChange={(e) => {
            setMessageLength(e.target.value.length);
            onChange("message");
          }}
          className={cn(
            "mt-3 block w-full resize-y rounded-[4px] border bg-ivory/70 px-4 py-3.5 text-[1.05rem] leading-relaxed text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink focus:bg-ivory",
            err("message") ? "border-rose-deep" : "border-ink/20",
          )}
        />
        <FieldError id={id("message-error")} message={err("message")} />
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={id("hp")}>Leave this field empty</label>
        <input id={id("hp")} type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {turnstileSiteKey && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={renderTurnstile} />
          <div ref={turnstileRef} className="mt-8" />
        </>
      )}

      <div className="mt-12 flex flex-col gap-6 border-t border-ink/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-[0.85rem] text-ink/68">
          Your details are only used to reply to your inquiry.{" "}
          <a href="/privacy" className="underline decoration-gold/60 underline-offset-4 hover:text-rose-deep">
            Privacy
          </a>
        </p>
        <button type="submit" disabled={pending} aria-disabled={pending} className="btn btn-ink shrink-0 disabled:cursor-wait disabled:opacity-80">
          <span>{pending ? "Sending…" : "Send My Inquiry"}</span>
          {!pending && <ArrowRight className="btn-arrow" />}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {pending ? "Sending your inquiry." : ""}
      </p>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2.5 flex items-start gap-2 text-[0.85rem] text-rose-deep">
      <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45 bg-rose-deep" />
      {message}
    </p>
  );
}

function TextField({
  id,
  name,
  label,
  type = "text",
  optional,
  error,
  ...rest
}: {
  id: string;
  name: InquiryField;
  label: string;
  type?: string;
  optional?: boolean;
  error?: string;
  autoComplete?: string;
  inputMode?: "email" | "tel" | "text";
  maxLength?: number;
  onBlur: () => void;
  onChange: () => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline gap-2 text-[0.9rem] font-medium text-ink">
        {label}
        {optional && <span className="text-[0.8rem] font-normal text-ink/68">(optional)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={!optional}
        aria-required={!optional}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "mt-2 block w-full border-0 border-b bg-transparent px-0 py-3 text-[1.1rem] text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-ink focus-visible:outline-none focus-visible:[box-shadow:0_2px_0_0_var(--color-gold)]",
          error ? "border-rose-deep" : "border-ink/25",
        )}
        {...rest}
      />
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function ChoiceGroup({
  id,
  name,
  legend,
  options,
  defaultValue,
  error,
  onChange,
}: {
  id: string;
  name: InquiryField;
  legend: ReactNode;
  options: readonly string[];
  defaultValue?: string;
  error?: string;
  onChange: () => void;
}) {
  return (
    <fieldset id={id} className="mt-11" aria-describedby={error ? `${id}-error` : undefined} tabIndex={-1}>
      <legend className="text-[0.9rem] font-medium text-ink">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {options.map((opt) => (
          <label key={opt} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={opt}
              defaultChecked={defaultValue === opt}
              onChange={onChange}
              required
              className="peer sr-only"
            />
            <span
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-4.5 py-2.5 text-[0.9rem] transition-all duration-300",
                "border-ink/20 text-ink/80 hover:border-ink/50",
                "peer-checked:border-ink peer-checked:bg-ink peer-checked:text-ivory",
                "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold",
                error && "border-rose-deep/60",
              )}
            >
              {opt}
            </span>
          </label>
        ))}
      </div>
      <FieldError id={`${id}-error`} message={error} />
    </fieldset>
  );
}
