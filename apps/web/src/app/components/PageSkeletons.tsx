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
    <div className="w-full max-w-md mx-auto min-h-screen bg-white font-[var(--font-body)]">
      {/* Tall PageHeader Skeleton */}
      <div className="h-[200px] w-full bg-[#FF8C00] relative overflow-hidden flex flex-col justify-between p-6">
        <div className="flex justify-between">
           <Skeleton className="h-10 w-10 bg-white/20 border border-white/10" />
           <div className="flex gap-2">
              <Skeleton className="h-10 w-10 bg-white/20 border border-white/10" />
              <Skeleton className="h-10 w-10 bg-white/20 border border-white/10" />
              <Skeleton className="h-10 w-10 bg-white/20 border border-white/10" />
           </div>
        </div>
        <div className="space-y-2 mb-4">
           <Skeleton className="h-4 w-32 bg-white/20" />
           <Skeleton className="h-12 w-64 bg-white/40" />
        </div>
      </div>
      
      <div className="px-5 mt-4 space-y-6">
        {/* Action Ledger Skeleton (Kleench Style) */}
        <div className="grid grid-cols-3 border-2 border-[#003366] divide-x-2 divide-[#003366] bg-white shadow-[4px_4px_0px_#003366]">
           {[1, 2, 3].map(i => (
             <div key={i} className="p-4 flex flex-col items-center gap-2">
                <Skeleton className="h-6 w-6" />
                <Skeleton className="h-3 w-12" />
             </div>
           ))}
        </div>

        {/* Earn Today Header */}
        <div className="flex items-center gap-2">
           <Skeleton className="h-8 w-40" />
        </div>

        {/* Action Cards (Industrial Style) */}
        <div className="space-y-4">
           {[1, 2, 3].map(i => (
             <div key={i} className="flex items-center gap-4 p-4 border-2 border-[#003366] shadow-[4px_4px_0px_#003366]">
                <Skeleton className="h-12 w-12" />
                <div className="flex-1 space-y-2">
                   <Skeleton className="h-4 w-1/2" />
                   <Skeleton className="h-3 w-3/4" />
                </div>
                <Skeleton className="h-10 w-10" />
             </div>
           ))}
        </div>
      </div>
    </div>
  ),

  Marketplace: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white">
      {/* Marketplace Header */}
      <div className="h-[180px] w-full bg-[#FF8C00] p-6 flex flex-col justify-end">
         <Skeleton className="h-12 w-64 bg-white/30" />
      </div>
      
      <div className="px-5 mt-6 space-y-6">
        <Skeleton className="h-14 w-full border-2 border-[#003366]" />
        
        {/* Category Chips (Sharp) */}
        <div className="flex gap-2 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-24 border-2 border-[#003366] flex-shrink-0" />
          ))}
        </div>

        {/* Shop Grid (High Contrast Offset Cards) */}
        <div className="grid grid-cols-2 gap-5 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border-2 border-[#003366] p-4 shadow-[6px_6px_0px_#003366]">
              <Skeleton className="aspect-square w-full mb-4" />
              <div className="space-y-2">
                 <Skeleton className="h-4 w-3/4" />
                 <Skeleton className="h-6 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  Wallet: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white">
      {/* Wallet PageHeader */}
      <div className="h-[200px] w-full bg-[#FF8C00] p-6 flex flex-col justify-end">
         <Skeleton className="h-12 w-48 bg-white/30" />
      </div>

      <div className="px-5 mt-6 space-y-8">
        {/* Giant Swiss Balance Card */}
        <div className="bg-white border-2 border-[#003366] p-8 shadow-[8px_8px_0px_#FF8C00] text-center space-y-4">
           <Skeleton className="h-4 w-24 mx-auto" />
           <Skeleton className="h-14 w-48 mx-auto" />
           <div className="flex gap-4">
              <Skeleton className="h-14 flex-1 border-2 border-[#003366]" />
              <Skeleton className="h-14 flex-1 border-2 border-[#003366]" />
           </div>
        </div>

        {/* Transaction Ledger (Industrial Borders) */}
        <div className="space-y-4 pt-4">
          <Skeleton className="h-8 w-40" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-2 border-[#003366]/10">
               <Skeleton className="h-12 w-12" />
               <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/2 opacity-50" />
               </div>
               <Skeleton className="h-6 w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  Profile: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white">
      {/* Profile PageHeader Skeleton */}
      <div className="h-[220px] bg-[#FF8C00] p-6 relative flex flex-col justify-end">
         <div className="flex items-center gap-6 mb-4">
            <Skeleton className="w-24 h-24 border-4 border-white bg-white/20" />
            <div className="space-y-2 flex-1">
               <Skeleton className="h-10 w-48 bg-white/40" />
               <Skeleton className="h-4 w-32 bg-white/20" />
            </div>
         </div>
      </div>

      <div className="px-5 mt-6 space-y-8">
         {/* Industrial Ledger Box */}
         <div className="border-2 border-[#003366] p-7 shadow-[8px_8px_0px_#003366] space-y-6">
            <Skeleton className="h-16 w-full opacity-50" />
            <div className="space-y-2">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex justify-between p-4 border-2 border-[#003366] items-center">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-12" />
                 </div>
               ))}
            </div>
            <div className="flex gap-4">
               <Skeleton className="h-14 flex-1 border-2 border-[#003366]" />
               <Skeleton className="h-14 flex-1 border-2 border-[#003366]" />
            </div>
         </div>

         {/* Tabs Skeleton */}
         <div className="flex border-4 border-[#003366] bg-[#003366]">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="flex-1 h-12 bg-white/90 border border-[#003366]/10" />
            ))}
         </div>

         {/* Content Grid */}
         <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="aspect-[9/12] border-2 border-[#003366]" />
            ))}
         </div>
      </div>
    </div>
  ),

  Product: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white">
      <Skeleton className="aspect-square w-full border-b-2 border-[#003366]" />
      <div className="px-6 mt-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <Skeleton className="h-10 w-56" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-12 w-28 bg-[#FF8C00]/20 border-2 border-[#FF8C00]" />
        </div>
        <Skeleton className="h-32 w-full border-2 border-[#003366]/10 shadow-[4px_4px_0px_#f0f0f0]" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-28 w-full border-2 border-[#003366]/5" />
          <Skeleton className="h-28 w-full border-2 border-[#003366]/5" />
        </div>
        <Skeleton className="h-16 w-full bg-[#003366] mt-10 shadow-[6px_6px_0px_#FF8C00]" />
      </div>
    </div>
  ),

  Generic: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white">
      <div className="h-[180px] bg-[#FF8C00] p-6 flex items-end">
         <Skeleton className="h-12 w-48 bg-white/30" />
      </div>
      <div className="px-6 mt-8 space-y-6">
        <Skeleton className="h-48 w-full border-2 border-[#003366] shadow-[6px_6px_0px_#003366]" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4 p-4 border-2 border-[#003366]/5">
               <Skeleton className="h-12 w-12" />
               <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
