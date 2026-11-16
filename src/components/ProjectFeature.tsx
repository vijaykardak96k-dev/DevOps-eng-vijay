import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";
import Diagram from "./Diagram";
import Reveal from "./Reveal";
import { GithubIcon } from "./Icons";

export type FeatureSize = "hero" | "half" | "row";

export default function ProjectFeature({ p, size = "half" }: { p: Project; size?: FeatureSize }) {
  const links = (
    <p className="mt-6 flex flex-wrap items-center gap-3">
      <Link to={`/projects/${p.id}`} className="btn btn-solid !py-2.5">View case study<ArrowUpRight className="size-4" aria-hidden /></Link>
      <a href={p.repo} rel="noopener noreferrer" className="btn btn-line !py-2.5"><GithubIcon />Repository</a>
    </p>
  );
  const chips = <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">{p.tech.map((t) => <li key={t.name} className="mono text-[0.7rem] border border-line px-2 py-0.5 text-mute">{t.name}</li>)}</ul>;
  const head = (cls: string) => (
    <>
      <p className="tag"><span className="text-accent">{p.num}</span> / {p.type}</p>
      <h3 className={`mt-2 ${cls}`}><Link to={`/projects/${p.id}`} className="hover:text-accent transition-colors">{p.title}</Link></h3>
    </>
  );

  if (size === "hero")
    return (
      <Reveal><article className="border border-line bg-panel grid lg:grid-cols-12" aria-label={p.title}>
        <div className="min-w-0 lg:col-span-7 p-6 md:p-10 flex flex-col justify-between">
          <div>{head("text-5xl md:text-7xl")}<p className="mt-5 text-mute max-w-[52ch]">{p.summary}</p>{chips}</div>{links}
        </div>
        <div className="min-w-0 lg:col-span-5 p-6 md:p-10 border-t lg:border-t-0 lg:border-l border-line bg-panel2/40 flex flex-col justify-center gap-3">
          <p className="tag">Architecture</p><Diagram flow={p.flow} /><p className="text-xs text-mute">{p.flow.note}</p>
        </div>
      </article></Reveal>
    );
  if (size === "row")
    return (
      <Reveal><article className="border border-line bg-panel p-6 md:p-8 grid gap-6 lg:grid-cols-12 items-center" aria-label={p.title}>
        <div className="min-w-0 lg:col-span-5">{head("text-4xl md:text-5xl")}<p className="mt-4 text-mute">{p.summary}</p>{links}</div>
        <div className="min-w-0 lg:col-span-7 space-y-3"><Diagram flow={p.flow} />{chips}</div>
      </article></Reveal>
    );
  return (
    <Reveal className="h-full"><article className="border border-line bg-panel p-6 md:p-8 h-full flex flex-col" aria-label={p.title}>
      {head("text-4xl md:text-5xl")}<p className="mt-4 text-mute">{p.summary}</p>
      <div className="mt-6"><Diagram flow={p.flow} compact /></div>{chips}<div className="mt-auto">{links}</div>
    </article></Reveal>
  );
}
