"use client";

import ArticleImage from "@/components/weekly-portion/ArticleImage";
import { dropdownsToSections } from "@/components/weekly-portion/WeeklyPortion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Posts } from "@/models/Post";
import { cn } from "@/lib/utils";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

function normalizeImageLink(link: string) {
  return link?.startsWith("http") ? link : "https://placehold.co/600x400.png";
}

function PostCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border/80">
      <Skeleton className="aspect-video w-full rounded-none" />
      <CardHeader className="space-y-2 pb-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </CardHeader>
      <CardFooter className="gap-2 border-t border-border pt-4">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-8" />
      </CardFooter>
    </Card>
  );
}

function PostCard({
  post,
  onDelete,
}: {
  post: Posts;
  onDelete: (id: string) => void;
}) {
  const id = post._id.toString();
  const category = dropdownsToSections[post.dropdown] ?? post.dropdown;

  return (
    <Card className="micro-lift flex h-full flex-col overflow-hidden border-border/80 transition-[border-color,box-shadow] duration-200 hover:border-border hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        <ArticleImage
          src={normalizeImageLink(post.link)}
          alt={post.title}
          className="h-full w-full object-cover"
          width={600}
          height={400}
        />
      </div>

      <CardHeader className="flex-1 space-y-2 pb-2">
        <Badge variant="outline" className="w-fit text-[10px] uppercase tracking-wide">
          {category}
        </Badge>
        <CardTitle className="line-clamp-2 text-base font-medium leading-snug">
          {post.title}
        </CardTitle>
        <p className="line-clamp-2 text-sm text-muted-foreground">{post.description}</p>
        <p className="text-xs text-muted-foreground">
          {new Date(post.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </CardHeader>

      <CardFooter className="mt-auto gap-2 border-t border-border pt-4">
        <Button variant="outline" size="sm" className="flex-1 gap-1.5" asChild>
          <Link href={`/admin-portal/posts/edit/${id}`}>
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-destructive hover:bg-destructive/10 hover:text-destructive"
          onClick={() => {
            if (window.confirm(`Delete "${post.title}"? This cannot be undone.`)) {
              onDelete(id);
            }
          }}
          aria-label={`Delete ${post.title}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch("/api/v1/posts?limit=500&page=1");
      const data = await response.json();
      if (response.ok && Array.isArray(data)) {
        setPosts(
          data.map((post: Posts) => ({
            ...post,
            link: normalizeImageLink(post.link),
          }))
        );
        setError(null);
      } else {
        setError("Failed to load posts.");
      }
    } catch {
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDeletePost = async (id: string) => {
    const response = await fetch(`/api/v1/post/${id}`, { method: "DELETE" });
    if (response.ok) {
      setPosts((prev) => prev.filter((post) => post._id.toString() !== id));
    }
  };

  return (
    <div className="animate-in-subtle space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">Posts</h1>
          <p className="mt-2 text-muted-foreground">
            Create and manage articles across all sections.
          </p>
          {!loading && (
            <p className="mt-1 text-xs text-muted-foreground">
              {posts.length} post{posts.length === 1 ? "" : "s"}
            </p>
          )}
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/admin-portal/posts/create-post">
            <Plus className="h-4 w-4" />
            Create post
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
            <PostCardSkeleton key={i} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <Card className="border-dashed border-border/80">
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-sm text-muted-foreground">No posts yet.</p>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin-portal/posts/create-post">
                <Plus className="h-4 w-4" />
                Create first post
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
            <PostCard
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
