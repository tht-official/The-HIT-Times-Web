"use client";

import { MatchImage } from "@/components/matches/MatchImage";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllTeamsCode, getTeamName } from "@/lib/codeToTeamName";
import { Teams } from "@/models/Team";
import { cn } from "@/lib/utils";
import { ArrowRight, Users, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

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
  const volleyballPlayers = data?.volleyball?.players?.length ?? 0;
  const basketballPlayers = data?.basketball?.players?.length ?? 0;
  
  const logo = data?.football?.team_logo || 
               data?.cricket?.team_logo || 
               data?.volleyball?.team_logo || 
               data?.basketball?.team_logo;
               
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
              <div className="grid grid-cols-2 gap-2">
                <Badge variant="outline" className="gap-1 text-[10px] uppercase tracking-wide justify-center">
                  <Users className="h-3 w-3" />
                  FB · {footballPlayers}
                </Badge>
                <Badge variant="outline" className="gap-1 text-[10px] uppercase tracking-wide justify-center">
                  <Users className="h-3 w-3" />
                  CR · {cricketPlayers}
                </Badge>
                <Badge variant="outline" className="gap-1 text-[10px] uppercase tracking-wide justify-center">
                  <Users className="h-3 w-3" />
                  VB · {volleyballPlayers}
                </Badge>
                <Badge variant="outline" className="gap-1 text-[10px] uppercase tracking-wide justify-center">
                  <Users className="h-3 w-3" />
                  BB · {basketballPlayers}
                </Badge>
              </div>
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
  
  // Custom team form state
  const [showModal, setShowModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [newTeamCode, setNewTeamCode] = useState("");
  const [newTeamDesc, setNewTeamDesc] = useState("");
  const [modalError, setModalError] = useState("");

  const fetchAllTeams = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/v1/team");
      const json = await res.json();
      const dbTeams: Teams[] = res.ok && json.data ? json.data : [];

      const staticCodes = getAllTeamsCode();
      const staticSummaries: TeamSummary[] = staticCodes.map((code) => {
        const matched = dbTeams.find((t) => t.team_code === code);
        return {
          code,
          label: getTeamName(code) ?? code,
          data: matched || null,
        };
      });

      const customSummaries: TeamSummary[] = dbTeams
        .filter((t) => !staticCodes.includes(t.team_code))
        .map((t) => ({
          code: t.team_code,
          label: t.dept_name,
          data: t,
        }));

      setTeams([...staticSummaries, ...customSummaries]);
    } catch (err) {
      console.error("Failed to load teams", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTeams();
  }, []);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError("");
    try {
      const res = await fetch("/api/v1/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team_code: newTeamCode.trim(),
          dept_name: newTeamDesc.trim(),
          football: { team_name: newTeamName.trim(), team_logo: "", players: [] },
          cricket: { team_name: newTeamName.trim(), team_logo: "", players: [] },
          volleyball: { team_name: newTeamName.trim(), team_logo: "", players: [] },
          basketball: { team_name: newTeamName.trim(), team_logo: "", players: [] },
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || "Failed to create team");
      }
      setShowModal(false);
      setNewTeamName("");
      setNewTeamCode("");
      setNewTeamDesc("");
      fetchAllTeams();
    } catch (err: any) {
      setModalError(err.message);
    }
  };

  const configuredCount = teams.filter((t) => t.data).length;

  return (
    <div className="animate-in-subtle space-y-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">Teams</h1>
          <p className="mt-2 text-muted-foreground">
            Manage department squads and custom club squads.
          </p>
          {!loading && (
            <p className="mt-1 text-xs text-muted-foreground">
              {configuredCount} of {teams.length} teams configured
            </p>
          )}
        </div>
        <Button onClick={() => setShowModal(true)} className="gap-2 self-start sm:self-center">
          <Plus className="h-4 w-4" />
          Create Custom Team
        </Button>
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

      {/* Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-lg border border-border bg-background p-6 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <h2 className="text-lg font-semibold tracking-tight">Create Custom Team</h2>
            <p className="text-xs text-muted-foreground mt-1">Add a new club or dynamic sport team.</p>
            
            <form onSubmit={handleCreateTeam} className="mt-4 space-y-4">
              {modalError && (
                <p className="text-xs font-medium text-destructive bg-destructive/10 border border-destructive/20 p-2.5 rounded-md">
                  {modalError}
                </p>
              )}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Team Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. HIT Spikers"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Unique Team Code (slug)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. hit-spikers"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={newTeamCode}
                  onChange={(e) => {
                    const val = e.target.value
                      .toLowerCase()
                      .replace(/[^a-z0-9-_]/g, "") // restrict to safe characters
                      .replace(/\s+/g, "-");
                    setNewTeamCode(val);
                  }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Description / Department Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Volleyball Club"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  value={newTeamDesc}
                  onChange={(e) => setNewTeamDesc(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2 border-t border-border mt-6">
                <Button type="button" variant="outline" size="sm" onClick={() => { setShowModal(false); setModalError(""); }}>
                  Cancel
                </Button>
                <Button type="submit" size="sm">Create Team</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}