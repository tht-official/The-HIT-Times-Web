"use client";

import { MatchImage } from "@/components/matches/MatchImage";
import { Alumni } from "@/models/Alumnus";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

function AlumniCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/80">
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <CardHeader className="space-y-2 pb-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </CardHeader>
      <CardFooter className="gap-2 border-t border-border pt-4">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-8" />
      </CardFooter>
    </Card>
  );
}

function AlumniCard({
  alum,
  onDelete,
}: {
  alum: Alumni;
  onDelete: (id: string) => void;
}) {
  const id = alum._id.toString();

  return (
    <Card className="micro-lift flex h-full flex-col overflow-hidden border-border/80 transition-[border-color,box-shadow] duration-200 hover:border-border hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <MatchImage
          src={alum.profile_image}
          alt={alum.name}
          className="h-full w-full object-cover"
          size={600}
          fallback={
            <span className="text-sm font-medium text-muted-foreground">
              {alum.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </span>
          }
        />
      </div>

      <CardHeader className="flex-1 space-y-2 pb-2">
        <CardTitle className="line-clamp-2 text-base font-medium leading-snug">
          {alum.name}
        </CardTitle>
        {alum.position && (
          <Badge variant="outline" className="w-fit text-[10px] uppercase tracking-wide">
            {alum.position}
          </Badge>
        )}
        <p className="text-xs text-muted-foreground">
          Session {alum.session_start} – {alum.session_end}
        </p>
      </CardHeader>

      <CardFooter className="mt-auto gap-2 border-t border-border pt-4">
        <Button variant="outline" size="sm" className="flex-1 gap-1.5" asChild>
          <Link href={`/admin-portal/alumni/edit/${id}`}>
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Link>
        </Button>
        {alum.linkedin && (
          <Button variant="ghost" size="icon" className="shrink-0" asChild>
            <a href={alum.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => {
            if (window.confirm(`Delete ${alum.name}? This cannot be undone.`)) {
              onDelete(id);
            }
          }}
          aria-label={`Delete ${alum.name}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function AdminAlumniPage() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAlumni = useCallback(async () => {
    try {
      const response = await fetch("/api/v1/alumnus?limit=1000&page=1");
      const data = await response.json();
      if (response.ok && Array.isArray(data?.data)) {
        setAlumni(data.data);
        setError(null);
      } else {
        setError("Failed to load alumni.");
      }
    } catch {
      setError("Failed to load alumni.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAlumni();
  }, [fetchAlumni]);

  const handleDeleteAlumni = async (id: string) => {
    const response = await fetch(`/api/v1/alumnus/${id}`, { method: "DELETE" });
    if (response.ok) {
      setAlumni((prev) => prev.filter((alum) => alum._id.toString() !== id));
    }
  };

  return (
    <div className="animate-in-subtle space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">Alumni</h1>
          <p className="mt-2 text-muted-foreground">
            Manage alumni profiles shown on the public alumni page.
          </p>
          {!loading && (
            <p className="mt-1 text-xs text-muted-foreground">
              {alumni.length} profile{alumni.length === 1 ? "" : "s"}
            </p>
          )}
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin-portal/alumni/create-alumni">
            <Plus className="h-4 w-4" />
            Add alumni
          </Link>
        </Button>
      </header>

      {error && (
        <p className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <AlumniCardSkeleton key={i} />
          ))}
        </div>
      ) : alumni.length === 0 ? (
        <Card className="border-dashed border-border/80">
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-sm text-muted-foreground">No alumni profiles yet.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin-portal/alumni/create-alumni">
                <Plus className="h-4 w-4" />
                Add first alumni
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div
          className={cn(
            "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}
        >
          {alumni.map((alum) => (
            <AlumniCard
              key={alum._id.toString()}
              alum={alum}
              onDelete={handleDeleteAlumni}
            />
          ))}
        </div>
      )}
    </div>
  );
}
