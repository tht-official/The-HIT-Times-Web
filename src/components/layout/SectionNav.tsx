"use client";

import { dropdownsToSections } from "@/components/weekly-portion/WeeklyPortion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = Object.entries(dropdownsToSections).map(([code, name]) => ({
  code,
  name,
  href: `/posts/category/${code}`,
}));

export function SectionNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn("space-y-1", className)} aria-label="Editorial sections">
      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Sections
      </p>
      <ul className="space-y-1">
        {sections.map(({ code, name, href }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");

          return (
            <li key={code}>
              <Link
                href={href}
                className={cn(
                  "nav-editorial block py-1.5 text-sm",
                  isActive && "nav-editorial-active"
                )}
              >
                {name}
                {isActive && "."}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function SectionNavMobile() {
  const pathname = usePathname();

  return (
    <div className="sticky top-14 z-20 -mx-5 border-b border-border bg-background/98 px-5 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:hidden">
      <nav
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto scrollbar-none"
        aria-label="Editorial sections"
      >
        {sections.map(({ code, name, href }) => {
          const isActive = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={code}
              href={href}
              className={cn(
                "snap-start shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-colors",
                isActive
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground active:bg-accent active:text-foreground"
              )}
            >
              {name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
