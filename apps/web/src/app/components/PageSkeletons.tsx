import { useState, useEffect } from "react";
import { Skeleton } from "./ui/skeleton";

/**
 * Hook to simulate page loading for the requested skeletal experience
 */
export function usePageLoading(delay = 1000) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return loading;
}

/**
 * Collection of skeletons for different page types
 */
export const PageSkeletons = {
  Home: () => (
    <div className="w-full max-w-md mx-auto px-6 pt-16 space-y-10 min-h-screen bg-white">
      <div className="flex justify-between items-center mb-10 pt-8">
        <Skeleton className="h-10 w-24" />
        <div className="flex gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
      <div className="space-y-4">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-4 w-64 opacity-50" />
      </div>
      <div className="bg-gray-50/50 p-6 rounded-[32px]">
        <div className="flex gap-4 mb-6">
          <Skeleton className="h-12 flex-1" />
          <Skeleton className="h-12 w-12" />
        </div>
        <Skeleton className="h-24 w-full" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
      <Skeleton className="h-48 w-full rounded-[32px]" />
    </div>
  ),

  Marketplace: () => (
    <div className="w-full max-w-md mx-auto px-6 pt-20 space-y-8 min-h-screen bg-white">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-28 rounded-xl" />
      </div>
      <Skeleton className="h-14 w-full" />
      <Skeleton className="h-40 w-full rounded-[32px]" />
      <div className="flex gap-2.5 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-10 w-28 rounded-full flex-shrink-0" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="space-y-3 bg-white p-2.5 rounded-xl border border-black/[0.04]">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="flex gap-1">
               <Skeleton className="h-3 w-3" />
               <Skeleton className="h-3 w-8" />
            </div>
            <Skeleton className="h-6 w-20" />
          </div>
        ))}
      </div>
    </div>
  ),

  Wallet: () => (
    <div className="w-full max-w-md mx-auto px-6 pt-16 space-y-10 min-h-screen bg-white">
      <div className="space-y-2 pt-8">
        <Skeleton className="h-12 w-32" />
        <Skeleton className="h-4 w-48 opacity-50" />
      </div>
      <div className="bg-[#0D1B3E] p-8 rounded-[40px] -mt-4">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-4 w-24 opacity-20" />
          <Skeleton className="h-14 w-48" />
          <div className="flex gap-3 w-full">
            <Skeleton className="h-14 flex-1" />
            <Skeleton className="h-14 flex-1" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-28 w-full" />
        <Skeleton className="h-28 w-full" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
  ),

  Profile: () => (
    <div className="w-full max-w-md mx-auto px-6 pt-20 space-y-10 min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <Skeleton className="w-28 h-28 rounded-full" />
          <Skeleton className="w-10 h-10 rounded-full absolute bottom-0 right-0 border-4 border-white" />
        </div>
        <div className="text-center space-y-2">
          <Skeleton className="h-10 w-48 mx-auto" />
          <Skeleton className="h-5 w-32 mx-auto opacity-50" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  ),

  Product: () => (
    <div className="w-full max-w-md mx-auto space-y-6 min-h-screen bg-white">
      <Skeleton className="aspect-square w-full rounded-none" />
      <div className="px-6 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-24 rounded-xl" />
        </div>
        <Skeleton className="h-20 w-full" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-14 w-full rounded-full mt-10" />
      </div>
    </div>
  ),

  Generic: () => (
    <div className="w-full max-w-md mx-auto px-6 pt-20 space-y-8 min-h-screen bg-white">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-10 w-40" />
      </div>
      <Skeleton className="h-48 w-full rounded-[32px]" />
      <div className="space-y-4">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    </div>
  ),
};
