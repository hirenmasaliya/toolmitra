"use client";

import { useEffect, useState, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSlot({
  className = "",
}: {
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const adRef = useRef<HTMLModElement>(null);

  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !client || !slot) return;

    try {
      // Check if this specific element has already been processed by AdSense
      if (adRef.current && !adRef.current.getAttribute("data-adsbygoogle-status")) {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error("AdSense push error:", error);
    }
  }, [mounted, client, slot]);

  // Keep server-rendered and initial client HTML identical.
  if (!mounted || !client || !slot) return null;

  return (
    <aside
      className={`my-8 flex w-full flex-col items-center justify-center p-3 sm:p-4 bg-transparent ${className}`}
    >
      <div className="mb-3 w-full text-center">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#9aa0a6]">
          Advertisement
        </span>
      </div>

      <div className="flex min-h-[250px] w-full items-center justify-center overflow-hidden bg-transparent">
        <ins
          ref={adRef}
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}