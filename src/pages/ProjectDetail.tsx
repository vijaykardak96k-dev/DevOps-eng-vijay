import { Link, useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, FolderTree, Lightbulb, AlertTriangle, Rocket } from "lucide-react";
import { GithubIcon } from "../components/BrandIcons";
import projectsData from "../data/projects.json";
import type { Project } from "../types";

const projects = projectsData as Project[];

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) return <Navigate to="/projects" replace />;

  const sections = [
    { title: "Overview", icon: Lightbulb, content: project.details.overview },
    { title: "Architecture", icon: FolderTree, content: project.details.architecture },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-32 pb-24">
      <Link to="/projects" className="focus-ring inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white">
        <ArrowLeft size={15} /> Back to projects
      </Link>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="font-display mt-6 text-3xl font-bold sm:text-4xl">{project.title}</h1>
        <p className="mt-2 italic text-zinc-500">{project.tagline}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.techStack.map((t) => (
            <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-zinc-400">
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex gap-3">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm font-medium text-zinc-200 hover:bg-white/5"
          >
            <GithubIcon size={15} /> View Code
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white"
              style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
            >
              <ArrowUpRight size={15} /> Live Demo
            </a>
          )}
        </div>

        <div className="mt-12 space-y-10">
          {sections.map(({ title, icon: Icon, content }) => (
            <div key={title}>
              <div className="flex items-center gap-2">
                <Icon size={17} style={{ color: "var(--color-secondary)" }} />
                <h2 className="font-display text-lg font-semibold">{title}</h2>
              </div>
              <p className="mt-3 leading-relaxed text-zinc-400">{content}</p>
            </div>
          ))}

          <div>
            <h2 className="font-display text-lg font-semibold">Features</h2>
            <ul className="mt-3 space-y-2">
              {project.details.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-zinc-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-primary)" }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <FolderTree size={17} style={{ color: "var(--color-accent)" }} />
              <h2 className="font-display text-lg font-semibold">Folder Structure</h2>
            </div>
            <div className="mt-3 rounded-xl border border-white/10 bg-[var(--color-card)] p-4 font-mono text-xs text-zinc-400">
              {project.details.folderStructure.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-2">
                <Lightbulb size={17} style={{ color: "var(--color-success)" }} />
                <h2 className="font-display text-base font-semibold">Lessons Learned</h2>
              </div>
              <ul className="mt-3 space-y-2">
                {project.details.lessonsLearned.map((l) => (
                  <li key={l} className="text-sm text-zinc-400">
                    › {l}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle size={17} style={{ color: "#f59e0b" }} />
                <h2 className="font-display text-base font-semibold">Challenges</h2>
              </div>
              <ul className="mt-3 space-y-2">
                {project.details.challenges.map((c) => (
                  <li key={c} className="text-sm text-zinc-400">
                    › {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Rocket size={17} style={{ color: "var(--color-primary)" }} />
              <h2 className="font-display text-lg font-semibold">Future Improvements</h2>
            </div>
            <ul className="mt-3 space-y-2">
              {project.details.futureImprovements.map((f) => (
                <li key={f} className="text-sm text-zinc-400">
                  › {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
