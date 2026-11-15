import { journey } from "../data/site";
import PageHead from "../components/PageHead";
import { useSeo } from "../lib/seo";

export default function Journey() {
  useSeo("Engineering journey", "The order in which Vijay Kardak learned and practised Linux, Docker, CI/CD, AWS and Kubernetes, and what is being learned next.", "/journey");
  return (
    <div className="mx-auto max-w-[1200px] px-5 md:px-8">
      <PageHead label="04 — Journey" title="The order I learned things in." intro="A sequence, not a calendar: no dates are published because I haven't recorded exact ones. Each stage says whether I learned it, built a project with it, or am learning it now." />
      <ol className="border-t border-ink">
        {journey.map((j, i) => (
          <li key={j.stage} className="grid md:grid-cols-12 gap-2 py-6 border-b border-rule">
            <span className="font-mono text-sm text-graphite md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
            <h2 className="md:col-span-3 text-2xl">{j.stage}</h2>
            <p className="md:col-span-5 text-graphite">{j.topics}</p>
            <p className="md:col-span-3 label md:text-right pt-1">{j.when ?? j.mode}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
