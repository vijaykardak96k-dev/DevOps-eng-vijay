import { Download, GraduationCap, Briefcase, Wrench } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import profile from "../data/profile.json";
import skillsData from "../data/skills.json";
import projectsData from "../data/projects.json";
import type { SkillsData, Project } from "../types";

const skills = skillsData as SkillsData;
const projects = projectsData as Project[];

export default function Resume() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-32 pb-24">
      <SectionHeading eyebrow="Resume" title="Everything on one page" align="left" />

      <div className="mb-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/5 bg-[var(--color-card)] p-6 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-lg font-semibold">{profile.name}</h3>
          <p className="text-sm text-zinc-400">{profile.titles.join(" · ")}</p>
        </div>
        <a
          href={profile.resumeFile}
          download
          className="focus-ring inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
          style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
        >
          <Download size={15} /> Download PDF
        </a>
      </div>

      {/* Education Section */}
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <GraduationCap size={18} style={{ color: "var(--color-secondary)" }} />
          <h2 className="font-display text-lg font-semibold">Education</h2>
        </div>
        
        {profile.education && profile.education.length > 0 ? (
          <div className="space-y-4">
            {profile.education.map((edu: any) => (
              <div key={edu.id} className="rounded-xl border border-white/5 bg-[var(--color-card)] p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-semibold text-zinc-100">{edu.degree}</h3>
                  <span className="font-mono text-xs text-zinc-400">{edu.period}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-zinc-300">{edu.institution}</p>
                <p className="text-xs text-zinc-400">{edu.university} • {edu.location}</p>

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-zinc-300 border-t border-white/5 pt-3">
                  <span><strong className="text-zinc-200">Status:</strong> {edu.status}</span>
                  {edu.expectedCgpa && <span><strong className="text-zinc-200">Expected CGPA:</strong> {edu.expectedCgpa}</span>}
                </div>

                {edu.highlights && edu.highlights.length > 0 && (
                  <ul className="mt-3 list-disc list-inside space-y-1 text-xs text-zinc-400">
                    {edu.highlights.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-white/5 bg-[var(--color-card)] p-5">
            <p className="text-sm text-zinc-400">
              Update this section in <code className="font-mono text-xs text-zinc-500">profile.json</code> or extend it with an
              <code className="font-mono text-xs text-zinc-500"> education.json</code> file — the page will pick it up automatically.
            </p>
          </div>
        )}
      </section>

      {/* Experience Section */}
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <Briefcase size={18} style={{ color: "var(--color-accent)" }} />
          <h2 className="font-display text-lg font-semibold">Experience</h2>
        </div>
        <div className="rounded-xl border border-white/5 bg-[var(--color-card)] p-5">
          <p className="text-sm text-zinc-400">
            Hands-on, self-directed DevOps practice — building and breaking pipelines, clusters, and infrastructure in
            personal and lab environments to build real production-shaped experience ahead of a first full-time role.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <Wrench size={18} style={{ color: "var(--color-primary)" }} />
          <h2 className="font-display text-lg font-semibold">Skills Summary</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.categories.map((cat) => (
            <span key={cat.id} className="rounded-lg border border-white/5 bg-[var(--color-card)] px-3 py-1.5 text-xs text-zinc-400">
              <span className="font-semibold text-zinc-200">{cat.label}:</span> {cat.skills.length} tools
            </span>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <Briefcase size={18} style={{ color: "var(--color-success)" }} />
          <h2 className="font-display text-lg font-semibold">Projects</h2>
        </div>
        <ul className="space-y-3">
          {projects.map((p) => (
            <li key={p.id} className="rounded-xl border border-white/5 bg-[var(--color-card)] p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-sm font-semibold text-zinc-100">{p.title}</h3>
                <span className="font-mono text-[11px] text-zinc-500">{p.techStack.join(", ")}</span>
              </div>
              <p className="mt-1.5 text-sm text-zinc-400">{p.description}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}