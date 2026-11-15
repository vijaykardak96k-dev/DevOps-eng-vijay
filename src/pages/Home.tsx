import { Link } from "react-router-dom";
import { profile } from "../data/site";
import { projects } from "../data/projects";
import ProjectEntry from "../components/ProjectEntry";
import { useSeo } from "../lib/seo";

const focus = ["Linux and shell", "Containers with Docker", "Kubernetes workloads and networking", "AWS infrastructure", "CI/CD pipelines", "Infrastructure automation"];

export default function Home() {
  useSeo("Vijay Kardak — Entry-Level DevOps & Cloud Engineer", "Entry-level DevOps and Cloud Engineer in India. Linux, AWS, Kubernetes, containers and CI/CD, documented through six hands-on projects.", "/");
  return (
    <>
      <section className="mx-auto max-w-[1200px] px-5 md:px-8 pt-12 md:pt-20 grid gap-12 md:grid-cols-12" aria-labelledby="hero">
        <div className="md:col-span-8">
          <p className="label">DevOps &amp; Cloud Engineering</p>
          <h1 id="hero" className="mt-5 text-5xl sm:text-6xl md:text-7xl">Building, deploying and <em className="text-accent">understanding</em> infrastructure.</h1>
          <p className="mt-8 text-lg text-graphite prose-ed">
            I'm Vijay Kardak, an entry-level DevOps and Cloud Engineer focused on Linux, AWS, Kubernetes, containerisation and CI/CD automation. I learn by building infrastructure, deploying applications and troubleshooting the systems behind them.
          </p>
          <p className="mt-3 font-mono text-xs text-graphite">{profile.role} · {profile.positioning} · {profile.location}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link to="/projects" className="bg-ink text-paper px-5 py-3 hover:bg-accent transition-colors">View projects</Link>
            <a className="link" href={profile.resume} download>Download resume (PDF)</a>
            <a className="link" href={profile.github} rel="noopener noreferrer">GitHub</a>
            <a className="link" href={profile.linkedin} rel="noopener noreferrer">LinkedIn</a>
            <a className="link" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </div>
        <aside className="md:col-span-4" aria-label="Index of work and focus areas">
          <p className="label border-b border-ink pb-2">Index of work</p>
          <ol>
            {projects.map((p) => (
              <li key={p.id} className="border-b border-rule">
                <Link to={`/projects/${p.id}`} className="flex gap-3 py-2.5 hover:text-accent">
                  <span className="font-mono text-xs pt-1 text-graphite">{p.num}</span>
                  <span className="text-sm leading-snug">{p.title}</span>
                </Link>
              </li>
            ))}
          </ol>
          <p className="label border-b border-ink pb-2 mt-8">Focus areas</p>
          <ol className="list-none">
            {focus.map((f, i) => <li key={f} className="flex gap-3 py-1.5 text-sm border-b border-rule"><span className="font-mono text-xs pt-0.5 text-graphite">{String.fromCharCode(65 + i)}</span>{f}</li>)}
          </ol>
        </aside>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 md:px-8 mt-24" aria-labelledby="work">
        <div className="flex items-end justify-between mb-6">
          <h2 id="work" className="text-4xl md:text-5xl"><span className="label block mb-2">Selected work</span>What I've built</h2>
          <Link to="/projects" className="link text-sm">All six projects →</Link>
        </div>
        {projects.slice(0, 3).map((p, i) => <ProjectEntry key={p.id} p={p} flip={i % 2 === 1} />)}
      </section>
    </>
  );
}
