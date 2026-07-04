"use client";

import CreateLivePostForm from "@/components/admin-portal/matches/CreateLivePost";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateLivePost() {
  return (
    <div className="animate-in-subtle mx-auto max-w-2xl space-y-8">
      <header className="space-y-4">
        <Button variant="ghost" size="sm" className="-ml-2 gap-1.5" asChild>
          <Link href="/admin-portal/matches">
            <ArrowLeft className="h-3.5 w-3.5" />
            All matches
          </Link>
        </Button>
        <div>
          <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">
            Create match
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Set up teams, scores, and kick off a live match feed.
          </p>
        </div>
      </header>
      <CreateLivePostForm />
    </div>
  );
}
