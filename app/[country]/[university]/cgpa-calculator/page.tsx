import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCountryById } from "@/lib/countries";
import { getUniById, getAllUniParams } from "@/lib/globalUnis";
import { getScaleById } from "@/lib/globalScales";
import { UNIS } from "@/lib/unis";
import SEOSchema from "@/app/components/SEOSchema";
import GlobalGPACalculator from "@/app/global/gpa-calculator/[scale]/Calculator";
import CGPACalculator from "@/app/components/calculators/CGPACalculator";
import { BrutalContainer } from "@/app/components/BrutalUI";

export function generateStaticParams() {
  const global = getAllUniParams().map(p => ({ country: p.country, university: p.university }));
  const pk = UNIS.map(u => ({ country: "pakistan", university: u.id }));
  return [...global, ...pk];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; university: string }> }): Promise<Metadata> {
  const { country: countryId, university: uniId } = await params;
  const country = getCountryById(countryId);
  const uni = getUniById(uniId) || (countryId === "pakistan" ? UNIS.find(u => u.id === uniId) : undefined);
  if (!uni || !country) return { title: "Not Found" };
  const uniName = (uni as any).name;
  const title = `${uniName} CGPA Calculator 2026 | Cumulative Grade Point Average`;
  const desc = `Free ${uniName} CGPA calculator. Track your cumulative grade point average across all semesters using the ${country.name} official grading scale.`;
  return {
    title, description: desc,
    keywords: [`${uniName.toLowerCase()} cgpa calculator`, `${uniId} cumulative gpa`, `${uniName.toLowerCase()} cgpa 2026`],
    alternates: { canonical: `/${countryId}/${uniId}/cgpa-calculator` },
  };
}

export default async function UniCGPAPage({ params }: { params: Promise<{ country: string; university: string }> }) {
  const { country: countryId, university: uniId } = await params;
  const country = getCountryById(countryId);
  const uni = getUniById(uniId) || (countryId === "pakistan" ? UNIS.find(u => u.id === uniId) : undefined);
  if (!country || !uni) notFound();

  const uniName = (uni as any).name;
  const scaleId = (uni as any).gradingScaleId || "us-4-0";
  const scale = getScaleById(scaleId);
  if (!scale) notFound();

  return (
    <>
      <SEOSchema type="SoftwareApplication" data={{ name: `${uniName} CGPA Calculator`, description: `Free cumulative GPA calculator for ${uniName}.` }} />
      <SEOSchema type="BreadcrumbList" data={{ items: [
        { position: 1, name: "Home", item: "https://surviveuni.online" },
        { position: 2, name: country.name, item: `https://surviveuni.online/${countryId}` },
        { position: 3, name: uniName, item: `https://surviveuni.online/${countryId}/${uniId}` },
        { position: 4, name: "CGPA Calculator", item: `https://surviveuni.online/${countryId}/${uniId}/cgpa-calculator` },
      ]}} />

      <div className="bg-black border-b-4 border-black px-4 py-2">
        <nav className="max-w-4xl mx-auto flex items-center gap-2 text-[10px] font-black uppercase text-[#FFDF00]/60">
          <Link href="/" className="hover:text-[#FFDF00]">Home</Link><span>/</span>
          <Link href={`/${countryId}`} className="hover:text-[#FFDF00]">{country.emoji} {country.name}</Link><span>/</span>
          <Link href={`/${countryId}/${uniId}`} className="hover:text-[#FFDF00]">{uniName}</Link><span>/</span>
          <span className="text-[#FFDF00]">CGPA Calculator</span>
        </nav>
      </div>

      {/* Use specialized calculator for Pakistan, Global for others */}
      {countryId === "pakistan" ? (
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

      <BrutalContainer maxWidth="max-w-3xl" className="mt-16 mb-24 space-y-8">
        <section>
          <h2 className="text-2xl font-black uppercase mb-4 underline decoration-4 decoration-[#FFDF00] underline-offset-8">
            What is CGPA at {uniName}?
          </h2>
          <div className="border-4 border-black p-6 bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-bold text-sm leading-relaxed">
              CGPA (Cumulative Grade Point Average) at {uniName} is the weighted average of all your semester GPAs.
              The university uses the <strong>{scale.system}</strong> — {scale.note}. Add all your semesters above to see your running CGPA instantly.
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-black uppercase mb-4">FAQs</h2>
          <div className="space-y-3">
            {[
              { q: `What is a good CGPA at ${uniName}?`, a: `A CGPA of ${(scale.maxScale * 0.83).toFixed(1)}+ (B+ equivalent) is considered competitive for graduate admissions and jobs at ${uniName}. A ${(scale.maxScale * 0.9).toFixed(1)}+ is honors-level performance.` },
              { q: `How to convert ${uniName} CGPA to percentage?`, a: `Multiply your CGPA by ${(100 / scale.maxScale).toFixed(1)} to get a percentage. E.g., ${(scale.maxScale * 0.85).toFixed(1)} CGPA = ${85}%.` },
            ].map(({ q, a }) => (
              <div key={q} className="border-4 border-black p-5 bg-white dark:bg-zinc-900">
                <h3 className="font-black text-xs uppercase mb-2">{q}</h3>
                <p className="text-xs font-medium leading-relaxed opacity-70">{a}</p>
              </div>
            ))}
          </div>
        </section>
        <Link href={`/${countryId}/${uniId}`} className="inline-flex items-center gap-2 border-4 border-black px-5 py-2 font-black text-xs uppercase bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
          ← All {uniName} Tools
        </Link>
      </BrutalContainer>
    </>
  );
}
