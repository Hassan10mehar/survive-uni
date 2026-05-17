import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCountryById } from "@/lib/countries";
import { getUniById, getAllUniParams } from "@/lib/globalUnis";
import { getScaleById } from "@/lib/globalScales";
import { UNIS } from "@/lib/unis";
import GlobalGPACalculator from "@/app/global/gpa-calculator/[scale]/Calculator";
import CGPACalculator from "@/app/components/calculators/CGPACalculator";
import UniSEOContent from "@/app/components/UniSEOContent";
import { getUniCGPAMeta } from "@/lib/seo";

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
  if (uniPK) return getUniCGPAMeta(uniPK, countryId);
  const uniName = (uni as any).name;
  const title = `${uniName} CGPA Calculator 2026 | Cumulative GPA Tracker — Survive Uni`;
  const desc = `Free ${uniName} CGPA calculator. Track your cumulative grade point average across all semesters, simulate target GPA scenarios, and plan your academic recovery.`;
  return {
    title, description: desc,
    alternates: { canonical: `/${countryId}/${uniId}/cgpa-calculator` },
    openGraph: { title, description: desc, url: `https://surviveuni.online/${countryId}/${uniId}/cgpa-calculator`, type: 'website' },
  };
}

export default async function UniCGPAPage({ params }: { params: Promise<{ country: string; university: string }> }) {
  const { country: countryId, university: uniId } = await params;
  const country = getCountryById(countryId);
  const uniPK = countryId === "pakistan" ? UNIS.find(u => u.id === uniId) : undefined;
  const uni = getUniById(uniId) || uniPK;
  if (!country || !uni) notFound();

  const uniName = (uni as any).name;
  const scaleId = (uni as any).gradingScaleId || "us-4-0";
  const scale = getScaleById(scaleId);
  if (!scale) notFound();

  const isPK = countryId === "pakistan";

  return (
    <>
      <div className="bg-black border-b-4 border-black px-4 py-2">
        <nav className="max-w-4xl mx-auto flex items-center gap-2 text-[10px] font-black uppercase text-[#FFDF00]/60">
          <Link href="/" className="hover:text-[#FFDF00]">Home</Link><span>/</span>
          <Link href={`/${countryId}`} className="hover:text-[#FFDF00]">{country.emoji} {country.name}</Link><span>/</span>
          <Link href={`/${countryId}/${uniId}`} className="hover:text-[#FFDF00]">{uniName}</Link><span>/</span>
          <span className="text-[#FFDF00]">CGPA Calculator</span>
        </nav>
      </div>

      {isPK ? (
        <CGPACalculator
          uniName={uniName}
          themeColor={(uni as any).color}
          textColor={(uni as any).textColor}
          gpaScale={(uni as any).gpaScale}
          backHref={`/${countryId}/${uniId}`}
        />
      ) : (
        <GlobalGPACalculator scale={scale} />
      )}

      {isPK && uniPK ? (
        <UniSEOContent
          uni={uniPK}
          countryId={countryId}
          countryName={country.name}
          toolType="cgpa"
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
