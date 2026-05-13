import { Metadata } from "next";
import CGPACalculator from "@/app/components/calculators/CGPACalculator";

export const metadata: Metadata = {
  title: "CGPA Calculator Pakistan 2026 | Standard HEC Scale | Survive Uni",
  description: "Track your cumulative CGPA using the standard HEC Pakistan 4.0 grading scale. Includes semester-by-semester breakdown and target CGPA predictor.",
  alternates: { canonical: "/tools/cgpa-calculator/standard" },
};

export default function StandardCGPAPage() {
  return <CGPACalculator backHref="/tools/cgpa-calculator" />;
}
