import { Teams } from "@/models/Team";
import { getPlayerRole } from "@/lib/playerUtils";
import { MatchImage } from "@/components/matches/MatchImage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

function getPlayerInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function TeamSquadCard({
  team,
  sport,
}: {
  team?: Teams;
  sport: "football" | "cricket";
}) {
  if (!team) {
    return (
      <Card className="min-w-0 border-border">
        <CardContent className="flex h-full min-h-[200px] items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">Squad unavailable</p>
        </CardContent>
      </Card>
    );
  }

  const detail = team[sport];
  if (!detail) {
    return (
      <Card className="min-w-0 border-border">
        <CardContent className="flex h-full min-h-[200px] items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">No {sport} squad listed</p>
        </CardContent>
      </Card>
    );
  }

  const players = detail.players || [];
  const captain = players.find((p) => getPlayerRole(p.player_description) === "captain");
  const viceCaptain = players.find((p) => getPlayerRole(p.player_description) === "vice");
  const rest = players.filter(
    (p) =>
      getPlayerRole(p.player_description) === null &&
      (p.player_name || p.player_description)
  );

  return (
    <Card className="min-w-0 border-border">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <MatchImage
            src={detail.team_logo}
            alt={`${detail.team_name} logo`}
            className="h-11 w-11 shrink-0 rounded-full border border-border object-cover"
            fallback={
              <span className="text-xs font-semibold">
                {detail.team_name.slice(0, 2).toUpperCase()}
              </span>
            }
          />
          <div className="min-w-0">
            <p className="tag-editorial">{sport}</p>
            <p className="editorial-heading truncate text-xl font-normal">
              {detail.team_name}
            </p>
            {team.dept_name && (
              <p className="text-xs text-muted-foreground">{team.dept_name}</p>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-0 p-0">
        {[captain, viceCaptain, ...rest].filter(Boolean).map((player, index) => {
          if (!player) return null;
          const role = getPlayerRole(player.player_description);
          const initials = getPlayerInitials(player.player_name || "?");

          return (
            <div
              key={`${player.player_name}-${index}`}
              className="flex items-center gap-3 border-b border-border px-5 py-3 last:border-b-0"
            >
              <MatchImage
                src={player.player_image}
                alt={player.player_name}
                className="h-9 w-9 shrink-0 rounded-full border border-border object-cover"
                size={200}
                fallback={
                  <span className="text-[10px] font-medium">{initials}</span>
                }
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-sm font-medium">
                    {player.player_name}
                  </span>
                  {role === "captain" && (
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                      Captain
                    </Badge>
                  )}
                  {role === "vice" && (
                    <Badge variant="muted" className="text-[10px] uppercase tracking-wider">
                      Vice
                    </Badge>
                  )}
                </div>
                {player.player_description && role === null && (
                  <p className="truncate text-xs text-muted-foreground">
                    {player.player_description}
                  </p>
                )}
              </div>
            </div>
          );
        })}

        {players.length === 0 && (
          <p className="px-5 py-6 text-sm text-muted-foreground">
            No players listed.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
