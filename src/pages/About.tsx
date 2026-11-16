import { Link } from "react-router-dom";
import { profile } from "../data/site";
import { DownloadResume, PageHead } from "../components/Bits";
import Reveal from "../components/Reveal";
import { useSeo } from "../lib/seo";

export default function About() {
  useSeo("About", "Vijay Kardak, a final-year BCA student in India building hands-on DevOps and cloud projects and looking for entry-level DevOps or Cloud Engineer roles.", "/about");
  const spec: [string, string][] = [
    ["Role", "Entry-level DevOps / Cloud Engineer"],
    ["Based in", profile.location],
    ["Education", profile.education.degree],
    ["College", profile.education.college],
    ["University", profile.education.university],
    ["Seeking", "Fresher, junior, trainee and entry-level roles"],
    ["Learning now", "Helm, ArgoCD, Prometheus, Grafana"],
  ];
  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-8">
      <PageHead label="About" title="A student building real infrastructure" />
      <div className="grid gap-12 lg:grid-cols-12">
        <Reveal className="min-w-0 lg:col-span-7 space-y-6 text-lg">
          <p>I'm a final-year BCA student in India. I learn DevOps by building infrastructure, deploying applications and troubleshooting the systems behind them.</p>
          <p className="text-mute">My practice covers Linux, Git, Docker, Kubernetes, Jenkins, AWS and CI/CD, and infrastructure automation with Terraform and Ansible. Six of those projects are written up as case studies on this site.</p>
          <p className="text-mute">I'm now working on Helm, ArgoCD, Prometheus and Grafana, and looking for an entry-level DevOps or Cloud Engineer role where I can keep building.</p>
          <p className="flex flex-wrap gap-3 pt-2"><Link to="/projects" className="btn btn-solid">See the projects</Link><DownloadResume solid={false} /></p>
        </Reveal>
        <Reveal className="min-w-0 lg:col-span-5">
          <dl className="border border-line bg-panel divide-y divide-line">
            <div className="px-5 py-3 tag">Spec sheet</div>
            {spec.map(([k, v]) => <div key={k} className="px-5 py-3 grid grid-cols-3 gap-3"><dt className="tag pt-0.5">{k}</dt><dd className="col-span-2 text-sm">{v}</dd></div>)}
          </dl>
        </Reveal>
      </div>
    </div>
  );
}
