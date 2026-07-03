"use client";

import MainPostIcons from "@/components/post-components/mainPostIcons";
import RealtedPostIcons from "@/components/post-components/realtedPostIcons";
import Article from "@/components/weekly-portion/Article";
import ArticleImage from "@/components/weekly-portion/ArticleImage";
import { BrandLoader } from "@/components/common/loader/Loaders";
import { dropdownsToSections } from "@/components/weekly-portion/WeeklyPortion";
import { Posts } from "@/models/Post";
import parse from "html-react-parser";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const PostInfoPage = ({ params }: { params: { postId: string } }) => {
  const [postinfo, setPostinfo] = useState<Posts>();
  const [relatedPosts, setRelatedPosts] = useState<Posts[]>();
  const [loading, setLoading] = useState(true);

  const loadPost = async () => {
    const res = await fetch(`/api/v1/posts?_id=${params.postId}`);
    const data = await res.json();
    setPostinfo(data[0]);
    setLoading(false);
    if (data.length !== 1) return;
    loadRelatedPosts(data[0]);
  };

  const getRelativeTime = (date: Date): string => {
    const now = new Date();
    const postDate = new Date(date);
    const diff = now.getTime() - postDate.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 30) return postDate.toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });
    if (days > 0) return `${days}d ago`;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours > 0) return `${hours}h ago`;
    const minutes = Math.floor(diff / (1000 * 60));
    return minutes > 0 ? `${minutes}m ago` : "Just now";
  };

  const calculateReadTime = (htmlBody: string): string => {
    const words = htmlBody.split(/\s+/).filter(Boolean).length;
    return `${Math.max(1, Math.ceil(words / 200))} min read`;
  };

  const loadRelatedPosts = async (post: Posts) => {
    const res = await fetch(`/api/v1/posts?dropdown=${post.dropdown}&limit=6`);
    const data = await res.json();
    setRelatedPosts(data.filter((x: Posts) => x._id !== post._id));
  };

  useEffect(() => {
    loadPost();
  }, []);

  if (loading) {
    return <BrandLoader variant="page" />;
  }

  if (!postinfo) notFound();

  const sectionName = dropdownsToSections[postinfo.dropdown] ?? "Article";

  return (
    <article>
      <div className="mx-auto max-w-3xl">
        <header className="mb-8 space-y-4 sm:mb-10 sm:space-y-5">
          <div className="flex items-center justify-between gap-4">
            <span className="tag-editorial">{sectionName}</span>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <MainPostIcons post={postinfo} />
              </div>
              <div className="sm:hidden">
                <RealtedPostIcons post={postinfo} />
              </div>
            </div>
          </div>

          <h1 className="editorial-heading text-balance text-3xl font-normal leading-tight sm:text-4xl lg:text-5xl">
            {postinfo.title}
          </h1>

          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            <time>{getRelativeTime(postinfo.createdAt)}</time>
            <span>·</span>
            <span>{calculateReadTime(postinfo.htmlBody ?? postinfo.body)}</span>
          </div>
        </header>

        <ArticleImage
          src={postinfo.link}
          alt={postinfo.title}
          width={1200}
          height={675}
          className="mb-10 aspect-video w-full rounded-sm object-cover"
        />

        <div className="prose-editorial text-base leading-relaxed">
          {parse(postinfo.htmlBody ?? postinfo.body)}
        </div>
      </div>

      {relatedPosts && relatedPosts.length > 0 && (
        <section className="mx-auto mt-16 max-w-3xl space-y-8">
          <div>
            <h2 className="editorial-heading text-xl font-normal">
              More in {sectionName}
            </h2>
            <div className="section-divider mt-4" />
          </div>
          <div className="grid gap-10 sm:grid-cols-2">
            {relatedPosts.slice(0, 2).map((post) => (
              <Article key={post._id.toString()} article={post} variant="compact" />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default PostInfoPage;
