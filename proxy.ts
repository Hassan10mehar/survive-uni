/**
 * middleware.ts
 * Regional routing middleware for Survive Uni Global Expansion.
 * - Detects user geolocation (country) from request headers (Vercel-native).
 * - Injects region cookie for manual override persistence.
 * - Allows manual region toggle via ?region=pk or ?region=global query param.
 */

import { NextRequest, NextResponse } from "next/server";

/** Countries treated as the Pakistan region */
const PK_COUNTRIES = new Set(["PK"]);

/** Routes that are always global (no regional redirect) */
const BYPASS_PREFIXES = [
  "/_next",
  "/api",
  "/favicon",
  "/icon",
  "/opengraph-image",
  "/robots",
  "/sitemap",
  "/manifest",
];

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // Skip static/API routes
  if (BYPASS_PREFIXES.some(p => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // BOT DETECTION: Don't redirect search engines (SEO Critical)
  const ua = request.headers.get("user-agent") || "";
  const isBot = /googlebot|bingbot|yandexbot|duckduckbot|slurp|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest\/0\.|bingpreview|slackbot|vkShare|W3C_Validator/i.test(ua);
  
  if (isBot) {
    return NextResponse.next();
  }

  // Allow manual override via ?region=pk or ?region=global
  const regionParam = searchParams.get("region");
  if (regionParam === "pk" || regionParam === "global") {
    const response = NextResponse.next();
    response.cookies.set("survive-uni-region", regionParam, {
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  // Already on a regional route — don't re-process
  if (pathname.startsWith("/pk/") || pathname.startsWith("/global/")) {
    return NextResponse.next();
  }

  // Check cookie first (user preference wins)
  const cookieRegion = request.cookies.get("survive-uni-region")?.value;
  if (cookieRegion) {
    // No redirect needed, just pass through with the context cookie set
    return NextResponse.next();
  }

  // Detect country from Vercel geo header (Next.js 15+: request.geo removed)
  // On Vercel, the country is injected via the x-vercel-ip-country header.
  // Falls back to "US" (global) in local dev where no such header exists.
  const country = request.headers.get("x-vercel-ip-country") || "US";
  const isPakistan = PK_COUNTRIES.has(country);

  // Set region cookie on first visit
  const response = NextResponse.next();
  response.cookies.set("survive-uni-region", isPakistan ? "pk" : "global", {
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    sameSite: "lax",
  });

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|opengraph-image).*)",
  ],
};
