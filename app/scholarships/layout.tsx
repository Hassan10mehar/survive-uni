import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Scholarships & Financial Aid 2026-2027 | Fully Funded | Survive Uni",
  description: "Find fully funded scholarships, merit-based grants, and international aid for university students worldwide. Your guide to affordable global education.",
  keywords: ["global scholarships", "international students aid", "fully funded scholarships 2026", "university grants", "financial aid for students"],
};

export default function ScholarshipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
