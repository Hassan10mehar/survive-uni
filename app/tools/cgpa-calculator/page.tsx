import Link from "next/link";
import type { Metadata } from "next";
import { UNIS } from "@/lib/unis";
import { COUNTRIES } from "@/lib/countries";
import { ArrowRight, Info } from "lucide-react";
import { BrutalCard, BrutalHeader, BrutalContainer } from "@/app/components/BrutalUI";
import SEOSchema from "@/app/components/SEOSchema";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "CGPA Calculator 2026 | Global Cumulative GPA Tracker | Survive Uni",
  description:
    "Free cumulative CGPA calculators for universities worldwide. Track your CGPA with target predictions, weighted averages, and institution-specific grading scales updated for 2026.",
  alternates: { canonical: "/tools/cgpa-calculator" },
  keywords: ["CGPA calculator", "how to calculate cgpa", "university cgpa tracker", "cumulative gpa formula", "global cgpa calculator"],
};

export default function CGPAIndexPage() {
  return (
    <main className="min-h-screen bg-[#F4F4F0] dark:bg-zinc-900 pb-20">
      <SEOSchema 
        type="SoftwareApplication" 
        data={{
          name: "Survive Uni CGPA Calculator",
          description: "Calculate and track your cumulative GPA (CGPA) for all semesters. Features target GPA prediction for students worldwide."
        }} 
      />
      <SEOSchema 
        type="FAQPage" 
        data={{
          faqs: [
            {
              question: "What is the difference between GPA and CGPA?",
              answer: "GPA (Semester Grade Point Average) is for a single semester, while CGPA (Cumulative Grade Point Average) is the overall average of all semesters completed."
            },
            {
              question: "How do I calculate my CGPA?",
              answer: "Multiply each semester's GPA by its total credit hours, add them all up, and divide by the total cumulative credit hours."
            }
          ]
        }} 
      />
      <BrutalHeader 
        title="CGPA Calculator" 
        subtitle="Global Cumulative GPA Tracking"
        backHref="/"
        bgColor="#FF4911"
        textColor="#fff"
      />

      <BrutalContainer maxWidth="max-w-3xl">
        <Breadcrumbs items={[{ label: "Tools", href: "/" }, { label: "CGPA Calculator" }]} />
        
        <BrutalCard variant="black" className="mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-[#FF4911] p-2 border-2 border-white shrink-0">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-xs uppercase tracking-widest text-[#FF4911] mb-1">Cumulative GPA Tracking</p>
              <p className="text-sm text-white/80 font-bold leading-relaxed">
                Enter each semester&apos;s GPA and credit hours to calculate your overall CGPA. The target calculator also helps you predict what GPA you need next semester to reach your goal.
              </p>
            </div>
          </div>
        </BrutalCard>

        <Link href="/tools/cgpa-calculator/standard" className="block mb-8">
          <BrutalCard variant="white" className="p-6 bg-[#FFDF00] group cursor-pointer hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-black text-xl uppercase text-black">Standard / Generic</p>
                <p className="text-xs font-bold text-black/60 mt-1 uppercase">Universal 4.0 scale (Cumulative)</p>
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
            <Link key={c.id} href={`/${c.id}/cgpa-calculator`} className="block group h-full">
              <BrutalCard 
                className="p-8 cursor-pointer group-hover:-translate-y-1 transition-all h-full flex flex-col border-4"
                style={{ backgroundColor: c.color, color: "#fff", borderColor: 'black' }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl">{c.emoji}</span>
                  <div className="bg-black text-white px-3 py-1 font-black text-[10px] uppercase border-2 border-black">
                    CGPA
                  </div>
                </div>
                <h3 className="font-black text-2xl uppercase leading-tight mb-2">{c.name}</h3>
                <p className="text-xs font-bold opacity-80 uppercase tracking-widest">{c.terms.grade} Tracking</p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-black/10">
                  <span className="font-black text-[10px] uppercase tracking-widest">Explore Hub</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </BrutalCard>
            </Link>
          ))}
        </div>

        {/* SEO Content Section */}
        <div className="mt-20 space-y-12">
          <section>
            <h2 className="text-3xl font-black uppercase mb-6 text-black dark:text-white underline decoration-4 decoration-[#FF4911] underline-offset-8">
              Understanding Cumulative GPA (CGPA) Calculation
            </h2>
            <div className="prose dark:prose-invert max-w-none font-medium text-black/70 dark:text-white/70 leading-relaxed">
              <p className="mb-4">
                Your Cumulative Grade Point Average (CGPA) is the most critical metric in your academic journey. It reflects your overall performance across all semesters and is often used by employers and grad schools for initial screening.
              </p>
              <div className="bg-white dark:bg-zinc-800 p-6 border-4 border-black mb-6">
                <p className="font-black uppercase text-sm mb-2 text-[#FF4911]">The Cumulative Formula</p>
                <p className="text-lg font-black font-mono">CGPA = Σ(Semester GPA × Semester Credits) / Total Credits</p>
              </div>
              <p className="mb-4">
                This weighted average means that semesters with higher total credit hours have a larger impact on your final degree result. Our target tracking tool allows you to simulate future outcomes and plan your academic recovery if needed.
              </p>
            </div>
          </section>

          <section className="bg-black text-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_#FF4911]">
            <h2 className="text-2xl font-black uppercase mb-6 text-[#FF4911]">CGPA FAQ</h2>
            <div className="space-y-6 text-white/80">
              <div>
                <p className="font-black uppercase text-sm mb-2 text-white">Can I improve my CGPA after graduation?</p>
                <p className="text-sm">Generally, once your degree is conferred, your CGPA is finalized. It is always better to monitor your progress using a tracker like Survive Uni during your studies so you can repeat courses if necessary.</p>
              </div>
              <div>
                <p className="font-black uppercase text-sm mb-2 text-white">What is a &quot;Good&quot; CGPA?</p>
                <p className="text-sm">While definitions vary, a 3.5+ is globally recognized as excellent (Honors/Dean&apos;s List). A 3.0+ is considered strong for most professional and academic opportunities. Anything below 2.0 typically signals academic risk.</p>
              </div>
            </div>
          </section>
        </div>
      </BrutalContainer>
    </main>
  );
}
