import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCountryById, COUNTRIES } from "@/lib/countries";
import { getUniById, getAllUniParams } from "@/lib/globalUnis";
import { getScaleById } from "@/lib/globalScales";
import { UNIS } from "@/lib/unis";
import SEOSchema from "@/app/components/SEOSchema";
import GlobalGPACalculator from "@/app/global/gpa-calculator/[scale]/Calculator";
import GPACalculator from "@/app/components/calculators/GPACalculator";
import { BrutalContainer } from "@/app/components/BrutalUI";

export function generateStaticParams() {
  const global = getAllUniParams().map(p => ({ country: p.country, university: p.university }));
  const pk = UNIS.map(u => ({ country: "pakistan", university: u.id }));
  return [...global, ...pk];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; university: string }> }): Promise<Metadata> {
  const { country: countryId, university: uniId } = await params;
  const uni = getUniById(uniId) || (countryId === "pakistan" ? UNIS.find(u => u.id === uniId) : undefined);
  const country = getCountryById(countryId);
  if (!uni || !country) return { title: "Not Found" };

  const uniName = (uni as any).name;
  const grade = country.terms.grade;
  const title = (uni as any).seoTitle
    ? `${uniName} ${grade} Calculator 2026 | Survive Uni`
    : `${uniName} GPA Calculator 2026 | Free ${grade} Calculator`;
  const desc = `Free ${uniName} GPA calculator using the official ${country.name} grading scale. Track your semester ${grade}, predict finals, and plan your academic goals.`;

  return {
    title,
    description: desc,
    keywords: [`${uniName.toLowerCase()} gpa calculator`, `${uniName.toLowerCase()} ${grade.toLowerCase()} calculator`, `${uniId} gpa calculator 2026`],
    alternates: { canonical: `/${countryId}/${uniId}/gpa-calculator` },
    openGraph: { title, description: desc },
  };
}

export default async function UniGPAPage({ params }: { params: Promise<{ country: string; university: string }> }) {
  const { country: countryId, university: uniId } = await params;
  const country = getCountryById(countryId);
  const uniGlobal = getUniById(uniId);
  const uniPK = countryId === "pakistan" ? UNIS.find(u => u.id === uniId) : undefined;
  const uni = uniGlobal || uniPK;
  if (!country || !uni) notFound();

  const uniName = (uni as any).name;
  const scaleId = uniGlobal?.gradingScaleId || "us-4-0";
  const scale = getScaleById(scaleId);
  if (!scale) notFound();

  return (
    <>
      <SEOSchema type="SoftwareApplication" data={{
        name: `${uniName} GPA Calculator`,
        description: `Free GPA calculator for ${uniName} students using the ${scale.system}.`,
      }} />
      <SEOSchema type="BreadcrumbList" data={{ items: [
        { position: 1, name: "Home", item: "https://surviveuni.online" },
        { position: 2, name: country.name, item: `https://surviveuni.online/${countryId}` },
        { position: 3, name: uniName, item: `https://surviveuni.online/${countryId}/${uniId}` },
        { position: 4, name: "GPA Calculator", item: `https://surviveuni.online/${countryId}/${uniId}/gpa-calculator` },
      ]}} />

      {/* Breadcrumb nav */}
      <div className="bg-black border-b-4 border-black px-4 py-2">
        <nav className="max-w-4xl mx-auto flex items-center gap-2 text-[10px] font-black uppercase text-[#FFDF00]/60">
          <Link href="/" className="hover:text-[#FFDF00]">Home</Link>
          <span>/</span>
          <Link href={`/${countryId}`} className="hover:text-[#FFDF00]">{country.emoji} {country.name}</Link>
          <span>/</span>
          <Link href={`/${countryId}/${uniId}`} className="hover:text-[#FFDF00]">{uniName}</Link>
          <span>/</span>
          <span className="text-[#FFDF00]">GPA Calculator</span>
        </nav>
      </div>

      {/* Use specialized calculator for Pakistan, Global for others */}
      {countryId === "pakistan" ? (
        <GPACalculator 
          uniName={uniName} 
          themeColor={(uni as any).color} 
          textColor={(uni as any).textColor}
          gpaScale={(uni as any).gpaScale}
          backHref={`/${countryId}/${uniId}`}
        />
      ) : (
        <GlobalGPACalculator scale={scale} />
      )}

      {/* SEO Content Footer */}
      <BrutalContainer maxWidth="max-w-3xl" className="mt-16 mb-24 space-y-8">
        <section>
          <h2 className="text-2xl font-black uppercase mb-4 underline decoration-4 decoration-[#FFDF00] underline-offset-8">
            About the {uniName} {country.terms.grade} System
          </h2>
          <div className="border-4 border-black p-6 bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-bold text-sm leading-relaxed mb-3">
              {uniName} uses the <strong>{scale.system}</strong> — {scale.note}. 
              This calculator uses the official {scale.region} grading table, giving you an accurate, real-time {country.terms.grade} score as you enter your courses.
            </p>
            <div className="bg-black text-[#FFDF00] p-3 font-black text-xs uppercase tracking-widest inline-block">
              Scale: 0 – {scale.maxScale} · Passing: {scale.targetMin}+ · Credits: {scale.creditLabel}
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black uppercase mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: `How is GPA calculated at ${uniName}?`, a: `${uniName} uses the ${scale.system}. Each course is weighted by ${scale.creditLabel.toLowerCase()}. The formula is: GPA = Σ(Grade Points × Credits) ÷ Σ(Credits). Our calculator automates this instantly.` },
              { q: `What is a good GPA at ${uniName}?`, a: `On the ${scale.system}, a ${scale.targetMin}+ is considered passing. Most graduate programs and competitive employers look for ${(scale.maxScale * 0.83).toFixed(1)}+ (equivalent to a B+ average). A ${(scale.maxScale * 0.9).toFixed(1)}+ puts you in the top tier.` },
              { q: `How do I convert my ${uniName} ${country.terms.grade} to a percentage?`, a: `For the ${scale.system}: Percentage = (${country.terms.grade} / ${scale.maxScale}) × 100. For example, a ${(scale.maxScale * 0.85).toFixed(1)} ${country.terms.grade} = ${(85).toFixed(0)}%. Many job applications in ${country.name} use this conversion.` },
            ].map(({ q, a }) => (
              <div key={q} className="border-4 border-black p-5 bg-white dark:bg-zinc-900">
                <h3 className="font-black text-xs uppercase mb-2">{q}</h3>
                <p className="text-xs font-medium leading-relaxed opacity-70">{a}</p>
              </div>
            ))}
          </div>
        </section>

        <Link href={`/${countryId}/${uniId}`}
          className="inline-flex items-center gap-2 border-4 border-black px-5 py-2 font-black text-xs uppercase bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
        >
          ← All {uniName} Tools
        </Link>
      </BrutalContainer>
    </>
  );
}
