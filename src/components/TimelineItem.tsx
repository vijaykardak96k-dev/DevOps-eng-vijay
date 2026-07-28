import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, Circle } from "lucide-react";
import type { TimelineItem as TimelineItemType } from "../types";

const STATUS_META: Record<TimelineItemType["status"], { icon: ReactNode; color: string }> = {
  completed: { icon: <Check size={13} />, color: "var(--color-success)" },
  learning: { icon: <Loader2 size={13} className="animate-spin" />, color: "var(--color-secondary)" },
  planned: { icon: <Circle size={13} />, color: "var(--color-accent)" },
};

export default function TimelineItem({ item, index, side }: { item: TimelineItemType; index: number; side: "left" | "right" }) {
  const meta = STATUS_META[item.status];

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="relative flex md:contents"
    >
      <div
        className={`hidden md:flex md:flex-col md:items-center ${side === "left" ? "md:col-start-1" : "md:col-start-3"}`}
      />
      <div className="absolute left-[15px] top-1 z-10 md:static md:left-auto md:top-auto md:col-start-2 md:flex md:items-center md:justify-center">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full border-2 bg-[var(--color-bg)]"
          style={{ borderColor: meta.color, color: meta.color }}
        >
          {meta.icon}
        </span>
      </div>

      <div
        className={`ml-12 md:ml-0 ${
          side === "left" ? "md:col-start-1 md:row-start-auto md:text-right md:pr-10" : "md:col-start-3 md:pl-10"
        }`}
      >
        <div className="rounded-xl border border-white/5 bg-[var(--color-card)] p-4 hover:border-white/10 transition-colors">
          <div className={`flex items-center gap-2 text-[11px] font-mono text-zinc-500 ${side === "left" ? "md:justify-end" : ""}`}>
            <span>#{String(index + 1).padStart(2, "0")}</span>
            <span>·</span>
            <span>{item.date}</span>
          </div>
          <h3 className="mt-1 font-display text-base font-semibold text-zinc-100">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.description}</p>
          <ul className={`mt-3 space-y-1 ${side === "left" ? "md:text-right" : ""}`}>
            {item.lessons.map((lesson) => (
              <li key={lesson} className="text-xs text-zinc-500">
                <span style={{ color: "var(--color-secondary)" }}>›</span> {lesson}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
