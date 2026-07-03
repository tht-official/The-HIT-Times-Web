"use client";

import RealtedPostIcons from "@/components/post-components/realtedPostIcons";
import { BrandLoader } from "@/components/common/loader/Loaders";
import { dropdownsToSections } from "@/components/weekly-portion/WeeklyPortion";
import { codeToTeamName } from "@/lib/codeToTeamName";
import { MatchPosts } from "@/models/Match";
import { Posts } from "@/models/Post";
import { ArrowRight, Radio } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ArticleImage from "../weekly-portion/ArticleImage";

const HeroSection = () => {
  const [post, setPost] = useState<Posts | null>(null);
  const [liveMatch, setLiveMatch] = useState<MatchPosts | null>(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState({ noticeTitle: "", noticeLink: "" });
  const [isNoticeEmpty, setNoticeEmpty] = useState(true);

  const getTeamLabel = (code: string, name?: string) =>
    codeToTeamName[code] || name || code;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const [featuredRes, noticeRes, liveMatchRes] = await Promise.all([
          fetch("/api/v1/posts/featured"),
          fetch("/api/v1/notice"),
          fetch("/api/v1/live/match?limit=1&page=1"),
        ]);

        if (featuredRes.ok) setPost(await featuredRes.json());
        if (noticeRes.ok) {
          let noticeData = await noticeRes.json();
          noticeData = noticeData.reverse();
          if (noticeData.length > 0) {
            setNotice(noticeData[0]);
            setNoticeEmpty(false);
          }
        }
        if (liveMatchRes.ok) {
          const liveData = await liveMatchRes.json();
          const live = Array.isArray(liveData?.data)
            ? liveData.data.find((m: MatchPosts) => m.is_live)
            : null;
          setLiveMatch(live || null);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  if (loading) {
    return (
      <div className="flex aspect-[21/9] min-h-[280px] items-center justify-center sm:min-h-[360px]">
        <BrandLoader variant="compact" />
      </div>
    );
  }

  if (!post && !liveMatch) {
    return (
      <p className="py-16 text-center text-sm text-muted-foreground">
        Unable to load featured content.
      </p>
    );
  }

  if (liveMatch) {
    return (
      <section className="space-y-8 py-4">
        <div className="mb-6 flex items-center gap-3">
          <span className="tag-editorial flex items-center gap-1.5 text-foreground">
            <Radio className="h-3 w-3" />
            Live
          </span>
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {liveMatch.match_type}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center sm:gap-4">
          <div className="min-w-0">
            <p className="mb-1 truncate text-[10px] uppercase tracking-widest text-muted-foreground">
              {getTeamLabel(liveMatch.team1.team_code, liveMatch.team1.team_name)}
            </p>
            <p className="font-serif text-3xl tabular-nums sm:text-4xl lg:text-5xl">
              {liveMatch.team1.team_score || "0"}
            </p>
          </div>
          <div className="flex min-w-0 flex-col justify-center px-1">
            <p className="text-xs text-muted-foreground">{liveMatch.match_status || "Live"}</p>
          </div>
          <div className="min-w-0">
            <p className="mb-1 truncate text-[10px] uppercase tracking-widest text-muted-foreground">
              {getTeamLabel(liveMatch.team2.team_code, liveMatch.team2.team_name)}
            </p>
            <p className="font-serif text-3xl tabular-nums sm:text-4xl lg:text-5xl">
              {liveMatch.team2.team_score || "0"}
            </p>
          </div>
        </div>
        <div className="btn-row mt-8">
          <Link href={`/matches/${liveMatch.firebase_match_id}`} className="btn-pill">
            View match <ArrowRight />
          </Link>
          <Link href="/matches" className="btn-pill-ghost">
            All matches
          </Link>
        </div>
      </section>
    );
  }

  if (!post) return null;

  const sectionName = dropdownsToSections[post.dropdown] ?? "Featured";
  const readMins = Math.max(
    1,
    Math.ceil((post.htmlBody ?? post.body ?? "").split(/\s+/).filter(Boolean).length / 200)
  );

  return (
    <section className="space-y-5 sm:space-y-6">
      <div className="mobile-bleed overflow-hidden sm:relative sm:left-auto sm:w-full sm:max-w-none sm:translate-x-0 sm:rounded-sm">
        <Link href={`/posts/${post._id}`} className="group block">
          <div className="relative aspect-[4/5] min-h-[300px] w-full sm:aspect-[21/9] sm:min-h-[360px]">
            <ArticleImage
              height={900}
              width={1600}
              quality={90}
              src={post.link}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
            <div className="hero-gradient absolute inset-0" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 lg:p-10">
              <div className="mb-4 flex items-center justify-between gap-4">
                <span className="tag-editorial">{sectionName}</span>
                <RealtedPostIcons post={post} />
              </div>
              <h1 className="editorial-heading max-w-4xl text-balance text-2xl font-normal leading-[1.1] sm:text-4xl lg:text-5xl xl:text-6xl">
                {post.title}
              </h1>
              <p className="mt-4 max-w-2xl line-clamp-2 text-sm leading-relaxed text-foreground/70">
                {post.description}
              </p>
              <div className="btn-row mt-6">
                <span className="btn-pill">
                  Read more <ArrowRight />
                </span>
                <span className="flex min-h-10 items-center justify-center text-[10px] uppercase tracking-[0.15em] text-muted-foreground sm:min-h-11 sm:w-auto sm:justify-start">
                  {readMins} min read
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {!isNoticeEmpty && (
        <div className="flex flex-col gap-3 rounded-sm border border-border bg-white/[0.03] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="flex items-start gap-3 sm:items-center">
            <span className="tag-editorial shrink-0">Notice</span>
            <p className="text-sm leading-snug">{notice.noticeTitle}</p>
          </div>
          {notice.noticeLink && (
            <Link href={notice.noticeLink} className="btn-pill-ghost w-full sm:w-auto">
              Learn more
            </Link>
          )}
        </div>
      )}
    </section>
  );
};

export default HeroSection;
