import React from "react";
import { Posts } from "@/models/Post";
import Link from "next/link";
import Article from "./Article";
import { ArrowRight } from "lucide-react";

export interface ArticleSectionProps {
  heading: string;
  showAllLink: string;
  articles: Posts[];
}

const ArticleSection: React.FC<ArticleSectionProps> = ({
  heading,
  articles,
  showAllLink,
}) => {
  if (articles.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <h2 className="editorial-heading text-2xl font-normal sm:text-3xl">
          {heading}
        </h2>
        <Link
          href={showAllLink ?? ""}
          className="flex shrink-0 items-center gap-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div className="section-divider" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-border">
        {articles.map((article) => (
          <Article
            key={article._id.toString()}
            article={article}
            className="lg:px-6 first:lg:pl-0 last:lg:pr-0"
          />
        ))}
      </div>
    </section>
  );
};

export default ArticleSection;
