import { MatchPosts } from "@/models/Match";
import { getTeamLabel } from "@/lib/matchUtils";
import { Badge } from "@/components/ui/badge";
import { Radio } from "lucide-react";

export function MatchScoreboard({ match }: { match: MatchPosts }) {
  const status =
    match.match_status || (match.is_live ? "Live" : "Final");

  return (
    <div className="border border-border">
      {match.is_live && (
        <div className="flex items-center justify-center gap-2 border-b border-border bg-foreground/[0.03] px-4 py-2">
          <Badge variant="live" className="gap-1.5">
            <Radio className="h-3 w-3 animate-pulse" />
            Live
          </Badge>
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            Scores update automatically
          </span>
        </div>
      )}

      <div className="grid grid-cols-3 divide-x divide-border">
        <div className="min-w-0 px-2 py-6 text-center sm:px-6 sm:py-10">
          <p className="tag-editorial mb-2 line-clamp-2 sm:mb-3">
            {getTeamLabel(match.team1.team_code, match.team1.team_name)}
          </p>
          <p className="editorial-heading text-4xl font-normal tabular-nums sm:text-5xl lg:text-7xl">
            {match.team1.team_score || "0"}
          </p>
          {match.team1.team_penalty && match.team1.team_penalty !== "0" && (
            <p className="mt-2 text-xs text-muted-foreground">
              Pens {match.team1.team_penalty}
            </p>
          )}
        </div>

        <div className="flex min-w-0 flex-col items-center justify-center px-2 py-6 text-center sm:px-4 sm:py-8">
          <p className="font-serif text-xs capitalize text-foreground sm:text-base">
            {status}
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {match.is_live ? "In progress" : "Full time"}
          </p>
        </div>

        <div className="min-w-0 px-2 py-6 text-center sm:px-6 sm:py-10">
          <p className="tag-editorial mb-2 line-clamp-2 sm:mb-3">
            {getTeamLabel(match.team2.team_code, match.team2.team_name)}
          </p>
          <p className="editorial-heading text-4xl font-normal tabular-nums sm:text-5xl lg:text-7xl">
            {match.team2.team_score || "0"}
          </p>
          {match.team2.team_penalty && match.team2.team_penalty !== "0" && (
            <p className="mt-2 text-xs text-muted-foreground">
              Pens {match.team2.team_penalty}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
