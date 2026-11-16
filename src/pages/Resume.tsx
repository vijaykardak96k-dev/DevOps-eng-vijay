import type { ReactNode } from "react";
import { profile, skillGroups } from "../data/site";
import { projects } from "../data/projects";
import { DownloadResume, PageHead } from "../components/Bits";
import { useSeo } from "../lib/seo";

const Row = ({ t, children }: { t: string; children: ReactNode }) => (
  <section className="grid gap-3 md:grid-cols-12 py-6 border-b border-line"><h2 className="min-w-0 md:col-span-3 tag pt-1 text-accent">{t}</h2><div className="min-w-0 md:col-span-9">{children}</div></section>
);

export default function Resume() {
  useSeo("Resume", "Resume of Vijay Kardak, entry-level DevOps and Cloud Engineer: education, technical skills and hands-on DevOps projects.", "/resume");
  const core = skillGroups.filter((g) => g.id !== "learning");
  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-8">
      <PageHead label="Resume" title="Vijay Kardak" intro="Entry-level DevOps / Cloud Engineer. Experience listed is self-directed project work, not employment." />
      <DownloadResume />
      <div className="mt-10 border-t border-line">
        <Row t="Profile"><p className="max-w-[65ch]">Final-year BCA student seeking an entry-level DevOps or Cloud Engineer role, with hands-on practice in Linux, Docker, Kubernetes, Jenkins, AWS and CI/CD across six projects.</p></Row>
        <Row t="Education"><p>{profile.education.degree}<br /><span className="text-mute text-sm">{profile.education.college} · {profile.education.university}</span></p></Row>
        <Row t="Skills"><ul className="space-y-1.5 text-sm">{core.map((g) => <li key={g.id}><strong className="font-medium">{g.title}:</strong> <span className="text-mute">{g.items.filter((i) => i.level !== "familiar").map((i) => i.name).join(", ")}</span></li>)}</ul></Row>
        <Row t="Hands-on projects"><ul className="space-y-3">{projects.map((p) => <li key={p.id}><strong className="font-medium">{p.title}.</strong> <span className="text-mute">{p.tech.map((t) => t.name).join(", ")}.</span></li>)}</ul></Row>
        <Row t="Contact"><p className="text-sm"><a className="link" href={`mailto:${profile.email}`}>{profile.email}</a> · <a className="link" href={profile.github} rel="noopener noreferrer">GitHub</a> · <a className="link" href={profile.linkedin} rel="noopener noreferrer">LinkedIn</a> · <a className="link" href={profile.dockerhub} rel="noopener noreferrer">Docker Hub</a></p></Row>
      </div>
    </div>
  );
}
