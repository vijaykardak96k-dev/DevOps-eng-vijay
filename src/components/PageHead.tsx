export default function PageHead({ label, title, intro }: { label: string; title: string; intro?: string }) {
  return (
    <header className="pt-14 pb-8">
      <p className="label">{label}</p>
      <h1 className="text-5xl md:text-6xl mt-3 max-w-[18ch]">{title}</h1>
      {intro && <p className="mt-5 text-graphite prose-ed">{intro}</p>}
    </header>
  );
}
