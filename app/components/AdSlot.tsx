"use client";

import { useEffect } from "react";

export default function AdSlot({ className = "" }: { className?: string }) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

  useEffect(() => {
    if (!client || !slot) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense push error:", err);
    }
  }, [client, slot]);

  // Returns nothing if environment variables are missing, keeping the UI clean
  if (!client || !slot) return null;

  return (
    <aside className={`my-8 flex w-full flex-col items-center justify-center rounded-2xl border border-slate-200/60 bg-slate-50/50 p-3 shadow-sm sm:p-4 ${className}`}>
      
      {/* Premium Label Styling */}
      <div className="mb-3 w-full text-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Advertisement
        </span>
      </div>
      
      <div className="flex w-full min-h-[250px] items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-inset ring-slate-100">
        <ins
          className="adsbygoogle block w-full"
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
      
    </aside>
  );
}