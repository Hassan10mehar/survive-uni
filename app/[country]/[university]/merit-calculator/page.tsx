import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCountryById } from "@/lib/countries";
import { getUniById, getAllUniParams } from "@/lib/globalUnis";
import { UNIS } from "@/lib/unis";
import { BrutalContainer } from "@/app/components/BrutalUI";
import UniCalculator from "@/app/components/calculators/AggregateCalculator";
import GlobalMeritCalc from "./GlobalMeritCalc";
import UniSEOContent from "@/app/components/UniSEOContent";
import { getUniMeritMeta } from "@/lib/seo";

// Country-specific admission field configurations
const COUNTRY_CONFIGS: Record<string, {
  scaleLabel: string;
  note: string;
  fields: { id: string; label: string; placeholder: string; hint: string; max: number; weight: number }[];
  tiers: { label: string; min: number; color: string }[];
}> = {
  usa: {
    scaleLabel: "SAT + GPA Holistic",
    note: "US universities use holistic admissions. This tool estimates competitiveness using SAT score and GPA as primary factors. Extracurriculars, essays, and recommendations are also critical.",
    fields: [
      { id: "sat",  label: "SAT Score (or ACT equivalent)", placeholder: "e.g. 1500", hint: "Out of 1600. ACT: multiply by 24.", max: 1600, weight: 0.5 },
      { id: "gpa",  label: "Unweighted GPA",                placeholder: "e.g. 3.8",  hint: "Out of 4.0. Do not use weighted GPA.", max: 4.0,  weight: 0.4 },
      { id: "ecas", label: "Extracurricular Score (self-rate)", placeholder: "e.g. 8", hint: "Rate your ECAs 1–10 (sports, clubs, awards, leadership).", max: 10, weight: 0.1 },
    ],
    tiers: [
      { label: "Unlikely",       min: 0,  color: "#FF4911" },
      { label: "Reach",          min: 50, color: "#FFDF00" },
      { label: "Possible",       min: 65, color: "#FF90E8" },
      { label: "Good Chance",    min: 78, color: "#00FFC2" },
      { label: "Strong Candidate", min: 88, color: "#00FFC2" },
    ],
  },
  uk: {
    scaleLabel: "UCAS Tariff Points",
    note: "UK universities use UCAS tariff points. A-Level grades convert to points (A*=56, A=48, B=40, C=32). Most Russell Group universities require 128–168 points.",
    fields: [
      { id: "alevel1", label: "A-Level 1 Grade Points", placeholder: "e.g. 48", hint: "A*=56, A=48, B=40, C=32, D=24, E=16", max: 56, weight: 0.4 },
      { id: "alevel2", label: "A-Level 2 Grade Points", placeholder: "e.g. 48", hint: "A*=56, A=48, B=40, C=32, D=24, E=16", max: 56, weight: 0.35 },
      { id: "alevel3", label: "A-Level 3 Grade Points", placeholder: "e.g. 40", hint: "A*=56, A=48, B=40, C=32, D=24, E=16", max: 56, weight: 0.25 },
    ],
    tiers: [
      { label: "Below Standard",  min: 0,  color: "#FF4911" },
      { label: "Post-92 Unis",    min: 40, color: "#FFDF00" },
      { label: "Plate Glass Uni", min: 55, color: "#FF90E8" },
      { label: "Red Brick Uni",   min: 70, color: "#00FFC2" },
      { label: "Russell Group",   min: 82, color: "#00FFC2" },
    ],
  },
  india: {
    scaleLabel: "JEE / CGPA Based",
    note: "Indian university admission (IITs/NITs) is based on JEE Advanced/Main percentile and board exam scores. This tool estimates merit rank competitiveness.",
    fields: [
      { id: "jee",    label: "JEE Percentile",      placeholder: "e.g. 98.5", hint: "JEE Main/Advanced percentile out of 100", max: 100, weight: 0.65 },
      { id: "board",  label: "Board Exam Percentage", placeholder: "e.g. 92",  hint: "Class 12 board percentage (CBSE/State)", max: 100, weight: 0.35 },
    ],
    tiers: [
      { label: "Below Cutoff",    min: 0,  color: "#FF4911" },
      { label: "State NIT",       min: 45, color: "#FFDF00" },
      { label: "NIT (Home State)",min: 65, color: "#FF90E8" },
      { label: "NIT (All India)", min: 80, color: "#00FFC2" },
      { label: "IIT Possible",    min: 90, color: "#00FFC2" },
    ],
  },
};

