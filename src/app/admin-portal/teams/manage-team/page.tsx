"use client";

import { Suspense } from "react";
import TeamForm from "@/components/admin-portal/teams/TeamForm";
import { BrandLoader } from "@/components/common/loader/Loaders";
import { Button } from "@/components/ui/button";
import { getAllTeamsCode, getTeamName } from "@/lib/codeToTeamName";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams, notFound } from "next/navigation";

function ManageTeamPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const teamsCode = getAllTeamsCode();

  if (code === null || !teamsCode.includes(code)) {
    notFound();
  }

  const teamName = getTeamName(code) ?? "Team";

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
            Update football and cricket squads for department code {code}.
          </p>
        </div>
      </header>

      <TeamForm teamCode={code} deptName={teamName} />
    </div>
  );
}

export default function ManageTeamRoute() {
  return (
    <Suspense fallback={<BrandLoader variant="inline" />}>
      <ManageTeamPage />
    </Suspense>
  );
}
