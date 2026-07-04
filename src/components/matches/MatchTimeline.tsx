import { Timeline } from "@/models/Match";
import { formatMatchDateTime } from "@/lib/matchUtils";

export function MatchTimeline({ events }: { events: Timeline[] }) {
  const sorted = [...events].sort(
    (a, b) =>
      new Date(b.timeline_date).getTime() - new Date(a.timeline_date).getTime()
  );

  return (
    <section className="space-y-6">
      <ol className="relative space-y-0 border-l border-border">
        {sorted.map((event, index) => (
          <li key={event.firebase_timeline_id} className="relative pl-8 pb-8 last:pb-0">
            <span
              className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-foreground"
              aria-hidden
            />
            <time className="tag-editorial mb-2 block">
              {formatMatchDateTime(event.timeline_date)}
            </time>
            <div
              className="prose-editorial prose-sm break-words [&_img]:max-w-full"
              dangerouslySetInnerHTML={{ __html: event.msgHtml }}
            />
            {index < sorted.length - 1 && (
              <div className="mt-6 section-divider lg:hidden" />
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
