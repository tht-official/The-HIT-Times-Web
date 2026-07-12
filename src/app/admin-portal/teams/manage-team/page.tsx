"use client";

import { Suspense, useEffect, useState } from "react";
import TeamForm from "@/components/admin-portal/teams/TeamForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { getTeamName } from "@/lib/codeToTeamName";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams, notFound } from "next/navigation";

function ManageTeamPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [teamName, setTeamName] = useState<string>("Team");
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    if (!code) return;
    const activeCode = code; 

    async function loadTeam() {
      try {
        const res = await fetch(`/api/v1/team/${activeCode}`);
        const data = await res.json();
        if (res.ok && data?.data) {
          setTeamName(data.data.dept_name || getTeamName(activeCode) || "Team");
        } else {
          setTeamName(getTeamName(activeCode) || "Team");
        }
      } catch {
        setTeamName(getTeamName(activeCode) || "Team");
      } finally {
        setLoading(false);
      }
    }
    loadTeam();
  }, [code]);

  if (code === null) {
    notFound();
  }

  const teamCode = code as string;

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="max-w-full space-y-8 overflow-x-hidden">
      <header className="space-y-4">
        <Button variant="ghost" size="sm" className="-ml-2 gap-1.5" asChild>
          <Link href="/admin-portal/teams">
            <ArrowLeft className="h-3.5 w-3.5" />
            All teams
          </Link>
        </Button>
        <div>
          <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">
            Manage {teamName}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Update squads and rosters for team code {teamCode}.
          </p>
        </div>
      </header>

      <TeamForm teamCode={teamCode} deptName={teamName} />
    </div>
  );
}
export default function ManageTeamRoute() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      }
    >
      <ManageTeamPage />
    </Suspense>
  );
}