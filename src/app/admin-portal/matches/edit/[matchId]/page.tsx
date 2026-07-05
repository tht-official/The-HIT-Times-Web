"use client";

import EditLivePostForm from "@/components/admin-portal/matches/EditLivePost";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatMatchDateTime, getTeamLabel } from "@/lib/matchUtils";
import { MatchPosts } from "@/models/Match";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditMatchPost({
  params,
}: {
  params: { matchId: string };
}) {
  const matchId = params.matchId;
  const [matchData, setMatchData] = useState<MatchPosts | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatchData = async () => {
      try {
        const response = await fetch(`/api/v1/live/match/${matchId}`);
        const data = await response.json();
        if (response.ok) {
          setMatchData(data.data);
        }
      } catch (error) {
        console.error("Error loading match data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadMatchData();
  }, [matchId]);

  if (!loading && !matchData) {
    notFound();
  }

  const subtitle =
    matchData &&
    `${getTeamLabel(matchData.team1.team_code, matchData.team1.team_name)} vs ${getTeamLabel(matchData.team2.team_code, matchData.team2.team_name)} · ${formatMatchDateTime(matchData.match_date)}`;

  return (
    <div className="animate-in-subtle space-y-8">
      <header className="space-y-4">
        <Button variant="ghost" size="sm" className="-ml-2 gap-1.5" asChild>
          <Link href="/admin-portal/matches">
            <ArrowLeft className="h-3.5 w-3.5" />
            All matches
          </Link>
        </Button>
        <div>
          <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">
            Edit match
          </h1>
          {loading ? (
            <Skeleton className="mt-2 h-4 w-64" />
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </header>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      ) : (
        matchData && <EditLivePostForm match={matchData} />
      )}
    </div>
  );
}
