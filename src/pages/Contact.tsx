import { ContactLinks, PageHead } from "../components/Bits";
import { useSeo } from "../lib/seo";

export default function Contact() {
  useSeo("Contact", "Contact Vijay Kardak about entry-level DevOps and Cloud Engineer roles by email, GitHub, LinkedIn or Docker Hub.", "/contact");
  return (
    <div className="mx-auto max-w-[1280px] px-5 md:px-8">
      <PageHead label="Contact" title="Let's talk" intro="I'm looking for fresher, junior, trainee and entry-level DevOps or Cloud Engineer roles. Email is the quickest way to reach me." />
      <ContactLinks />
    </div>
  );
}
