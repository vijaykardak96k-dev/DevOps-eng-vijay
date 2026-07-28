import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Send, MapPin, Loader2, CheckCircle2, XCircle } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from "../components/BrandIcons";
import profile from "../data/profile.json";
import { sendContactMessage } from "../lib/api";

const SOCIALS = [
  { href: profile.githubUrl, icon: GithubIcon, label: "GitHub", value: `@${profile.github}` },
  { href: profile.linkedinUrl, icon: LinkedinIcon, label: "LinkedIn", value: profile.linkedin },
  { href: `mailto:${profile.email}`, icon: Mail, label: "Email", value: profile.email },
  { href: profile.whatsappUrl, icon: WhatsAppIcon, label: "WhatsApp", value: profile.whatsapp },
  { href: profile.instagramUrl, icon: InstagramIcon, label: "Instagram", value: `@${profile.instagram}` },
];

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendContactMessage(form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-32 pb-24">
      <SectionHeading
        eyebrow="Get in touch"
        title="Let's build something reliable together"
        description="Open to DevOps roles, internships, and interesting infrastructure problems."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          {SOCIALS.map(({ href, icon: Icon, label, value }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group flex items-center gap-4 rounded-xl border border-white/5 bg-[var(--color-card)] p-4 transition-colors hover:border-white/10"
            >
              <span
                className="flex h-11 w-11 items-center justify-center rounded-lg"
                style={{ background: "color-mix(in srgb, var(--color-primary) 15%, transparent)" }}
              >
                <Icon size={18} style={{ color: "var(--color-secondary)" }} />
              </span>
              <div>
                <p className="text-xs text-zinc-500">{label}</p>
                <p className="text-sm font-medium text-zinc-200">{value}</p>
              </div>
            </a>
          ))}

          <div className="overflow-hidden rounded-xl border border-white/5 bg-[var(--color-card)]">
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3 text-xs text-zinc-500">
              <MapPin size={14} /> {profile.location}
            </div>
            <div className="flex h-40 items-center justify-center bg-grid text-xs text-zinc-600">
              Map preview placeholder
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="gradient-border rounded-2xl bg-[var(--color-card)] p-6"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-xs text-zinc-500">
                Name
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="focus-ring w-full rounded-lg border border-white/10 bg-black/20 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-xs text-zinc-500">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="focus-ring w-full rounded-lg border border-white/10 bg-black/20 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs text-zinc-500">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="focus-ring w-full resize-none rounded-lg border border-white/10 bg-black/20 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600"
                placeholder="What are you looking to build?"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="focus-ring flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.01] disabled:opacity-60"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              {status === "sending" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm" style={{ color: "var(--color-success)" }}>
                <CheckCircle2 size={16} /> Message sent — thanks for reaching out!
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm text-red-400">
                <XCircle size={16} /> Couldn't send that. Try emailing me directly instead.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </div>
  );
}
