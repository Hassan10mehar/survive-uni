import Link from "next/link";
import type { Metadata } from "next";
import { UNIS } from "@/lib/unis";
import { COUNTRIES } from "@/lib/countries";
import { Info, ArrowRight } from "lucide-react";
import { BrutalCard, BrutalHeader, BrutalContainer, BrutalButton } from "@/app/components/BrutalUI";
import SEOSchema from "@/app/components/SEOSchema";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "University Merit & Admission Calculator 2026 | Global Aggregate Tracker",
  description:
    "Calculate your admission merit aggregate for universities worldwide. Support for NUST, FAST, MDCAT, and international weighted admission criteria updated for the 2026 cycle.",
  keywords: [
    "university merit calculator",
    "aggregate calculator 2026",
    "admission merit calculator",
    "weighted admission score",
    "calculate university aggregate",
    "entrance exam merit",
    "global admission tracker"
  ],
  alternates: { canonical: "/tools/aggregate-calculator" },
};

export default function AggregateIndexPage() {
  return (
    <div className="flex-1 pb-20">
      <SEOSchema 
        type="SoftwareApplication" 
        data={{
          name: "Survive Uni Aggregate Calculator",
          description: "Calculate your admission merit aggregate for top universities worldwide accurately based on the latest weighted policies."
        }} 
      />
      <SEOSchema 
        type="FAQPage" 
        data={{
          faqs: [
            {
              question: "How is university merit calculated?",
              answer: "Merit is typically calculated using a weighted combination of secondary school results, standardized test scores (like SAT, NET, or ECAT), and entrance interviews."
            },
            {
              question: "Is this updated for 2026 admissions?",
              answer: "Yes, all formulas are audited and updated for the 2026-2027 academic intake cycle across all supported regions."
            }
          ]
        }} 
      />
      <BrutalHeader 
        title="Admission Calc" 
        subtitle="Global University Merit Tracker"
        backHref="/"
        bgColor="#4A90E2"
      />

      <BrutalContainer maxWidth="max-w-6xl">
        <Breadcrumbs items={[{ label: "Tools", href: "/" }, { label: "Merit Calculator" }]} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-12">
            <BrutalCard variant="black" className="h-full flex items-center p-8 lg:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="bg-[#4A90E2] p-4 border-4 border-white shrink-0 rotate-3">
                  <Info className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="font-black text-2xl uppercase text-[#4A90E2] mb-2 tracking-tighter">Official Criteria 2026</h2>
                  <p className="text-lg text-white/90 font-bold leading-relaxed">
                    Calculations are based on the latest admission policies for the <span className="text-[#4A90E2]">2026/27 Intake</span>. Select your target region below to see institution-specific formulas.
                  </p>
                </div>
              </div>
            </BrutalCard>
          </div>
          {/* Removed hardcoded Pakistan-specific medical card from global index */}

        </div>

        <h2 className="font-black text-4xl uppercase mb-10 text-black dark:text-white underline decoration-[12px] decoration-[#4A90E2] underline-offset-[12px]">
          Select Region
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COUNTRIES.map((c) => (
            <Link key={c.id} href={`/${c.id}/merit-calculator`} className="block group">
              <BrutalCard 
                className="p-10 cursor-pointer h-full border-4 group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[12px_12px_0px_0px_#fff] transition-all"
                style={{ backgroundColor: c.color, color: "#fff", borderColor: 'black' }}
              >
                <div className="flex flex-col items-center text-center gap-6">
                  <span className="text-7xl group-hover:scale-110 transition-transform">{c.emoji}</span>
                  <div>
                    <h3 className="font-black text-3xl uppercase mb-2">{c.name}</h3>
                    <p className="font-bold opacity-80 text-sm uppercase tracking-widest">{c.terms.merit} Hub</p>
                  </div>
                  <div className="mt-4 bg-black text-white px-6 py-2 font-black text-xs uppercase border-4 border-black">
                    Explore Unis
                  </div>
                </div>
              </BrutalCard>
            </Link>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <BrutalCard variant="black" className="p-8 border-4 opacity-80 border-[#4A90E2]">
            <p className="font-black text-xs uppercase text-[#4A90E2] mb-3 tracking-widest">Global Data Accuracy</p>
            <p className="text-xs text-white/50 font-bold uppercase leading-relaxed">
              Our formulas are audited against official university prospectuses and regional admission councils. We update criteria within 24 hours of any policy change.
            </p>
          </BrutalCard>
          <BrutalCard variant="white" className="p-8 border-4 border-black bg-zinc-100 dark:bg-zinc-800">
            <p className="font-black text-xs uppercase text-black/40 dark:text-white/40 mb-3 tracking-widest">Disclaimer</p>
            <p className="text-xs text-black/50 dark:text-white/50 font-bold uppercase leading-relaxed">
              These tools provide estimates based on current admission trends. Official university merit lists are the final authority for all admissions.
            </p>
          </BrutalCard>
        </div>

        {/* SEO Content Section */}
        <div className="mt-20 space-y-12">
          <section>
            <h2 className="text-3xl font-black uppercase mb-6 text-black dark:text-white underline decoration-4 decoration-[#4A90E2] underline-offset-8">
              How University Admission Merit is Calculated
            </h2>
            <div className="prose dark:prose-invert max-w-none font-medium text-black/70 dark:text-white/70 leading-relaxed">
              <p className="mb-4">
                University admission merit (often called the &quot;Aggregate Score&quot;) is the weighted total used by institutions to rank applicants. While specific weights vary globally, most top-tier universities focus on a combination of previous academic records and standardized entrance exams.
              </p>
              
              <h3 className="text-xl font-black uppercase mt-8 mb-4 text-black dark:text-white">Global Merit Patterns</h3>
              <ul className="list-disc pl-5 space-y-4 mb-6">
                <li>
                  <strong>Entrance Exam Weightage:</strong> In many regions, the entrance exam (SAT, NET, JEE, etc.) carries 50% to 75% of the total merit weight.
                </li>
                <li>
                  <strong>Secondary School Records:</strong> Your final years of high school (O-Levels/A-Levels/FSc) typically contribute 10% to 40% of the aggregate.
                </li>
                <li>
                  <strong>Extracurriculars & Interviews:</strong> While less common in pure aggregate calculations, some prestigious institutions include holistic scores for a complete admission profile.
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-zinc-950 text-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_#4A90E2]">
            <h2 className="text-2xl font-black uppercase mb-6 text-[#4A90E2]">Admission Strategy 2026</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="font-black uppercase text-sm mb-2 text-[#4A90E2]">Maximize Your Test Score</p>
                <p className="text-sm text-white/70">Entrance exams are the single biggest variable you can control. Even a small percentile jump can move you up hundreds of spots in a competitive merit list.</p>
              </div>
              <div>
                <p className="font-black uppercase text-sm mb-2 text-[#4A90E2]">Plan for Early Decisions</p>
                <p className="text-sm text-white/70">Many global universities offer early decision or early action pools where the merit threshold may be slightly different. Use our calculator to see where you stand for early applications.</p>
              </div>
            </div>
          </section>
        </div>
      </BrutalContainer>
    </div>
  );
}
