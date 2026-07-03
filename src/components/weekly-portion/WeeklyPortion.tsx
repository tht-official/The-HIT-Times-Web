"use client";

import { Posts } from "@/models/Post";
import React, { useEffect, useState } from "react";
import ArticleSection, { ArticleSectionProps } from "./ArticleSection";
import Article from "./Article";
import { BrandLoader } from "@/components/common/loader/Loaders";

export const dropdownsToSections: { [key: string]: string } = {
  "00": "Monday Hues",
  "01": "Campus Raid",
  "02": "Thursday Article",
  "03": "Funny Friday",
  "04": "Viral Corner",
  "05": "Word Worth Millions",
  "06": "College Heracles",
  "07": "Nanotips",
  "08": "Vernacular",
  "09": "Gazette",
  "10": "Reportopolis",
};

const fetchArticles = async (): Promise<ArticleSectionProps[]> => {
  const dropdowns = Object.keys(dropdownsToSections);
  const sections = await Promise.all(
    dropdowns.map(async (dropdown) => {
      try {
        const response = await fetch(
          `/api/v1/posts?dropdown=${dropdown}&limit=3`
        );
        if (!response.ok) {
          return {
            heading: dropdownsToSections[dropdown],
            articles: [],
            showAllLink: `/posts/category/${dropdown}`,
          };
        }
        const articles: Posts[] = await response.json();
        if (!Array.isArray(articles)) {
          return {
            heading: dropdownsToSections[dropdown],
            articles: [],
            showAllLink: `/posts/category/${dropdown}`,
          };
        }
        const validArticles = articles.filter(
          (article) => article.link && article.link.startsWith("http")
        );
        return {
          heading: dropdownsToSections[dropdown],
          articles: validArticles,
          showAllLink: `/posts/category/${dropdown}`,
        };
      } catch {
        return {
          heading: dropdownsToSections[dropdown],
          articles: [],
          showAllLink: `/posts/category/${dropdown}`,
        };
      }
    })
  );
  return sections.filter((s) => s.articles.length > 0);
};

const WeeklyPortion: React.FC = () => {
  const [sections, setSections] = useState<ArticleSectionProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles().then((data) => {
      setSections(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <BrandLoader variant="inline" />;
  }

  if (sections.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        No stories loaded.
      </p>
    );
  }

  const [first, ...rest] = sections;

  return (
    <div className="space-y-12 sm:space-y-16">
      {first && first.articles.length > 0 && (
        <div className="grid grid-cols-1 gap-8 border-b border-border pb-10 sm:gap-10 sm:pb-12 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-border">
          <Article article={first.articles[0]} className="lg:pr-12" />
          <div className="flex flex-col justify-center gap-10 pl-0 lg:pl-12">
            {first.articles.slice(1, 3).map((article) => (
              <Article key={article._id.toString()} article={article} variant="compact" />
            ))}
          </div>
        </div>
      )}

      {rest.map((section) => (
        <div key={section.heading} className="border-t border-border pt-10 sm:pt-16">
          <ArticleSection
            heading={section.heading}
            articles={section.articles}
            showAllLink={section.showAllLink}
          />
        </div>
      ))}
    </div>
  );
};

export default WeeklyPortion;
