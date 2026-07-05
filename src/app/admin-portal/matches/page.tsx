"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatMatchDateTime, getTeamLabel } from "@/lib/matchUtils";
import { MatchPosts } from "@/models/Match";
import { cn } from "@/lib/utils";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

function MatchCardSkeleton() {
  return (
    <Card className="border-border/80">
      <CardHeader className="space-y-3 pb-2">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </CardHeader>
      <CardFooter className="gap-2 border-t border-border pt-4">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-8" />
      </CardFooter>
    </Card>
  );
}

function MatchCard({
  post,
  onDelete,
}: {
  post: MatchPosts;
  onDelete: (id: string) => void;
}) {
  const team1 = getTeamLabel(post.team1.team_code, post.team1.team_name);
  const team2 = getTeamLabel(post.team2.team_code, post.team2.team_name);

  return (
    <Card className="micro-lift flex h-full flex-col border-border/80 transition-[border-color,box-shadow] duration-200 hover:border-border hover:shadow-md">
      <CardHeader className="flex-1 space-y-3 pb-2">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
              {post.match_type}
            </Badge>
            {post.is_live && (
              <Badge variant="live" className="text-[10px] uppercase tracking-wide">
                Live
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">
            {formatMatchDateTime(post.match_date)}
          </span>
        </div>

        <div className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {team1}
          </p>
          <p className="mt-1 font-serif text-2xl font-normal tabular-nums text-foreground">
            {post.team1.team_score}
            <span className="mx-2 text-muted-foreground">–</span>
            {post.team2.team_score}
          </p>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {team2}
          </p>
        </div>

        <CardTitle className="line-clamp-2 text-sm font-normal leading-snug text-muted-foreground">
          {post.match_status}
        </CardTitle>
      </CardHeader>

      <CardFooter className="mt-auto gap-2 border-t border-border pt-4">
        <Button variant="outline" size="sm" className="flex-1 gap-1.5" asChild>
          <Link href={`/admin-portal/matches/edit/${post.firebase_match_id}`}>
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => {
            if (
              window.confirm(
                `Delete ${team1} vs ${team2}? This cannot be undone.`
              )
            ) {
              onDelete(post.firebase_match_id);
            }
          }}
          aria-label={`Delete ${team1} vs ${team2}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function ManageMatchPostPage() {
  const [posts, setPosts] = useState<MatchPosts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMatches = useCallback(async () => {
    try {
      const response = await fetch("/api/v1/live/match?limit=500&page=1");
      const data = await response.json();
      if (response.ok && Array.isArray(data?.data)) {
        setPosts(data.data);
        setError(null);
      } else {
        setError("Failed to load matches.");
      }
    } catch {
      setError("Failed to load matches.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  const handleDeletePost = async (firebaseId: string) => {
    const response = await fetch(`/api/v1/live/match/${firebaseId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setPosts((prev) =>
        prev.filter((post) => post.firebase_match_id !== firebaseId)
      );
    }
  };

  const liveCount = posts.filter((p) => p.is_live).length;

  return (
    <div className="animate-in-subtle space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">Matches</h1>
          <p className="mt-2 text-muted-foreground">
            Create and manage live match scoreboards and timelines.
          </p>
          {!loading && (
            <p className="mt-1 text-xs text-muted-foreground">
              {posts.length} match{posts.length === 1 ? "" : "es"}
              {liveCount > 0 && ` · ${liveCount} live`}
            </p>
          )}
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin-portal/matches/create-match">
            <Plus className="h-4 w-4" />
            Create match
          </Link>
        </Button>
      </header>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {loading ? (
        <div
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <MatchCardSkeleton key={i} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <Card className="border-dashed border-border/80">
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-sm text-muted-foreground">No matches yet.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin-portal/matches/create-match">
                <Plus className="h-4 w-4" />
                Create first match
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {posts.map((post) => (
            <MatchCard
              key={post._id.toString()}
              post={post}
              onDelete={handleDeletePost}
            />
          ))}
        </div>
      )}
    </div>
  );
}
