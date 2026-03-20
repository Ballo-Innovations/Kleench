import React, { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import { cn } from "../ui/utils";

const ERROR_IMG_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

export function ImageWithFallback({
  src,
  alt,
  style,
  className,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      return;
    }
    
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoading(false);
    img.onerror = () => {
      setDidError(true);
      setIsLoading(false);
    };
  }, [src]);

  if (didError) {
    return (
      <div
        className={cn(
          "bg-gray-100 text-center align-middle flex items-center justify-center overflow-hidden",
          className
        )}
        style={style}
      >
        <img
          src={ERROR_IMG_SRC}
          alt="Error loading image"
          {...rest}
          className="w-1/2 h-1/2 object-contain opacity-20"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", className)} style={style}>
      {isLoading && (
        <Skeleton className="absolute inset-0 z-10 w-full h-full rounded-none" />
      )}
      <img
        src={src}
        alt={alt}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        loading="lazy"
        decoding="async"
        {...rest}
      />
    </div>
  );
}
