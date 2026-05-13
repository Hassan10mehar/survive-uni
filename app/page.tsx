import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, Zap } from "lucide-react";
import InteractiveTools from "./components/InteractiveTools";
import CountryGrid from "./components/CountryGrid";

export const metadata: Metadata = {
  title: "Survive Uni | Global University Aggregate, GPA & Admission Hub 2026",
  description: "Calculate your admission merit, GPA, and graduation path for the world's top universities. Support for Ivy League, Russell Group, and major institutions in Pakistan & India.",
  keywords: ["university aggregate calculator", "gpa calculator", "admission merit tracker", "mdcat merit predictor", "nust aggregate calculator", "college admission tools 2026"],
  alternates: { canonical: "https://surviveuni.online" },
  openGraph: {
    title: "Survive Uni | The Ultimate Student Utility Suite",
    description: "Built by students, for students. Calculate your way to success.",
    url: "https://surviveuni.online",
    siteName: "Survive Uni",
    images: [{ url: "https://surviveuni.online/og-image.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="flex-1 bg-base dark:bg-zinc-950">
      {/* Dynamic Background Noise */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[-1] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-20 lg:py-24 space-y-20 sm:space-y-32 lg:space-y-40">
        
        {/* HERO SECTION - Server Rendered for Speed */}
        <section className="flex flex-col lg:flex-row gap-12 sm:gap-20 items-start">
          <div className="flex-1 space-y-10 sm:space-y-12">
            <div className="inline-flex items-center gap-4 bg-[#00FFC2] border-4 border-black px-6 py-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default group">
              <Zap className="w-5 h-5 fill-black group-hover:rotate-12 transition-transform" />
              <span className="font-black text-xs sm:text-sm uppercase tracking-[0.2em]">Global 2026-2027 Academic Hub</span>
            </div>
            
            <h1 className="font-black text-6xl sm:text-8xl lg:text-9xl uppercase leading-[0.8] tracking-tighter text-black dark:text-white">
              Survive <br />
              <span className="text-[#FF4911] drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">Uni.</span>
              <span className="text-3xl sm:text-5xl lg:text-6xl block mt-4 text-black/20 dark:text-white/10 italic">Global</span>
            </h1>
            
            <p className="font-bold text-xl sm:text-2xl lg:text-3xl text-black/70 dark:text-white/60 max-w-2xl leading-relaxed uppercase italic">
              Your ultimate academic mission control. Merit, GPA, and Admission tools for the world&apos;s leading universities.
            </p>
          </div>
        </section>

        {/* COUNTRY SELECTOR - NEW GLOBAL FEATURE */}
        <CountryGrid />

        {/* INTERACTIVE BENTO GRID - Client Side */}
        <InteractiveTools />

        {/* RESOURCE SECTION - Server Rendered for SEO */}
        <section className="space-y-12 sm:space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b-8 border-black dark:border-white pb-8">
            <div>
              <h2 className="font-black text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tighter text-black dark:text-white">
                Survival <span className="text-[#4A90E2]">Guides</span>
              </h2>
              <p className="font-bold text-lg sm:text-xl text-black/50 dark:text-white/40 uppercase mt-4">
                Pro tips to hack your university life
              </p>
            </div>
            <Link 
              href="/guides" 
              className="bg-black text-white px-8 py-4 font-black text-sm uppercase border-4 border-black hover:bg-white hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-2 active:translate-y-2 inline-flex items-center gap-3 w-fit"
            >
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Ivy League Admissions",
                desc: "The 2026 roadmap to Harvard, Yale & beyond.",
                icon: Zap,
                color: "#FFDF00",
                slug: "how-to-get-into-ivy-league-2026"
              },
              {
                title: "UK Grading System",
                desc: "Understanding 1st, 2:1, and 2:2 Degrees.",
                icon: BookOpen,
                color: "#00FFC2",
                slug: "uk-degree-classification-explained"
              },
              {
                title: "US GPA Scale Guide",
                desc: "4.0 vs 5.0 and Weighted GPA Explained.",
                icon: GraduationCap,
                color: "#FF90E8",
                slug: "us-gpa-scale-explained"
              }
            ].map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
                <div className="border-4 border-black dark:border-white p-8 bg-white dark:bg-zinc-900 group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] transition-all h-full">
                  <div 
                    className="w-12 h-12 border-4 border-black flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform"
                    style={{ backgroundColor: guide.color }}
                  >
                    <guide.icon className="w-6 h-6 text-black" />
                  </div>
                  <h3 className="font-black text-xl uppercase mb-3 text-black dark:text-white">
                    {guide.title}
                  </h3>
                  <p className="font-bold text-sm text-black/50 dark:text-white/40 mb-6 uppercase">
                    {guide.desc}
                  </p>
                  <div className="font-black text-[10px] uppercase text-black dark:text-white flex items-center gap-2">
                    Read Guide <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </section>

        {/* SEO TEXT SECTION - High crawl priority */}
        <section className="max-w-4xl border-l-8 border-black dark:border-white pl-8 sm:pl-12 py-4">
          <h2 className="font-black text-3xl uppercase mb-6 text-black dark:text-white">Why Survive Uni?</h2>
          <div className="prose prose-xl prose-stone dark:prose-invert font-bold text-black/60 dark:text-white/50 uppercase leading-relaxed">
            <p className="mb-6">
              University life is complex across every border. From NUST&apos;s aggregate formulas in Pakistan to UCAS points in the UK and 4.0 scale GPA tracking in the USA, students face unique academic hurdles. 
            </p>
            <p>
              Survive Uni provides verified, regionalized calculators for 
              <span className="text-black dark:text-white mx-2">Global Institutions</span> 
              to ensure you always know exactly where you stand. Our 2026 merit predictors use historical data to give you the most accurate estimates available.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
