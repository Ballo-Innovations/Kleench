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
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans overflow-x-hidden pt-6">
      <div className="px-5 space-y-8">
        {/* Reels Carousel Skeleton (Standardized w-160 h-260) */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-40 opacity-20" />
            <div className="flex-1 h-[2px] bg-gray-100" />
          </div>
          <div className="flex gap-4 overflow-hidden -mx-5 px-5">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="flex-shrink-0 w-[160px] h-[260px] border-2 border-[#003366]/10 shadow-[4px_4px_0px_#f0f0f0]" />
            ))}
          </div>
        </div>

        {/* Primary Actions Skeleton (2 Cols) */}
        <div className="grid grid-cols-2 gap-3">
           <Skeleton className="h-20 border-2 border-[#003366]/10 shadow-[4px_4px_0px_#f0f0f0]" />
           <Skeleton className="h-20 border-2 border-[#003366]/10 shadow-[4px_4px_0px_#f0f0f0]" />
        </div>

        {/* Rat Trap Feed Skeleton (Vertical Large Cards) */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-32 opacity-20" />
            <div className="flex-1 h-[2px] bg-gray-100" />
          </div>
          {[1, 2].map(i => (
            <div key={i} className="border-2 border-[#003366]/10 shadow-[5px_5px_0px_#f0f0f0] overflow-hidden">
               <Skeleton className="aspect-[16/9] w-full" />
               <div className="p-4 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-1/2 opacity-50" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  Wallet: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-6">
      <div className="px-5 space-y-8">
        {/* Digital Wallet Card Skeleton */}
        <div className="bg-[#003366] border-2 border-[#003366] p-5 shadow-[5px_5px_0px_#003366] space-y-6">
           <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-24 bg-white/20" />
              <Skeleton className="h-4 w-12 bg-white/10 rounded-full" />
           </div>
           <Skeleton className="h-8 w-40 bg-white/40" />
           <Skeleton className="h-4 w-28 bg-white/10 rounded-full" />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 pt-2">
           {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col items-center gap-2">
                 <Skeleton className="w-11 h-11 rounded-full border-2 border-[#003366]/20 shadow-[2px_2px_0px_#f0f0f0]" />
                 <Skeleton className="h-2 w-10 opacity-30" />
              </div>
           ))}
        </div>

        {/* Destinations Skeleton */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center gap-3">
             <Skeleton className="h-4 w-40 opacity-20" />
             <div className="flex-1 h-[2px] bg-gray-100" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white border-2 border-[#003366]/10 shadow-[3px_3px_0px_#f0f0f0]">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-11 h-11 border-2 border-[#003366]/10" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24 opacity-40" />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   <Skeleton className="h-4 w-12" />
                   <Skeleton className="w-5 h-5 rounded-full opacity-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ),

  Marketplace: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-6">
      <div className="px-5 space-y-4">
        {/* Category Chips */}
        <div className="flex gap-2 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-24 border-2 border-[#003366]/10 flex-shrink-0" />
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-5 pt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border-2 border-[#003366]/10 p-4 shadow-[6px_6px_0px_#f0f0f0]">
              <Skeleton className="aspect-square w-full mb-4" />
              <div className="space-y-2">
                 <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-5 w-1/2 opacity-60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),

  Discover: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-6">
      <div className="px-5 space-y-8 relative z-10">
         {[1, 2].map(i => (
           <div key={i} className="border-2 border-[#003366]/10 bg-white p-6 shadow-[8px_8px_0px_#f0f0f0] space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32 opacity-30" />
                <Skeleton className="h-8 w-8" />
              </div>
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-14 w-full opacity-40" />
              <Skeleton className="h-12 w-full border-2 border-[#003366]/10" />
           </div>
         ))}
      </div>
    </div>
  ),

  Academy: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pb-28 pt-6">
      <div className="px-5 space-y-10">
        {/* Progress Ledger */}
        <div className="bg-white border-2 border-[#003366]/10 p-6 shadow-[6px_6px_0px_#f0f0f0] space-y-6">
           <div className="flex justify-between items-start">
              <div className="space-y-2">
                 <Skeleton className="h-3 w-24 opacity-30" />
                 <Skeleton className="h-6 w-56" />
              </div>
              <Skeleton className="h-10 w-10 border-2 border-[#003366]/10" />
           </div>
           <div className="space-y-2">
              <div className="flex justify-between"><Skeleton className="h-3 w-32" /><Skeleton className="h-3 w-16" /></div>
              <Skeleton className="h-2 w-full bg-gray-100" />
           </div>
           <Skeleton className="h-14 w-full shadow-[4px_4px_0px_#f0f0f0] border-2 border-[#003366]/10" />
        </div>

        {/* Horizontal Reels */}
        <div className="space-y-4">
           <div className="flex items-center gap-3"><Skeleton className="h-4 w-32 opacity-20" /><div className="flex-1 h-[2px] bg-gray-100" /></div>
           <div className="flex gap-4 overflow-hidden -mx-5 px-5">
              {[1, 2, 3].map(i => (
                <Skeleton key={i} className="flex-shrink-0 w-[140px] aspect-[9/16] border-2 border-[#003366]/10 shadow-[4px_4px_0px_#f0f0f0]" />
              ))}
           </div>
        </div>

        {/* Course Cards (Skill Hub) */}
        <div className="space-y-6">
           <div className="flex items-center gap-3"><Skeleton className="h-4 w-24 opacity-20" /><div className="flex-1 h-[2px] bg-gray-100" /></div>
           {[1, 2].map(i => (
             <div key={i} className="flex h-32 border-2 border-[#003366]/10 shadow-[6px_6px_0px_#f0f0f0]">
                <Skeleton className="w-24 h-full" />
                <div className="p-4 flex-1 space-y-4">
                   <div className="space-y-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-3 w-1/2 opacity-50" /></div>
                   <div className="flex justify-between items-center"><Skeleton className="h-4 w-20" /><Skeleton className="h-4 w-24 opacity-40" /></div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  ),

  Product: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white font-sans overflow-x-hidden pb-32">
      {/* 530px Hero Gallery Skeleton */}
      <Skeleton className="w-full h-[530px] rounded-0" />
      
      <div className="px-6 -mt-20 relative z-30 space-y-10">
        {/* Trust Validation Panel (Rounded) */}
        <div className="flex items-center justify-between p-6 bg-gray-50 rounded-full border-2 border-[#003366]/5 shadow-sm">
           <div className="flex items-center gap-4">
              <Skeleton className="w-14 h-14 rounded-full border-2 border-white" />
              <div className="space-y-2">
                 <Skeleton className="h-5 w-32" />
                 <Skeleton className="h-3 w-40 opacity-50" />
              </div>
           </div>
           <Skeleton className="h-10 w-20 opacity-40" />
        </div>

        {/* Info Section */}
        <div className="space-y-6">
           <Skeleton className="h-10 w-3/4" />
           <div className="space-y-3">
              <Skeleton className="h-4 w-full opacity-60" />
              <Skeleton className="h-4 w-full opacity-60" />
              <Skeleton className="h-4 w-2/3 opacity-40" />
           </div>
        </div>

        {/* Bento Grid Stats */}
        <div className="grid grid-cols-2 gap-4">
           <Skeleton className="h-28 rounded-[2rem] border-2 border-[#003366]/5" />
           <Skeleton className="h-28 rounded-[2rem] border-2 border-[#003366]/5" />
        </div>

        {/* Share & Earn CTA */}
        <Skeleton className="h-16 w-full rounded-full shadow-[6px_6px_0px_#f0f0f0]" />
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full p-6 pb-8">
         <Skeleton className="h-16 w-full rounded-full shadow-lg" />
      </div>
    </div>
  ),

  AcademyDetail: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-white font-sans">
      <Skeleton className="aspect-video w-full border-b-2 border-[#003366]/10" />
      <div className="px-6 mt-8 space-y-8">
        <div className="space-y-3">
          <Skeleton className="h-8 w-3/4" />
          <div className="flex gap-4"><Skeleton className="h-4 w-24" /><Skeleton className="h-4 w-24" /></div>
        </div>
        <div className="p-6 border-2 border-[#003366]/10 shadow-[6px_6px_0px_#f0f0f0] space-y-4">
           <Skeleton className="h-10 w-1/3" />
           <div className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-2/3" /></div>
        </div>
        <div className="space-y-4">
           {[1, 2, 3].map(i => (
             <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 border-2 border-[#003366]/5">
                <Skeleton className="h-10 w-10 flex-shrink-0" />
                <div className="flex-1 space-y-2"><Skeleton className="h-4 w-2/3" /><Skeleton className="h-3 w-1/4 opacity-50" /></div>
             </div>
           ))}
        </div>
      </div>
    </div>
  ),

  Profile: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-6">
      <div className="px-5 space-y-8">
         {/* Industrial Ledger Box */}
         <div className="border-2 border-[#003366]/10 p-7 shadow-[8px_8px_0px_#f0f0f0] space-y-8">
            <Skeleton className="h-16 w-full opacity-40" />
            <div className="space-y-3">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex justify-between p-4 border-2 border-[#003366]/10 items-center">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-6 w-12 opacity-50" />
                 </div>
               ))}
            </div>
            <div className="flex gap-4">
               <Skeleton className="h-14 flex-1 border-2 border-[#003366]/10" />
               <Skeleton className="h-14 flex-1 border-2 border-[#003366]/10" />
            </div>
         </div>

         {/* Tabs Section */}
         <div className="flex h-14 bg-gray-100 border-2 border-[#003366]/10">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="flex-1 h-full bg-white/80 border border-gray-100" />
            ))}
         </div>

         {/* Reels Grid */}
         <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="aspect-[9/14] border-2 border-[#003366]/10 shadow-[4px_4px_0px_#f0f0f0]" />
            ))}
         </div>
      </div>
    </div>
  ),

  Social: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-6">
      <div className="px-5 space-y-10">
        {/* Pending Requests Section */}
        <div className="space-y-4">
           <div className="flex justify-between items-center"><Skeleton className="h-4 w-32 opacity-20" /><Skeleton className="h-4 w-20" /></div>
           <div className="bg-white border-2 border-[#003366]/10 p-4 flex items-center justify-between shadow-[6px_6px_0px_#f0f0f0]">
              <div className="flex items-center gap-4">
                 <Skeleton className="w-12 h-12 border-2 border-[#003366]/10" />
                 <div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-32 opacity-50" /></div>
              </div>
              <div className="flex gap-2"><Skeleton className="h-10 w-10" /><Skeleton className="h-10 w-10" /></div>
           </div>
        </div>

        {/* Active Circle Section */}
        <div className="space-y-4">
           <div className="flex items-center gap-3"><Skeleton className="h-4 w-24 opacity-20" /><div className="flex-1 h-[2px] bg-gray-100" /></div>
           <div className="border-2 border-[#003366]/10 divide-y-2 divide-gray-100 shadow-[6px_6px_0px_#f0f0f0]">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-4 flex justify-between items-center bg-white">
                   <div className="flex items-center gap-4">
                      <Skeleton className="w-12 h-12 rounded-0 border-2 border-[#003366]/10" />
                      <div className="space-y-2"><Skeleton className="h-4 w-32" /><Skeleton className="h-3 w-20 opacity-50" /></div>
                   </div>
                   <div className="flex gap-2"><Skeleton className="h-9 w-9 rounded-xl" /><Skeleton className="h-9 w-9 rounded-xl opacity-40" /></div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  ),

  Generic: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-6">
      <div className="px-6 space-y-8">
        <Skeleton className="h-56 w-full border-2 border-[#003366]/10 shadow-[6px_6px_0px_#f0f0f0]" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-4 p-4 border-2 border-[#003366]/5">
               <Skeleton className="h-12 w-12 rounded-xl" />
               <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2 opacity-50" />
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
