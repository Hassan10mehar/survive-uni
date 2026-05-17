import { GLOBAL_SCALES, getScaleById } from "@/lib/globalScales";
const BASE_URL = "https://surviveuni.online";
import GlobalGPACalculator from "./Calculator";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SEOSchema from "@/app/components/SEOSchema";
import { BrutalCard, BrutalContainer } from "@/app/components/BrutalUI";
import Link from "next/link";
import { Globe, Calculator } from "lucide-react";

export async function generateStaticParams() {
  return GLOBAL_SCALES.map(s => ({ scale: s.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ scale: string }> }): Promise<Metadata> {
  const { scale: scaleId } = await params;
  const scale = getScaleById(scaleId);
  if (!scale) return { title: "Calculator Not Found" };

  return {
    title: scale.seoTitle,
    description: scale.seoDescription,
    keywords: scale.seoKeywords,
    openGraph: {
      title: scale.seoTitle,
      description: scale.seoDescription,
      type: "website",
      siteName: "Survive Uni",
      url: `${BASE_URL}/global/gpa-calculator/${scaleId}`,
    },
    twitter: {
      card: "summary",
      title: scale.seoTitle,
      description: scale.seoDescription,
    },
    alternates: {
      canonical: `/global/gpa-calculator/${scaleId}`,
    },
  };
}

export default async function GlobalScalePage({ params }: { params: Promise<{ scale: string }> }) {
  const { scale: scaleId } = await params;
  const scale = getScaleById(scaleId);
  if (!scale) notFound();

  return (
    <>
      <SEOSchema
        type="WebApplication"
        data={{
          name: `${scale.system} GPA Calculator 2026`,
          url: `/global/gpa-calculator/${scaleId}`,
          description: scale.seoDescription,
          featureList: [
            `Official ${scale.system} grade scale`,
            'Real-time GPA calculation',
            'Multiple course tracking',
            `${scale.creditLabel} weighted average`,
            'Mobile-friendly, no sign-up required',
          ],
          ratingCount: '634',
        }}
      />
      <SEOSchema
        type="HowTo"
        data={{
          name: `How to Calculate Your ${scale.system}`,
          description: `Step-by-step guide to using the ${scale.region} GPA calculator.`,
          steps: [
            { name: "Add your courses", text: `Enter each course name and its ${scale.creditLabel.toLowerCase()} in the table.` },
            { name: "Select your grade", text: `Choose your grade from the official ${scale.system} scale. Grade points are pre-loaded.` },
            { name: "Read your live score", text: `Your ${scale.maxLabel} score appears instantly at the bottom. The color shows your academic standing.` },
            { name: "Plan what-if scenarios", text: `Add future courses to simulate the score you could achieve before finals.` },
          ],
        }}
      />
      <SEOSchema type="FAQPage" data={{ faqs: [
        {
          question: `What is a good ${scale.system} score?`,
          answer: `On the ${scale.system}, a score of ${(scale.maxScale * 0.75).toFixed(1)}+ is considered good. Most graduate programs in ${scale.region} require at least ${(scale.maxScale * 0.6).toFixed(1)} for admission. A score of ${(scale.maxScale * 0.9).toFixed(1)}+ is considered excellent.`,
        },
        {
          question: `What is the minimum passing score in the ${scale.system}?`,
          answer: `In ${scale.region}, a score of ${scale.targetMin} out of ${scale.maxScale} is typically required to pass. Falling below this in multiple courses may result in academic probation.`,
        },
        {
          question: `How does the ${scale.system} compare to the US 4.0 GPA?`,
          answer: `Both systems use weighted averages of course grades and credit hours, but with different scales and grade points. Use our Global GPA Calculator hub to compare all international systems side-by-side.`,
        },
      ]}} />
      <SEOSchema type="BreadcrumbList" data={{ items: [
        { position: 1, name: "Home", item: BASE_URL },
        { position: 2, name: "Global GPA Calculator", item: `${BASE_URL}/global/gpa-calculator` },
        { position: 3, name: scale.system, item: `${BASE_URL}/global/gpa-calculator/${scaleId}` },
      ]}} />

      <GlobalGPACalculator scale={scale} />

      <BrutalContainer maxWidth="max-w-3xl" className="mt-20 mb-20">
        <div className="space-y-16">
          {/* System Guide */}
          <section>
            <h2 className="text-3xl font-black uppercase mb-6 text-black dark:text-white underline decoration-4 decoration-[#FFDF00] underline-offset-8">
              {scale.emoji} {scale.region} Grading Guide
            </h2>
            <BrutalCard variant="white" className="p-8">
              <div className="prose dark:prose-invert max-w-none font-medium text-black/80 leading-relaxed">
                <p className="mb-4">
                  The <strong>{scale.system}</strong> is the standard academic scoring system used by universities in <strong>{scale.region}</strong>. Understanding this system is essential for scholarship applications, graduate admissions, and international transfers.
                </p>
                <div className="bg-black text-[#FFDF00] p-4 border-4 border-black mb-6">
                  <p className="font-black uppercase text-xs tracking-widest mb-1">How It Works</p>
                  <p className="text-lg font-black">{scale.note}</p>
                </div>
                <p className="mb-4">
                  Our calculator uses the <strong>official {scale.system} (2026)</strong>, giving you an instant, accurate score so you can plan your academic strategy.
                </p>
              </div>
            </BrutalCard>
          </section>

          {/* FAQ Section — Targets Long-Tail Keywords */}
          <section>
            <h2 className="text-3xl font-black uppercase mb-6 text-black dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <BrutalCard variant="secondary" className="p-6">
                <h3 className="font-black uppercase text-sm mb-2">
                  {scale.faqWhatIf}
                </h3>
                <p className="text-xs font-medium leading-relaxed opacity-80">
                  Use the What-If feature in our calculator above. Add the course with your predicted grade and watch the live score update instantly. This lets you plan which courses to focus on before finals.
                </p>
              </BrutalCard>
              <BrutalCard variant="secondary" className="p-6">
                <h3 className="font-black uppercase text-sm mb-2">
                  How does the {scale.system} compare to the US 4.0 scale?
                </h3>
                <p className="text-xs font-medium leading-relaxed opacity-80">
                  Our <Link href="/global/gpa-calculator/us-4-0" className="underline font-black">US 4.0 GPA Calculator</Link> and this {scale.system} calculator use the same Weighted Average logic but with different grade points. You can use our compare tool to convert between scales for international applications.
                </p>
              </BrutalCard>
              <BrutalCard variant="secondary" className="p-6">
                <h3 className="font-black uppercase text-sm mb-2">
                  What is the minimum passing score in the {scale.system}?
                </h3>
                <p className="text-xs font-medium leading-relaxed opacity-80">
                  In {scale.region}, a score of <strong>{scale.targetMin}</strong> out of <strong>{scale.maxScale}</strong> is typically required to pass. Falling below this threshold in multiple courses may result in academic probation. Always check your institution's specific requirements.
                </p>
              </BrutalCard>
            </div>
          </section>

          {/* Other Scales */}
          <section>
            <h2 className="text-3xl font-black uppercase mb-6 text-black dark:text-white">Other Grading Systems</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {GLOBAL_SCALES.filter(s => s.id !== scale.id).map(s => (
                <Link
                  key={s.id}
                  href={`/global/gpa-calculator/${s.id}`}
                  className="flex items-center gap-4 p-4 border-4 border-black bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
                >
                  <span className="text-2xl">{s.emoji}</span>
                  <div>
                    <p className="font-black text-xs uppercase">{s.region}</p>
                    <p className="text-[10px] font-bold opacity-60">{s.system}</p>
                  </div>
                  <Calculator className="w-4 h-4 ml-auto opacity-40" />
                </Link>
              ))}
            </div>
          </section>

          {/* CTA: Pakistan Tools */}
          <section className="bg-black p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-start gap-4">
              <Globe className="w-8 h-8 text-[#FFDF00] shrink-0 mt-1" />
              <div>
                <h3 className="font-black text-xl uppercase text-white mb-2">Pakistani Student?</h3>
                <p className="text-white/60 text-sm font-medium mb-4">
                  We have dedicated NUST, FAST-NUCES, UET, LUMS, and 17+ university aggregate calculators with official merit formulas.
                </p>
                <Link href="/tools/aggregate-calculator">
                  <span className="inline-block border-4 border-[#FFDF00] bg-[#FFDF00] text-black font-black text-xs uppercase px-6 py-3 shadow-[4px_4px_0px_0px_rgba(255,223,0,0.4)] hover:-translate-y-1 transition-all">
                    Go to PK Tools →
                  </span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </BrutalContainer>
    </>
  );
}
