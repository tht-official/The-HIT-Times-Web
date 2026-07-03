"use client";

import Article from "@/components/weekly-portion/Article";
import { Posts } from "@/models/Post";
import { useEffect, useState } from "react";
import { BrandLoader } from "@/components/common/loader/Loaders";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BookmarksPage() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const bookmarkedPosts = JSON.parse(
        localStorage.getItem("bookmarkedPosts") || "[]"
      ).reverse();

      if (bookmarkedPosts.length === 0) {
        setLoading(false);
        return;
      }

      const newPosts = await Promise.all(
        bookmarkedPosts.map(async (postId: string) => {
          const res = await fetch(`/api/v1/post/${postId}`);
          const data = await res.json();
          return data.data;
        })
      );
      setPosts(newPosts.filter(Boolean));
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="animate-in-subtle space-y-8">
      <header>
        <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">
          My Bookmarks
        </h1>
        <p className="mt-2 text-muted-foreground">
          Stories you&apos;ve saved for later.
        </p>
      </header>

      {loading ? (
        <BrandLoader variant="inline" />
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
          <Bookmark className="mb-4 h-10 w-10 text-muted-foreground/50" />
          <p className="text-muted-foreground">No bookmarks yet.</p>
          <Button variant="link" asChild className="mt-2">
            <Link href="/">Browse stories</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Article key={post._id.toString()} article={post} />
          ))}
        </div>
      )}
    </div>
  );
}
