import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GraduationCap, DollarSign, Calendar, ExternalLink, Info } from "lucide-react";
import { BrutalCard, BrutalContainer, BrutalHeader, BrutalButton } from "@/app/components/BrutalUI";
import SEOSchema from "@/app/components/SEOSchema";
import { getCountryById } from "@/lib/countries";
import { getUniById, getAllUniParams } from "@/lib/globalUnis";
import { UNIS } from "@/lib/unis";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import AdUnit from "@/app/components/AdUnit";
import Link from "next/link";
import { SCHOLARSHIPS } from "@/lib/scholarships";

export function generateStaticParams() {
  const global = getAllUniParams();
  const pk = UNIS.map(u => ({ country: "pakistan", university: u.id }));
  return [...global, ...pk];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; university: string }> }): Promise<Metadata> {
  const { country: countryId, university: uniId } = await params;
  const country = getCountryById(countryId);
  const uni = getUniById(uniId) || (countryId === "pakistan" ? UNIS.find(u => u.id === uniId) : undefined);
  if (!country || !uni) return { title: "Not Found" };

  const title = `${uni.name} Scholarships 2026 | Financial Aid & Grants`;
  const desc = `Find latest scholarships, financial aid, and grants available at ${uni.name} for the 2026-2027 academic year. See eligibility criteria and apply now.`;
  
  return {
    title,
    description: desc,
    keywords: [`${uni.name} scholarships 2026`, `${uni.name} financial aid`, "university grants", uni.name],
    alternates: { canonical: `/${countryId}/${uniId}/scholarships` },
  };
}

export default async function UniScholarshipsPage({ params }: { params: Promise<{ country: string; university: string }> }) {
  const { country: countryId, university: uniId } = await params;
  const country = getCountryById(countryId);
  const uni = getUniById(uniId) || (countryId === "pakistan" ? UNIS.find(u => u.id === uniId) : undefined);
  if (!country || !uni) notFound();

  const uniName = (uni as any).name;
  const uniShort = (uni as any).short || uniName;
  const uniScholarships = (uni as any).scholarships || [];
  
  // Combine with national scholarships for that country (sample logic)
  const nationalScholarships = SCHOLARSHIPS.slice(0, 3); // Just some featured ones

  return (
    <div className="flex-1 pb-20">
      <SEOSchema type="BreadcrumbList" data={{ items: [
        { position: 1, name: "Home", item: "https://surviveuni.online" },
        { position: 2, name: country.name, item: `https://surviveuni.online/${countryId}` },
        { position: 3, name: uniName, item: `https://surviveuni.online/${countryId}/${uniId}` },
        { position: 4, name: "Scholarships", item: `https://surviveuni.online/${countryId}/${uniId}/scholarships` },
      ]}} />

      <BrutalHeader 
        title={`${uniShort} Scholarships`}
        subtitle={`Funding opportunities and financial support for students at ${uniName}.`}
        bgColor="#00FFC2"
        textColor="black"
        backHref={`/${countryId}/${uniId}`}
      />

      <BrutalContainer>
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" },
            { label: country.name, href: `/${countryId}` },
            { label: uniShort, href: `/${countryId}/${uniId}` },
            { label: "Scholarships" }
          ]} 
        />

        <div className="mt-12 space-y-12">
          {/* Internal University Scholarships */}
          <section>
            <h2 className="text-3xl font-black uppercase mb-8 underline decoration-8 decoration-[#FFDF00] underline-offset-8">University Specific</h2>
            {uniScholarships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {uniScholarships.map((s: any, i: number) => (
                  <BrutalCard key={i} className="bg-white dark:bg-zinc-900 border-4 border-black p-8 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-2xl font-black uppercase mb-4 leading-tight">{s.name}</h3>
                    <div className="space-y-4 mb-8">
                       <div className="flex items-center gap-3 font-bold">
                         <DollarSign className="w-5 h-5 text-[#25D366]" />
                         <span>{s.amount}</span>
                       </div>
                       <div className="flex items-center gap-3 font-bold">
                         <Calendar className="w-5 h-5 text-[#FF4911]" />
                         <span>Deadline: {s.deadline}</span>
                       </div>
                    </div>
                    <a href={s.link} target="_blank" rel="noopener noreferrer">
                      <BrutalButton className="w-full bg-black text-white flex items-center justify-center gap-2">
                        Apply Now <ExternalLink className="w-4 h-4" />
                      </BrutalButton>
                    </a>
                  </BrutalCard>
                ))}
              </div>
            ) : (
              <BrutalCard className="p-10 border-4 border-black bg-zinc-50 dark:bg-zinc-800 italic opacity-60">
                Contact the {uniShort} Financial Aid Office for latest university-specific grants.
              </BrutalCard>
            )}
          </section>

          <AdUnit slotId="scholarship-uni-middle" format="horizontal" />

          {/* National / External Scholarships */}
          <section>
            <h2 className="text-3xl font-black uppercase mb-8 underline decoration-8 decoration-[#FF90E8] underline-offset-8">National Opportunities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nationalScholarships.map((s: any, i: number) => (
                <BrutalCard key={i} className="bg-white dark:bg-zinc-900 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <span className="bg-black text-white text-[10px] px-2 py-1 font-black uppercase mb-3 inline-block">Featured</span>
                  <h3 className="text-lg font-black uppercase mb-3 leading-tight">{s.name}</h3>
                  <p className="text-xs font-bold opacity-60 mb-6">{s.provider}</p>
                  <Link href="/scholarships">
                    <BrutalButton className="w-full py-2 text-xs border-2 border-black">View Details</BrutalButton>
                  </Link>
                </BrutalCard>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/scholarships">
                <BrutalButton className="bg-[#00FFC2] px-10 py-4 font-black uppercase text-sm border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  Browse All Scholarships →
                </BrutalButton>
              </Link>
            </div>
          </section>

          {/* Tips Section */}
          <BrutalCard className="bg-black text-white p-10 border-4 border-white shadow-[12px_12px_0px_0px_#00FFC2]">
            <div className="flex items-start gap-6">
              <Info className="w-12 h-12 text-[#FFDF00] shrink-0" />
              <div>
                <h3 className="text-3xl font-black uppercase mb-4">Financial Aid Pro-Tip</h3>
                <p className="text-lg font-medium opacity-80 leading-relaxed">
                  Most universities in {country.name} require you to submit your financial aid application *alongside* your admission form. If you miss this window, you might have to wait for the next semester or year to apply for internal grants.
                </p>
              </div>
            </div>
          </BrutalCard>
        </div>
      </BrutalContainer>
    </div>
  );
}
