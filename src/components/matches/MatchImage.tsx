"use client";

import { resolveImageUrl } from "@/lib/imageUtils";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function MatchImage({
  src,
  alt,
  className,
  fallback,
  size = 500,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);
  const resolved = resolveImageUrl(src, size);

  if (!resolved || failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-muted text-muted-foreground",
          className
        )}
        aria-hidden={!alt}
      >
        {fallback ?? (
          <span className="text-[10px] font-medium uppercase">?</span>
        )}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={resolved}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
