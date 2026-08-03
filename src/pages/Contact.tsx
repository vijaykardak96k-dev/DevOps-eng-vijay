import React from "react";
import SectionHeading from "../components/SectionHeading";
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsAppIcon } from "../components/BrandIcons";
import { Mail, MapPin } from "lucide-react";
import profile from "../data/profile.json";
import Terminal from "./Terminal"; 

const SOCIALS = [
  { href: profile.githubUrl, icon: GithubIcon, label: "GitHub", value: `@${profile.github}` },
  { href: profile.linkedinUrl, icon: LinkedinIcon, label: "LinkedIn", value: profile.linkedin },
  { href: `mailto:${profile.email}`, icon: Mail, label: "Email", value: profile.email },
  { href: profile.whatsappUrl, icon: WhatsAppIcon, label: "WhatsApp", value: profile.whatsapp },
  { href: profile.instagramUrl, icon: InstagramIcon, label: "Instagram", value: `@${profile.instagram}` },
];

export default function Contact() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-32 pb-24">
      <SectionHeading
        eyebrow="Get in touch"
        title="Let's build something reliable together"
        description="Open to DevOps roles, internships, and interesting infrastructure problems."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr]">
        {/* Left Side: Contact Links */}
        <div className="space-y-3.5">
          {SOCIALS.map(({ href, icon: Icon, label, value }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring group flex items-center gap-4 rounded-xl border border-white/5 bg-[var(--color-card)] p-4 transition-all hover:border-white/10 hover:bg-white/[0.02]"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg"
                style={{ background: "color-mix(in srgb, var(--color-primary) 15%, transparent)" }}
              >
                <Icon size={18} style={{ color: "var(--color-secondary)" }} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-zinc-500">{label}</p>
                <p className="truncate text-sm font-medium text-zinc-200">{value}</p>
              </div>
            </a>
          ))}

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[var(--color-card)] px-4 py-3 text-xs text-zinc-400">
            <MapPin size={16} className="text-cyan-400 shrink-0" />
            <span>{profile.location}</span>
          </div>
        </div>

        {/* Right Side: Render Terminal Component */}
        <div>
          <Terminal />
        </div>
      </div>
    </div>
  );
}