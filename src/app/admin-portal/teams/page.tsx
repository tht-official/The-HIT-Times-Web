"use client";

import { MatchImage } from "@/components/matches/MatchImage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllTeamsCode, getTeamName } from "@/lib/codeToTeamName";
import { Teams } from "@/models/Team";
import { cn } from "@/lib/utils";
import { ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type TeamSummary = {
  code: string;
  label: string;
  data: Teams | null;
};

async function fetchTeamSummary(code: string, label: string): Promise<TeamSummary> {
  try {
    const res = await fetch(`/api/v1/team/${code}`);
    const json = await res.json();
    if (res.ok && json?.data) {
      return { code, label, data: json.data as Teams };
    }
  } catch {
    /* team may not exist yet */
  }
  return { code, label, data: null };
}

function TeamCardSkeleton() {
  return (
    <Card className="border-border/80">
      <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
        <Skeleton className="h-11 w-11 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}

function TeamCard({ team }: { team: TeamSummary }) {
  const { code, label, data } = team;
  const footballPlayers = data?.football?.players?.length ?? 0;
  const cricketPlayers = data?.cricket?.players?.length ?? 0;
  const logo = data?.football?.team_logo || data?.cricket?.team_logo;
  const displayName = data?.dept_name || data?.football?.team_name || label;

  return (
    <Link href={`/admin-portal/teams/manage-team?code=${code}`} className="group block h-full">
      <Card
        className={cn(
          "micro-lift h-full border-border/80 transition-[border-color,box-shadow] duration-200",
          "hover:border-border hover:shadow-md"
        )}
      >
        <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-3">
          <MatchImage
            src={logo}
            alt={`${displayName} logo`}
            className="h-11 w-11 shrink-0 rounded-full border border-border object-cover"
            size={200}
            fallback={
              <span className="text-xs font-semibold text-muted-foreground">
                {label.slice(0, 2)}
              </span>
            }
          />
          <div className="min-w-0 flex-1">
            <CardTitle className="truncate text-base font-medium">{displayName}</CardTitle>
            <p className="mt-0.5 text-xs text-muted-foreground">Code {code}</p>
          </div>
          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </CardHeader>

        <CardContent className="space-y-3">
          {data ? (
            <>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="gap-1 text-[10px] uppercase tracking-wide">
                  <Users className="h-3 w-3" />
                  Football · {footballPlayers}
                </Badge>
                <Badge variant="outline" className="gap-1 text-[10px] uppercase tracking-wide">
                  <Users className="h-3 w-3" />
                  Cricket · {cricketPlayers}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {data.football?.team_name && data.cricket?.team_name
                  ? `${data.football.team_name} / ${data.cricket.team_name}`
                  : "Squads configured"}
              </p>
            </>
          ) : (
            <Badge variant="muted" className="text-[10px] uppercase tracking-wide">
              Not configured yet
            </Badge>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}

export default function AdminTeamsPage() {
  const [teams, setTeams] = useState<TeamSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const codes = getAllTeamsCode();
    Promise.all(
      codes.map((code) => fetchTeamSummary(code, getTeamName(code) ?? code))
    ).then((results) => {
      setTeams(results);
      setLoading(false);
    });
  }, []);

  const configuredCount = teams.filter((t) => t.data).length;

  return (
    <div className="animate-in-subtle space-y-8">
      <header>
        <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">Teams</h1>
        <p className="mt-2 text-muted-foreground">
          Manage department squads for football and cricket matches.
        </p>
        {!loading && (
          <p className="mt-1 text-xs text-muted-foreground">
            {configuredCount} of {teams.length} teams configured
          </p>
        )}
      </header>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <TeamCardSkeleton key={i} />
          ))}
        </div>
      ) : teams.length === 0 ? (
        <p className="py-12 text-center text-sm text-muted-foreground">No teams found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <TeamCard key={team.code} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}
