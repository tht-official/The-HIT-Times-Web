"use client";

import { MatchScoreboard } from "@/components/matches/MatchScoreboard";
import { MatchTimeline } from "@/components/matches/MatchTimeline";
import { TeamSquadCard } from "@/components/matches/TeamSquadCard";
import { BrandLoader } from "@/components/common/loader/Loaders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatMatchDateTime, getTeamLabel } from "@/lib/matchUtils";
import { MatchPosts } from "@/models/Match";
import { Teams } from "@/models/Team";
import { ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type MatchTab = "feed" | "squads";

const MatchDetailPage = ({ params }: { params: { matchId: string } }) => {
  const [match, setMatch] = useState<MatchPosts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [teams, setTeams] = useState<Record<string, Teams>>({});
  const [activeTab, setActiveTab] = useState<MatchTab>("feed");

  const fetchTeams = async (teamCodes: string[]) => {
    const uniqueCodes = Array.from(new Set(teamCodes.filter(Boolean)));
    if (uniqueCodes.length === 0) return;

    const teamResponses = await Promise.all(
      uniqueCodes.map(async (code) => {
        try {
          const tRes = await fetch(`/api/v1/team/${code}`);
          const tData = await tRes.json();
          if (tRes.ok && tData?.data) {
            return [code, tData.data as Teams] as const;
          }
        } catch {
          return null;
        }
        return null;
      })
    );

    const nextTeams: Record<string, Teams> = {};
    teamResponses.forEach((entry) => {
      if (entry) nextTeams[entry[0]] = entry[1];
    });

    if (Object.keys(nextTeams).length > 0) {
      setTeams((prev) => ({ ...prev, ...nextTeams }));
    }
  };

  const fetchMatch = async ({
    silent = false,
    includeTeams = false,
  }: {
    silent?: boolean;
    includeTeams?: boolean;
  } = {}) => {
    if (!silent) setIsRefreshing(true);
    try {
      const res = await fetch(`/api/v1/live/match/${params.matchId}`);
      const data = await res.json();
      if (res.ok && data?.data) {
        setMatch(data.data);
        setError(null);
        if (includeTeams) {
          const teamCodes = [
            data.data.team1?.team_code,
            data.data.team2?.team_code,
          ].filter(Boolean) as string[];
          fetchTeams(teamCodes);
        }
      } else {
        setError(data?.msg || "Failed to load match");
      }
    } catch {
      setError("Failed to load match");
    } finally {
      if (!silent) setIsRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatch({ includeTeams: true });
    const interval = setInterval(() => {
      fetchMatch({ silent: true });
    }, 20000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.matchId]);

  if (loading) {
    return <BrandLoader variant="page" />;
  }

  if (error || !match) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 py-12 text-center">
        <p className="text-sm text-destructive">{error || "Match not found."}</p>
        <Button variant="outline" asChild>
          <Link href="/matches">
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to matches
          </Link>
        </Button>
      </div>
    );
  }

  const sport = (match.match_type === "cricket" || match.match_type === "volleyball" || match.match_type === "basketball" || match.match_type === "football")
    ? match.match_type
    : "football";
  const team1Label = getTeamLabel(match.team1.team_code, match.team1.team_name);
  const team2Label = getTeamLabel(match.team2.team_code, match.team2.team_name);
  const hasFeed = Boolean(match.timeline && match.timeline.length > 0);

  return (
    <div className="animate-in-subtle mx-auto w-full min-w-0 max-w-4xl space-y-6 overflow-x-clip pb-4 sm:space-y-8">
      <header className="space-y-4 sm:space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Button variant="ghost" size="sm" className="-ml-2 shrink-0" asChild>
            <Link href="/matches">
              <ArrowLeft className="h-3.5 w-3.5" />
              All matches
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchMatch({ includeTeams: true })}
            disabled={isRefreshing}
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="tag-editorial capitalize">{match.match_type}</span>
            {match.is_live ? (
              <Badge variant="live">Live</Badge>
            ) : (
              <Badge variant="muted">Archived</Badge>
            )}
          </div>

          <h1 className="editorial-heading break-words text-balance text-2xl font-normal leading-tight sm:text-4xl lg:text-5xl">
            {team1Label}
            <span className="mx-1.5 text-muted-foreground sm:mx-2">vs</span>
            {team2Label}
          </h1>

          <p className="text-sm text-muted-foreground">
            {formatMatchDateTime(match.match_date)}
          </p>
        </div>
      </header>

      <MatchScoreboard match={match} teams={teams} />

      <div className="w-full min-w-0 space-y-4 sm:space-y-6">
        <div
          className="flex w-full min-w-0 border-b border-border"
          role="tablist"
          aria-label="Match sections"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "feed"}
            onClick={() => setActiveTab("feed")}
            className={cn(
              "min-w-0 flex-1 border-b-2 px-2 py-3 text-xs font-medium transition-colors sm:px-4 sm:text-sm",
              activeTab === "feed"
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            Match feed
          </button>
          {match.match_type !== "badminton" && (
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "squads"}
              onClick={() => setActiveTab("squads")}
              className={cn(
                "min-w-0 flex-1 border-b-2 px-2 py-3 text-xs font-medium transition-colors sm:px-4 sm:text-sm",
                activeTab === "squads"
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              Squads
            </button>
          )}
        </div>

        {activeTab === "feed" && (
          <div role="tabpanel" className="min-w-0">
            {hasFeed ? (
              <MatchTimeline events={match.timeline!} />
            ) : (
              <p className="py-10 text-center text-sm text-muted-foreground">
                No match updates yet.
              </p>
            )}
          </div>
        )}

        {activeTab === "squads" && match.match_type !== "badminton" && (
          <div role="tabpanel" className="grid min-w-0 gap-4 sm:gap-6 md:grid-cols-2">
            <TeamSquadCard team={teams[match.team1.team_code]} sport={sport} />
            <TeamSquadCard team={teams[match.team2.team_code]} sport={sport} />
          </div>
        )}
      </div>

      {/* Ensures last content clears the fixed mobile nav on small screens */}
      <div className="h-2 shrink-0 lg:hidden" aria-hidden />
    </div>
  );
};

export default MatchDetailPage;
