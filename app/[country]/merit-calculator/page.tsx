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

export function generateStaticParams() {
  return COUNTRIES.map(c => ({ country: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);
  if (!country) return { title: "Not Found" };

  return {
    title: `${country.terms.merit}s for ${country.name} Universities 2026`,
    description: `Calculate your merit and admission aggregate for all top universities in ${country.name}. Official formulas for Fall 2026 admissions.`,
    alternates: { canonical: `/${countryId}/merit-calculator` },
  };
}

export default async function RegionalMeritHub({ params }: { params: Promise<{ country: string }> }) {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);
  if (!country) notFound();

  // Get universities for this country
  const globalUnis = getUnisByCountry(countryId);
  const pkUnis = countryId === "pakistan" ? UNIS : [];
  
  // Format all unis for display
  const allUnis = [
    ...globalUnis.map(u => ({ ...u, holistic: !u.hasAdmission })),
    ...pkUnis.map(u => ({ ...u, hasAdmission: !u.holistic }))
  ].filter(u => (u as any).hasAdmission || (u as any).formula?.length > 0 || (u as any).fields?.length > 0); 

  return (
    <div className="flex-1 pb-20">
      <SEOSchema 
        type="SoftwareApplication" 
        data={{
          name: `${country.name} ${country.terms.merit}`,
          description: `Calculate your admission merit for top universities in ${country.name} accurately.`
        }} 
      />
      
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
          
          {countryId === "pakistan" && (
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
      </BrutalContainer>
    </div>
  );
}
