import type { Metadata } from "next";
import GlobalScholarshipPage from "@/app/components/GlobalScholarshipPage";
import { SCHOLARSHIPS } from "@/lib/scholarships";
import { UNIS } from "@/lib/unis";
import { WORLD_UNIS } from "@/lib/globalUnis";

export const metadata: Metadata = {
  title: "Global Scholarship Finder 2026 | Find University Funding",
  description: "Browse verified scholarships, grants, and financial aid for universities worldwide. Find funding for undergraduate and graduate studies for the 2026 academic year.",
  alternates: { canonical: "/scholarships" },
};

export default function ScholarshipPage() {
  // Combine all university-specific scholarships with the general ones
  const allUniScholarships = [
    ...WORLD_UNIS.flatMap(u => (u as any).scholarships || []),
    ...UNIS.flatMap(u => (u as any).scholarships || [])
  ];

  const combined = [...allUniScholarships, ...SCHOLARSHIPS];

  return (
    <GlobalScholarshipPage 
      scholarships={combined}
      countryName="Global"
      countryId=""
    />
  );
}
