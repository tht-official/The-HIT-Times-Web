"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MatchPosts } from "@/models/Match";
import { codeToTeamName } from "@/lib/codeToTeamName";
import { CircularLoader } from "@/components/common/loader/Loaders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Radio } from "lucide-react";

const formatDate = (dateValue: Date | string) => {
  const d = new Date(dateValue);
  return (
    d.toLocaleDateString(undefined, { month: "short", day: "numeric" }) +
    " · " +
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })
  );
};

const getTeamLabel = (code: string, name?: string) =>
  codeToTeamName[code] || name || code;

const ScoreBlock = ({ match }: { match: MatchPosts }) => (
  <div className="grid grid-cols-3 items-center gap-2 text-center sm:gap-3">
    <div className="min-w-0">
      <p className="truncate text-[10px] uppercase tracking-wide text-muted-foreground sm:text-xs">
        {getTeamLabel(match.team1.team_code, match.team1.team_name)}
      </p>
      <p className="font-serif text-2xl font-semibold tabular-nums sm:text-3xl">
        {match.team1.team_score || "0"}
      </p>
      {match.match_type === "football" &&
        match.team1.team_penalty &&
        match.team1.team_penalty !== "0" && (
        <p className="text-[10px] text-muted-foreground sm:text-xs">
          Pens: {match.team1.team_penalty}
        </p>
      )}
    </div>
    <div className="min-w-0 px-1">
      <p className="text-xs text-muted-foreground sm:text-sm">
        {match.match_status || (match.is_live ? "Live" : "Final")}
      </p>
      <p className="text-[10px] text-muted-foreground sm:text-xs">{formatDate(match.match_date)}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">
        {match.match_type}
      </p>
    </div>
    <div className="min-w-0">
      <p className="truncate text-[10px] uppercase tracking-wide text-muted-foreground sm:text-xs">
        {getTeamLabel(match.team2.team_code, match.team2.team_name)}
      </p>
      <p className="font-serif text-2xl font-semibold tabular-nums sm:text-3xl">
        {match.team2.team_score || "0"}
      </p>
      {match.match_type === "football" &&
        match.team2.team_penalty &&
        match.team2.team_penalty !== "0" && (
        <p className="text-xs text-muted-foreground">Pens: {match.team2.team_penalty}</p>
      )}
    </div>
  </div>
);

const MatchCard = ({ match }: { match: MatchPosts }) => (
  <Card className="micro-lift border-border/80">
    <CardContent className="p-4 sm:p-6">
      <ScoreBlock match={match} />
      <div className="mt-5">
        <Button variant="outline" size="sm" className="w-full sm:w-auto" asChild>
          <Link href={`/matches/${match.firebase_match_id}`}>
            View match
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </CardContent>
  </Card>
);

const MatchesPage = () => {
  const [matches, setMatches] = useState<MatchPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "football" | "cricket" | "volleyball" | "basketball" | "badminton">("all");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/v1/live/match?limit=200&page=1");
        const data = await res.json();
        if (res.ok && Array.isArray(data?.data)) setMatches(data.data);
      } catch (error) {
        console.error("Failed to load matches", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const liveMatches = matches.filter((m) => m.is_live);
  const pastMatches = matches.filter((m) => !m.is_live);

  const years = useMemo(() => {
    const set = new Set<string>();
    pastMatches.forEach((m) => set.add(new Date(m.match_date).getFullYear().toString()));
    return Array.from(set).sort((a, b) => Number(b) - Number(a));
  }, [pastMatches]);

  const matchesByType = useMemo(() => {
    const slice = (list: MatchPosts[]) =>
      typeFilter === "all" ? list : list.filter((m) => m.match_type === typeFilter);
    return {
      live: slice(liveMatches),
      past:
        yearFilter === "all"
          ? slice(pastMatches)
          : slice(
              pastMatches.filter(
                (m) => new Date(m.match_date).getFullYear().toString() === yearFilter
              )
            ),
    };
  }, [liveMatches, pastMatches, typeFilter, yearFilter]);

  const selectClass =
    "h-9 rounded-md border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <div className="animate-in-subtle space-y-12">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">Matches</h1>
          <p className="mt-2 text-muted-foreground">
            Live scores and match archives.
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a href="#past-matches">Past matches</a>
        </Button>
      </header>

      {loading ? (
        <CircularLoader />
      ) : (
        <>
          <section className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Badge variant="live" className="gap-1.5">
                  <Radio className="h-3 w-3 live-pulse" />
                  Live
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {matchesByType.live.length > 0
                    ? "Ongoing matches"
                    : "No live matches right now"}
                </span>
              </div>
              <select
                value={typeFilter}
                onChange={(e) =>
                  setTypeFilter(e.target.value as any)
                }
                className={selectClass}
              >
                <option value="all">All sports</option>
                <option value="football">Football</option>
                <option value="cricket">Cricket</option>
                <option value="volleyball">Volleyball</option>
                <option value="basketball">Basketball</option>
                <option value="badminton">Badminton</option>
              </select>
            </div>

            {matchesByType.live.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  Live scores will appear here when a match is in progress.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {matchesByType.live.map((match) => (
                  <MatchCard key={match.firebase_match_id} match={match} />
                ))}
              </div>
            )}
          </section>

          <Separator />

          <section id="past-matches" className="scroll-mt-24 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Past matches
              </h2>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className={selectClass}
              >
                <option value="all">All years</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {["football", "cricket", "volleyball", "basketball", "badminton"].map((type) => {
              const list = matchesByType.past.filter((m) => m.match_type === type);
              if (list.length === 0) return null;
              return (
                <div key={type} className="space-y-4">
                  <h3 className="font-serif text-lg capitalize">{type}</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {list.map((match) => (
                      <MatchCard key={match.firebase_match_id} match={match} />
                    ))}
                  </div>
                </div>
              );
            })}

            {matchesByType.past.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  No archived matches for this selection.
                </CardContent>
              </Card>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default MatchesPage;
