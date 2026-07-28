import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import SkillCard from "../components/SkillCard";
import skillsData from "../data/skills.json";
import type { SkillsData } from "../types";

const data = skillsData as SkillsData;
const ALL_CATEGORIES = [{ id: "all", label: "All" }, ...data.categories.map((c) => ({ id: c.id, label: c.label }))];

export default function Skills() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.categories
      .filter((cat) => activeCategory === "all" || cat.id === activeCategory)
      .map((cat) => ({
        ...cat,
        skills: cat.skills.filter((s) => s.name.toLowerCase().includes(q)),
      }))
      .filter((cat) => cat.skills.length > 0);
  }, [query, activeCategory]);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 pb-24">
      <SectionHeading
        eyebrow="Tool belt"
        title="Skills, generated straight from JSON"
        description="Every card below is rendered from skills.json — add a new skill there and it shows up here automatically."
      />

      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a skill..."
            className="focus-ring w-full rounded-xl border border-white/10 bg-[var(--color-card)] py-2.5 pl-9 pr-3 text-sm text-zinc-200 placeholder:text-zinc-500"
          />
        </div>
        <div className="flex flex-wrap gap-2 overflow-x-auto">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`focus-ring shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? "border-transparent text-white"
                  : "border-white/10 text-zinc-400 hover:text-white"
              }`}
              style={
                activeCategory === cat.id
                  ? { background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))" }
                  : undefined
              }
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {filteredCategories.length === 0 && (
        <p className="py-16 text-center text-sm text-zinc-500">No skills match "{query}".</p>
      )}

      <div className="space-y-14">
        {filteredCategories.map((cat) => (
          <div key={cat.id}>
            <h3 className="mb-4 font-display text-lg font-semibold text-zinc-200">{cat.label}</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {cat.skills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
