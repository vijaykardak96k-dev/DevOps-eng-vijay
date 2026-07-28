import { motion } from "framer-motion";
import { Target, Sparkles, Compass, MapPin } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import profile from "../data/profile.json";

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-32 pb-24">
      <SectionHeading eyebrow="About me" title="The story behind the pipelines" align="left" />

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_260px]">
        <div className="space-y-5">
          {profile.about.story.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="leading-relaxed text-zinc-400"
            >
              {para}
            </motion.p>
          ))}

          <div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-[var(--color-card)] p-5">
              <Compass size={18} style={{ color: "var(--color-secondary)" }} />
              <h3 className="mt-3 font-display text-sm font-semibold">Why DevOps</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{profile.about.whyDevOps}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-[var(--color-card)] p-5">
              <Sparkles size={18} style={{ color: "var(--color-accent)" }} />
              <h3 className="mt-3 font-display text-sm font-semibold">How I learn</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{profile.about.learningMindset}</p>
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-[var(--color-card)] p-5">
            <div className="flex items-center gap-2">
              <Target size={18} style={{ color: "var(--color-primary)" }} />
              <h3 className="font-display text-sm font-semibold">Where I'm going</h3>
            </div>
            <ul className="mt-3 space-y-2">
              {profile.about.goals.map((goal) => (
                <li key={goal} className="flex items-start gap-2 text-sm text-zinc-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--color-secondary)" }} />
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="h-fit rounded-2xl border border-white/5 bg-[var(--color-card)] p-6"
        >
          <div
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-bold text-white"
            style={{ background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }}
          >
            VK
          </div>
          <h3 className="mt-4 text-center font-display text-lg font-semibold">{profile.name}</h3>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-center text-xs text-zinc-500">
            <MapPin size={13} /> {profile.location}
          </p>
          <div className="mt-5 space-y-2 border-t border-white/5 pt-5 text-xs text-zinc-500">
            {profile.titles.map((title) => (
              <div key={title} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full" style={{ background: "var(--color-success)" }} />
                {title}
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
