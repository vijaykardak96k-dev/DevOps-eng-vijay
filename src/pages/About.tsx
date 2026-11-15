import { Link } from "react-router-dom";
import { profile } from "../data/site";
import PageHead from "../components/PageHead";
import { useSeo } from "../lib/seo";

export default function About() {
  useSeo("About", "Vijay Kardak, a final-year BCA student in India building hands-on DevOps and cloud projects and looking for entry-level DevOps or Cloud Engineer roles.", "/about");
  const rows: [string, string][] = [
    ["Who", "Final-year BCA student in India, learning DevOps by building and deploying projects."],
    ["Education", `${profile.education.degree}. ${profile.education.college}, affiliated to ${profile.education.university}.`],
    ["Approach", "I learn by building infrastructure, deploying applications and troubleshooting the systems behind them, then writing down how each piece works."],
    ["Practised", "Linux, Git, Docker, Kubernetes, Jenkins, AWS, CI/CD and infrastructure automation. See the skills page for how well I know each one."],
    ["Improving now", "Helm, ArgoCD (GitOps), Prometheus and Grafana."],
    ["Looking for", "Fresher, junior, trainee and entry-level DevOps or Cloud Engineer roles."],
  ];
  return (
    <div className="mx-auto max-w-[1200px] px-5 md:px-8">
      <PageHead label="02 — About" title="A student building real infrastructure." />
      <dl className="border-t border-ink">
        {rows.map(([k, v]) => (
          <div key={k} className="grid md:grid-cols-12 gap-2 py-5 border-b border-rule">
            <dt className="label md:col-span-3 pt-1">{k}</dt>
            <dd className="md:col-span-9 prose-ed">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-8"><Link className="link" to="/projects">See what I've built →</Link> · <Link className="link" to="/contact">Get in touch →</Link></p>
    </div>
  );
}
