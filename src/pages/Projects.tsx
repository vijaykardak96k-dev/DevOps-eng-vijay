import { useState } from "react";
import { allTags, projects } from "../data/projects";
import ProjectFeature from "../components/ProjectFeature";
import { PageHead } from "../components/Bits";
import { useSeo } from "../lib/seo";

export default function Projects() {
  useSeo("Selected work", "Six hands-on DevOps projects: Kubernetes deployment, Jenkins CI/CD, kops on AWS, EBS CSI storage, Ingress networking and a Dockerised three-tier app.", "/projects");
  const [tag, setTag] = useState("All");
  const filtered = tag !== "All";
  const shown = projects.filter((p) => !filtered || p.tags.includes(tag));
  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-8">
      <PageHead label="Work" title="Six projects" intro="Each links to a case study and its GitHub repository." />
      <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2 mb-3">
        {allTags.map((t) => <button key={t} onClick={() => setTag(t)} aria-pressed={tag === t} className={`mono text-xs px-3 py-1.5 border ${tag === t ? "bg-accent text-bg border-accent" : "border-line hover:border-accent"}`}>{t}</button>)}
      </div>
      <p className="tag mb-6" aria-live="polite">{shown.length} of {projects.length} projects</p>
      <div className={filtered ? "grid gap-4 md:grid-cols-2" : "space-y-4"}>
        {filtered ? shown.map((p) => <ProjectFeature key={p.id} p={p} />) : (
          <>
            <ProjectFeature p={shown[0]} size="hero" />
            <div className="grid gap-4 md:grid-cols-2"><ProjectFeature p={shown[1]} /><ProjectFeature p={shown[2]} /></div>
            <ProjectFeature p={shown[3]} size="row" />
            <div className="grid gap-4 md:grid-cols-2"><ProjectFeature p={shown[4]} /><ProjectFeature p={shown[5]} /></div>
          </>
        )}
      </div>
    </div>
  );
}
