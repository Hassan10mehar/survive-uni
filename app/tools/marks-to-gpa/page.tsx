import type { Metadata } from "next";
import MarksToGPACalculator from "./Calculator";
import SEOSchema from "@/app/components/SEOSchema";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { BrutalContainer, BrutalCard } from "@/app/components/BrutalUI";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marks to GPA Calculator Pakistan | Subject Grade Predictor | Survive Uni",
  description: "Convert your subject marks to GPA and letter grades. Predict your grades for NUST, FAST, UET and more using HEC standard absolute grading scale.",
  alternates: { canonical: "/tools/marks-to-gpa" },
  keywords: ["marks to gpa calculator", "percentage to gpa pakistan", "subject grade predictor", "hec absolute grading scale"],
};

export default function Page() {
  return (
    <>
      <SEOSchema 
        type="SoftwareApplication" 
        data={{
          name: "Marks to GPA Calculator",
          description: "Predict your subject letter grade and GPA points from percentage marks based on Pakistani university standards."
        }} 
      />
      <SEOSchema 
        type="FAQPage" 
        data={{
          faqs: [
            {
              question: "What is the HEC absolute grading scale?",
              answer: "The HEC absolute scale typically starts A at 85%, B at 71%, and C at 60%. However, individual universities may have slight variations."
            },
            {
              question: "Does this calculator work for relative grading?",
              answer: "For relative grading (like in NUST or FAST), your grade depends on the class average. This calculator provides the absolute baseline used by most institutions."
            }
          ]
        }} 
      />
      
      <div className="flex-1 pb-20">
        <MarksToGPACalculator />

        <BrutalContainer maxWidth="max-w-2xl" className="mt-12">
          <Breadcrumbs items={[{ label: "Tools", href: "/" }, { label: "Marks to GPA" }]} />
          
          <div className="mt-16 space-y-12">
            <section>
              <h2 className="text-3xl font-black uppercase mb-6 text-black dark:text-white underline decoration-4 decoration-[#00FFC2] underline-offset-8">
                How to Predict Your Subject Grade
              </h2>
              <div className="prose dark:prose-invert max-w-none font-medium text-black/70 dark:text-white/70 leading-relaxed">
                <p className="mb-4">
                  Predicting your final letter grade is essential for calculating your semester GPA early. In Pakistan, universities use two main grading systems: **Absolute Grading** and **Relative Grading**.
                </p>
                <BrutalCard variant="white" className="p-6 mb-6">
                  <h3 className="font-black uppercase text-sm mb-2">Absolute Grading (Standard)</h3>
                  <p className="text-sm">Your grade is determined solely by your percentage marks. If you get 85%+, you get an A. Simple and transparent.</p>
                </BrutalCard>
                <BrutalCard variant="black" className="p-6 text-white">
                  <h3 className="font-black uppercase text-sm mb-2 text-[#00FFC2]">Relative Grading (Curving)</h3>
                  <p className="text-sm">Used by NUST, FAST, and GIKI. Your grade depends on how the class performed. If the average is 50, a 70 might be an A.</p>
                </BrutalCard>
              </div>
            </section>

            <section className="bg-[#00FFC2] p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black uppercase mb-6 text-black">Why This Matters</h2>
              <p className="text-sm font-bold text-black/70 leading-relaxed mb-6">
                Most students focus only on final exams. However, sessional marks (quizzes, assignments, mid-terms) often carry 50-60% weightage. Use this tool to see what score you need in finals to secure your target grade.
              </p>
              <Link href="/tools/gpa-calculator" className="inline-block bg-black text-white px-6 py-3 font-black uppercase text-xs tracking-widest border-2 border-black hover:translate-x-1 hover:translate-y-1 transition-all">
                Go to GPA Calculator →
              </Link>
            </section>
          </div>
        </BrutalContainer>
      </div>
    </>
  );
}
