import { useState, useEffect } from "react";
import { Skeleton } from "boneyard-js/react";

export function usePageLoading(delay = 1000) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const optimizedDelay = Math.min(delay, 250);
    const timer = setTimeout(() => setLoading(false), optimizedDelay);
    return () => clearTimeout(timer);
  }, [delay]);

  return loading;
}

export const PageSkeletons = {
  Home: () => (
    <Skeleton loading={true} animate="shimmer" name="home">
      <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans overflow-x-hidden pt-6">
        <div className="px-5 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-4 w-40 rounded-md bg-slate-100" />
              <div className="flex-1 h-[2px] bg-slate-100" />
            </div>
            <div className="flex gap-4 overflow-hidden -mx-5 px-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex-shrink-0 w-[160px] h-[260px] border border-[var(--app-text)]/10 rounded-3xl shadow-md shadow-[var(--app-text)]/8 overflow-hidden bg-[var(--app-bg)]" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-24 border border-[var(--app-text)]/10 rounded-3xl shadow-md shadow-[var(--app-text)]/8 bg-[var(--app-bg)]" />
            <div className="h-24 border border-[var(--app-text)]/10 rounded-3xl shadow-md shadow-[var(--app-text)]/8 bg-[var(--app-bg)]" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-4 w-32 rounded-md bg-slate-100" />
              <div className="flex-1 h-[2px] bg-slate-100" />
            </div>
            {[1, 2].map(i => (
              <div key={i} className="bg-[var(--app-bg)] border border-[var(--app-text)]/10 rounded-3xl p-5 shadow-lg shadow-[var(--app-text)]/8 space-y-4">
                <div className="aspect-video w-full rounded-2xl bg-slate-100" />
                <div className="space-y-2">
                  <div className="h-5 w-3/4 rounded-md bg-slate-100" />
                  <div className="h-3 w-1/2 rounded-md bg-slate-100 opacity-60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Skeleton>
  ),

  Wallet: () => (
    <Skeleton loading={true} animate="shimmer" name="wallet">
      <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-3 px-4">
        <div className="space-y-6">
          <div className="flex justify-center gap-7 mt-4 mb-2">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full border border-[var(--app-text)]/10 shadow-sm bg-[var(--app-bg)]" />
                <div className="h-2 w-12 rounded-full bg-slate-100 mt-0.5" />
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-4 w-6 rounded-md bg-[#F5A623]/30" />
              <div className="h-4 w-28 rounded-md bg-slate-100" />
              <div className="flex-1 h-[2px] bg-slate-100" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-14 rounded-2xl border border-slate-200 shadow-sm bg-[var(--app-bg)]" />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2].map(i => (
                  <div key={i} className="h-16 rounded-2xl shadow-sm bg-[#FFC55A]/20" />
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2].map(i => (
                  <div key={i} className="h-16 rounded-2xl shadow-sm bg-[var(--app-bg)] border border-slate-200" />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-4 w-6 rounded-md bg-[#F5A623]/30" />
              <div className="h-4 w-32 rounded-md bg-slate-100" />
              <div className="flex-1 h-[2px] bg-slate-100" />
            </div>
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-8 w-16 rounded-full border border-[var(--app-text)]/10 bg-[var(--app-bg)]" />
              ))}
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-center justify-between p-4 bg-[var(--app-bg)] border border-slate-100 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-[var(--app-text)]/10 bg-slate-100" />
                    <div className="space-y-2">
                      <div className="h-4 w-28 rounded-md bg-slate-100" />
                      <div className="h-3 w-16 rounded-md bg-slate-100 opacity-50" />
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <div className="h-4 w-12 rounded-md bg-slate-100" />
                    <div className="h-3 w-20 rounded-full bg-slate-100 opacity-30" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  ),

  Marketplace: () => (
    <Skeleton loading={true} animate="shimmer" name="marketplace">
      <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-6">
        <div className="px-5 space-y-6">
          <div className="flex gap-3 overflow-hidden">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-10 w-24 border border-[var(--app-text)]/10 shadow-sm rounded-full flex-shrink-0 bg-[var(--app-bg)]" />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5 pt-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="border border-[var(--app-text)]/10 rounded-[24px] p-4 shadow-md shadow-[var(--app-text)]/8 bg-[var(--app-bg)] space-y-4">
                <div className="aspect-square w-full rounded-xl bg-slate-100" />
                <div className="space-y-2">
                  <div className="h-4 w-full rounded-md bg-slate-100" />
                  <div className="h-5 w-1/2 rounded-md bg-slate-100 opacity-60" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Skeleton>
  ),

  Discover: () => (
    <Skeleton loading={true} animate="shimmer" name="discover">
      <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-6">
        <div className="px-5 space-y-8 relative z-10">
          {[1, 2].map(i => (
            <div key={i} className="bg-[var(--app-bg)] border border-[var(--app-text)]/10 rounded-[32px] p-6 shadow-lg shadow-[var(--app-text)]/8 space-y-5">
              <div className="flex justify-between">
                <div className="h-4 w-32 rounded-md bg-slate-100 opacity-40" />
                <div className="h-10 w-10 border border-[var(--app-text)]/10 rounded-xl shadow-sm bg-[var(--app-bg)]" />
              </div>
              <div className="h-6 w-full rounded-md bg-slate-100" />
              <div className="h-10 w-[80%] rounded-md bg-slate-100 opacity-40" />
              <div className="h-14 w-full border border-[var(--app-text)]/10 rounded-2xl bg-[var(--app-bg-muted)]" />
            </div>
          ))}
        </div>
      </div>
    </Skeleton>
  ),

  Academy: () => (
    <Skeleton loading={true} animate="shimmer" name="academy">
      <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-1 overflow-x-hidden">
        <div className="px-4 relative z-20 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-12 rounded-2xl border border-[var(--app-text)]/10 shadow-md shadow-[var(--app-text)]/8 bg-[var(--app-bg)]" />
            <div className="w-16 h-12 rounded-2xl border border-[var(--app-text)]/10 shadow-md shadow-[var(--app-text)]/8 bg-[var(--app-bg)] shrink-0" />
          </div>

          <section className="px-2 pt-2">
            <div className="flex items-center justify-center gap-8 px-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col items-center justify-center gap-2">
                  <div className="w-14 h-14 rounded-full border border-[var(--app-text)]/10 shadow-md shadow-[var(--app-text)]/8 bg-[var(--app-bg)]" />
                  <div className="h-2 w-14 bg-slate-100 rounded mt-0.5" />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8 pb-12 mt-4">
            {[1, 2, 3].map(postIndex => (
              <div key={postIndex} className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-4 rounded-full bg-[var(--app-orange)]/40 shrink-0" />
                      <div className="h-3 w-32 bg-slate-100 rounded-md" />
                    </div>
                    <div className="h-2 w-10 bg-slate-100 rounded-md" />
                  </div>
                  <div className="-mx-5 flex gap-4 overflow-hidden pb-2 pl-5 pr-5">
                    {[1, 2, 3, 4].map(cardIndex => (
                      <div key={cardIndex} className="relative flex-shrink-0 w-[112px] h-[160px] bg-[var(--app-bg)] border border-[var(--app-text)]/10 shadow-md shadow-[var(--app-text)]/8 rounded-xl overflow-hidden">
                        <div className="absolute inset-x-2 bottom-2">
                          <div className="h-2 w-[70%] bg-slate-200 rounded-md" />
                          <div className="h-2 w-[50%] bg-slate-200 mt-1 rounded-md" />
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
    </Skeleton>
  ),

  Product: () => (
    <Skeleton loading={true} animate="shimmer" name="product">
      <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans overflow-x-hidden pb-32">
        <div className="w-full h-[530px] bg-slate-100 border-b border-[var(--app-text)]/10" />

        <div className="px-6 -mt-20 relative z-30 space-y-10">
          <div className="flex items-center justify-between p-6 bg-[var(--app-bg)] rounded-3xl border border-[var(--app-text)]/10 shadow-lg shadow-[var(--app-text)]/8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border border-[var(--app-text)]/10 bg-slate-100" />
              <div className="space-y-2">
                <div className="h-5 w-32 rounded-md bg-slate-100" />
                <div className="h-3 w-24 rounded-md bg-slate-100 opacity-50" />
              </div>
            </div>
            <div className="h-10 w-20 rounded-xl bg-slate-100 opacity-40" />
          </div>

          <div className="space-y-6">
            <div className="h-12 w-3/4 rounded-xl bg-slate-100" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded-md bg-slate-100" />
              <div className="h-4 w-[90%] rounded-md bg-slate-100" />
              <div className="h-4 w-2/3 rounded-md bg-slate-100 opacity-70" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-32 rounded-[2rem] border border-[var(--app-text)]/10 bg-[var(--app-bg)] shadow-lg shadow-[var(--app-text)]/8" />
            <div className="h-32 rounded-[2rem] border border-[var(--app-text)]/10 bg-[var(--app-bg)] shadow-lg shadow-[var(--app-text)]/8" />
          </div>
        </div>
      </div>
    </Skeleton>
  ),

  AcademyDetail: () => (
    <Skeleton loading={true} animate="shimmer" name="academydetail">
      <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans">
        <div className="aspect-video w-full bg-slate-100 border-b border-[var(--app-text)]/10" />
        <div className="px-6 mt-8 space-y-8">
          <div className="space-y-4">
            <div className="h-8 w-[90%] rounded-lg bg-slate-100" />
            <div className="flex gap-4">
              <div className="h-4 w-24 rounded bg-slate-100" />
              <div className="h-4 w-24 rounded bg-slate-100" />
            </div>
          </div>
          <div className="p-6 bg-[var(--app-bg)] border border-[var(--app-text)]/10 shadow-lg shadow-[var(--app-text)]/8 rounded-[32px] space-y-4">
            <div className="h-8 w-1/3 rounded-md bg-slate-100" />
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-slate-100" />
              <div className="h-4 w-[95%] rounded bg-slate-100" />
              <div className="h-4 w-2/3 rounded bg-slate-100" />
            </div>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-4 p-5 bg-[var(--app-bg)] border border-[var(--app-text)]/10 rounded-[24px] shadow-md shadow-[var(--app-text)]/8">
                <div className="h-12 w-12 rounded-xl flex-shrink-0 bg-slate-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-2/3 rounded-md bg-slate-100" />
                  <div className="h-3 w-1/4 rounded-md bg-slate-100 opacity-50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Skeleton>
  ),

  Profile: () => (
    <Skeleton loading={true} animate="shimmer" name="profile">
      <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-6">
        <div className="px-5 space-y-8">
          <div className="border border-[var(--app-text)]/10 bg-[var(--app-bg)] rounded-[32px] p-7 shadow-lg shadow-[var(--app-text)]/8 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <div className="w-20 h-20 rounded-full bg-slate-200" />
            </div>
            <div className="h-16 w-[70%] rounded-xl bg-slate-100 opacity-40" />
            <div className="space-y-3 relative z-10">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex justify-between p-4 border border-[var(--app-text)]/8 items-center rounded-2xl bg-[var(--app-bg-muted)]/50">
                  <div className="h-4 w-32 rounded-md bg-slate-100" />
                  <div className="h-5 w-16 rounded-md bg-slate-100 opacity-50" />
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="h-16 flex-1 border border-[var(--app-text)]/10 rounded-2xl shadow-md shadow-[var(--app-text)]/8 bg-[var(--app-orange)]/10" />
              <div className="h-16 flex-1 border border-[var(--app-text)]/10 rounded-2xl shadow-md shadow-[var(--app-text)]/8 bg-[#00695C]/10" />
            </div>
          </div>

          <div className="flex gap-3 overflow-hidden">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-12 w-28 border border-[var(--app-text)]/10 shadow-sm rounded-full flex-shrink-0 bg-[var(--app-bg)]" />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-5">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-[9/14] border border-[var(--app-text)]/10 shadow-md shadow-[var(--app-text)]/8 rounded-[24px] bg-[var(--app-bg)]" />
            ))}
          </div>
        </div>
      </div>
    </Skeleton>
  ),

  Social: () => (
    <Skeleton loading={true} animate="shimmer" name="social">
      <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-6">
        <div className="px-5 space-y-10">
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <div className="h-4 w-40 rounded-md bg-slate-100 opacity-40" />
              <div className="h-4 w-20 rounded-md bg-slate-100" />
            </div>
            <div className="bg-[var(--app-bg)] border border-[var(--app-text)]/10 p-5 rounded-[24px] flex items-center justify-between shadow-lg shadow-[var(--app-text)]/8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 border border-[var(--app-text)]/10 rounded-xl bg-slate-100" />
                <div className="space-y-2">
                  <div className="h-5 w-28 rounded-md bg-slate-100" />
                  <div className="h-3 w-20 rounded-md bg-slate-100 opacity-50" />
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-11 w-11 rounded-full bg-slate-100" />
                <div className="h-11 w-11 rounded-full bg-slate-100" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-4 w-32 rounded-md bg-slate-100 opacity-40" />
              <div className="flex-1 h-[2px] bg-slate-100" />
            </div>
            <div className="bg-[var(--app-bg)] border border-[var(--app-text)]/10 rounded-[32px] divide-y divide-[var(--app-text)]/8 shadow-lg shadow-[var(--app-text)]/8 overflow-hidden">
              {[1, 2, 3].map(i => (
                <div key={i} className="p-5 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl border border-[var(--app-text)]/10 bg-slate-100" />
                    <div className="space-y-2">
                      <div className="h-4 w-32 rounded-md bg-slate-100" />
                      <div className="h-3 w-16 rounded-md bg-slate-100 opacity-50" />
                    </div>
                  </div>
                  <div className="h-10 w-24 rounded-full border border-[var(--app-text)]/10 bg-[var(--app-bg-muted)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Skeleton>
  ),

  Generic: () => (
    <Skeleton loading={true} animate="shimmer" name="generic">
      <div className="w-full max-w-md mx-auto min-h-screen bg-transparent font-sans pt-1 overflow-x-hidden">
        <div className="px-4 relative z-20 space-y-6">
          <section className="px-2 pt-2">
            <div className="flex items-center justify-center gap-6 px-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex flex-col items-center justify-center gap-2">
                  <div className="w-14 h-14 rounded-2xl border border-[var(--app-text)]/10 bg-[var(--app-bg)] shadow-md shadow-[var(--app-text)]/8" />
                  <div className="h-2 w-12 rounded bg-slate-100 opacity-30 mt-0.5" />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8 pb-12 mt-4">
            {[1, 2, 3].map(postIndex => (
              <div key={postIndex} className="bg-[var(--app-bg)] border border-[var(--app-text)]/10 rounded-[32px] p-5 shadow-lg shadow-[var(--app-text)]/8 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-4 rounded-full bg-[var(--app-shape-accent)]/20 shrink-0" />
                  <div className="h-3 w-28 rounded-md bg-slate-100 opacity-40" />
                </div>
                <div className="flex gap-4 overflow-hidden">
                  {[1, 2, 3].map(cardIndex => (
                    <div key={cardIndex} className="flex-shrink-0 w-32 h-40 bg-slate-100 border border-[var(--app-text)]/10 rounded-2xl" />
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </Skeleton>
  ),
};
