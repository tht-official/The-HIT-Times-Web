"use client";

import { useEffect, useState } from "react";
import { MatchPosts } from "@/models/Match";
import { codeToTeamName } from "@/lib/codeToTeamName";
import Link from "next/link";
import Image from "next/image";
import { CircularLoader } from "@/components/common/loader/Loaders";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Teams } from "@/models/Team";


const toRenderableImage = (url?: string) => {
  if (!url) return undefined;
  const driveIdMatch = url.match(/\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/);
  if (driveIdMatch && driveIdMatch[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveIdMatch[1]}`;
  }
  return url;
};

const formatDateTime = (d: Date | string) => {
  const date = new Date(d);
  return (
    date.toLocaleDateString(undefined, { month: "short", day: "numeric" }) +
    " · " +
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
};
const getTeamLabel = (code: string, name?: string) =>
  codeToTeamName[code] || name || code;

const TeamCard = ({
  team,
  sport,
}: {
  team?: Teams;
  sport: "football" | "cricket";
}) => {
  if (!team) return null;
  const detail = team[sport];
  if (!detail) return null;
  const players = detail.players || [];

  const captain = players.find((p) =>
    /captain/i.test(p.player_description || "")
  );
  const viceCaptain = players.find(
    (p) =>
      /vice\s*captain/i.test(p.player_description || "") ||
      /vc\b/i.test(p.player_description || "")
  );

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-900/60 h-full">
      <div className="flex items-center gap-3 mb-3">
        {detail.team_logo && (
          <Image
            src={toRenderableImage(detail.team_logo) ?? ""}
            alt={detail.team_name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover flex-shrink-0"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        <div>
          <p className="text-xs uppercase text-gray-500 dark:text-gray-400">
            {sport}
          </p>
          <p className="text-base font-semibold text-gray-900 dark:text-gray-100">
            {detail.team_name}
          </p>
        </div>
      </div>
      <div className="grid gap-2 text-sm text-gray-800 dark:text-gray-200">
        {captain && (
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700">
              Captain
            </span>
            <span>{captain.player_name}</span>
          </div>
        )}
        {viceCaptain && (
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
              Vice Captain
            </span>
            <span>{viceCaptain.player_name}</span>
          </div>
        )}
        {players
          .filter(
            (p) =>
              p !== captain &&
              p !== viceCaptain &&
              (p.player_name || p.player_description)
          )
          .slice(0, 4)
          .map((p) => (
            <div key={p.player_name} className="flex items-center gap-2">
              {p.player_image && (
                <Image
                  src={toRenderableImage(p.player_image) ?? ""}
                  alt={p.player_name}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              )}
          <div className="flex flex-col min-w-0">
            <span className="font-medium truncate">{p.player_name}</span>
            {p.player_description && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {p.player_description}
              </span>
            )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const TeamRosterView = ({
  team,
  sport,
}: {
  team?: Teams;
  sport: "football" | "cricket";
}) => {
  if (!team) return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center text-gray-500 bg-gray-50 dark:bg-gray-900/60">
      Roster not available
    </div>
  );
  const detail = team[sport];
  if (!detail) return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 text-center text-gray-500 bg-gray-50 dark:bg-gray-900/60">
      Roster details for {sport} not found
    </div>
  );
  const players = detail.players || [];

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 p-6 bg-white dark:bg-gray-900 shadow-sm flex flex-col gap-6 h-full">
      {/* Team Header */}
      <div className="flex items-center gap-4 pb-4 border-b border-gray-100 dark:border-gray-800">
        {detail.team_logo ? (
          <Image
            src={toRenderableImage(detail.team_logo) ?? ""}
            alt={detail.team_name}
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover flex-shrink-0 border border-gray-100 dark:border-gray-800"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="h-14 w-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-400">
            {team.team_code}
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {detail.team_name}
          </h3>
          <p className="text-xs uppercase text-gray-500 dark:text-gray-400 tracking-wide font-semibold">
            {team.dept_name} · {sport}
          </p>
        </div>
      </div>

      {/* Players list */}
      {players.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
          No players listed for this team yet.
        </p>
      ) : (
        <div className="grid gap-3">
          {players.map((p) => {
            const isCaptain = /captain/i.test(p.player_description || "");
            const isVc = /vice\s*captain/i.test(p.player_description || "") || /vc\b/i.test(p.player_description || "");
            
            return (
              <div key={p.player_name} className="flex items-center gap-3 p-3 rounded-xl border border-gray-150 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/20 hover:bg-gray-100 dark:hover:bg-gray-950/40 transition-colors">
                <div className="relative h-12 w-12 flex-shrink-0">
                  {p.player_image ? (
                    <>
                      <Image
                        src={toRenderableImage(p.player_image) ?? ""}
                        alt={p.player_name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover border border-gray-250 dark:border-gray-700"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget.parentElement?.querySelector(".avatar-fallback");
                          if (fallback) (fallback as HTMLElement).style.display = "flex";
                        }}
                      />
                      <div className="avatar-fallback hidden absolute inset-0 h-12 w-12 rounded-full bg-gray-250 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-lg">
                        👤
                      </div>
                    </>
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 font-bold text-lg">
                      👤
                    </div>
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-gray-900 dark:text-gray-100 truncate text-sm">
                    {p.player_name}
                  </span>
                  <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                    {isCaptain && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 font-bold uppercase">
                        Captain
                      </span>
                    )}
                    {isVc && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 font-bold uppercase">
                        VC
                      </span>
                    )}
                    {p.player_description && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {p.player_description.replace(/^(captain|vice captain|vc)\s*(\/|-)?\s*/i, "")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const MatchDetailPage = ({
  params,
}: {
  params: { matchId: string };
}) => {
  const [match, setMatch] = useState<MatchPosts | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [teams, setTeams] = useState<Record<string, Teams>>({});
  const [activeTab, setActiveTab] = useState<"timeline" | "teams">("timeline");

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
        } catch (err) {
          return null;
        }
        return null;
      })
    );
    const nextTeams: Record<string, Teams> = {};
    teamResponses.forEach((entry) => {
      if (entry) {
        nextTeams[entry[0]] = entry[1];
      }
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
    } catch (err) {
      setError("Failed to load match");
    } finally {
      if (!silent) setIsRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatch({ includeTeams: true });
    const interval = setInterval(() => {
      fetchMatch({ silent: true }); // silent refresh every 20 seconds
    }, 20000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.matchId]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <CircularLoader />
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <p className="text-red-600 dark:text-red-400">{error || "Match not found."}</p>
        <Link href="/matches" className="text-blue-600 dark:text-blue-400 hover:underline">
          Back to matches
        </Link>
      </div>
    );
  }

  const sport = match.match_type === "cricket" ? "cricket" : "football";
  const team1Logo = teams[match.team1.team_code]?.[sport]?.team_logo;
  const team2Logo = teams[match.team2.team_code]?.[sport]?.team_logo;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
            {match.match_type}
          </p>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-gray-100 leading-tight flex items-center gap-2 flex-wrap">
            {team1Logo && (
              <Image
                src={toRenderableImage(team1Logo) ?? ""}
                alt="Team 1 logo"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            <span>{getTeamLabel(match.team1.team_code, match.team1.team_name)}</span>
            <span className="text-gray-400 dark:text-gray-600 font-normal mx-1">vs</span>
            {team2Logo && (
              <Image
                src={toRenderableImage(team2Logo) ?? ""}
                alt="Team 2 logo"
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            <span>{getTeamLabel(match.team2.team_code, match.team2.team_name)}</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {formatDateTime(match.match_date)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => fetchMatch({ includeTeams: true })}
            className="inline-flex items-center gap-1 rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
            disabled={isRefreshing}
          >
            <ArrowPathIcon
              className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <Link
            href="/matches"
            className="rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Back to matches
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="grid grid-cols-3 gap-4 items-center text-center">
          <div className="text-center flex flex-col items-center">
            {team1Logo && (
              <Image
                src={toRenderableImage(team1Logo) ?? ""}
                alt="Team 1 logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover mb-2 border border-gray-100 dark:border-gray-800"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {getTeamLabel(match.team1.team_code, match.team1.team_name)}
            </p>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              {match.team1.team_score || "0"}
            </p>
            {match.team1.team_penalty && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Penalties: {match.team1.team_penalty}
              </p>
            )}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {match.match_status || (match.is_live ? "Live" : "Completed")}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {match.is_live ? "Live" : "Final"}
            </p>
          </div>
          <div className="text-center flex flex-col items-center">
            {team2Logo && (
              <Image
                src={toRenderableImage(team2Logo) ?? ""}
                alt="Team 2 logo"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover mb-2 border border-gray-100 dark:border-gray-800"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              {getTeamLabel(match.team2.team_code, match.team2.team_name)}
            </p>
            <p className="text-4xl font-bold text-gray-900 dark:text-gray-100 mt-1">
              {match.team2.team_score || "0"}
            </p>
            {match.team2.team_penalty && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Penalties: {match.team2.team_penalty}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tab bar selection */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab("timeline")}
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors duration-200 ${
            activeTab === "timeline"
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          Timeline
        </button>
        <button
          onClick={() => setActiveTab("teams")}
          className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-colors duration-200 ${
            activeTab === "teams"
              ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          Teams
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "timeline" && (
        <div className="flex flex-col gap-4">
          {match.timeline && match.timeline.length > 0 ? (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                Timeline Updates
              </h2>
              <div className="grid gap-3">
                {match.timeline
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.timeline_date).getTime() -
                      new Date(a.timeline_date).getTime()
                  )
                  .map((t) => (
                    <div
                      key={t.firebase_timeline_id}
                      className="rounded-md border border-gray-200 dark:border-gray-800 p-3 bg-gray-50 dark:bg-gray-800 overflow-hidden break-words"
                    >
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {formatDateTime(t.timeline_date)}
                      </p>
                      <div
                        className="text-sm text-gray-800 dark:text-gray-200 prose prose-sm dark:prose-invert break-words"
                        dangerouslySetInnerHTML={{ __html: t.msgHtml }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 text-center text-gray-500 shadow-sm">
              No timeline updates available.
            </div>
          )}
        </div>
      )}

      {activeTab === "teams" && (
        <div className="grid gap-6 md:grid-cols-2">
          <TeamRosterView
            team={teams[match.team1.team_code]}
            sport={match.match_type === "cricket" ? "cricket" : "football"}
          />
          <TeamRosterView
            team={teams[match.team2.team_code]}
            sport={match.match_type === "cricket" ? "cricket" : "football"}
          />
        </div>
      )}
    </div>
  );
};

export default MatchDetailPage;
