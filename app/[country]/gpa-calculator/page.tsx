import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { UNIS } from "@/lib/unis";
import { getUnisByCountry } from "@/lib/globalUnis";
import { getCountryById, COUNTRIES } from "@/lib/countries";
import { ArrowRight, Info } from "lucide-react";
import { BrutalCard, BrutalHeader, BrutalContainer } from "@/app/components/BrutalUI";
import SEOSchema from "@/app/components/SEOSchema";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export function generateStaticParams() {
  return COUNTRIES.map(c => ({ country: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);
  if (!country) return { title: "Not Found" };

  return {
    title: `${country.terms.grade} Calculator for ${country.name} Universities 2026`,
    description: `Calculate your semester ${country.terms.grade} and track academic performance for universities in ${country.name}. Free, accurate calculators based on official grading scales.`,
    alternates: { canonical: `/${countryId}/gpa-calculator` },
  };
}

export default async function RegionalGPAHub({ params }: { params: Promise<{ country: string }> }) {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);
  if (!country) notFound();

  // Get universities for this country
  const globalUnis = getUnisByCountry(countryId);
  const pkUnis = countryId === "pakistan" ? UNIS.filter(u => !u.holistic) : [];
  
  const allUnis = [...globalUnis, ...pkUnis];

  return (
    <div className="flex-1 pb-20">
      <SEOSchema 
        type="SoftwareApplication" 
        data={{
          name: `${country.name} ${country.terms.grade} Calculator`,
          description: `Free semester ${country.terms.grade} calculator for all universities in ${country.name}.`
        }} 
      />
      
      <BrutalHeader 
        title={`${country.terms.grade} Calc`} 
        subtitle={`${country.emoji} ${country.name} Hub`}
        backHref={`/${countryId}`}
        bgColor={country.color}
      />

      <BrutalContainer maxWidth="max-w-3xl">
        <Breadcrumbs items={[
          { label: "Home", href: "/" }, 
          { label: country.name, href: `/${countryId}` }, 
          { label: country.terms.grade }
        ]} />

        <BrutalCard variant="black" className="mb-8">
          <div className="flex items-start gap-4">
            <div className="p-2 border-2 border-white shrink-0" style={{ backgroundColor: country.color }}>
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-xs uppercase tracking-widest mb-1" style={{ color: country.color }}>Official Grading Scales</p>
              <p className="text-sm text-white/80 font-bold leading-relaxed">
                Each university uses its own official grading system. Select your institution in {country.name} to get the exact, accurate calculator for your courses.
              </p>
            </div>
          </div>
        </BrutalCard>

        {/* Standard Catch-all for the region */}
        <Link href={`/tools/gpa-calculator/standard`} className="block mb-8">
          <BrutalCard variant="secondary" className="p-6 group cursor-pointer hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-black text-xl uppercase text-black">Standard {country.terms.grade} Calc</p>
                <p className="text-xs font-bold text-black/60 mt-1 uppercase">Generic 4.0 scale (A, B, C, D...)</p>
              </div>
              <div className="bg-black text-white p-3 border-4 border-black group-hover:translate-x-2 transition-transform">
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </BrutalCard>
        </Link>

        <h2 className="font-black text-xs uppercase tracking-[0.2em] mb-6 text-black/40 dark:text-white/40">Select Your Institution</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {allUnis.map(u => (
            <Link key={u.id} href={`/${countryId}/${u.id}/gpa-calculator`} className="block group h-full">
              <BrutalCard 
                className="p-6 cursor-pointer group-hover:-translate-y-1 transition-all h-full flex flex-col border-4"
                style={{ backgroundColor: u.color, color: u.textColor, borderColor: 'black' }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <p className="font-black text-2xl uppercase leading-tight">{u.name}</p>
                </div>
                
                <p className="text-xs font-bold opacity-80 mb-6 flex-1 uppercase tracking-wider">{u.short}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-black/10">
                  <span className="font-black text-[10px] uppercase tracking-widest">Open Calculator</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </BrutalCard>
            </Link>
          ))}
        </div>
      </BrutalContainer>
    </div>
  );
}
