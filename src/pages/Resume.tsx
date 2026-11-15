import { profile, skillGroups, levelLabel } from "../data/site";
import { projects } from "../data/projects";
import PageHead from "../components/PageHead";
import { useSeo } from "../lib/seo";

export default function Resume() {
  useSeo("Resume", "Resume of Vijay Kardak, entry-level DevOps and Cloud Engineer: education, technical skills and hands-on DevOps projects.", "/resume");
  const core = skillGroups.filter((g) => g.id !== "learning");
  return (
    <div className="mx-auto max-w-[1200px] px-5 md:px-8">
      <PageHead label="05 — Resume" title="Vijay Kardak" intro="Entry-level DevOps & Cloud Engineer. Experience below is self-directed, hands-on project work, not employment." />
      <a href={profile.resume} download className="inline-block bg-ink text-paper px-5 py-3 text-sm hover:bg-accent transition-colors">Download resume (PDF)</a>
      <div className="mt-10 border-t border-ink">
        <Row t="Profile"><p className="prose-ed">Final-year BCA student seeking an entry-level DevOps or Cloud Engineer role. Hands-on practice with Linux, Docker, Kubernetes, Jenkins, AWS and CI/CD through six self-directed projects.</p></Row>
        <Row t="Education"><p>{profile.education.degree}<br /><span className="text-graphite">{profile.education.college}, {profile.education.university}</span></p></Row>
        <Row t="Technical skills">
          <ul className="space-y-1.5 text-sm">{core.map((g) => <li key={g.id}><strong className="font-medium">{g.title}:</strong> <span className="text-graphite">{g.items.filter((i) => i.level !== "familiar").map((i) => i.name).join(", ")}</span></li>)}</ul>
          <p className="text-xs text-graphite mt-3">Listed: {levelLabel.used.toLowerCase()}, {levelLabel["hands-on"].toLowerCase()} and {levelLabel.learning.toLowerCase()}. Skills I am only familiar with are on the skills page.</p>
        </Row>
        <Row t="Hands-on DevOps projects"><ul className="space-y-3">{projects.map((p) => <li key={p.id}><strong className="font-medium">{p.title}.</strong> <span className="text-graphite">{p.tech.map((t) => t.name).join(", ")}.</span></li>)}</ul></Row>
        <Row t="Contact"><p><a className="link" href={`mailto:${profile.email}`}>{profile.email}</a> · <a className="link" href={profile.github} rel="noopener noreferrer">GitHub</a> · <a className="link" href={profile.linkedin} rel="noopener noreferrer">LinkedIn</a> · {profile.location}</p></Row>
      </div>
    </div>
  );
}
function Row({ t, children }: { t: string; children: React.ReactNode }) {
  return <section className="grid md:grid-cols-12 gap-3 py-6 border-b border-rule"><h2 className="md:col-span-3 label pt-1">{t}</h2><div className="md:col-span-9">{children}</div></section>;
}
