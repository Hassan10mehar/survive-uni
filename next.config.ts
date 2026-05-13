import type { NextConfig } from "next";

// Pakistan university slugs (matches ids in unis.ts)
const PK_UNIS = [
  "nust","fast","pu","nutech","ned","au-eng","au-noneng",
  "uet-lhr","cui","pieas","giki","bahria","uet-pesh",
  "muet","qau","uaf","bzu","medical","lums-iba"
];

// Global grading scale slugs (matches ids in globalScales.ts)
const GLOBAL_SCALES = ["us-4-0","uk-honours","india-10-0","europe-ects","aus-wam","singapore-cap"];

const nextConfig: NextConfig = {
  async redirects() {
    const redirects = [];

    // ── 301: Old flat PK pretty URLs → new silo URLs ──────────────
    // e.g. /nust-aggregate-calculator → /pakistan/nust/merit-calculator
    for (const uni of PK_UNIS) {
      redirects.push(
        { source: `/${uni}-aggregate-calculator`, destination: `/pakistan/${uni}/merit-calculator`, permanent: true },
        { source: `/${uni}-merit-calculator`,     destination: `/pakistan/${uni}/merit-calculator`, permanent: true },
        { source: `/${uni}-gpa-calculator`,       destination: `/pakistan/${uni}/gpa-calculator`,  permanent: true },
        { source: `/${uni}-cgpa-calculator`,      destination: `/pakistan/${uni}/cgpa-calculator`, permanent: true },
        // Old /pk/ alias → new canonical
        { source: `/pk/${uni}-aggregate-calculator`, destination: `/pakistan/${uni}/merit-calculator`, permanent: true },
        { source: `/pk/${uni}-gpa-calculator`,       destination: `/pakistan/${uni}/gpa-calculator`,  permanent: true },
      );
    }

    // ── 301: Old /tools/ internal routes → new silo URLs ──────────
    for (const uni of PK_UNIS) {
      redirects.push(
        { source: `/tools/aggregate-calculator/${uni}`, destination: `/pakistan/${uni}/merit-calculator`, permanent: true },
        { source: `/tools/gpa-calculator/${uni}`,       destination: `/pakistan/${uni}/gpa-calculator`,  permanent: true },
        { source: `/tools/cgpa-calculator/${uni}`,      destination: `/pakistan/${uni}/cgpa-calculator`, permanent: true },
      );
    }

    return redirects;
  },

  async rewrites() {
    const rewrites = [];

    // ── Global scale pretty URLs (no redirect, just rewrite) ───────
    // /us-4-0-gpa-calculator → /global/gpa-calculator/us-4-0
    for (const scale of GLOBAL_SCALES) {
      rewrites.push({
        source: `/${scale}-gpa-calculator`,
        destination: `/global/gpa-calculator/${scale}`,
      });
    }

    return rewrites;
  },
};

export default nextConfig;
