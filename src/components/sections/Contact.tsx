"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/data/portfolio";
import { LIMITS, normalize, validateContact, type ContactErrors } from "@/lib/contact";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { socialLinks } from "@/components/ui/socialLinks";
import { ArrowUpRight, Check, Spinner } from "@/components/ui/Icons";

type Status = { kind: "idle" | "sending" | "success" } | { kind: "error"; message: string; notConfigured?: boolean };

const fieldClass =
  "w-full rounded-xl border bg-surface/70 px-4 py-3 text-base text-fg placeholder:text-muted/70 transition-colors focus:border-purple focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple";

export function Contact() {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = normalize(Object.fromEntries(new FormData(form)));
    const found = validateContact(data);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus({ kind: "idle" });
      form.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json: { ok?: boolean; error?: string; code?: string; fields?: ContactErrors } = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        setStatus({ kind: "success" });
        form.reset();
        return;
      }
      if (json.fields) setErrors(json.fields);
      setStatus({
        kind: "error",
        message: json.error ?? "Something went wrong. Please try again.",
        notConfigured: json.code === "NOT_CONFIGURED",
      });
    } catch {
      setStatus({ kind: "error", message: "Network error. Check your connection and try again." });
    }
  }

  const sending = status.kind === "sending";

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's build something together"
      intro="Hiring for frontend or AI engineering, or want to talk agents? I'd love to hear from you."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="space-y-4">
          <a href={`mailto:${site.email}`} className="card card-hover group flex items-center justify-between gap-4 p-5">
            <div className="min-w-0">
              <p className="text-sm text-muted">Email</p>
              <p className="truncate font-medium">{site.email}</p>
            </div>
            <ArrowUpRight className="shrink-0 text-muted group-hover:text-fg" />
          </a>
          {socialLinks
            .filter((s) => s.label !== "Email")
            .map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="card card-hover group flex items-center justify-between gap-4 p-5">
                <span className="flex items-center gap-3 font-medium">
                  <Icon size={20} /> {label}
                </span>
                <ArrowUpRight className="text-muted group-hover:text-fg" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          <p className="px-1 text-sm text-muted">Based in {site.location}.</p>
        </Reveal>

        <Reveal className="glass card p-6 sm:p-8">
          {status.kind === "success" ? (
            <div role="status" className="flex flex-col items-center py-10 text-center">
              <span className="inline-flex size-14 items-center justify-center rounded-full bg-success/15 text-success">
                <Check size={28} />
              </span>
              <h3 className="mt-5 font-display text-xl font-semibold">Message sent. Thank you!</h3>
              <p className="mt-2 text-muted">I&apos;ll get back to you at the email you provided.</p>
              <button type="button" onClick={() => setStatus({ kind: "idle" })} className={buttonClasses("secondary", "mt-6")}>
                Send another message
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} aria-describedby="form-status" className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Name" error={errors.name}>
                <input id="name" name="name" autoComplete="name" maxLength={LIMITS.name} required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} className={`${fieldClass} ${errors.name ? "border-danger" : "border-border"}`} />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input id="email" name="email" type="email" autoComplete="email" maxLength={LIMITS.email} required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} className={`${fieldClass} ${errors.email ? "border-danger" : "border-border"}`} />
              </Field>
              <Field id="subject" label="Subject" optional error={errors.subject} className="sm:col-span-2">
                <input id="subject" name="subject" maxLength={LIMITS.subject} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} className={`${fieldClass} ${errors.subject ? "border-danger" : "border-border"}`} />
              </Field>
              <Field id="message" label="Message" error={errors.message} className="sm:col-span-2">
                <textarea id="message" name="message" rows={6} maxLength={LIMITS.message} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} className={`${fieldClass} resize-y ${errors.message ? "border-danger" : "border-border"}`} />
              </Field>

              {/* Honeypot, hidden from people and assistive tech. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <div id="form-status" role="alert" aria-live="assertive" className="text-sm">
                  {status.kind === "error" && (
                    <p className="text-danger">
                      {status.message}{" "}
                      {status.notConfigured && (
                        <a href={`mailto:${site.email}`} className="font-medium underline underline-offset-4">
                          Email {site.email}
                        </a>
                      )}
                    </p>
                  )}
                </div>
                <button type="submit" disabled={sending} aria-busy={sending} className={buttonClasses("primary", "shrink-0")}>
                  {sending ? (
                    <>
                      <Spinner /> Sending…
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, optional, className = "", children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label} {optional && <span className="font-normal text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
