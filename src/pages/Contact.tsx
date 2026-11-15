import { useState, type FormEvent } from "react";
import { profile } from "../data/site";
import { validateContact, LIMITS } from "../../shared/validate.js";
import PageHead from "../components/PageHead";
import { useSeo } from "../lib/seo";

type Status = "idle" | "loading" | "success" | "error";
const empty = { name: "", email: "", subject: "", message: "" };
type Errors = ReturnType<typeof validateContact>;
const API = (import.meta.env.VITE_API_URL as string | undefined) ?? "";

export default function Contact() {
  useSeo("Contact", "Contact Vijay Kardak about entry-level DevOps and Cloud Engineer roles: email, GitHub, LinkedIn or the contact form.", "/contact");
  const [v, setV] = useState(empty);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    const errs = validateContact(v);
    setErrors(errs);
    if (Object.keys(errs).length) { setStatus("idle"); return; }
    setStatus("loading"); setMsg("");
    try {
      const r = await fetch(`${API}/api/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...v, website }) });
      const j = (await r.json().catch(() => ({}))) as { error?: string; errors?: Errors };
      if (!r.ok) { if (j.errors) setErrors(j.errors); setMsg(j.error ?? "Something went wrong."); setStatus("error"); return; }
      setStatus("success"); setV(empty);
    } catch {
      setMsg("Could not reach the server. Please email me directly."); setStatus("error");
    }
  }

  const field = (k: keyof typeof empty, label: string, opts: { type?: string; area?: boolean } = {}) => {
    const err = errors[k];
    const common = { id: k, name: k, value: v[k], maxLength: LIMITS[k], "aria-invalid": !!err, "aria-describedby": err ? `${k}-err` : undefined, onChange: (e: { target: { value: string } }) => setV((s) => ({ ...s, [k]: e.target.value })), className: "mt-1 w-full border border-ink bg-paper px-3 py-2" };
    return (
      <div>
        <label htmlFor={k} className="label">{label}</label>
        {opts.area ? <textarea rows={6} {...common} /> : <input type={opts.type ?? "text"} {...common} />}
        {err && <p id={`${k}-err`} role="alert" className="text-sm text-accent mt-1">{err}</p>}
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-[1200px] px-5 md:px-8">
      <PageHead label="06 — Contact" title="Let's talk about a role." intro="I'm looking for fresher, junior, trainee and entry-level DevOps or Cloud Engineer opportunities." />
      <div className="grid gap-12 md:grid-cols-12 border-t border-ink pt-8">
        <ul className="md:col-span-4 space-y-3 text-sm">
          <li><span className="label block">Email</span><a className="link" href={`mailto:${profile.email}`}>{profile.email}</a></li>
          <li><span className="label block">GitHub</span><a className="link" href={profile.github} rel="noopener noreferrer">{profile.github.replace("https://", "")}</a></li>
          <li><span className="label block">LinkedIn</span><a className="link" href={profile.linkedin} rel="noopener noreferrer">{profile.linkedin.replace("https://www.", "")}</a></li>
          <li><span className="label block">WhatsApp (optional)</span><a className="link" href={profile.whatsapp} rel="noopener noreferrer">Message on WhatsApp</a></li>
        </ul>
        <form onSubmit={submit} noValidate className="md:col-span-8 space-y-5" aria-label="Contact form">
          <div className="grid gap-5 sm:grid-cols-2">{field("name", "Name")}{field("email", "Email", { type: "email" })}</div>
          {field("subject", "Subject")}
          {field("message", "Message", { area: true })}
          <div aria-hidden="true" className="absolute -left-[9999px]"><label>Website<input tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} /></label></div>
          <button type="submit" disabled={status === "loading"} className="bg-ink text-paper px-6 py-3 text-sm hover:bg-accent transition-colors disabled:opacity-60">{status === "loading" ? "Sending…" : "Send message"}</button>
          <div aria-live="polite">
            {status === "success" && <p className="border border-ink bg-paper-2 px-4 py-3">Thanks. Your message was sent and I'll reply by email.</p>}
            {status === "error" && <p role="alert" className="border border-accent text-accent px-4 py-3">{msg}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
