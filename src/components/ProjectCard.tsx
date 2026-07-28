import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import type { Project } from "../types";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -6 }}
      className="gradient-border group flex h-full flex-col overflow-hidden rounded-2xl bg-[var(--color-card)] border border-white/5"
    >
      <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-white/5 bg-gradient-to-br from-[#13131a] to-[#0c0c10]">
        <div
          className="absolute inset-0 opacity-40 bg-grid"
          style={{ maskImage: "radial-gradient(circle at 50% 50%, black, transparent 75%)" }}
        />
        <span className="relative font-display text-2xl font-bold text-gradient">
          {project.title.split(" ").slice(0, 2).join(" ")}
        </span>
        {project.status === "learning" && (
          <span
            className="absolute top-3 right-3 rounded-full px-2 py-0.5 text-[10px] font-mono uppercase tracking-wide"
            style={{ background: "color-mix(in srgb, var(--color-secondary) 20%, transparent)", color: "var(--color-secondary)" }}
          >
            Learning
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-semibold text-zinc-100">{project.title}</h3>
        <p className="mt-1 text-xs italic text-zinc-500">{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/5 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
          >
            <GithubIcon size={14} /> Code
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowUpRight size={14} /> Live
            </a>
          )}
          <Link
            to={`/projects/${project.id}`}
            className="focus-ring ml-auto flex items-center gap-1 text-xs font-medium transition-colors"
            style={{ color: "var(--color-secondary)" }}
          >
            Details <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
