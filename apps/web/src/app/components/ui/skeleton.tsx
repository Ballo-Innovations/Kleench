import { cn } from "./utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-[var(--app-text-alt)]/[0.05] dark:bg-[var(--app-bg)]/[0.05] backdrop-blur-sm animate-pulse rounded-2xl relative overflow-hidden",
        "after:absolute after:inset-0 after:animate-shimmer-slide after:bg-gradient-to-r after:from-transparent after:via-white/[0.2] after:to-transparent",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
