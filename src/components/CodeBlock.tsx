import { useState } from "react";

export default function CodeBlock({ caption, language, code }: { caption: string; language: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard unavailable */ }
  };
  return (
    <figure className="border border-ink">
      <figcaption className="flex justify-between items-center border-b border-ink bg-paper-2 px-3 py-1.5">
        <span className="label">{caption} · {language}</span>
        <button onClick={copy} className="label hover:text-accent">{copied ? "Copied" : "Copy"}</button>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[0.8rem] leading-relaxed"><code>{code}</code></pre>
    </figure>
  );
}
