"use client";

import { cn } from "@/lib/utils";
import { SiteLogo } from "@/components/common/SiteLogo";

interface BrandLoaderProps {
  variant?: "page" | "inline" | "compact";
  className?: string;
}

export function BrandLoader({
  variant = "inline",
  className,
}: BrandLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 text-center",
        variant === "page" && "min-h-[50vh]",
        variant === "inline" && "py-20",
        variant === "compact" && "py-10",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      {variant === "page" && <SiteLogo className="h-7" />}
      <p
        className={cn(
          "loader-silver-text font-serif font-normal tracking-wide",
          variant === "page" && "text-2xl sm:text-3xl md:text-4xl",
          variant === "inline" && "text-xl sm:text-2xl",
          variant === "compact" && "text-base sm:text-lg"
        )}
      >
        Dare When Others Dont
      </p>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export const CircularLoader = () => <BrandLoader variant="inline" />;
