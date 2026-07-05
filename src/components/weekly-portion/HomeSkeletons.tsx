import { Skeleton } from "@/components/ui/skeleton";

export function HeroSkeleton() {
  return (
    <section className="space-y-5 sm:space-y-6" aria-hidden>
      <div className="mobile-bleed overflow-hidden sm:relative sm:left-auto sm:w-full sm:max-w-none sm:translate-x-0 sm:rounded-sm">
        <Skeleton className="aspect-[4/5] min-h-[300px] w-full rounded-none sm:aspect-[21/9] sm:min-h-[360px]" />
      </div>
      <div className="space-y-3 px-1 sm:hidden">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </section>
  );
}

function ArticleCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Skeleton className="aspect-[4/3] w-full rounded-none" />
      <div className="space-y-3 pt-4">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function ArticleSectionSkeleton() {
  return (
    <section className="space-y-8" aria-hidden>
      <div className="flex items-end justify-between gap-4">
        <Skeleton className="h-8 w-40 sm:h-9 sm:w-48" />
        <Skeleton className="h-3 w-16" />
      </div>
      <div className="section-divider" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-border">
        <ArticleCardSkeleton className="lg:pr-6" />
        <ArticleCardSkeleton className="lg:px-6" />
        <ArticleCardSkeleton className="lg:pl-6" />
      </div>
    </section>
  );
}

export function WeeklyPortionSkeleton({ sections = 3 }: { sections?: number }) {
  return (
    <div className="space-y-12 sm:space-y-16">
      {Array.from({ length: sections }).map((_, i) => (
        <ArticleSectionSkeleton key={i} />
      ))}
    </div>
  );
}
