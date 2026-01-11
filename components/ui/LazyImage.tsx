"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

interface LazyImageProps extends Omit<ImageProps, "onLoad" | "onError"> {
  containerClassName?: string;
  wrapperAspectRatio?: string; // e.g., "aspect-square"
}

export default function LazyImage({
  src,
  alt,
  className,
  containerClassName,
  wrapperAspectRatio = "aspect-square",
  priority = false, // Default to lazy
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Simple blur placeholder (base64 gray pixel)
  const blurDataURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gray-100",
        wrapperAspectRatio,
        containerClassName,
      )}
    >
      {!isError ? (
        <Image
          src={src}
          alt={alt}
          className={cn(
            "duration-700 ease-in-out object-cover w-full h-full",
            isLoading
              ? "scale-110 blur-xl grayscale"
              : "scale-100 blur-0 grayscale-0",
            className,
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setIsError(true);
          }}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          placeholder="blur"
          blurDataURL={blurDataURL}
          fill={props.width || props.height ? false : true} // If width/height not provided, use fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          {...props}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
          <ImageOff size={24} className="mb-2 opacity-50" />
          <span className="text-xs">Image not found</span>
        </div>
      )}

      {/* Skeleton Shimmer (Visible only when loading) */}
      {isLoading && (
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 z-10" />
      )}
    </div>
  );
}
