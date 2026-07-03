import Image from "next/image";
import { cn } from "@/lib/utils";

interface SiteLogoProps {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function SiteLogo({
  className,
  width = 110,
  height = 32,
  priority = false,
}: SiteLogoProps) {
  return (
    <Image
      src="/header/hit_logo_black.webp"
      alt="The HIT Times"
      width={width}
      height={height}
      className={cn("h-6 w-auto dark:invert", className)}
      priority={priority}
    />
  );
}
