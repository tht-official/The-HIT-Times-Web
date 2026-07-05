"use client";

import PostForm from "@/components/admin-portal/posts/PostForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const EditPost = ({ params }: { params: { postId: string } }) => {
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
            Edit post
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Update title, image, category, or article body.
          </p>
        </div>
      </header>
      <PostForm postId={params.postId} />
    </div>
  );
};

export default EditPost;
