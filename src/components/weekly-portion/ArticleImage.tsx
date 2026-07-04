"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface ArticleImageProps extends ImageProps {
  src: string;
  alt: string;
  className?: string;
  width: number;
  height: number;
}

const ArticleImage: React.FC<ArticleImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative w-full overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <div className="h-full w-full animate-pulse bg-muted" />
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ExclamationCircleIcon className="h-6 w-6" />
            <p className="text-sm">Failed to load image</p>
          </div>
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        className={`transition-opacity duration-300 ${className} ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        width={width}
        height={height}
        onLoadingComplete={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        {...props}
      />
    </div>
  );
};

export default ArticleImage;
