import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { ICON_MAP } from "./SkillIconMap";
import type { Skill } from "../types";

const STATUS_STYLES: Record<Skill["status"], { label: string; dot: string; text: string }> = {
  completed: { label: "Completed", dot: "var(--color-success)", text: "text-emerald-400" },
  learning: { label: "Learning", dot: "var(--color-secondary)", text: "text-cyan-400" },
  planned: { label: "Planned", dot: "var(--color-accent)", text: "text-purple-400" },
};

export default function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const status = STATUS_STYLES[skill.status];
  const Icon = ICON_MAP[skill.icon] || Circle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.3) }}
      whileHover={{ y: -4 }}
      className="group relative rounded-xl border border-white/5 bg-[var(--color-card)] p-4 transition-colors hover:border-white/10"
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: "color-mix(in srgb, var(--color-primary) 15%, transparent)" }}
        >
          <Icon size={18} style={{ color: "var(--color-secondary)" }} />
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-mono">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: status.dot }} />
          <span className={status.text}>{status.label}</span>
        </span>
      </div>
      <h3 className="mt-3 text-sm font-semibold text-zinc-100">{skill.name}</h3>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="h-full rounded-full"
          style={{ background: "linear-gradient(90deg, var(--color-primary), var(--color-secondary))" }}
        />
      </div>
    </motion.div>
  );
}
