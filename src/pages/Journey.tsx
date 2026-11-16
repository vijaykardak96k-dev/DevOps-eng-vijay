import { JourneyRail, PageHead } from "../components/Bits";
import { useSeo } from "../lib/seo";

export default function Journey() {
  useSeo("Engineering journey", "The order in which Vijay Kardak learned and practised Linux, Docker, CI/CD, AWS and Kubernetes, and what is being learned next.", "/journey");
  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-8">
      <PageHead label="Journey" title="The order I learned things in" intro="A sequence rather than a calendar. Each stage shows whether I learned it, built a project with it, or am learning it now." />
      <JourneyRail />
    </div>
  );
}
