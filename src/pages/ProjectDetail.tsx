import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, projects } from "../data/projects";
import Diagram from "../components/Diagram";
import CodeBlock from "../components/CodeBlock";
import Reveal from "../components/Reveal";
import { GithubIcon } from "../components/Icons";
import NotFound from "./NotFound";
import { useSeo } from "../lib/seo";

const Steps = ({ items }: { items: string[] }) => (
  <ol className="space-y-3">{items.map((s, i) => <li key={s} className="flex gap-4"><span className="mono text-xs text-accent pt-1">{String(i + 1).padStart(2, "0")}</span><span className="max-w-[65ch]">{s}</span></li>)}</ol>
);

export default function ProjectDetail() {
  const { id = "" } = useParams();
  const p = getProject(id);
  useSeo(p ? p.title : "Project not found", p ? p.summary : "This project does not exist.", `/projects/${id}`);
  if (!p) return <NotFound />;
  const ev = p.evidence ?? {};

  // Only sections that have content are rendered, and they are numbered in order.
  const sections: { title: string; body: ReactNode }[] = [
    { title: "Overview", body: <p className="text-lg max-w-[65ch]">{p.overview}</p> },
    { title: "Objective", body: <p className="max-w-[65ch] text-mute">{p.objective}</p> },
    { title: "Architecture", body: (
      <div className="space-y-6">
        <div className="border border-line bg-panel p-5"><Diagram flow={p.flow} /><p className="text-xs text-mute mt-4">{p.flow.note}</p></div>
        {ev.images?.map((im) => <img key={im.src} src={im.src} alt={im.alt} loading="lazy" className="border border-line max-w-full" />)}
        <div className="grid gap-6 sm:grid-cols-2">{p.primer.map((x) => <div key={x.heading}><h3 className="text-2xl">{x.heading}</h3><p className="text-mute mt-2 text-sm">{x.body}</p></div>)}</div>
      </div>) },
    { title: "Technologies", body: (
      <dl className="divide-y divide-line border-y border-line">{p.tech.map((t) => <div key={t.name} className="grid grid-cols-3 gap-3 py-3"><dt className="mono text-sm text-accent">{t.name}</dt><dd className="col-span-2 text-mute">{t.role}</dd></div>)}</dl>) },
    ...(ev.steps ? [{ title: "Implementation steps", body: <Steps items={ev.steps} /> }] : []),
    ...(ev.config ? [{ title: "Configuration", body: <div className="space-y-4">{ev.config.map((c) => <CodeBlock key={c.caption} {...c} />)}</div> }] : []),
    ...(ev.deployment ? [{ title: "Deployment workflow", body: <Steps items={ev.deployment} /> }] : []),
    ...(ev.verification ? [{ title: "Testing and verification", body: <Steps items={ev.verification} /> }] : []),
    ...(ev.challenges ? [{ title: "Challenges and solutions", body: <dl className="space-y-5">{ev.challenges.map((c) => <div key={c.problem}><dt className="font-medium">{c.problem}</dt><dd className="text-mute mt-1">{c.fix}</dd></div>)}</dl> }] : []),
    ...(ev.learned ? [{ title: "What I learned", body: <ul className="list-disc pl-5 space-y-2 max-w-[65ch]">{ev.learned.map((l) => <li key={l}>{l}</li>)}</ul> }] : []),
  ];

  return (
    <article className="mx-auto max-w-[1280px] px-5 md:px-8">
      <header className="pt-10 pb-12 border-b border-line">
        <Link to="/projects" className="link text-sm inline-flex items-center gap-2"><ArrowLeft className="size-4" aria-hidden />All projects</Link>
        <p className="tag mt-10"><span className="text-accent">{p.num}</span> / {p.type}</p>
        <h1 className="text-5xl sm:text-6xl md:text-8xl mt-3 max-w-[16ch]">{p.title}</h1>
        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">{p.tech.map((t) => <li key={t.name} className="mono text-xs border border-line px-2.5 py-1">{t.name}</li>)}</ul>
        <a href={p.repo} rel="noopener noreferrer" className="btn btn-solid mt-8"><GithubIcon />View repository<ArrowUpRight className="size-4" aria-hidden /></a>
      </header>
      {sections.map((s, i) => (
        <Reveal key={s.title}>
          <section className="grid gap-4 lg:grid-cols-12 py-10 border-b border-line" aria-labelledby={`s${i}`}>
            <h2 id={`s${i}`} className="min-w-0 lg:col-span-3 text-3xl"><span className="mono text-xs text-accent block mb-2">{String(i + 1).padStart(2, "0")}</span>{s.title}</h2>
            <div className="min-w-0 lg:col-span-9">{s.body}</div>
          </section>
        </Reveal>
      ))}
      <section className="py-10 grid gap-4 lg:grid-cols-12" aria-labelledby="rel">
        <h2 id="rel" className="min-w-0 lg:col-span-3 text-3xl">Related</h2>
        <ul className="min-w-0 lg:col-span-9 grid gap-3 sm:grid-cols-2">
          {p.related.map((r) => { const rp = projects.find((x) => x.id === r); return rp ? <li key={r}><Link to={`/projects/${r}`} className="block border border-line p-4 hover:border-accent transition-colors"><span className="mono text-xs text-accent">{rp.num}</span><span className="block font-display text-2xl uppercase mt-1">{rp.title}</span></Link></li> : null; })}
        </ul>
      </section>
    </article>
  );
}
