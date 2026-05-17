import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UNIS } from "@/lib/unis";
import { getUnisByCountry } from "@/lib/globalUnis";
import { getCountryById, COUNTRIES } from "@/lib/countries";
import { Info, ArrowRight } from "lucide-react";
import { BrutalCard, BrutalHeader, BrutalContainer } from "@/app/components/BrutalUI";
import SEOSchema from "@/app/components/SEOSchema";
import Breadcrumbs from "@/app/components/Breadcrumbs";

const BASE_URL = "https://surviveuni.online";

export function generateStaticParams() {
  return COUNTRIES.map(c => ({ country: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);
  if (!country) return { title: "Not Found" };

  const isPK = countryId === "pakistan";
  const title = isPK
    ? `Pakistan University Merit Calculators 2026 | NUST, FAST, UET, GIKI Aggregate`
    : `${country.terms.merit}s for ${country.name} Universities 2026`;
  const desc = isPK
    ? `Free merit calculators for all top Pakistani universities — NUST, FAST-NUCES, UET Lahore, COMSATS, GIKI, PIEAS, MDCAT and more. Official aggregate formulas for Fall 2026 admissions.`
    : `Calculate your merit and admission aggregate for all top universities in ${country.name}. Official formulas for Fall 2026 admissions.`;

  return {
    title,
    description: desc,
    keywords: isPK
      ? [
          'pakistan university merit calculator', 'aggregate calculator pakistan 2026',
          'nust merit calculator', 'fast aggregate calculator', 'uet aggregate calculator',
          'giki merit 2026', 'pieas aggregate', 'mdcat merit calculator', 'comsats aggregate',
        ]
      : [`${country.name.toLowerCase()} university merit calculator`, `${countryId} admission calculator 2026`],
    alternates: { canonical: `/${countryId}/merit-calculator` },
    openGraph: { title, description: desc, url: `${BASE_URL}/${countryId}/merit-calculator`, type: 'website' },
  };
}

export default async function RegionalMeritHub({ params }: { params: Promise<{ country: string }> }) {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);
  if (!country) notFound();

  const isPK = countryId === "pakistan";
  const globalUnis = getUnisByCountry(countryId);
  const pkUnis = isPK ? UNIS : [];
  
  const allUnis = [
    ...globalUnis.map(u => ({ ...u, holistic: !u.hasAdmission })),
    ...pkUnis.map(u => ({ ...u, hasAdmission: !u.holistic }))
  ].filter(u => (u as any).hasAdmission || (u as any).formula?.length > 0 || (u as any).fields?.length > 0); 

  return (
    <div className="flex-1 pb-20">
      {/* WebApplication schema for the hub itself */}
      <SEOSchema 
        type="WebApplication" 
        data={{
          name: `${country.name} ${country.terms.merit} Hub`,
          url: `/${countryId}/merit-calculator`,
          description: `Calculate your admission merit for top universities in ${country.name} accurately. Official 2026 formulas.`,
          featureList: ['Official merit formulas', `${allUnis.length} universities covered`, '2026 admissions updated'],
          ratingCount: '2140',
        }} 
      />

      {/* ItemList schema — lists all universities with calculator URLs */}
      <SEOSchema
        type="ItemList"
        data={{
          name: `${country.name} University Merit Calculators 2026`,
          description: `Complete list of merit and aggregate calculators for ${country.name} universities.`,
          items: allUnis.slice(0, 20).map((u, i) => ({
            position: i + 1,
            name: `${u.name} Merit Calculator`,
            url: `${BASE_URL}/${countryId}/${u.id}/merit-calculator`,
            description: isPK ? (UNIS.find(pk => pk.id === u.id)?.note) : undefined,
          })),
        }}
      />

      {/* BreadcrumbList */}
      <SEOSchema type="BreadcrumbList" data={{ items: [
        { position: 1, name: "Home", item: BASE_URL },
        { position: 2, name: country.name, item: `${BASE_URL}/${countryId}` },
        { position: 3, name: country.terms.merit, item: `${BASE_URL}/${countryId}/merit-calculator` },
      ]}} />

      {/* Admission Season Event — boosts May–Aug seasonal search intent for Pakistan */}
      {isPK && (
        <SEOSchema type="Event" data={{
          name: "Pakistan University Admissions 2026 — Fall Cycle",
          description: "NUST, FAST, UET, COMSATS, GIKI, PIEAS and all major universities open Fall 2026 admissions. Use our merit calculators to predict your chances.",
          startDate: "2026-06-01",
          endDate: "2026-09-30",
          url: `/${countryId}/merit-calculator`,
        }} />
      )}
      
      <BrutalHeader 
        title={country.terms.merit} 
        subtitle={`${country.emoji} ${country.name} Hub`}
        backHref={`/${countryId}`}
        bgColor={country.color}
      />

      <BrutalContainer maxWidth="max-w-6xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" }, 
          { label: country.name, href: `/${countryId}` }, 
          { label: country.terms.merit }
        ]} />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <div className="lg:col-span-8">
            <BrutalCard variant="black" className="h-full flex items-center p-8 lg:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="p-4 border-4 border-white shrink-0 rotate-3" style={{ backgroundColor: country.color }}>
                  <Info className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h2 className="font-black text-2xl uppercase mb-2 tracking-tighter" style={{ color: country.color }}>Official Formulas 2026</h2>
                  <p className="text-lg text-white/90 font-bold leading-relaxed">
                    Calculations are based on the latest admission policies for <span style={{ color: country.color }}>Fall 2026</span>. Select your target university in {country.name} to get started.
                  </p>
                </div>
              </div>
            </BrutalCard>
          </div>
          
          {isPK && (
            <div className="lg:col-span-4">
              <Link href="/pakistan/medical/merit-calculator" className="h-full block">
                <BrutalCard className="h-full bg-[#FF4911] border-4 p-8 flex flex-col justify-between group cursor-pointer text-white">
                  <div>
                    <p className="font-black text-xs uppercase text-white/50 mb-2 tracking-widest">Healthcare</p>
                    <h3 className="font-black text-3xl uppercase text-white leading-tight mb-4 group-hover:underline">Medical (MDCAT)</h3>
                    <p className="text-sm text-white font-bold opacity-70">UHS, PMDC & KMU formulas for MBBS/BDS admissions.</p>
                  </div>
                  <div className="mt-8 flex items-center justify-between font-black text-xs uppercase text-white">
                    Start Calculating <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </BrutalCard>
              </Link>
            </div>
          )}
        </div>

        <h2 className="font-black text-4xl uppercase mb-10 text-black dark:text-white underline decoration-[12px] decoration-[#FFDF00] underline-offset-[12px]">
          Select Institution
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {allUnis.map((u, i) => {
            const isFeatured = i < 3; 
            return (
              <Link 
                key={u.id} 
                href={`/${countryId}/${u.id}/merit-calculator`} 
                className={`block group ${isFeatured ? 'md:col-span-6 lg:col-span-4' : 'md:col-span-4 lg:col-span-3'}`}
              >
                <BrutalCard 
                  className={`p-8 cursor-pointer relative overflow-hidden h-full flex flex-col border-4 group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:group-hover:shadow-[12px_12px_0px_0px_#fff] transition-all`}
                  style={{ backgroundColor: u.color, color: u.textColor, borderColor: 'black' }}
                >
                  <div className="flex items-start justify-between mb-8">
                    <h3 className={`font-black uppercase leading-none ${isFeatured ? 'text-4xl' : 'text-2xl'}`}>
                      {u.name}
                    </h3>
                  </div>
                  
                  <p className={`font-bold opacity-70 mb-8 flex-1 uppercase tracking-wide leading-snug ${isFeatured ? 'text-sm' : 'text-xs'}`}>
                    {u.short}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-6 border-t-2 border-black/10">
                    <span className="font-black text-[10px] uppercase tracking-[0.1em]">
                      Open Calculator
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </BrutalCard>
              </Link>
            );
          })}
        </div>

        {/* SEO content section */}
        {isPK && (
          <div className="mt-20 space-y-12">
            <section>
              <h2 className="text-3xl font-black uppercase mb-6 text-black dark:text-white underline decoration-4 underline-offset-8" style={{ textDecorationColor: country.color }}>
                How Pakistan University Merit is Calculated (2026)
              </h2>
              <div className="prose dark:prose-invert max-w-none font-medium text-black/70 dark:text-white/70 leading-relaxed">
                <p className="mb-4">
                  Pakistani universities use a weighted aggregate formula combining your Matric/O-Level percentage, FSc/A-Level result, and a university-specific entry test score. The exact weightage varies per institution:
                </p>
                <div className="border-4 border-black overflow-hidden mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <div className="grid grid-cols-3 bg-black text-white">
                    <div className="px-4 py-3 font-black text-[10px] uppercase">University</div>
                    <div className="px-4 py-3 font-black text-[10px] uppercase border-l-4 border-white/20">Test Weight</div>
                    <div className="px-4 py-3 font-black text-[10px] uppercase border-l-4 border-white/20">Formula</div>
                  </div>
                  {UNIS.slice(0, 8).map((u, i) => (
                    <div key={u.id} className={`grid grid-cols-3 border-t-4 border-black text-xs font-bold ${i % 2 === 0 ? 'bg-white dark:bg-zinc-900' : 'bg-zinc-50 dark:bg-zinc-800'}`}>
                      <Link href={`/pakistan/${u.id}/merit-calculator`} className="px-4 py-3 font-black hover:underline" style={{ color: u.color === '#000' ? '#FF4911' : u.color }}>
                        {u.name}
                      </Link>
                      <div className="px-4 py-3 border-l-4 border-black">{Math.round(u.formula.find(f => !['matric','fsc'].includes(f.fieldId))?.weight || 0) * 100}%</div>
                      <div className="px-4 py-3 border-l-4 border-black opacity-70">{u.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-black text-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_#FFDF00]">
              <h2 className="text-2xl font-black uppercase mb-6 text-[#FFDF00]">Admission Season 2026 — Key Dates</h2>
              <p className="text-sm text-white/70 mb-4">
                Pakistan&apos;s engineering and computing university admissions follow a concentrated calendar. Most institutions open applications between May–July and announce merit lists in August–September.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {UNIS.filter(u => u.admissionDeadline).slice(0, 6).map(u => (
                  <Link key={u.id} href={`/pakistan/${u.id}/merit-calculator`} className="flex items-center justify-between bg-white/10 border border-white/20 px-4 py-3 hover:bg-white/20 transition-colors">
                    <span className="font-black text-xs uppercase">{u.name}</span>
                    <span className="text-xs font-bold text-[#FFDF00]">{u.admissionDeadline}</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}
      </BrutalContainer>
    </div>
  );
}
