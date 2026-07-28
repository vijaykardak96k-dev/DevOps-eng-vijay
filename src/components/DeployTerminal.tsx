import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, Circle } from "lucide-react";

const LINES: { prompt: string; output?: string; color?: string }[] = [
  { prompt: "git push origin main" },
  { prompt: "docker build -t vijay/api:1.4.0 .", output: "=> exporting to image  done" },
  { prompt: "trivy image vijay/api:1.4.0", output: "0 critical, 0 high vulnerabilities found", color: "var(--color-success)" },
  { prompt: "kubectl apply -f deployment.yaml", output: "deployment.apps/api configured" },
  { prompt: "kubectl rollout status deploy/api", output: "deployment \"api\" successfully rolled out", color: "var(--color-success)" },
];

const STAGES = ["Build", "Scan", "Deploy", "Live"];

export default function DeployTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (visibleLines >= LINES.length) {
      const resetTimer = setTimeout(() => {
        setVisibleLines(0);
        setStage(0);
      }, 3200);
      return () => clearTimeout(resetTimer);
    }
    const timer = setTimeout(() => {
      setVisibleLines((v) => v + 1);
      setStage((s) => Math.min(s + 1, STAGES.length));
    }, 950);
    return () => clearTimeout(timer);
  }, [visibleLines]);

  return (
    <div className="w-full max-w-lg">
      <div className="gradient-border">
        <div className="glass rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-zinc-400 font-mono">deploy.sh — vijay@prod</span>
          </div>
          <div className="p-5 font-mono text-[13px] leading-relaxed min-h-[220px]">
            <AnimatePresence initial={false}>
              {LINES.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mb-2"
                >
                  <div className="flex gap-2">
                    <span style={{ color: "var(--color-success)" }}>$</span>
                    <span className="text-zinc-200">{line.prompt}</span>
                  </div>
                  {line.output && (
                    <div className="pl-4 text-zinc-500" style={line.color ? { color: line.color } : undefined}>
                      {line.output}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-between px-5 py-4 border-t border-white/10 bg-black/20">
            {STAGES.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  {i < stage ? (
                    <Check size={14} style={{ color: "var(--color-success)" }} />
                  ) : i === stage ? (
                    <Loader2 size={14} className="animate-spin" style={{ color: "var(--color-secondary)" }} />
                  ) : (
                    <Circle size={14} className="text-zinc-600" />
                  )}
                  <span className={`text-xs font-mono ${i <= stage ? "text-zinc-200" : "text-zinc-600"}`}>
                    {label}
                  </span>
                </div>
                {i < STAGES.length - 1 && <span className="w-6 h-px bg-zinc-700 ml-2" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
