import { Link } from "react-router-dom";
import type { Project } from "../data/projects";
import FlowDiagram from "./FlowDiagram";

export default function ProjectEntry({ p, flip }: { p: Project; flip?: boolean }) {
  return (
    <article className="border-t border-ink py-10 grid gap-8 md:grid-cols-12" aria-labelledby={`p-${p.id}`}>
      <div className={`md:col-span-6 ${flip ? "md:order-2" : ""}`}>
        <p className="label">{p.num} — {p.type}</p>
        <h3 id={`p-${p.id}`} className="text-3xl md:text-4xl mt-2"><Link to={`/projects/${p.id}`} className="hover:text-accent">{p.title}</Link></h3>
        <p className="mt-4 text-graphite prose-ed">{p.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {p.tech.map((t) => <li key={t.name} className="font-mono text-xs border border-rule px-2 py-0.5">{t.name}</li>)}
        </ul>
        <p className="mt-6 flex gap-6 text-sm">
          <Link className="link font-medium" to={`/projects/${p.id}`}>Read case study →</Link>
          <a className="link" href={p.repo} rel="noopener noreferrer">GitHub repository ↗</a>
        </p>
      </div>
      <div className={`md:col-span-6 ${flip ? "md:order-1" : ""}`}><FlowDiagram nodes={p.flow.nodes} note={p.flow.note} /></div>
    </article>
  );
}