export function generateStaticParams() {
  const global = getAllUniParams().map(p => ({ country: p.country, university: p.university }));
  const pk = UNIS.map(u => ({ country: "pakistan", university: u.id }));
  return [...global, ...pk];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; university: string }> }): Promise<Metadata> {
  const { country: countryId, university: uniId } = await params;
  const uniPK = countryId === "pakistan" ? UNIS.find(u => u.id === uniId) : undefined;
  const uniGlobal = getUniById(uniId);
  const uni = uniGlobal || uniPK;
  if (!uni) return { title: "Not Found" };
  if (uniPK) return getUniMeritMeta(uniPK, countryId);

  const country = getCountryById(countryId);
  const uniName = (uni as any).name;
  const toolName = country?.terms.merit || "Merit Calculator";

  const title = `${uniName} ${toolName} 2026 | Admission Eligibility`;
  const desc = `Free ${uniName} admission calculator. Check your eligibility, calculate your ${toolName.toLowerCase()} score, and compare against historical cutoffs.`;

  return {
    title,
    description: desc,
    keywords: [
      `${uniName.toLowerCase()} ${toolName.toLowerCase()}`,
      `${uniId} admission calculator`,
      `${uniName.toLowerCase()} cutoff 2026`,
    ],
    alternates: { canonical: `/${countryId}/${uniId}/merit-calculator` },
    openGraph: {
      title,
      description: desc,
      url: `https://surviveuni.online/${countryId}/${uniId}/merit-calculator`,
      type: 'website',
    },
  };
}

export default async function UniMeritPage({ params }: { params: Promise<{ country: string; university: string }> }) {
  const { country: countryId, university: uniId } = await params;
  const country = getCountryById(countryId);
  const uniGlobal = getUniById(uniId);
  const uniPK = countryId === "pakistan" ? UNIS.find(u => u.id === uniId) : undefined;
  const uni = uniGlobal || uniPK;
  if (!country || !uni) notFound();

  const uniName = (uni as any).name;
  const uniColor = (uniGlobal?.color) || (uniPK as any)?.color || country.color;
  const isPK = countryId === "pakistan";

  return (
    <>
      <div className="bg-black border-b-4 border-black px-4 py-2">
        <nav className="max-w-4xl mx-auto flex items-center gap-2 text-[10px] font-black uppercase text-[#FFDF00]/60">
          <Link href="/" className="hover:text-[#FFDF00]">Home</Link><span>/</span>
          <Link href={`/${countryId}`} className="hover:text-[#FFDF00]">{country.emoji} {country.name}</Link><span>/</span>
          <Link href={`/${countryId}/${uniId}`} className="hover:text-[#FFDF00]">{uniName}</Link><span>/</span>
          <span className="text-[#FFDF00]">{country.terms.merit}</span>
        </nav>
      </div>

      {/* Pakistan: use existing UniCalculator with full formula logic */}
      {countryId === "pakistan" && uniPK ? (
        <UniCalculator uni={uniPK as any} backHref={`/${countryId}/${uniId}`} />
      ) : (
        /* International: use config-driven GlobalMeritCalc */
        (() => {
          const cfg = COUNTRY_CONFIGS[countryId];
          if (!cfg) return (
            <BrutalContainer maxWidth="max-w-2xl" className="py-20 text-center">
              <p className="font-black text-xl uppercase">Admission calculator coming soon for {country.name}.</p>
              <Link href={`/${countryId}/${uniId}`} className="inline-block mt-6 border-4 border-black px-6 py-3 font-black text-xs uppercase bg-[#FFDF00] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                ← Back to {uniName}
              </Link>
            </BrutalContainer>
          );
          return (
            <GlobalMeritCalc
              uniName={uniName}
              uniShort={(uni as any).short || uniName}
              uniColor={uniColor}
              countryName={country.name}
              scaleLabel={cfg.scaleLabel}
              fields={cfg.fields}
              tiers={cfg.tiers}
              note={cfg.note}
            />
          );
        })()
      )}

      {/* ── SEO Content Section ── */}
      {isPK && uniPK ? (
        <UniSEOContent
          uni={uniPK}
          countryId={countryId}
          countryName={country.name}
          toolType="merit"
        />
      ) : (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-10 mb-16">
          <Link href={`/${countryId}/${uniId}`}
            className="inline-flex items-center gap-2 border-4 border-black px-5 py-2 font-black text-xs uppercase bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
          >
            ← All {uniName} Tools
          </Link>
        </div>
      )}
    </>
  );
}
