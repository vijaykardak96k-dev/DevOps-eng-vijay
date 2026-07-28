import { useMemo, useState } from "react";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import projectsData from "../data/projects.json";
import type { Project } from "../types";

const projects = projectsData as Project[];
const FILTERS = [
  { id: "all", label: "All" },
  { id: "completed", label: "Completed" },
  { id: "learning", label: "In Progress" },
];

export default function Projects() {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.status === filter)),
    [filter]
  );

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-24">
      <SectionHeading
        eyebrow="Built &amp; shipped"
        title="Projects, generated from projects.json"
        description="Pipelines, clusters, and infrastructure-as-code — each one broken on purpose at least once before it worked."
      />

      <div className="mb-10 flex justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`focus-ring rounded-full border px-4 py-1.5 text-xs font-medium transition-colors ${
              filter === f.id ? "border-transparent text-white" : "border-white/10 text-zinc-400 hover:text-white"
            }`}
            style={
              filter === f.id
                ? { background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }
                : undefined
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
