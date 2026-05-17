"use client";

import { cn } from "@/lib/utils";
import { useInView } from "motion/react";
import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type LazyImageProps = {
  alt: string;
  src: string;
  className?: string;
  containerClassName?: string;
  fallback?: string;
  ratio: number;
  inView?: boolean;
};

export function LazyImage({
  alt,
  src,
  ratio,
  fallback,
  inView = false,
  className,
  containerClassName,
}: LazyImageProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const [errorSrc, setErrorSrc] = React.useState<string | undefined>();
  const [isLoading, setIsLoading] = React.useState(true);

  const shouldShow = !inView || isInView;
  const imgSrc = errorSrc ?? (shouldShow ? src : undefined);

  const handleError = () => {
    if (fallback) {
      setErrorSrc(fallback);
    }
    setIsLoading(false);
  };

  const handleLoad = React.useCallback(() => {
    setIsLoading(false);
  }, []);

  const setImgRef = React.useCallback(
    (el: HTMLImageElement | null) => {
      if (el?.complete) {
        handleLoad();
      }
    },
    [handleLoad]
  );

  return (
    <AspectRatio
      className={cn(
        "relative size-full overflow-hidden border bg-accent/30",
        containerClassName
      )}
      ratio={ratio}
      ref={ref}
    >
      {imgSrc && (
        // eslint-disable-next-line @next/next/no-img-element -- lazy reveal with motion inView
        <img
          alt={alt}
          className={cn(
            "size-full transform-gpu object-cover transition-opacity duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          decoding="async"
          fetchPriority={inView ? "high" : "low"}
          loading="lazy"
          onError={handleError}
          onLoad={handleLoad}
          ref={setImgRef}
          role="presentation"
          src={imgSrc}
        />
      )}
    </AspectRatio>
  );
}
