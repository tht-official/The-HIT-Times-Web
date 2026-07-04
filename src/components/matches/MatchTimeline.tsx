import { Timeline } from "@/models/Match";
import { formatMatchDateTime } from "@/lib/matchUtils";

export function MatchTimeline({ events }: { events: Timeline[] }) {
  const sorted = [...events].sort(
    (a, b) =>
      new Date(b.timeline_date).getTime() - new Date(a.timeline_date).getTime()
  );

  return (
    <section className="w-full min-w-0 space-y-6">
      <ol className="relative w-full min-w-0 space-y-0 border-l border-border">
        {sorted.map((event) => (
          <li
            key={event.firebase_timeline_id}
            className="relative min-w-0 pl-6 pb-8 last:pb-2 sm:pl-8"
          >
            <span
              className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-foreground"
              aria-hidden
            />
            <time className="tag-editorial mb-2 block">
              {formatMatchDateTime(event.timeline_date)}
            </time>
            <div className="max-w-full overflow-x-auto">
              <div
                className="prose-editorial prose-sm min-w-0 break-words [&_*]:max-w-full [&_iframe]:max-w-full [&_img]:h-auto [&_img]:max-w-full [&_pre]:max-w-full [&_table]:block [&_table]:max-w-full [&_table]:overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: event.msgHtml }}
              />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
