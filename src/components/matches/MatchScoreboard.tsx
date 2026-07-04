import { MatchPosts } from "@/models/Match";
import { getMatchPhaseLabel, getTeamLabel, toRenderableImage } from "@/lib/matchUtils";
import { Teams } from "@/models/Team";
import { Badge } from "@/components/ui/badge";
import { Radio } from "lucide-react";

export function MatchScoreboard({
  match,
  teams,
}: {
  match: MatchPosts;
  teams?: Record<string, Teams>;
}) {
  const sport = match.match_type === "cricket" ? "cricket" : "football";
  const status = match.match_status || (match.is_live ? "Live" : "Final");
  const phaseLabel = getMatchPhaseLabel(match);

  const team1Logo = teams?.[match.team1.team_code]?.[sport]?.team_logo;
  const team2Logo = teams?.[match.team2.team_code]?.[sport]?.team_logo;

  return (
    <div className="w-full min-w-0 overflow-hidden border border-border">
      {match.is_live && (
        <div className="flex flex-col items-center justify-center gap-1.5 border-b border-border bg-foreground/[0.03] px-3 py-2 sm:flex-row sm:gap-2 sm:px-4">
          <Badge variant="live" className="gap-1.5">
            <Radio className="h-3 w-3 animate-pulse" />
            Live
          </Badge>
          <span className="text-center text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            Scores update automatically
          </span>
        </div>
      )}

      <div className="grid w-full min-w-0 grid-cols-3 divide-x divide-border">
        <div className="flex min-w-0 flex-col items-center px-1.5 py-5 text-center sm:px-6 sm:py-10">
          {team1Logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={toRenderableImage(team1Logo)}
              alt=""
              className="mb-2 h-10 w-10 shrink-0 rounded-full border border-border object-cover sm:mb-3 sm:h-14 sm:w-14"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          <p className="tag-editorial mb-1 line-clamp-2 break-words sm:mb-3">
            {getTeamLabel(match.team1.team_code, match.team1.team_name)}
          </p>
          <p className="editorial-heading text-2xl font-normal tabular-nums sm:text-5xl lg:text-7xl">
            {match.team1.team_score || "0"}
          </p>
          {match.match_type === "football" &&
            match.team1.team_penalty &&
            match.team1.team_penalty !== "0" && (
              <p className="mt-1 text-[10px] text-muted-foreground sm:mt-2 sm:text-xs">
                Pens {match.team1.team_penalty}
              </p>
            )}
        </div>

        <div className="flex min-w-0 flex-col items-center justify-center px-1 py-5 text-center sm:px-4 sm:py-8">
          <p className="line-clamp-2 break-words font-serif text-[11px] capitalize leading-tight text-foreground sm:text-base">
            {status}
          </p>
          <p className="mt-1.5 text-[9px] uppercase leading-tight tracking-[0.12em] text-muted-foreground sm:mt-2 sm:text-[10px] sm:tracking-[0.15em]">
            {phaseLabel}
          </p>
        </div>

        <div className="flex min-w-0 flex-col items-center px-1.5 py-5 text-center sm:px-6 sm:py-10">
          {team2Logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={toRenderableImage(team2Logo)}
              alt=""
              className="mb-2 h-10 w-10 shrink-0 rounded-full border border-border object-cover sm:mb-3 sm:h-14 sm:w-14"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
          <p className="tag-editorial mb-1 line-clamp-2 break-words sm:mb-3">
            {getTeamLabel(match.team2.team_code, match.team2.team_name)}
          </p>
          <p className="editorial-heading text-2xl font-normal tabular-nums sm:text-5xl lg:text-7xl">
            {match.team2.team_score || "0"}
          </p>
          {match.match_type === "football" &&
            match.team2.team_penalty &&
            match.team2.team_penalty !== "0" && (
              <p className="mt-1 text-[10px] text-muted-foreground sm:mt-2 sm:text-xs">
                Pens {match.team2.team_penalty}
              </p>
            )}
        </div>
      </div>
    </div>
  );
}
