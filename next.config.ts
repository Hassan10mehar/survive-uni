import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Static export does not support redirects/rewrites in next.config.ts.
  // These are now handled in public/.htaccess for Hostinger/Apache.
};

export default nextConfig;
