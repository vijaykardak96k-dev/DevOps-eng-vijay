import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { getProject, projects } from "../data/projects";
import FlowDiagram from "../components/FlowDiagram";
import CodeBlock from "../components/CodeBlock";
import NotFound from "./NotFound";
import { useSeo } from "../lib/seo";

const Missing = () => <p className="border border-dashed border-graphite px-4 py-3 text-sm text-graphite">Not documented yet. This section will be added from the project repository rather than guessed.</p>;

function Section({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="grid gap-4 md:grid-cols-12 border-t border-ink py-8" aria-labelledby={`s${n}`}>
      <h2 id={`s${n}`} className="md:col-span-3 text-2xl"><span className="label block mb-1">{String(n).padStart(2, "0")}</span>{title}</h2>
      <div className="md:col-span-9 space-y-4">{children}</div>
    </section>
  );
}

const List = ({ items }: { items: string[] }) => <ol className="list-decimal pl-5 space-y-2 prose-ed">{items.map((s) => <li key={s}>{s}</li>)}</ol>;

export default function ProjectDetail() {
  const { id = "" } = useParams();
  const p = getProject(id);
  useSeo(p ? p.title : "Project not found", p ? p.summary : "This project does not exist.", `/projects/${id}`);
  if (!p) return <NotFound />;
  const ev = p.evidence ?? {};
  return (
    <article className="mx-auto max-w-[1200px] px-5 md:px-8 pt-12">
      <Link to="/projects" className="link text-sm">← All projects</Link>
      <p className="label mt-8">Case study {p.num} — {p.type}</p>
      <h1 className="text-4xl sm:text-5xl md:text-6xl mt-3 max-w-[20ch]">{p.title}</h1>
      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">{p.tech.map((t) => <li key={t.name} className="font-mono text-xs border border-rule px-2 py-0.5">{t.name}</li>)}</ul>
      <div className="mt-10" />
      <Section n={1} title="Overview"><p className="prose-ed text-lg">{p.overview}</p></Section>
      <Section n={2} title="Objective"><p className="prose-ed">{p.objective}</p></Section>
      <Section n={3} title="Architecture">
        <FlowDiagram nodes={p.flow.nodes} note={p.flow.note} />
        {ev.images?.map((im) => <img key={im.src} src={im.src} alt={im.alt} loading="lazy" className="border border-ink max-w-full" />)}
        <div className="grid gap-6 sm:grid-cols-2">
          {p.primer.map((x) => <div key={x.heading}><h3 className="text-lg font-semibold font-sans tracking-normal">{x.heading}</h3><p className="text-graphite mt-1">{x.body}</p></div>)}
        </div>
      </Section>
      <Section n={4} title="Technology choices">
        <dl className="divide-y divide-rule border-y border-rule">
          {p.tech.map((t) => <div key={t.name} className="grid grid-cols-3 gap-3 py-2"><dt className="font-mono text-sm">{t.name}</dt><dd className="col-span-2 text-graphite">{t.role}</dd></div>)}
        </dl>
      </Section>
      <Section n={5} title="Implementation steps">{ev.steps ? <List items={ev.steps} /> : <Missing />}</Section>
      <Section n={6} title="Configuration and code">{ev.config ? ev.config.map((c) => <CodeBlock key={c.caption} {...c} />) : <Missing />}</Section>
      <Section n={7} title="Deployment workflow">{ev.deployment ? <List items={ev.deployment} /> : <Missing />}</Section>
      <Section n={8} title="Verification and results">{ev.verification ? <List items={ev.verification} /> : <Missing />}</Section>
      <Section n={9} title="Challenges and troubleshooting">
        {ev.challenges ? <dl className="space-y-4">{ev.challenges.map((c) => <div key={c.problem}><dt className="font-semibold">{c.problem}</dt><dd className="text-graphite">{c.fix}</dd></div>)}</dl> : <Missing />}
      </Section>
      <Section n={10} title="What I learned">{ev.learned ? <ul className="list-disc pl-5 space-y-2 prose-ed">{ev.learned.map((l) => <li key={l}>{l}</li>)}</ul> : <Missing />}</Section>
      <Section n={11} title="GitHub repository"><a className="link font-mono text-sm break-all" href={p.repo} rel="noopener noreferrer">{p.repo} ↗</a></Section>
      <Section n={12} title="Related projects">
        <ul className="space-y-2">{p.related.map((r) => { const rp = projects.find((x) => x.id === r); return rp ? <li key={r}><Link className="link" to={`/projects/${r}`}><span className="font-mono text-xs mr-2">{rp.num}</span>{rp.title}</Link></li> : null; })}</ul>
      </Section>
    </article>
  );
}
