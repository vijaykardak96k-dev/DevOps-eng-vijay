import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./BrandIcons";
import profile from "../data/profile.json";

const SOCIALS = [
  { href: profile.githubUrl, icon: GithubIcon, label: "GitHub" },
  { href: profile.linkedinUrl, icon: LinkedinIcon, label: "LinkedIn" },
  { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
  { href: profile.instagramUrl, icon: InstagramIcon, label: "Instagram" },
];

const STACK = ["React", "Node", "Docker", "Kubernetes"];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 mt-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              VK
            </span>
            {profile.name}
          </div>

          <div className="flex items-center gap-3">
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse items-center gap-3 border-t border-white/5 pt-6 text-xs text-zinc-500 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <span style={{ color: "var(--color-accent)" }}>♥</span> using
            {STACK.map((t, i) => (
              <span key={t}>
                {" "}
                <span className="text-zinc-400">{t}</span>
                {i < STACK.length - 1 ? "," : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
