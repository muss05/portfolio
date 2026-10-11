/** Contact form validation shared by the client form and the API route. */

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
  /** Honeypot: real users leave this empty. */
  company?: string;
}

export type ContactErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export const LIMITS = { name: 80, email: 254, subject: 120, messageMin: 20, message: 4000 } as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalize(input: Partial<Record<keyof ContactPayload, unknown>>): ContactPayload {
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  return {
    name: str(input.name),
    email: str(input.email),
    subject: str(input.subject),
    message: str(input.message),
    company: str(input.company),
  };
}

export function validateContact(data: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};

  if (!data.name) errors.name = "Please enter your name.";
  else if (data.name.length > LIMITS.name) errors.name = `Name must be ${LIMITS.name} characters or fewer.`;

  if (!data.email) errors.email = "Please enter your email address.";
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";

  if (data.subject.length > LIMITS.subject) errors.subject = `Subject must be ${LIMITS.subject} characters or fewer.`;

  if (!data.message) errors.message = "Please write a message.";
  else if (data.message.length < LIMITS.messageMin) errors.message = `Please write at least ${LIMITS.messageMin} characters.`;
  else if (data.message.length > LIMITS.message) errors.message = `Message must be ${LIMITS.message} characters or fewer.`;

  return errors;
}
