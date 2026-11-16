import { useReducedMotion } from "framer-motion";

const stages = [
  { n: "Source", t: "Git · GitHub" },
  { n: "Build", t: "Jenkins · Maven" },
  { n: "Check", t: "SonarQube · Trivy" },
  { n: "Package", t: "Docker · Nexus" },
  { n: "Run", t: "Kubernetes on AWS" },
];

/** A reference delivery flow: the stages my projects cover. It is a diagram, not live data. */
export default function HeroVisual() {
  const reduce = useReducedMotion();
  return (
    <figure className="relative border border-line bg-panel" aria-label="Delivery flow covered by my projects">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="tag">Delivery flow</span>
        <span className="tag text-accent">Reference · not live</span>
      </div>
      <div className="grid-bg absolute inset-0 top-[41px] opacity-[0.35]" aria-hidden />
      <ol className="relative p-5 sm:p-6">
        {stages.map((s, i) => (
          <li key={s.n} className="relative flex gap-4 pb-7 last:pb-0">
            {i < stages.length - 1 && (
              <span aria-hidden className="absolute left-[15px] top-8 bottom-0 w-px bg-line">
                {!reduce && <span className="flow-dot absolute -left-[2px] size-[5px] rounded-full bg-accent" style={{ ["--travel" as string]: "44px", animationDelay: `${i * 0.45}s` }} />}
              </span>
            )}
            <span className={`relative z-10 grid place-items-center size-8 shrink-0 mono text-xs border ${i === stages.length - 1 ? "bg-accent text-bg border-accent" : "bg-bg border-line text-accent"}`}>{String(i + 1).padStart(2, "0")}</span>
            <div className="bg-panel/90 pr-2"><p className="font-display text-2xl uppercase leading-none">{s.n}</p><p className="mono text-xs text-mute mt-1">{s.t}</p></div>
          </li>
        ))}
      </ol>
    </figure>
  );
}
