import { Link } from "react-router-dom";
import { levelLabel, skillGroups, type SkillLevel } from "../data/site";
import { projects } from "../data/projects";
import PageHead from "../components/PageHead";
import { useSeo } from "../lib/seo";

const mark: Record<SkillLevel, string> = { used: "●", "hands-on": "◐", familiar: "○", learning: "◇" };

export default function Skills() {
  useSeo("Technical skills", "An honest skills matrix: what Vijay Kardak has used in projects, practised hands-on, is familiar with, or is currently learning.", "/skills");
  return (
    <div className="mx-auto max-w-[1200px] px-5 md:px-8">
      <PageHead label="03 — Skills" title="What I know, and how well." intro="No percentages. Each skill carries one of four plain labels, and groups link to the projects where they were used." />
      <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm border-y border-ink py-3" aria-label="Legend">
        {(Object.keys(levelLabel) as SkillLevel[]).map((l) => <li key={l}><span aria-hidden="true" className="text-accent mr-1.5">{mark[l]}</span>{levelLabel[l]}</li>)}
      </ul>
      {skillGroups.map((g) => (
        <section key={g.id} className="grid md:grid-cols-12 gap-4 border-b border-rule py-6" aria-labelledby={`g-${g.id}`}>
          <div className="md:col-span-3">
            <h2 id={`g-${g.id}`} className="text-xl">{g.title}</h2>
            {g.projects.length > 0 && <p className="mt-2 text-xs text-graphite">Used in: {g.projects.map((id, i) => { const p = projects.find((x) => x.id === id); return p ? <span key={id}>{i > 0 && ", "}<Link className="link" to={`/projects/${id}`}>{p.num}</Link></span> : null; })}</p>}
          </div>
          <ul className="md:col-span-9 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-1">
            {g.items.map((s) => (
              <li key={s.name} className="flex items-baseline justify-between gap-3 border-b border-rule/60 py-1.5 text-sm">
                <span>{s.name}</span>
                <span className="font-mono text-[0.7rem] text-graphite whitespace-nowrap"><span aria-hidden="true" className="text-accent mr-1">{mark[s.level]}</span>{levelLabel[s.level]}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
