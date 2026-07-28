import SectionHeading from "../components/SectionHeading";
import TimelineItem from "../components/TimelineItem";
import timelineData from "../data/timeline.json";
import type { TimelineItem as TimelineItemType } from "../types";

const timeline = timelineData as TimelineItemType[];

export default function Journey() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 pt-32 pb-24">
      <SectionHeading
        eyebrow="The full log"
        title="My DevOps journey, one milestone at a time"
        description="Every tool below was learned in roughly this order — from a bare Linux shell to a GitOps-driven cluster."
      />

      <div className="relative grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto_1fr] md:gap-0">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
        {timeline.map((item, i) => (
          <TimelineItem key={item.id} item={item} index={i} side={i % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </div>
  );
}
