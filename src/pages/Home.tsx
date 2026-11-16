import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { profile } from "../data/site";
import { projects } from "../data/projects";
import { useSeo } from "../lib/seo";
import HeroVisual from "../components/HeroVisual";
import ProjectFeature from "../components/ProjectFeature";
import Reveal from "../components/Reveal";
import { ContactLinks, DownloadResume, JourneyRail, Legend, TechOverview } from "../components/Bits";
import { GithubIcon } from "../components/Icons";

const strengths = ["AWS", "Kubernetes", "Docker", "CI/CD", "Infrastructure automation"];

function SectionHead({ n, label, title, to, cta }: { n: string; label: string; title: string; to?: string; cta?: string }) {
  return (
    <div className="flex items-end justify-between gap-6 mb-8">
      <div><p className="tag"><span className="text-accent">{n}</span> / {label}</p><h2 className="text-5xl md:text-7xl mt-2">{title}</h2></div>
      {to && <Link to={to} className="link text-sm hidden sm:inline-flex items-center gap-1.5 shrink-0">{cta}<ArrowRight className="size-4" aria-hidden /></Link>}
    </div>
  );
}

export default function Home() {
  useSeo("Vijay Kardak — Entry-Level DevOps & Cloud Engineer", "Entry-level DevOps and Cloud Engineer in India. AWS, Kubernetes, Docker, CI/CD and infrastructure automation, shown through six hands-on projects.", "/");
  const [p1, p2, p3, p4, p5, p6] = projects;
  return (
    <>
      <section className="relative overflow-hidden border-b border-line" aria-labelledby="hero">
        <div className="mx-auto max-w-[1280px] px-5 md:px-8 pt-12 md:pt-20 pb-16 md:pb-24 grid gap-12 lg:grid-cols-12 items-center">
          <div className="min-w-0 lg:col-span-7">
            <p className="tag text-accent">Entry-level DevOps / Cloud Engineer · {profile.location}</p>
            <h1 id="hero" className="mt-4 text-[4.5rem] sm:text-[8rem] lg:text-[9.5rem] leading-[0.85]">Vijay<br /><span className="text-accent">Kardak</span></h1>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Core strengths">{strengths.map((s) => <li key={s} className="mono text-xs border border-line px-2.5 py-1">{s}</li>)}</ul>
            <p className="mt-6 text-lg text-mute max-w-[54ch]">
              I build and deploy infrastructure to learn how it works: containers, Kubernetes clusters on AWS and CI/CD pipelines. I'm looking for fresher, junior or trainee DevOps and Cloud Engineer roles.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="btn btn-solid">View projects<ArrowRight className="size-4" aria-hidden /></Link>
              <DownloadResume solid={false} />
              <a href={profile.github} rel="noopener noreferrer" className="btn btn-line"><GithubIcon />GitHub</a>
            </div>
          </div>
          <div className="min-w-0 lg:col-span-5"><HeroVisual /></div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 md:px-8 mt-24" aria-labelledby="tech">
        <SectionHead n="01" label="Technical overview" title="The toolchain" />
        <h2 id="tech" className="sr-only">Technical overview</h2>
        <div className="mb-6"><Legend /></div>
        <TechOverview />
      </section>

      <section className="mx-auto max-w-[1280px] px-5 md:px-8 mt-28" aria-labelledby="work">
        <SectionHead n="02" label="Featured projects" title="Selected work" to="/projects" cta="All projects" />
        <h2 id="work" className="sr-only">Featured projects</h2>
        <div className="space-y-4">
          <ProjectFeature p={p1} size="hero" />
          <div className="grid gap-4 md:grid-cols-2"><ProjectFeature p={p2} /><ProjectFeature p={p3} /></div>
          <ProjectFeature p={p4} size="row" />
          <div className="grid gap-4 md:grid-cols-2"><ProjectFeature p={p5} /><ProjectFeature p={p6} /></div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-5 md:px-8 mt-28" aria-labelledby="journey">
        <SectionHead n="03" label="Engineering journey" title="How I got here" to="/journey" cta="Full journey" />
        <h2 id="journey" className="sr-only">Engineering journey</h2>
        <JourneyRail />
      </section>

      <section className="mx-auto max-w-[1280px] px-5 md:px-8 mt-28" aria-labelledby="contact">
        <Reveal>
          <p className="tag"><span className="text-accent">04</span> / Contact</p>
          <h2 id="contact" className="text-5xl sm:text-6xl md:text-8xl mt-2 mb-8">Open to entry-level<br /><span className="text-accent">DevOps &amp; cloud roles</span></h2>
          <ContactLinks />
        </Reveal>
      </section>
    </>
  );
}
