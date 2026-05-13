import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, ExternalLink, MapPin, GraduationCap } from "lucide-react";
import { BrutalCard, BrutalContainer, BrutalHeader, BrutalButton } from "@/app/components/BrutalUI";
import SEOSchema from "@/app/components/SEOSchema";
import { getCountryById } from "@/lib/countries";
import { getUniById, getAllUniParams } from "@/lib/globalUnis";
import { UNIS } from "@/lib/unis";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import AdUnit from "@/app/components/AdUnit";
import Link from "next/link";

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

  const title = `${uni.name} Admission Deadline 2026 | Last Date to Apply`;
  const desc = `Check the latest admission deadlines for ${uni.name} for the 2026-2027 academic year. Don't miss the last date to apply for undergraduate and graduate programs.`;
  
  return {
    title,
    description: desc,
    keywords: [`${uni.name} deadline 2026`, `${uni.name} admission 2026`, "last date to apply", uni.name],
    alternates: { canonical: `/${countryId}/${uniId}/deadlines` },
  };
}

export default async function UniDeadlinePage({ params }: { params: Promise<{ country: string; university: string }> }) {
  const { country: countryId, university: uniId } = await params;
  const country = getCountryById(countryId);
  const uni = getUniById(uniId) || (countryId === "pakistan" ? UNIS.find(u => u.id === uniId) : undefined);
  if (!country || !uni) notFound();

  const uniName = (uni as any).name;
  const uniShort = (uni as any).short || uniName;
  const deadline = (uni as any).admissionDeadline || "TBA (Expected June 2026)";

  return (
    <div className="flex-1 pb-20">
      <SEOSchema type="BreadcrumbList" data={{ items: [
        { position: 1, name: "Home", item: "https://surviveuni.online" },
        { position: 2, name: country.name, item: `https://surviveuni.online/${countryId}` },
        { position: 3, name: uniName, item: `https://surviveuni.online/${countryId}/${uniId}` },
        { position: 4, name: "Admission Deadline", item: `https://surviveuni.online/${countryId}/${uniId}/deadlines` },
      ]}} />

      <BrutalHeader 
        title={`${uniShort} Deadline 2026`}
        subtitle={`Official admission dates and application deadlines for ${uniName}. Stay ahead of the curve.`}
        bgColor="#FF4911"
        textColor="white"
        backHref={`/${countryId}/${uniId}`}
      />

      <BrutalContainer>
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" },
            { label: country.name, href: `/${countryId}` },
            { label: uniShort, href: `/${countryId}/${uniId}` },
            { label: "Admission Deadlines" }
          ]} 
        />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Deadline Card */}
          <div className="lg:col-span-2 space-y-10">
            <BrutalCard className="bg-white dark:bg-zinc-900 border-8 border-black p-10 shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-4 mb-8">
                <div className="bg-[#00FFC2] p-4 border-4 border-black">
                  <Calendar className="w-10 h-10 text-black" />
                </div>
                <div>
                  <h2 className="text-3xl font-black uppercase">Application Deadline</h2>
                  <p className="text-sm font-bold opacity-50 uppercase tracking-widest">Fall 2026 Intake</p>
                </div>
              </div>

              <div className="bg-black text-white p-8 mb-8 border-4 border-black shadow-[8px_8px_0px_0px_#FF4911]">
                <div className="flex items-center gap-4 text-5xl md:text-7xl font-black uppercase italic tracking-tighter">
                  <Clock className="w-12 h-12 md:w-20 md:h-20 text-[#FFDF00]" />
                  <span>{deadline}</span>
                </div>
              </div>

              <p className="text-lg font-bold leading-relaxed mb-10 opacity-80">
                Ensure all documents, including your educational certificates and entry test scores, are submitted before the cutoff. Late applications are rarely entertained by {uniShort}.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href={(uni as any).applyLink || "#"} target="_blank" className="flex-1 min-w-[200px]">
                  <BrutalButton className="w-full bg-[#00FFC2] text-black py-6 text-xl flex items-center justify-center gap-3">
                    Apply Online <ExternalLink className="w-6 h-6" />
                  </BrutalButton>
                </a>
                <Link href={`/${countryId}/${uniId}/merit-calculator`} className="flex-1 min-w-[200px]">
                  <BrutalButton className="w-full bg-white text-black py-6 text-xl border-4 border-black">
                    Check Eligibility
                  </BrutalButton>
                </Link>
              </div>
            </BrutalCard>

            {/* Ad Slot */}
            <AdUnit slotId="deadline-middle" format="horizontal" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BrutalCard className="bg-[#FF90E8] border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <GraduationCap className="w-10 h-10 mb-4" />
                <h3 className="text-2xl font-black uppercase mb-2">Program Range</h3>
                <p className="font-bold opacity-80">Undergraduate, Masters, and PhD admissions are usually open simultaneously.</p>
              </BrutalCard>
              <BrutalCard className="bg-[#FFDF00] border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <MapPin className="w-10 h-10 mb-4" />
                <h3 className="text-2xl font-black uppercase mb-2">Campus Info</h3>
                <p className="font-bold opacity-80">{(uni as any).city || "Main Campus"} and all sub-campuses follow the same cycle.</p>
              </BrutalCard>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <BrutalCard className="bg-black text-white p-8 border-4 border-white shadow-[8px_8px_0px_0px_#00FFC2]">
              <h3 className="text-xl font-black uppercase mb-6 text-[#00FFC2]">Quick Checklist</h3>
              <ul className="space-y-4 font-bold text-sm uppercase tracking-wide">
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#00FFC2] border-2 border-white" />
                  Attested Documents
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#00FFC2] border-2 border-white" />
                  Paid Fee Challan
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#00FFC2] border-2 border-white" />
                  Entry Test Roll No
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#00FFC2] border-2 border-white" />
                  Passport Size Photos
                </li>
              </ul>
            </BrutalCard>

            <div className="border-4 border-black p-6 bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
               <h4 className="font-black uppercase mb-4 text-xs opacity-50">Related Tools</h4>
               <div className="space-y-3">
                 <Link href={`/${countryId}/${uniId}/scholarships`} className="block font-black uppercase text-sm hover:underline decoration-4 underline-offset-4 decoration-[#FFDF00]">
                   {uniShort} Scholarships →
                 </Link>
                 <Link href={`/${countryId}/${uniId}/gpa-calculator`} className="block font-black uppercase text-sm hover:underline decoration-4 underline-offset-4 decoration-[#00FFC2]">
                   GPA Calculator →
                 </Link>
               </div>
            </div>

            <AdUnit slotId="deadline-sidebar" format="rectangle" />
          </div>
        </div>
      </BrutalContainer>
    </div>
  );
}
