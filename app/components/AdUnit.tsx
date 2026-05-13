"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Extend window object for Google AdSense
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdUnitProps {
  slotId: string;
  format?: "auto" | "fluid" | "horizontal" | "vertical" | "rectangle";
  responsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function AdUnit({
  slotId,
  format = "auto",
  responsive = true,
  className = "",
  style,
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only attempt to push ads if the AdSense script is loaded and the slot hasn't been filled yet
    try {
      if (typeof window !== "undefined" && adRef.current) {
        const isFilled = adRef.current.getAttribute("data-adsbygoogle-status") === "done";
        if (!isFilled) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, [pathname]); // Re-trigger on route changes for programmatic SEO pages

  // In development, show a placeholder block instead of live ads to prevent false impressions
  if (process.env.NODE_ENV === "development") {
    return (
      <div 
        className={`bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center border-4 border-dashed border-black/20 dark:border-white/20 p-4 ${className}`}
        style={{ minHeight: "100px", ...style }}
      >
        <span className="font-black text-xs uppercase text-black/40 dark:text-white/40 tracking-widest text-center">
          AdSense Placeholder<br/>
          (Slot: {slotId})
        </span>
      </div>
    );
  }

  return (
    <div className={`ad-container ${className}`} style={{ minHeight: "100px", ...style }}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXXXXXXXX"} // To be replaced by actual ID
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
