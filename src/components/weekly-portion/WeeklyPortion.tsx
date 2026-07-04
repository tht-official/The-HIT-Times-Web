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

  return (
    <div className="space-y-12 sm:space-y-16">
      {sections.map((section, index) => (
        <div key={section.heading} className={index > 0 ? "border-t border-border pt-10 sm:pt-16" : ""}>
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
