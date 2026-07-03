import { Posts } from "@/models/Post";
import Link from "next/link";
import ArticleImage from "./ArticleImage";
import { dropdownsToSections } from "./WeeklyPortion";
import { cn } from "@/lib/utils";

function readTime(html: string) {
  const words = html.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export default function Article({
  article,
  variant = "card",
  className,
}: {
  article: Posts;
  variant?: "card" | "compact";
  className?: string;
}) {
  const tag = dropdownsToSections[article.dropdown] ?? "Story";
  const mins = readTime(article.htmlBody ?? article.body ?? "");

  if (variant === "compact") {
    return (
      <Link
        href={`/posts/${article._id}`}
        className={cn(
          "group flex h-full flex-col p-1 transition-opacity duration-200 hover:opacity-80",
          className
        )}
      >
        <span className="tag-editorial mb-3">{tag}</span>
        <h3 className="editorial-heading line-clamp-3 text-xl font-normal leading-snug">
          {article.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {article.description}
        </p>
        <span className="mt-auto pt-4 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {mins}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/posts/${article._id}`}
      className={cn(
        "group flex h-full flex-col transition-opacity duration-200 hover:opacity-90",
        className
      )}
    >
      <div className="overflow-hidden">
        <ArticleImage
          src={article.link}
          alt={article.title}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          width={500}
          height={500}
        />
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <span className="tag-editorial mb-2">{tag}</span>
        <h3 className="editorial-heading line-clamp-2 text-lg font-normal leading-snug">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
          {article.description}
        </p>
        <span className="mt-3 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          {mins}
        </span>
      </div>
    </Link>
  );
}
