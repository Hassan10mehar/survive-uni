import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, GraduationCap, BookOpen, Calendar, Trophy, DollarSign } from "lucide-react";
import { BrutalCard, BrutalContainer } from "@/app/components/BrutalUI";
import SEOSchema from "@/app/components/SEOSchema";
import { getCountryById, COUNTRIES } from "@/lib/countries";
import { getUniById, getAllUniParams, getUnisByCountry } from "@/lib/globalUnis";
import { UNIS } from "@/lib/unis";

const TOOL_DEFS = [
  { id: "gpa-calculator",     icon: "🎓", color: "#FFDF00", desc: "Calculate semester & cumulative GPA" },
  { id: "cgpa-calculator",    icon: "📊", color: "#00FFC2", desc: "Track CGPA across all semesters" },
  { id: "attendance-tracker", icon: "📅", color: "#FF90E8", desc: "Know exactly how many classes you can skip" },
  { id: "merit-calculator",   icon: "🏆", color: "#FF4911", desc: "Check admission eligibility instantly" },
  { id: "deadlines",          icon: "⌛", color: "#FFDF00", desc: "Check latest admission closing dates" },
  { id: "scholarships",       icon: "💰", color: "#00FFC2", desc: "Find financial aid & grants for this uni" },
];

function getLabelForTool(toolId: string, countryTerms: { merit: string; bunk: string }) {
  if (toolId === "merit-calculator") return countryTerms.merit;
  if (toolId === "attendance-tracker") return countryTerms.bunk;
  if (toolId === "gpa-calculator") return "GPA Calculator";
  if (toolId === "deadlines") return "Deadlines";
  if (toolId === "scholarships") return "Scholarships";
  return "CGPA Calculator";
}

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

  const title = uni.seoTitle || `${uni.name} Student Tools 2026 | GPA, Attendance & More`;
  const desc = uni.seoDescription || `Free student tools for ${uni.name}. Calculate GPA, track attendance, check admission eligibility, and find scholarships.`;
  return {
    title,
    description: desc,
    keywords: uni.seoKeywords || [uni.name.toLowerCase(), `${uni.name.toLowerCase()} gpa calculator`],
    alternates: { canonical: `/${countryId}/${uniId}` },
    openGraph: { title, description: desc },
  };
}

export default async function UniversityHubPage({ params }: { params: Promise<{ country: string; university: string }> }) {
  const { country: countryId, university: uniId } = await params;
  const country = getCountryById(countryId);
  const uni = getUniById(uniId) || (countryId === "pakistan" ? UNIS.find(u => u.id === uniId) : undefined);
  if (!country || !uni) notFound();

  const uniName = (uni as any).name;
  const uniShort = (uni as any).short || uniName;
  const uniColor = (uni as any).color || country.color;

  return (
    <>
      <SEOSchema type="CollegeOrUniversity" data={{ name: uniName, url: `https://surviveuni.online/${countryId}/${uniId}`, addressCountry: countryId.toUpperCase() }} />
      <SEOSchema type="BreadcrumbList" data={{ items: [
        { position: 1, name: "Home", item: "https://surviveuni.online" },
        { position: 2, name: country.name, item: `https://surviveuni.online/${countryId}` },
        { position: 3, name: uniName, item: `https://surviveuni.online/${countryId}/${uniId}` },
      ]}} />

      {/* Hero */}
      <div className="border-b-8 border-black pt-14 pb-10 px-4" style={{ backgroundColor: uniColor }}>
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-[10px] font-black uppercase opacity-70 mb-4" style={{ color: "#fff" }}>
            <Link href="/" className="hover:opacity-100">Home</Link>
            <span>/</span>
            <Link href={`/${countryId}`} className="hover:opacity-100">{country.emoji} {country.name}</Link>
            <span>/</span>
            <span>{uniShort}</span>
          </nav>
          <h1 className="text-4xl sm:text-6xl font-black uppercase leading-none mb-3 text-white">
            {uniName}
          </h1>
          <p className="text-white/70 text-base font-bold">
            Free academic tools — GPA calculator, attendance tracker, admission calculator & more.
          </p>
        </div>
      </div>

      <BrutalContainer maxWidth="max-w-4xl" className="py-12">
        {/* Tool Cards */}
        <h2 className="text-3xl font-black uppercase mb-6">
          Tools for {uniShort} Students
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {TOOL_DEFS.map(tool => (
            <Link key={tool.id} href={`/${countryId}/${uniId}/${tool.id}`}
              className="group flex items-center gap-5 border-4 border-black p-5 bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <div className="text-4xl w-14 h-14 border-4 border-black flex items-center justify-center shrink-0 font-black" style={{ backgroundColor: tool.color }}>
                {tool.icon}
              </div>
              <div className="flex-1">
                <p className="font-black uppercase text-sm">{getLabelForTool(tool.id, country.terms)}</p>
                <p className="text-xs font-medium opacity-50 mt-0.5">{tool.desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        {/* Back to country */}
        <Link href={`/${countryId}`} className="inline-flex items-center gap-2 border-4 border-black px-5 py-2 font-black text-xs uppercase bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
          ← All {country.name} Universities
        </Link>
      </BrutalContainer>
    </>
  );
}
