import { ArrowUpRight, Boxes, Cloud, Container, Download, Mail, ShieldCheck, Terminal, Workflow, Wrench } from "lucide-react";
import { journey, levelLabel, mark, profile, techOverview, type SkillLevel } from "../data/site";
import { GithubIcon, LinkedinIcon } from "./Icons";
import Reveal from "./Reveal";


export function PageHead({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <header className="pt-14 pb-10 border-b border-line mb-10">
      <p className="tag text-accent">{label}</p>
      <h1 className="text-5xl sm:text-6xl md:text-8xl mt-3">{title}</h1>
      {intro && <p className="mt-5 text-mute max-w-[60ch]">{intro}</p>}
    </header>
  );
}

export function Legend() {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-1 mono text-xs text-mute" aria-label="Legend">
      {(Object.keys(levelLabel) as SkillLevel[]).map((l) => <li key={l}><span aria-hidden className="text-accent mr-1.5">{mark[l]}</span>{levelLabel[l]}</li>)}
    </ul>
  );
}

const icons = { cloud: Cloud, containers: Boxes, cicd: Workflow, iac: Wrench, linux: Terminal, security: ShieldCheck };
const span: Record<string, string> = { cloud: "lg:col-span-7", containers: "lg:col-span-5", cicd: "lg:col-span-4", iac: "lg:col-span-4", linux: "lg:col-span-4", security: "lg:col-span-12" };

export function TechOverview() {
  return (
    <div className="grid gap-4 lg:grid-cols-12">
      {techOverview.map((g, i) => {
        const Icon = icons[g.id as keyof typeof icons];
        const wide = g.id === "security";
        return (
          <Reveal key={g.id} delay={(i % 3) * 0.06} className={`${span[g.id]}`}>
            <section className={`h-full border border-line bg-panel p-6 ${wide ? "md:flex md:items-center md:gap-10" : ""}`} aria-labelledby={`t-${g.id}`}>
              <div className={wide ? "md:w-1/3" : ""}>
                <Icon className="size-6 text-accent" aria-hidden />
                <h3 id={`t-${g.id}`} className="text-3xl mt-4">{g.title}</h3>
                <p className="text-sm text-mute mt-2">{g.blurb}</p>
              </div>
              <ul className={`flex flex-wrap gap-2 ${wide ? "mt-4 md:mt-0 md:flex-1" : "mt-5"}`}>
                {g.items.map((s) => (
                  <li key={s.name} className={`mono text-xs px-2.5 py-1.5 border ${s.level === "learning" ? "border-dashed border-mute text-mute" : "border-line bg-panel2"}`}>
                    <span aria-hidden className="text-accent mr-1.5">{mark[s.level]}</span>{s.name}<span className="sr-only"> — {levelLabel[s.level]}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        );
      })}
    </div>
  );
}

export function JourneyRail() {
  return (
    <ol className="relative">
      <span aria-hidden className="absolute left-[15px] md:left-1/2 top-2 bottom-2 w-px bg-line" />
      {journey.map((j, i) => {
        const right = i % 2 === 1;
        return (
          <li key={j.stage} className="relative pl-12 md:pl-0 pb-10 last:pb-0 md:grid md:grid-cols-2 md:gap-16">
            <span aria-hidden className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 size-8 grid place-items-center mono text-xs border ${j.mode === "Learning now" ? "border-dashed border-accent text-accent bg-bg" : "border-accent bg-accent text-bg"}`}>{String(i + 1).padStart(2, "0")}</span>
            <Reveal className={right ? "md:col-start-2" : "md:text-right"}>
              <p className="tag text-accent">{j.when ?? j.mode}</p>
              <h3 className="text-4xl mt-1">{j.stage}</h3>
              <p className="text-mute mt-2 text-sm">{j.topics}</p>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

export function ContactLinks() {
  const rows = [
    { href: `mailto:${profile.email}`, label: "Email", value: profile.email, Icon: Mail },
    { href: profile.github, label: "GitHub", value: "github.com/vijaykardak96k-dev", Icon: GithubIcon },
    { href: profile.linkedin, label: "LinkedIn", value: "linkedin.com/in/vijay-kardak", Icon: LinkedinIcon },
    { href: profile.dockerhub, label: "Docker Hub", value: "hub.docker.com/u/vijaykardak", Icon: Container },
    { href: profile.whatsapp, label: "WhatsApp (optional)", value: "Message on WhatsApp", Icon: ArrowUpRight },
  ];
  return (
    <ul className="border-t border-line">
      {rows.map(({ href, label, value, Icon }) => (
        <li key={label} className="border-b border-line">
          <a href={href} rel="noopener noreferrer" className="group flex items-center gap-4 py-5 hover:text-accent transition-colors">
            <Icon className="size-5 shrink-0 text-accent" aria-hidden />
            <span className="tag w-40 shrink-0">{label}</span>
            <span className="text-lg md:text-2xl font-display uppercase break-all">{value}</span>
            <ArrowUpRight className="size-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
          </a>
        </li>
      ))}
    </ul>
  );
}

export const DownloadResume = ({ solid = true }: { solid?: boolean }) => (
  <a href={profile.resume} download className={`btn ${solid ? "btn-solid" : "btn-line"}`}><Download className="size-4" aria-hidden />Download resume</a>
);
