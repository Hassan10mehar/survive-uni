import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: 'C:/Users/Dell/Downloads/Pak-edtech-hub/survive-uni',
  },
};

export default nextConfig;
