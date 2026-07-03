"use client";

import { SectionNavMobile } from "@/components/layout/SectionNav";
import { usePathname } from "next/navigation";

export function PostsLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSections = pathname.startsWith("/posts/category");

  return (
    <div className="space-y-6">
      {showSections && <SectionNavMobile />}
      {children}
    </div>
  );
}
