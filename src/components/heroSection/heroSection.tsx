"use client";

import RealtedPostIcons from "@/components/post-components/realtedPostIcons";
import { HeroSkeleton } from "@/components/weekly-portion/HomeSkeletons";
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
    return <HeroSkeleton />;
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
      <section className="content-reveal space-y-8 py-4">
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
      <div className="relative w-full overflow-hidden rounded-sm">
        <Link href={`/posts/${post._id}`} className="group block">
          <div className="relative aspect-[4/3] min-h-[260px] w-full sm:aspect-[21/9] sm:min-h-[360px]">
            <ArticleImage
              height={900}
              width={1600}
              quality={90}
              src={post.link}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
            <div className="hero-gradient absolute inset-0" />
            <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-6 lg:p-10">
              <div className="mb-2 sm:mb-4 flex items-center justify-between gap-4">
                <span className="tag-editorial !text-white/80 text-[9px] sm:text-[10px]">{sectionName}</span>
                <div className="text-white/70 [&_button]:!text-white/70 [&_button:hover]:!text-white [&_button:hover]:!bg-white/20 [&_button]:transition-all [&_button]:h-7 [&_button]:w-7 sm:[&_button]:h-8 sm:[&_button]:w-8">
                  <RealtedPostIcons post={post} />
                </div>
              </div>
              <h1 className="editorial-heading max-w-4xl text-balance text-xl sm:text-4xl lg:text-5xl xl:text-6xl !text-white font-normal leading-[1.1]">
                {post.title}
              </h1>
              <p className="mt-1.5 sm:mt-4 max-w-2xl line-clamp-2 text-[11px] sm:text-sm leading-relaxed text-white/70">
                {post.description}
              </p>
              <div className="mt-3 sm:mt-6 flex flex-row items-center gap-3 sm:gap-4">
                <span className="btn-pill !min-h-[2rem] sm:!min-h-[2.75rem] text-[9px] sm:text-xs !border-white/70 !text-white hover:!bg-white hover:!text-black">
                  Read more <ArrowRight />
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] text-white/60">
                  {readMins} min read
                </span>
              </div>
            </div>
          </div>
        </Link>
        <div className="absolute right-4 top-4 z-10 sm:right-6 sm:top-6 lg:right-10 lg:top-10">
          <RealtedPostIcons post={post} />
        </div>
      </div>

      {!isNoticeEmpty && (() => {
        const isTspNotice = notice.noticeLink === "/tsp";
        return (
          <div
            className={`relative flex flex-row items-center justify-between gap-3 rounded-sm border border-border px-4 py-4 sm:px-5 ${
              isTspNotice
                ? "bg-cover bg-center text-white"
                : "bg-muted/40 dark:bg-white/[0.03]"
            }`}
            style={
              isTspNotice
                ? { backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('/TSP26Banner.jpg')" }
                : undefined
            }
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <span className={`tag-editorial shrink-0 !text-[9px] sm:!text-[10px] ${isTspNotice ? "!text-white/90" : ""}`}>Notice</span>
              <p className={`leading-snug ${isTspNotice ? "text-xs sm:text-base font-bold text-white" : "text-sm"}`}>
                {notice.noticeTitle}
              </p>
            </div>
            {notice.noticeLink && (
              <Link
                href={notice.noticeLink}
                className={`btn-pill-ghost w-fit sm:w-auto !min-h-0 sm:!min-h-[2.5rem] !py-1 sm:!py-2 !px-2.5 sm:!px-4 !text-[9px] sm:!text-[11px] transition-all duration-300 ${
                  isTspNotice
                    ? "!bg-emerald-600 !text-white !border-none hover:!bg-emerald-500 hover:scale-105 active:scale-95"
                    : ""
                }`}
              >
                Learn more
              </Link>
            )}
          </div>
        );
      })()}
    </section>
  );
};

export default HeroSection;
