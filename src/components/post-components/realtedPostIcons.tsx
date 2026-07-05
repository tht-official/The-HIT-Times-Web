"use client";

import { Bookmark, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Posts } from "@/models/Post";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RelatedPostIconsProps {
  post: Posts;
  direction?: "flex-row" | "flex-col";
}

const RelatedPostIcons = ({ post, direction }: RelatedPostIconsProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarkedPosts = JSON.parse(
      localStorage.getItem("bookmarkedPosts") || "[]"
    );
    setIsBookmarked(bookmarkedPosts.includes(post._id.toString()));
  }, [post._id]);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `https://thehittimes.com/posts/${post._id.toString()}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: post.title, url });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const bookmarkedPosts = JSON.parse(
      localStorage.getItem("bookmarkedPosts") || "[]"
    );

    if (bookmarkedPosts.includes(post._id.toString())) {
      const updated = bookmarkedPosts.filter(
        (id: string) => id !== post._id.toString()
      );
      localStorage.setItem("bookmarkedPosts", JSON.stringify(updated));
      setIsBookmarked(false);
    } else {
      localStorage.setItem(
        "bookmarkedPosts",
        JSON.stringify([...bookmarkedPosts, post._id.toString()])
      );
      setIsBookmarked(true);
    }
  };

  return (
    <div
      className={cn(
        "flex gap-1 rounded-full border border-border/60 bg-background/80 p-0.5 backdrop-blur-sm",
        direction ?? "flex-row"
      )}
      onClick={(e) => e.stopPropagation()}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-foreground"
        onClick={handleShare}
        aria-label="Share"
      >
        <Share2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-8 w-8 transition-colors duration-200",
          isBookmarked ? "text-primary" : "text-muted-foreground hover:text-foreground"
        )}
        onClick={handleBookmark}
        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
      >
        <Bookmark className={cn("h-4 w-4", isBookmarked && "fill-current")} />
      </Button>
    </div>
  );
};

export default RelatedPostIcons;
