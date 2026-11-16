import { ArrowDown, ArrowRight } from "lucide-react";
import type { Project } from "../data/projects";

type Flow = Project["flow"];
const box = "border border-line bg-panel2 px-3 py-2 mono text-xs";

/** Three diagram treatments built from the same node list. */
export default function Diagram({ flow, compact = false }: { flow: Flow; compact?: boolean }) {
  const { nodes, variant } = flow;
  if (variant === "pipeline")
    return (
      <ol aria-label="Pipeline flow" className="flex flex-col md:flex-row md:flex-wrap gap-2 md:items-stretch">
        {nodes.map((n, i) => (
          <li key={n} className="flex md:items-stretch gap-2 flex-col md:flex-row items-start">
            <div className={`${box} flex items-center gap-2 ${i === nodes.length - 1 ? "border-accent text-accent" : ""}`}>
              <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>{n}
            </div>
            {i < nodes.length - 1 && <><ArrowDown aria-hidden className="size-4 text-mute md:hidden ml-4" /><ArrowRight aria-hidden className="size-4 text-mute hidden md:block self-center" /></>}
          </li>
        ))}
      </ol>
    );
  if (variant === "layers")
    return (
      <ol aria-label="Layered flow" className="flex flex-col gap-1.5">
        {nodes.map((n, i) => (
          <li key={n} style={{ marginLeft: compact ? 0 : `${i * 10}px` }} className={`${box} flex items-center justify-between ${i === 0 ? "border-accent" : ""}`}>
            <span>{n}</span><span className="text-mute">L{i + 1}</span>
          </li>
        ))}
      </ol>
    );
  // tiers: nodes as columns, joined by a dashed connector
  return (
    <ol aria-label="Tiered flow" className="grid gap-2" style={{ gridTemplateColumns: `repeat(${Math.min(nodes.length, compact ? 2 : 3)}, minmax(0, 1fr))` }}>
      {nodes.map((n, i) => (
        <li key={n} className="relative">
          <div className={`${box} h-full min-h-14 flex flex-col justify-between`}>
            <span className="text-accent">T{i + 1}</span><span className="break-words">{n}</span>
          </div>
        </li>
      ))}
    </ol>
  );
}
