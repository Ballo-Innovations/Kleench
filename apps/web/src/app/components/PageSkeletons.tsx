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
 * Collection of skeletons for different page types designed in Neo-Brutalism
 */
export const PageSkeletons = {
  Home: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans overflow-x-hidden pt-6">
      <div className="px-5 space-y-8">
        {/* Reels Carousel Skeleton (Standardized w-160 h-260) */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-40 opacity-30" />
            <div className="flex-1 h-[3px] bg-[#0D1B3E]/10" />
          </div>
          <div className="flex gap-4 overflow-hidden -mx-5 px-5">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-shrink-0 w-[160px] h-[260px] border-[3px] border-[#0D1B3E] rounded-3xl shadow-[6px_6px_0px_#0D1B3E] overflow-hidden bg-white/50 relative">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-100 to-transparent opacity-40"></div>
                  <Skeleton className="w-full h-full rounded-none" />
              </div>
            ))}
          </div>
        </div>

        {/* Primary Actions Skeleton (2 Cols) */}
        <div className="grid grid-cols-2 gap-4">
           <Skeleton className="h-24 border-[3px] border-[#0D1B3E] rounded-3xl shadow-[6px_6px_0px_#0D1B3E] bg-white" />
           <Skeleton className="h-24 border-[3px] border-[#0D1B3E] rounded-3xl shadow-[6px_6px_0px_#0D1B3E] bg-white" />
        </div>

        {/* Feed Skeleton */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-32 opacity-30" />
            <div className="flex-1 h-[3px] bg-[#0D1B3E]/10" />
          </div>
          {[1, 2].map(i => (
             <div key={i} className="bg-white border-[3px] border-[#0D1B3E] rounded-3xl p-5 shadow-[6px_6px_0px_#0D1B3E] space-y-4">
               <Skeleton className="aspect-video w-full border-[2px] border-[#0D1B3E] rounded-2xl" />
               <div className="space-y-2">
                 <Skeleton className="h-5 w-3/4 rounded-md" />
                 <Skeleton className="h-3 w-1/2 rounded-md opacity-60" />
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
        <div className="bg-[#0D1B3E]/5 border-[3px] border-[#0D1B3E] rounded-[32px] p-6 shadow-[8px_8px_0px_#0D1B3E] space-y-6 relative overflow-hidden">
           {/* Abstract mesh/dots for brutalist card feeling */}
           <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#0D1B3E 2px, transparent 2px)', backgroundSize: '12px 12px' }}></div>
           <div className="relative">
             <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-3 w-24 bg-[#0D1B3E]/20" />
                <Skeleton className="h-4 w-12 bg-[#0D1B3E]/10 rounded-full" />
             </div>
             <Skeleton className="h-10 w-[70%] bg-[#0D1B3E]/30 mb-2" />
             <Skeleton className="h-4 w-32 bg-[#0D1B3E]/10 rounded-full" />
           </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="grid grid-cols-4 gap-4 pt-2">
           {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col items-center gap-2">
                 <Skeleton className="w-14 h-14 rounded-2xl border-[2px] border-[#0D1B3E] shadow-[4px_4px_0px_#0D1B3E] bg-white flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-[#0D1B3E]/10 animate-pulse" />
                 </Skeleton>
                 <Skeleton className="h-2 w-12 opacity-40 rounded-full mt-1" />
              </div>
           ))}
        </div>

        {/* Transactions Skeleton */}
        <div className="space-y-5 pt-4">
          <div className="flex items-center gap-4">
             <Skeleton className="h-4 w-40 opacity-30 bg-[#0D1B3E]/30" />
             <div className="flex-1 h-[3px] bg-[#0D1B3E]/10" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white border-[2px] border-[#0D1B3E] rounded-3xl shadow-[4px_4px_0px_#0D1B3E]">
                <div className="flex items-center gap-4">
                  <Skeleton className="w-12 h-12 rounded-xl border-2 border-[#0D1B3E] bg-[#FF8C00]/5" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28 rounded-md bg-[#0D1B3E]/20" />
                    <Skeleton className="h-3 w-20 opacity-50 rounded-md" />
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                   <Skeleton className="h-4 w-16 bg-[#0D1B3E]/30 rounded-md" />
                   <Skeleton className="h-3 w-8 rounded-full opacity-30" />
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
      <div className="px-5 space-y-6">
        {/* Category Chips */}
        <div className="flex gap-3 overflow-hidden">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-24 border-[2px] border-[#0D1B3E] shadow-[3px_3px_0px_#0D1B3E] rounded-full flex-shrink-0 bg-white" />
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-5 pt-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="border-[3px] border-[#0D1B3E] rounded-[24px] p-4 shadow-[6px_6px_0px_#0D1B3E] bg-white space-y-4">
              <Skeleton className="aspect-square w-full rounded-xl border border-[#0D1B3E]/10" />
              <div className="space-y-2">
                 <Skeleton className="h-4 w-full rounded-md" />
                 <Skeleton className="h-5 w-1/2 opacity-60 rounded-md" />
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
           <div key={i} className="bg-white border-[3px] border-[#0D1B3E] rounded-[32px] p-6 shadow-[8px_8px_0px_#0D1B3E] space-y-5">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32 opacity-40 rounded-md" />
                <Skeleton className="h-10 w-10 border-2 border-[#0D1B3E] rounded-xl shadow-[2px_2px_0px_#0D1B3E]" />
              </div>
              <Skeleton className="h-6 w-full rounded-md" />
              <Skeleton className="h-10 w-[80%] opacity-40 rounded-md" />
              <Skeleton className="h-14 w-full border-[2px] border-[#0D1B3E] rounded-2xl bg-[#0D1B3E]/5" />
           </div>
         ))}
      </div>
    </div>
  ),

  Academy: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-1 overflow-x-hidden">
      <div className="px-4 relative z-20 space-y-4">
        {/* Search Bar & Live Button */}
        <div className="flex items-center gap-3">
           <Skeleton className="flex-1 h-12 rounded-2xl border-[3px] border-[#0D1B3E] shadow-[4px_4px_0px_#0D1B3E] bg-white" />
           <Skeleton className="w-16 h-12 rounded-2xl border-[3px] border-[#0D1B3E] shadow-[4px_4px_0px_#0D1B3E] bg-white shrink-0" />
        </div>

        {/* Action Bar Skeleton */}
        <section className="px-2 pt-2">
          <div className="flex items-center justify-center gap-8 px-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col items-center justify-center gap-2">
                <Skeleton className="w-14 h-14 rounded-full border-[2px] border-[#0D1B3E] shadow-[4px_4px_0px_#0D1B3E] bg-white" />
                <Skeleton className="h-2 w-14 bg-[#0D1B3E]/20 rounded mt-0.5" />
              </div>
            ))}
          </div>
        </section>

        {/* Carousel Sections Skeleton */}
        <section className="space-y-8 pb-12 mt-4">
          {[1, 2, 3].map((postIndex) => (
            <div key={postIndex} className="space-y-4">
               <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                     <div className="flex items-center gap-2">
                       <Skeleton className="w-1.5 h-4 rounded-full bg-[#FF8C00] shrink-0" />
                       <Skeleton className="h-3 w-32 bg-[#0D1B3E]/30 rounded-md" />
                     </div>
                     <Skeleton className="h-2 w-10 bg-[#0D1B3E]/20 rounded-md" />
                  </div>
                  <div className="-mx-5 flex gap-4 overflow-hidden pb-2 pl-5 pr-5">
                     {[1, 2, 3, 4].map(cardIndex => (
                        <div key={cardIndex} className="relative flex-shrink-0 w-[112px] h-[160px] bg-white border-[2px] border-[#0D1B3E] shadow-[4px_4px_0px_#0D1B3E] rounded-xl overflow-hidden">
                           <Skeleton className="absolute inset-0" />
                           <div className="absolute inset-x-2 bottom-2">
                               <Skeleton className="h-2 w-[70%] bg-white/70 rounded-md" />
                               <Skeleton className="h-2 w-[50%] bg-white/50 mt-1 rounded-md" />
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  ),

  Product: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans overflow-x-hidden pb-32">
      <Skeleton className="w-full h-[530px] rounded-none border-b-[3px] border-[#0D1B3E]" />
      
      <div className="px-6 -mt-20 relative z-30 space-y-10">
        {/* Brutalist Validation Panel */}
        <div className="flex items-center justify-between p-6 bg-white rounded-3xl border-[3px] border-[#0D1B3E] shadow-[6px_6px_0px_#0D1B3E]">
           <div className="flex items-center gap-4">
              <Skeleton className="w-14 h-14 rounded-full border-2 border-[#0D1B3E]" />
              <div className="space-y-2">
                 <Skeleton className="h-5 w-32 rounded-md" />
                 <Skeleton className="h-3 w-24 opacity-50 rounded-md" />
              </div>
           </div>
           <Skeleton className="h-10 w-20 opacity-40 rounded-xl" />
        </div>

        <div className="space-y-6">
           <Skeleton className="h-12 w-3/4 rounded-xl" />
           <div className="space-y-3">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-[90%] rounded-md" />
              <Skeleton className="h-4 w-2/3 opacity-70 rounded-md" />
           </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
           <Skeleton className="h-32 rounded-[2rem] border-[3px] border-[#0D1B3E] bg-white shadow-[6px_6px_0px_#0D1B3E]" />
           <Skeleton className="h-32 rounded-[2rem] border-[3px] border-[#0D1B3E] bg-white shadow-[6px_6px_0px_#0D1B3E]" />
        </div>
      </div>
    </div>
  ),

  AcademyDetail: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans">
      <Skeleton className="aspect-video w-full border-b-[3px] border-[#0D1B3E] rounded-none shadow-sm" />
      <div className="px-6 mt-8 space-y-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-[90%] rounded-lg" />
          <div className="flex gap-4"><Skeleton className="h-4 w-24 rounded" /><Skeleton className="h-4 w-24 rounded" /></div>
        </div>
        <div className="p-6 bg-white border-[3px] border-[#0D1B3E] shadow-[8px_8px_0px_#0D1B3E] rounded-[32px] space-y-4">
           <Skeleton className="h-8 w-1/3 rounded-md" />
           <div className="space-y-2">
             <Skeleton className="h-4 w-full rounded" />
             <Skeleton className="h-4 w-[95%] rounded" />
             <Skeleton className="h-4 w-2/3 rounded" />
           </div>
        </div>
        <div className="space-y-4">
           {[1, 2, 3].map(i => (
             <div key={i} className="flex items-center gap-4 p-5 bg-white border-[2px] border-[#0D1B3E] rounded-[24px] shadow-[4px_4px_0px_#0D1B3E]">
                <Skeleton className="h-12 w-12 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-2"><Skeleton className="h-4 w-2/3 rounded-md" /><Skeleton className="h-3 w-1/4 opacity-50 rounded-md" /></div>
             </div>
           ))}
        </div>
      </div>
    </div>
  ),

  Profile: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-6">
      <div className="px-5 space-y-8">
         {/* Brutalist Hero Box */}
         <div className="border-[3px] border-[#0D1B3E] bg-white rounded-[32px] p-7 shadow-[8px_8px_0px_#0D1B3E] space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><Skeleton className="w-20 h-20 rounded-full" /></div>
            <Skeleton className="h-16 w-[70%] opacity-40 rounded-xl" />
            <div className="space-y-3 relative z-10">
               {[1, 2, 3].map(i => (
                 <div key={i} className="flex justify-between p-4 border-[2px] border-[#0D1B3E]/10 items-center rounded-2xl bg-slate-50/50">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <Skeleton className="h-5 w-16 opacity-50 rounded-md" />
                 </div>
               ))}
            </div>
            <div className="flex gap-4">
               <Skeleton className="h-16 flex-1 border-[2px] border-[#0D1B3E] rounded-2xl shadow-[4px_4px_0px_#0D1B3E] bg-[#FF8C00]/10" />
               <Skeleton className="h-16 flex-1 border-[2px] border-[#0D1B3E] rounded-2xl shadow-[4px_4px_0px_#0D1B3E] bg-[#00695C]/10" />
            </div>
         </div>

         <div className="flex gap-3 overflow-hidden">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-12 w-28 border-[2px] border-[#0D1B3E] shadow-[3px_3px_0px_#0D1B3E] rounded-full flex-shrink-0 bg-white" />
            ))}
         </div>

         <div className="grid grid-cols-2 gap-5">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="aspect-[9/14] border-[3px] border-[#0D1B3E] shadow-[6px_6px_0px_#0D1B3E] rounded-[24px]" />
            ))}
         </div>
      </div>
    </div>
  ),

  Social: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-6">
      <div className="px-5 space-y-10">
        <div className="space-y-5">
           <div className="flex justify-between items-center"><Skeleton className="h-4 w-40 opacity-40 rounded-md" /><Skeleton className="h-4 w-20 rounded-md" /></div>
           <div className="bg-white border-[3px] border-[#0D1B3E] p-5 rounded-[24px] flex items-center justify-between shadow-[6px_6px_0px_#0D1B3E]">
              <div className="flex items-center gap-4">
                 <Skeleton className="w-14 h-14 border-2 border-[#0D1B3E] rounded-xl" />
                 <div className="space-y-2"><Skeleton className="h-5 w-28 rounded-md" /><Skeleton className="h-3 w-20 opacity-50 rounded-md" /></div>
              </div>
              <div className="flex gap-2"><Skeleton className="h-11 w-11 rounded-full" /><Skeleton className="h-11 w-11 rounded-full" /></div>
           </div>
        </div>

        <div className="space-y-6">
           <div className="flex items-center gap-3"><Skeleton className="h-4 w-32 opacity-40 rounded-md" /><div className="flex-1 h-[3px] bg-[#0D1B3E]/10" /></div>
           <div className="bg-white border-[3px] border-[#0D1B3E] rounded-[32px] divide-y-[3px] divide-[#0D1B3E]/10 shadow-[8px_8px_0px_#0D1B3E] overflow-hidden">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-5 flex justify-between items-center hover:bg-slate-50">
                   <div className="flex items-center gap-4">
                      <Skeleton className="w-12 h-12 rounded-xl border-2 border-[#0D1B3E]" />
                      <div className="space-y-2"><Skeleton className="h-4 w-32 rounded-md" /><Skeleton className="h-3 w-16 opacity-50 rounded-md" /></div>
                   </div>
                   <Skeleton className="h-10 w-24 rounded-full border border-[#0D1B3E]/10" />
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  ),

  Generic: () => (
    <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-1 overflow-x-hidden">
      <div className="px-4 relative z-20 space-y-6">
        <section className="px-2 pt-2">
          <div className="flex items-center justify-center gap-6 px-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex flex-col items-center justify-center gap-2">
                <Skeleton className="w-14 h-14 rounded-2xl border-[2px] border-[#0D1B3E] bg-white shadow-[4px_4px_0px_#0D1B3E]" />
                <Skeleton className="h-2 w-12 opacity-30 rounded mt-0.5" />
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8 pb-12 mt-4">
          {[1, 2, 3].map((postIndex) => (
            <div key={postIndex} className="bg-white border-[3px] border-[#0D1B3E] rounded-[32px] p-5 shadow-[6px_6px_0px_#0D1B3E] space-y-4">
               <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="w-1.5 h-4 rounded-full bg-[#0D1B3E] shrink-0" />
                  <Skeleton className="h-3 w-28 opacity-40 rounded-md" />
               </div>
               <div className="flex gap-4 overflow-hidden">
                  {[1, 2, 3].map(cardIndex => (
                     <Skeleton key={cardIndex} className="flex-shrink-0 w-32 h-40 bg-slate-100 border-[2px] border-[#0D1B3E] rounded-2xl" />
                  ))}
               </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  ),
};
