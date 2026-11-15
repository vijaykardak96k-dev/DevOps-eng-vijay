export default function FlowDiagram({ nodes, note }: { nodes: string[]; note: string }) {
  return (
    <figure className="border border-ink bg-paper-2 p-4 md:p-5">
      <ol aria-label="Architecture flow" className="flex flex-col md:flex-row md:flex-wrap items-stretch md:items-center gap-y-1 gap-x-2">
        {nodes.map((n, i) => (
          <li key={n} className="flex md:items-center gap-2 flex-col md:flex-row">
            <span className="border border-ink bg-paper px-3 py-2 font-mono text-xs text-center">{n}</span>
            {i < nodes.length - 1 && <span aria-hidden="true" className="text-accent text-center"><span className="md:hidden">↓</span><span className="hidden md:inline">→</span></span>}
          </li>
        ))}
      </ol>
      <figcaption className="label mt-4 normal-case tracking-normal !text-[0.72rem] leading-snug">Diagram — {note}</figcaption>
    </figure>
  );
}
