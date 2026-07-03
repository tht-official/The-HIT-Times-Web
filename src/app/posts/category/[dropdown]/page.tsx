"use client";

import { Posts } from "@/models/Post";
import { useEffect, useState, useCallback } from "react";
import { dropdownsToSections } from "@/components/weekly-portion/WeeklyPortion";
import Article from "@/components/weekly-portion/Article";
import { BrandLoader } from "@/components/common/loader/Loaders";

export default function CategoryPage({
  params,
}: {
  params: { dropdown: string };
}) {
  const PAGE_LIMIT = 30;
  const [posts, setPosts] = useState<Posts[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadmore, setLoadmore] = useState(true);
  const [page, setPage] = useState(1);

  const getData = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `/api/v1/posts?limit=${PAGE_LIMIT}&page=${page}&dropdown=${params.dropdown}`
    );
    const data = await response.json();
    const testData = data.map((post: Posts) => ({
      ...post,
      link: post.link?.startsWith("http")
        ? post.link
        : "https://placehold.co/600x400.png",
    }));

    if (data.length < PAGE_LIMIT) setLoadmore(false);
    setPosts((prev) => (page === 1 ? testData : [...prev, ...testData]));
    setLoading(false);
  }, [page, params.dropdown]);

  useEffect(() => {
    getData();
  }, [getData]);

  const pageTitle = dropdownsToSections[params.dropdown] ?? "Articles";

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <h1 className="editorial-heading text-3xl font-normal sm:text-4xl lg:text-5xl">
          {pageTitle}
        </h1>
        <div className="section-divider" />
      </header>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-8">
        {posts.map((post) => (
          <Article key={post._id.toString()} article={post} />
        ))}
      </div>

      {loading && page === 1 && <BrandLoader variant="inline" />}

      {loadmore && !loading && (
        <div className="flex justify-center pt-6">
          <button
            onClick={() => setPage((p) => p + 1)}
            className="btn-pill-ghost min-w-[10rem] sm:min-w-0"
          >
            Load more
          </button>
        </div>
      )}
    </div>
  );
}
