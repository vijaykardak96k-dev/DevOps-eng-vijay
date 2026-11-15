import { useState } from "react";
import { allTags, projects } from "../data/projects";
import ProjectEntry from "../components/ProjectEntry";
import { useSeo } from "../lib/seo";

export default function Projects() {
  useSeo("Selected work", "Six hands-on DevOps projects: Kubernetes deployment, Jenkins CI/CD, kops on AWS, EBS CSI storage, Ingress networking and a Dockerised three-tier app.", "/projects");
  const [tag, setTag] = useState("All");
  const shown = projects.filter((p) => tag === "All" || p.tags.includes(tag));
  return (
    <div className="mx-auto max-w-[1200px] px-5 md:px-8 pt-14">
      <p className="label">Selected work</p>
      <h1 className="text-5xl md:text-6xl mt-3">Six projects, documented as case studies.</h1>
      <p className="mt-5 text-graphite prose-ed">Each case study separates what the project covers from what is already written up. Sections without verified detail say so instead of filling the gap.</p>
      <div role="group" aria-label="Filter projects" className="mt-8 flex flex-wrap gap-2">
        {allTags.map((t) => (
          <button key={t} onClick={() => setTag(t)} aria-pressed={tag === t}
            className={`font-mono text-xs px-3 py-1.5 border ${tag === t ? "bg-ink text-paper border-ink" : "border-rule hover:border-ink"}`}>{t}</button>
        ))}
      </div>
      <p className="label mt-6" aria-live="polite">{shown.length} of {projects.length} projects</p>
      <div className="mt-2">{shown.map((p, i) => <ProjectEntry key={p.id} p={p} flip={i % 2 === 1} />)}</div>
    </div>
  );
}
