import { Link } from "react-router-dom";
import { levelLabel, mark, skillGroups } from "../data/site";
import { projects } from "../data/projects";
import { Legend, PageHead } from "../components/Bits";
import Reveal from "../components/Reveal";
import { useSeo } from "../lib/seo";

export default function Skills() {
  useSeo("Technical skills", "What Vijay Kardak has used in projects, practised hands-on, is familiar with, or is currently learning across Linux, containers, Kubernetes, CI/CD and AWS.", "/skills");
  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-8">
      <PageHead label="Skills" title="What I know, and how well" intro="Four plain labels instead of percentages. Groups link to the projects where the skills were used." />
      <div className="mb-8"><Legend /></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((g, i) => (
          <Reveal key={g.id} delay={(i % 3) * 0.05} className={g.id === "cloud" || g.id === "orchestration" ? "lg:col-span-2" : ""}>
            <section className="h-full border border-line bg-panel p-5" aria-labelledby={`g-${g.id}`}>
              <div className="flex items-baseline justify-between gap-3"><h2 id={`g-${g.id}`} className="text-3xl">{g.title}</h2><span className="mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span></div>
              <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
                {g.items.map((s) => (
                  <li key={s.name} className="flex flex-wrap items-baseline justify-between gap-x-3 border-b border-line py-1.5 text-sm">
                    <span>{s.name}</span><span className="mono text-[0.68rem] text-mute"><span aria-hidden className="text-accent mr-1">{mark[s.level]}</span>{levelLabel[s.level]}</span>
                  </li>
                ))}
              </ul>
              {g.projects.length > 0 && <p className="mt-4 text-xs text-mute">Used in: {g.projects.map((id, k) => { const p = projects.find((x) => x.id === id); return p ? <span key={id}>{k > 0 && ", "}<Link className="link" to={`/projects/${id}`}>{p.num}</Link></span> : null; })}</p>}
            </section>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
