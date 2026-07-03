import { Teams } from "@/models/Team";
import { toRenderableImage } from "@/lib/matchUtils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <Card className="border-border">
        <CardContent className="flex h-full min-h-[200px] items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">Squad unavailable</p>
        </CardContent>
      </Card>
    );
  }

  const detail = team[sport];
  if (!detail) {
    return (
      <Card className="border-border">
        <CardContent className="flex h-full min-h-[200px] items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">No {sport} squad listed</p>
        </CardContent>
      </Card>
    );
  }

  const players = detail.players || [];
  const captain = players.find((p) =>
    /captain/i.test(p.player_description || "")
  );
  const viceCaptain = players.find(
    (p) =>
      /vice\s*captain/i.test(p.player_description || "") ||
      /vc\b/i.test(p.player_description || "")
  );
  const rest = players.filter(
    (p) =>
      p !== captain &&
      p !== viceCaptain &&
      (p.player_name || p.player_description)
  );

  return (
    <Card className="border-border">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-3">
          {detail.team_logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={toRenderableImage(detail.team_logo)}
              alt={detail.team_name}
              className="h-11 w-11 shrink-0 rounded-full border border-border object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}
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
          const isCaptain = player === captain;
          const isVice = player === viceCaptain;

          return (
            <div
              key={`${player.player_name}-${index}`}
              className="flex items-center gap-3 border-b border-border px-5 py-3 last:border-b-0"
            >
              <Avatar className="h-9 w-9 shrink-0">
                {player.player_image && (
                  <AvatarImage
                    src={toRenderableImage(player.player_image)}
                    alt={player.player_name}
                  />
                )}
                <AvatarFallback className="text-[10px]">
                  {getPlayerInitials(player.player_name || "?")}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="truncate text-sm font-medium">
                    {player.player_name}
                  </span>
                  {isCaptain && (
                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                      Captain
                    </Badge>
                  )}
                  {isVice && (
                    <Badge variant="muted" className="text-[10px] uppercase tracking-wider">
                      Vice
                    </Badge>
                  )}
                </div>
                {player.player_description &&
                  !isCaptain &&
                  !isVice && (
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
