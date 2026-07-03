"use client";

import { BrandLoader } from "@/components/common/loader/Loaders";
import { useEffect } from "react";

export default function LinkedIn() {
  useEffect(() => {
    window.location.href = "https://www.linkedin.com/company/the-hit-times/";
  }, []);

  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
      <BrandLoader variant="compact" />
      <p className="text-sm text-muted-foreground">Redirecting to LinkedIn…</p>
    </div>
  );
}
