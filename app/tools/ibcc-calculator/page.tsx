import type { Metadata } from "next";
import IbccCalculator from "./Calculator";
import SEOSchema from "@/app/components/SEOSchema";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { BrutalContainer, BrutalCard } from "@/app/components/BrutalUI";

export const metadata: Metadata = {
  title: "IBCC Equivalence Calculator | O/A Level to Matric/Inter Marks | Survive Uni",
  description: "Calculate your O-Level and A-Level equivalence marks for Pakistani university admissions. Uses official IBCC grade points for 2026 admissions.",
  alternates: { canonical: "/tools/ibcc-calculator" },
  keywords: ["ibcc equivalence calculator", "o level to matric marks", "a level to fsc equivalence", "ibcc grade points"],
};

export default function Page() {
  return (
    <>
      <SEOSchema 
        type="SoftwareApplication" 
        data={{
          name: "IBCC Equivalence Calculator",
          description: "Estimate your Pakistani matric/intermediate equivalence marks from foreign qualifications like O-Levels and A-Levels."
        }} 
      />
      <SEOSchema 
        type="FAQPage" 
        data={{
          faqs: [
            {
              question: "How many subjects are required for O-Level equivalence?",
              answer: "IBCC requires a minimum of 8 subjects for O-Level equivalence in Pakistan (5 compulsory + 3 electives)."
            },
            {
              question: "What are the marks for an A* in IBCC?",
              answer: "As per current IBCC policy, an A* is equivalent to 90 marks, an A to 85, and a B to 75 marks in the local system."
            }
          ]
        }} 
      />

      <div className="flex-1 pb-20">
        <IbccCalculator />

        <BrutalContainer maxWidth="max-w-2xl" className="mt-12">
          <Breadcrumbs items={[{ label: "Tools", href: "/" }, { label: "IBCC Calculator" }]} />
          
          <div className="mt-16 space-y-12">
            <section>
              <h2 className="text-3xl font-black uppercase mb-6 text-black dark:text-white underline decoration-4 decoration-[#4A90E2] underline-offset-8">
                Understanding IBCC Equivalence
              </h2>
              <div className="prose dark:prose-invert max-w-none font-medium text-black/70 dark:text-white/70 leading-relaxed">
                <p className="mb-4">
                  For students coming from Cambridge (O/A Levels) or other foreign systems, the **IBCC Equivalence** is the most important document for admission to Pakistani universities like NUST, FAST, or King Edward Medical University.
                </p>
                <BrutalCard variant="white" className="p-6 mb-6">
                  <h3 className="font-black uppercase text-sm mb-2">Grade to Marks Conversion</h3>
                  <p className="text-sm">Unlike local boards where you get raw marks, IBCC assigns fixed marks to your grades. An &apos;A&apos; in O-Level is considered 85/100 in the local system.</p>
                </BrutalCard>
              </div>
            </section>

            <section className="bg-[#4A90E2] text-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black uppercase mb-6 text-white">Required Subjects (Science Group)</h2>
              <p className="text-sm font-bold text-white/90 leading-relaxed mb-6">
                To apply for Engineering or Medical programs in Pakistan, IBCC requires the following O-Level subjects:
              </p>
              <ul className="grid grid-cols-2 gap-4 text-xs font-black uppercase tracking-widest">
                <li className="bg-black/20 p-2 border-2 border-white/20">English</li>
                <li className="bg-black/20 p-2 border-2 border-white/20">Urdu</li>
                <li className="bg-black/20 p-2 border-2 border-white/20">Islamiyat</li>
                <li className="bg-black/20 p-2 border-2 border-white/20">Pak Studies</li>
                <li className="bg-black/20 p-2 border-2 border-white/20">Mathematics</li>
                <li className="bg-black/20 p-2 border-2 border-white/20">Physics</li>
                <li className="bg-black/20 p-2 border-2 border-white/20">Chemistry</li>
                <li className="bg-black/20 p-2 border-2 border-white/20">Biology/CS</li>
              </ul>
            </section>

            <section className="mt-12">
              <BrutalCard variant="white" className="p-8 text-center border-4 border-black">
                <p className="font-black text-sm uppercase mb-4">Official Disclaimer</p>
                <p className="text-sm text-black/60 italic mb-0">
                  &quot;This calculator provides an estimate based on standard IBCC tables. For official equivalence, you must apply through the IBCC web portal and submit your original certificates.&quot;
                </p>
              </BrutalCard>
            </section>
          </div>
        </BrutalContainer>
      </div>
    </>
  );
}
