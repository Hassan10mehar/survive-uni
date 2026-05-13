import type { Metadata } from "next";
import CGPAToPercentageCalculator from "./Calculator";
import SEOSchema from "@/app/components/SEOSchema";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { BrutalContainer, BrutalCard } from "@/app/components/BrutalUI";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CGPA to Percentage Calculator Pakistan 2026 | HEC Formula | Survive Uni",
  description: "Convert your CGPA to percentage or percentage to CGPA using the official HEC Pakistan formula (CGPA × 25). Works for NUST, FAST, UET, COMSATS and all 4.0 scale universities.",
  alternates: { canonical: "/tools/cgpa-to-percentage" },
  keywords: ["hec cgpa to percentage formula", "convert cgpa to percentage pakistan", "cgpa percentage calculator", "hec grading criteria"],
};

export default function Page() {
  return (
    <>
      <SEOSchema 
        type="SoftwareApplication" 
        data={{
          name: "HEC CGPA to Percentage Converter",
          description: "Official HEC Pakistan formula-based calculator to convert your cumulative GPA into percentage marks and vice versa."
        }} 
      />
      <SEOSchema 
        type="FAQPage" 
        data={{
          faqs: [
            {
              question: "What is the HEC formula for CGPA to Percentage?",
              answer: "The Higher Education Commission (HEC) of Pakistan uses a simple linear formula: Percentage = (Obtained CGPA / 4.0) × 100."
            },
            {
              question: "How do I calculate 1st Division in CGPA?",
              answer: "Typically, a CGPA of 3.0 or 60% and above is considered 1st Division in the Pakistani educational system."
            }
          ]
        }} 
      />

      <div className="flex-1 pb-20">
        <CGPAToPercentageCalculator />

        <BrutalContainer maxWidth="max-w-2xl" className="mt-12">
          <Breadcrumbs items={[{ label: "Tools", href: "/" }, { label: "CGPA to Percentage" }]} />
          
          <div className="mt-16 space-y-12">
            <section>
              <h2 className="text-3xl font-black uppercase mb-6 text-black dark:text-white underline decoration-4 decoration-[#00FFC2] underline-offset-8">
                Official HEC Conversion Formula
              </h2>
              <div className="prose dark:prose-invert max-w-none font-medium text-black/70 dark:text-white/70 leading-relaxed">
                <p className="mb-4">
                  In Pakistan, the **Higher Education Commission (HEC)** has standardized the conversion between Cumulative Grade Point Average (CGPA) and Percentage. This is crucial for government job applications, foreign university admissions, and HEC degree attestation.
                </p>
                <BrutalCard variant="white" className="p-8 mb-6 border-4 border-black bg-zinc-50 dark:bg-zinc-800">
                  <p className="font-black text-xs uppercase tracking-widest text-[#00FFC2] mb-2">The Formula</p>
                  <p className="text-2xl font-black uppercase tracking-tighter">Percentage = (Obtained CGPA / 4.00) × 100</p>
                </BrutalCard>
                <p className="mb-4">
                  For example, if your CGPA is <strong>3.00</strong>, your equivalent percentage would be <strong>75%</strong>. This rule applies to all degree programs including BS, MS, and PhD across HEC-recognized institutions.
                </p>
              </div>
            </section>

            <section className="bg-black text-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_#00FFC2]">
              <h2 className="text-2xl font-black uppercase mb-6 text-[#00FFC2]">Division Classification</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-black text-sm uppercase text-[#00FFC2]">1st Division</p>
                    <p className="text-xs font-medium text-white/60">60% or 3.00 CGPA & Above</p>
                  </div>
                  <div>
                    <p className="font-black text-sm uppercase text-white">2nd Division</p>
                    <p className="text-xs font-medium text-white/60">45% - 59.99% or 2.00 - 2.99 CGPA</p>
                  </div>
                </div>
                <div className="border-l-2 border-white/10 pl-6">
                  <p className="text-xs font-medium text-white/70 italic">
                    *Note: Some universities and employers may have higher requirements for 1st division classification. Always check the specific criteria of the organization you are applying to.
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-12 text-center">
              <Link href="/tools/cgpa-calculator" className="font-black uppercase text-xs tracking-widest underline decoration-2 underline-offset-4 hover:text-[#00FFC2] transition-colors">
                Need to calculate your CGPA first? Try our CGPA Tracker →
              </Link>
            </section>
          </div>
        </BrutalContainer>
      </div>
    </>
  );
}
