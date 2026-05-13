import { Metadata } from "next";
import GPACalculator from "@/app/components/calculators/GPACalculator";

export const metadata: Metadata = {
  title: "GPA Calculator Pakistan 2026 | Standard HEC Scale | Survive Uni",
  description: "Calculate your semester GPA using the standard HEC Pakistan 4.0 grading scale. Works for any Pakistani university not listed separately.",
  alternates: { canonical: "/tools/gpa-calculator/standard" },
};

export default function StandardGPAPage() {
  return <GPACalculator backHref="/tools/gpa-calculator" />;
}
