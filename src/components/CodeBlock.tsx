import { useState } from "react";

export default function CodeBlock({ caption, language, code }: { caption: string; language: string; code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { /* clipboard unavailable */ }
  };
  return (
    <figure className="border border-line bg-panel">
      <figcaption className="flex justify-between items-center border-b border-line px-3 py-2"><span className="tag">{caption} · {language}</span><button onClick={copy} className="tag hover:text-accent">{copied ? "Copied" : "Copy"}</button></figcaption>
      <pre className="overflow-x-auto p-4 mono text-[0.8rem] leading-relaxed"><code>{code}</code></pre>
    </figure>
  );
}
