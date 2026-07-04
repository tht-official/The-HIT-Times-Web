"use client";

import PostForm from "@/components/admin-portal/posts/PostForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const CreatePostPage = () => {
  return (
    <div className="animate-in-subtle mx-auto max-w-3xl space-y-8">
      <header className="space-y-4">
        <Button variant="ghost" size="sm" className="-ml-2 gap-1.5" asChild>
          <Link href="/admin-portal/posts">
            <ArrowLeft className="h-3.5 w-3.5" />
            All posts
          </Link>
        </Button>
        <div>
          <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">
            Create post
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Write and publish a new article to a section.
          </p>
        </div>
      </header>
      <PostForm />
    </div>
  );
};

export default CreatePostPage;
