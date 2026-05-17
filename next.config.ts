import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Enforce canonical no-trailing-slash URLs across all internal links and
  // the generated sitemap.  Without this Next.js may still emit trailing
  // slashes in <Link> hrefs, which would then conflict with .htaccess rule 0.
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
