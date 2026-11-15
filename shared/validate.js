export const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 };
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Single source of truth for contact validation, used by the React form and the Express API.
 * @param {{ name: string, email: string, subject: string, message: string }} v
 * @returns {{ name?: string, email?: string, subject?: string, message?: string }}
 */
export function validateContact(v) {
  /** @type {{ name?: string, email?: string, subject?: string, message?: string }} */
  const e = {};
  const name = String(v.name ?? "").trim(), email = String(v.email ?? "").trim();
  const subject = String(v.subject ?? "").trim(), message = String(v.message ?? "").trim();
  if (!name) e.name = "Please enter your name.";
  else if (name.length > LIMITS.name) e.name = `Name must be ${LIMITS.name} characters or fewer.`;
  if (!email) e.email = "Please enter your email.";
  else if (!EMAIL.test(email) || email.length > LIMITS.email) e.email = "That email address doesn't look valid.";
  if (!subject) e.subject = "Please enter a subject.";
  else if (subject.length > LIMITS.subject) e.subject = `Subject must be ${LIMITS.subject} characters or fewer.`;
  if (message.length < 10) e.message = "Please write at least 10 characters.";
  else if (message.length > LIMITS.message) e.message = `Message must be ${LIMITS.message} characters or fewer.`;
  return e;
}
