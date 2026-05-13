import type { Metadata } from "next";
import { GLOBAL_SCALES } from "@/lib/globalScales";
import Link from "next/link";
import { Globe, Calculator, ArrowRight } from "lucide-react";
import { BrutalCard, BrutalContainer } from "@/app/components/BrutalUI";
import SEOSchema from "@/app/components/SEOSchema";

export const metadata: Metadata = {
  title: "International GPA Calculator | WAM, ECTS, CAP, 4.0 Scale & More | Survive Uni",
  description: "Free GPA calculators for every major grading system worldwide. US 4.0 scale, UK Honours, Australia WAM, Europe ECTS, India CGPA, and Singapore CAP. Trusted by students globally.",
  keywords: [
    "international gpa calculator", "gpa calculator 4.0 scale", "wam calculator australia",
    "ects grade calculator", "cap calculator singapore", "cgpa calculator india",
    "uk degree classification calculator", "world gpa converter", "global grade calculator",
  ],
  alternates: { canonical: "/global/gpa-calculator" },
};

const REGION_COLORS: Record<string, string> = {
  "us-4-0":         "#3B5BDB",
  "uk-honours":     "#C92A2A",
  "india-10-0":     "#F76707",
  "europe-ects":    "#1971C2",
  "aus-wam":        "#2F9E44",
  "singapore-cap":  "#E03131",
};

export default function GlobalGPAIndex() {
  return (
    <>
      <SEOSchema
        type="SoftwareApplication"
        data={{
          name: "International GPA Calculator Suite",
          description: "A collection of free GPA calculators for every major international grading system.",
        }}
      />

      {/* Hero */}
      <div className="bg-black border-b-8 border-black pt-16 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#FFDF00] text-black border-4 border-black px-4 py-2 font-black text-xs uppercase tracking-widest mb-6">
            <Globe className="w-4 h-4" />
            International Tools
          </div>
          <h1 className="text-5xl sm:text-7xl font-black uppercase text-white leading-none mb-4">
            Global GPA<br />
            <span className="text-[#FFDF00]">Calculator</span>
          </h1>
          <p className="text-white/60 text-lg font-bold max-w-2xl">
            Calculate your academic score in any grading system. US 4.0, UK Honours, Australian WAM, European ECTS, Indian CGPA, and Singapore CAP — all in one place.
          </p>
        </div>
      </div>

      <BrutalContainer maxWidth="max-w-4xl" className="py-16">
        {/* Scale Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {GLOBAL_SCALES.map(scale => (
            <Link
              key={scale.id}
              href={`/global/gpa-calculator/${scale.id}`}
              className="group flex flex-col border-4 border-black bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              {/* Color bar */}
              <div className="h-3 w-full border-b-4 border-black" style={{ backgroundColor: scale.color }} />

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{scale.emoji}</span>
                  <span className="font-black text-xs uppercase border-2 border-black px-2 py-1">
                    /{scale.maxLabel}
                  </span>
                </div>

                <h2 className="font-black text-lg uppercase leading-tight mb-1">{scale.system}</h2>
                <p className="text-xs font-bold text-black/50 dark:text-white/50 uppercase tracking-widest mb-3">
                  {scale.region}
                </p>
                <p className="text-xs font-medium text-black/70 dark:text-white/70 leading-relaxed flex-1">
                  {scale.seoDescription.split(".")[0]}.
                </p>

                <div className="flex items-center justify-between mt-4 pt-4 border-t-2 border-black/10">
                  <span className="text-[10px] font-black uppercase text-black/40 dark:text-white/40">
                    {scale.grades.length} grade levels
                  </span>
                  <ArrowRight className="w-5 h-5 text-black/40 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Comparison Table */}
        <section className="mb-20">
          <h2 className="text-3xl font-black uppercase mb-8 text-black dark:text-white underline decoration-4 decoration-[#FFDF00] underline-offset-8">
            Scale Comparison
          </h2>
          <BrutalCard variant="white" className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm font-bold">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="text-left px-4 py-3 font-black uppercase text-xs tracking-widest">Region</th>
                    <th className="text-left px-4 py-3 font-black uppercase text-xs tracking-widest">System</th>
                    <th className="text-left px-4 py-3 font-black uppercase text-xs tracking-widest">Max</th>
                    <th className="text-left px-4 py-3 font-black uppercase text-xs tracking-widest">Min Pass</th>
                    <th className="text-left px-4 py-3 font-black uppercase text-xs tracking-widest">Credit Unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black">
                  {GLOBAL_SCALES.map((s, i) => (
                    <tr key={s.id} className={i % 2 === 0 ? "bg-white dark:bg-zinc-900" : "bg-zinc-50 dark:bg-zinc-800"}>
                      <td className="px-4 py-3">
                        <Link href={`/global/gpa-calculator/${s.id}`} className="flex items-center gap-2 hover:underline">
                          <span>{s.emoji}</span>
                          <span className="font-black text-xs">{s.region}</span>
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-xs">{s.system}</td>
                      <td className="px-4 py-3">
                        <span className="font-black text-sm border-2 border-black px-2 py-0.5">{s.maxScale}</span>
                      </td>
                      <td className="px-4 py-3 text-xs">{s.targetMin}+</td>
                      <td className="px-4 py-3 text-xs text-black/60 dark:text-white/60">{s.creditLabel}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </BrutalCard>
        </section>

        {/* CTA: Pakistan Tools */}
        <section>
          <BrutalCard variant="black" className="p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="text-5xl">🇵🇰</div>
              <div className="flex-1">
                <h3 className="font-black text-xl uppercase text-white mb-2">Pakistan Merit Calculators</h3>
                <p className="text-white/60 text-sm font-medium">
                  NUST, FAST, UET, COMSATS, PIEAS, GIKI, and 17+ universities with official aggregate formulas.
                </p>
              </div>
              <Link href="/tools/aggregate-calculator" className="shrink-0">
                <span className="inline-flex items-center gap-2 border-4 border-[#FFDF00] bg-[#FFDF00] text-black font-black text-xs uppercase px-6 py-3 shadow-[4px_4px_0px_0px_rgba(255,223,0,0.4)] hover:-translate-y-1 transition-all">
                  PK Tools <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </BrutalCard>
        </section>
      </BrutalContainer>
    </>
  );
}
