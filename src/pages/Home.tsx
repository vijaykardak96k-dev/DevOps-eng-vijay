import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Download, ArrowRight } from "lucide-react";
import { GithubIcon } from "../components/BrandIcons";
import FloatingShapes from "../components/FloatingShapes";
import TypingText from "../components/TypingText";
import DeployTerminal from "../components/DeployTerminal";
import AnimatedCounter from "../components/AnimatedCounter";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import TimelineItem from "../components/TimelineItem";
import profile from "../data/profile.json";
import projectsData from "../data/projects.json";
import timelineData from "../data/timeline.json";
import type { Project, TimelineItem as TimelineItemType } from "../types";

const projects = projectsData as Project[];
const timeline = timelineData as TimelineItemType[];
const featured = projects.filter((p) => p.featured).slice(0, 3);
const recentTimeline = timeline.slice(-4);

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-grid pt-24">
        <FloatingShapes />
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-400"
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--color-success)" }} />
              Available for opportunities
            </span>

            <h1 className="font-display mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Hey, I'm <span className="text-gradient">{profile.name}</span>
            </h1>

            <div className="mt-3 h-9 font-mono text-lg text-zinc-300 sm:text-xl">
              <TypingText words={profile.titles} className="text-gradient" />
            </div>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400">
              {profile.tagline} I design, containerize, and ship infrastructure — then write down every lesson learned so the next deploy is quieter than the last.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/projects"
                className="focus-ring inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
              >
                View Projects <ArrowRight size={15} />
              </Link>
              <a
                href={profile.resumeFile}
                download
                className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-200 hover:bg-white/5 transition-colors"
              >
                <Download size={15} /> Resume
              </a>
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="focus-ring inline-flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-white/10 text-zinc-300 hover:bg-white/5 transition-colors"
              >
                <GithubIcon size={17} />
              </a>
              <Link
                to="/contact"
                aria-label="Contact"
                className="focus-ring inline-flex h-[46px] w-[46px] items-center justify-center rounded-xl border border-white/10 text-zinc-300 hover:bg-white/5 transition-colors"
              >
                <Mail size={17} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex justify-center lg:justify-end"
          >
            <DeployTerminal />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative mx-auto max-w-6xl px-4 sm:px-6 -mt-10">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/5 bg-[var(--color-card)] p-6 sm:grid-cols-4">
          {profile.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl font-bold text-gradient">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-xs text-zinc-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Currently learning */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeading
          eyebrow="Right now"
          title="What I'm learning this quarter"
          description="The DevOps landscape never stands still — here's what's currently on my bench."
        />
        <div className="flex flex-wrap justify-center gap-3">
          {profile.currentlyLearning.map((item) => (
            <span
              key={item}
              className="gradient-border rounded-full bg-[var(--color-card)] px-4 py-2 font-mono text-sm text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Featured projects */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <SectionHeading
          eyebrow="Featured work"
          title="Projects worth a second look"
          description="A sample of pipelines, clusters, and infrastructure I've built end to end."
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/projects"
            className="focus-ring inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--color-secondary)" }}
          >
            See all projects <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Timeline preview */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20">
        <SectionHeading
          eyebrow="The journey so far"
          title="Latest milestones"
          description="A rolling log of what I've picked up recently, straight from the journey page."
        />
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 md:grid-cols-[1fr_auto_1fr]">
          {recentTimeline.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} side={i % 2 === 0 ? "left" : "right"} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/journey"
            className="focus-ring inline-flex items-center gap-2 text-sm font-semibold"
            style={{ color: "var(--color-secondary)" }}
          >
            View full journey <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
