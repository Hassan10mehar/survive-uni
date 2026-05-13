import Link from "next/link";
import type { Metadata } from "next";
import { UNIS } from "@/lib/unis";
import { COUNTRIES } from "@/lib/countries";
import { ArrowRight, Info } from "lucide-react";
import { BrutalCard, BrutalHeader, BrutalContainer } from "@/app/components/BrutalUI";
import SEOSchema from "@/app/components/SEOSchema";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "GPA Calculator 2026 | Calculate Semester GPA Worldwide | Survive Uni",
  description:
    "Calculate your semester GPA accurately for universities worldwide. Support for NUST, FAST, Harvard, Oxford, and standard HEC/Global 4.0 scales. Free, accurate, and updated for 2026.",
  alternates: { canonical: "/tools/gpa-calculator" },
  keywords: ["university gpa calculator", "semester gpa calculator", "HEC gpa scale", "calculate semester gpa", "global gpa calculator"],
};

export default function GPAIndexPage() {
  return (
    <div className="flex-1 pb-20">
      <SEOSchema 
        type="SoftwareApplication" 
        data={{
          name: "Survive Uni GPA Calculator",
          description: "Free semester GPA calculator for universities worldwide, featuring institution-specific grading scales."
        }} 
      />
      <SEOSchema 
        type="FAQPage" 
        data={{
          faqs: [
            {
              question: "How is GPA calculated?",
              answer: "GPA is calculated by multiplying grade points by credit hours for each subject, summing them up, and dividing by total credit hours."
            },
            {
              question: "Does it support international scales?",
              answer: "Yes, Survive Uni provides dedicated calculators for global regions including USA, UK, India, and Pakistan, as well as a Standard 4.0 scale."
            }
          ]
        }} 
      />
      <BrutalHeader 
        title="GPA Calculator" 
        subtitle="Global University Grading Scales"
        backHref="/"
        bgColor="#00FFC2"
      />

      <BrutalContainer maxWidth="max-w-3xl">
        <Breadcrumbs items={[{ label: "Tools", href: "/" }, { label: "GPA Calculator" }]} />
        <BrutalCard variant="black" className="mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#00FFC2] p-2 border-2 border-white shrink-0">
              <Info className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="font-black text-xs uppercase tracking-widest text-[#00FFC2] mb-1">Institution-Specific Grading</p>
              <p className="text-sm text-white/80 font-bold leading-relaxed">
                Every institution uses its own official grading system. Whether you&apos;re at NUST, FAST, or a global university using a standard 4.0 scale, pick your region to get the exact calculator you need.
              </p>
            </div>
          </div>
        </BrutalCard>

        <Link href="/tools/gpa-calculator/standard" className="block mb-8">
          <BrutalCard variant="secondary" className="p-6 group cursor-pointer hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-black text-xl uppercase text-black">Standard / Generic</p>
                <p className="text-xs font-bold text-black/60 mt-1 uppercase">Universal 4.0 scale (A, B, C, D...)</p>
              </div>
              <div className="bg-black text-[#FFDF00] p-3 border-4 border-black group-hover:translate-x-2 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </BrutalCard>
        </Link>

        <h2 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-black/40 dark:text-white/40">Select Region</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {COUNTRIES.map((c) => (
            <Link key={c.id} href={`/${c.id}/gpa-calculator`} className="block group h-full">
              <BrutalCard 
                className="p-8 cursor-pointer group-hover:-translate-y-1 transition-all h-full flex flex-col border-4"
                style={{ backgroundColor: c.color, color: "#fff", borderColor: 'black' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl">{c.emoji}</span>
                  <div className="bg-black text-white px-3 py-1 font-black text-[10px] uppercase border-2 border-black">
                    {c.terms.grade}
                  </div>
                </div>
                <h3 className="font-black text-2xl uppercase leading-tight mb-2">{c.name}</h3>
                <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{c.terms.grade} Hub</p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-black/10">
                  <span className="font-black text-[10px] uppercase tracking-widest">Explore Unis</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </BrutalCard>
            </Link>
          ))}
        </div>

        <BrutalCard variant="black" className="mt-12 bg-zinc-950">
          <p className="font-black text-xs uppercase text-[#00FFC2] mb-3 tracking-widest">🏛️ Global Academic Standards</p>
          <p className="text-sm text-white/70 font-medium leading-relaxed">
            Our calculators are updated for the 2026-2027 academic cycle. If your institution is not listed, use the <Link href="/tools/gpa-calculator/standard" className="text-[#00FFC2] underline">Standard Calculator</Link> which follows the universal 4.0 weighted average model.
          </p>
        </BrutalCard>

        {/* SEO Content Section */}
        <div className="mt-20 space-y-12">
          <section>
            <h2 className="text-3xl font-black uppercase mb-6 text-black dark:text-white underline decoration-4 decoration-[#00FFC2] underline-offset-8">
              How to Calculate Your Grade Point Average (GPA)
            </h2>
            <div className="prose dark:prose-invert max-w-none font-medium text-black/70 dark:text-white/70 leading-relaxed">
              <p className="mb-4">
                Calculating your Grade Point Average (GPA) for the semester is crucial for tracking academic performance and maintaining scholarship eligibility. While grading ranges vary between institutions, the fundamental weighted average method remains the global standard.
              </p>
              <p className="mb-4 font-bold text-black dark:text-white">
                The Universal Formula: Σ (Grade Points × Credit Hours) / Σ (Total Credit Hours)
              </p>
              <ul className="list-disc pl-5 space-y-2 mb-6">
                <li><strong>Step 1:</strong> Identify the Grade Points for each subject (e.g., A = 4.0, B = 3.0).</li>
                <li><strong>Step 2:</strong> Multiply Grade Points by the Credit Hours of that subject.</li>
                <li><strong>Step 3:</strong> Sum all these products to get your Total Quality Points.</li>
                <li><strong>Step 4:</strong> Divide by the total Credit Hours taken in the semester.</li>
              </ul>
            </div>
          </section>

          <section className="bg-black text-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_#00FFC2]">
            <h2 className="text-2xl font-black uppercase mb-6 text-[#00FFC2]">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <p className="font-black uppercase text-sm mb-2">Is this GPA calculator accurate for my university?</p>
                <p className="text-sm text-white/70">Yes. Unlike generic calculators, Survive Uni uses institution-specific grading scales. Whether you&apos;re in Pakistan, USA, or the UK, we use the specific weights approved by your regional academic authorities.</p>
              </div>
              <div>
                <p className="font-black uppercase text-sm mb-2">What is a passing GPA?</p>
                <p className="text-sm text-white/70">Most universities require a minimum GPA of 2.0/4.0 to remain in good standing. Top-tier institutions or specific degree programs (like Engineering or Medicine) may have higher thresholds.</p>
              </div>
              <div>
                <p className="font-black uppercase text-sm mb-2">Does this work for cumulative GPA?</p>
                <p className="text-sm text-white/70">For overall cumulative GPA across all semesters, use our <Link href="/tools/cgpa-calculator" className="text-[#00FFC2] underline uppercase">CGPA Calculator</Link>.</p>
              </div>
            </div>
          </section>
        </div>
      </BrutalContainer>
    </div>
  );
}
