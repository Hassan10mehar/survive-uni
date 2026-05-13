import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Calendar, BookOpen, Calculator, DollarSign } from "lucide-react";
import { notFound } from "next/navigation";
import { BrutalCard, BrutalContainer } from "@/app/components/BrutalUI";
import SEOSchema from "@/app/components/SEOSchema";
import { getCountryById, COUNTRIES } from "@/lib/countries";
import { getUnisByCountry, getUniById } from "@/lib/globalUnis";
import { UNIS } from "@/lib/unis";

const TOOLS = [
  { id: "gpa-calculator",      label: "GPA Calculator",       icon: "🎓", color: "#FFDF00" },
  { id: "cgpa-calculator",     label: "CGPA Calculator",      icon: "📊", color: "#00FFC2" },
  { id: "attendance-tracker",  label: "Attendance Tracker",   icon: "📅", color: "#FF90E8" },
  { id: "merit-calculator",    label: "Admission Calculator", icon: "🏆", color: "#FF4911" },
  { id: "deadlines",           label: "Admission Deadlines",  icon: "⌛", color: "#FFDF00" },
  { id: "scholarships",        label: "Scholarship Finder",   icon: "💰", color: "#00FFC2" },
];

export function generateStaticParams() {
  return COUNTRIES.map(c => ({ country: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);
  if (!country) return { title: "Not Found" };
  return {
    title: country.seoTitle,
    description: country.seoDescription,
    keywords: country.seoKeywords,
    alternates: { canonical: `/${countryId}` },
    openGraph: { title: country.seoTitle, description: country.seoDescription },
  };
}

export default async function CountryPage({ params }: { params: Promise<{ country: string }> }) {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);
  if (!country) notFound();

  // Merge global + PK unis for Pakistan
  const globalUnis = getUnisByCountry(countryId);
  const pkUnis = countryId === "pakistan" ? UNIS.map(u => ({
    id: u.id, name: u.name, short: u.short || u.name.split(" ").map(w => w[0]).join(""),
    country: "pakistan", city: "Pakistan", gradingScaleId: "us-4-0",
    qsRank: undefined, hasAdmission: true, color: "#1A7A3C", textColor: "#fff",
  })) : [];
  const unis = [...globalUnis, ...pkUnis];

  return (
    <>
      <SEOSchema type="ItemList" data={{
        name: `Top Universities in ${country.name}`,
        description: country.seoDescription,
        items: unis.map((u, i) => ({ position: i + 1, name: u.name, url: `https://surviveuni.online/${countryId}/${u.id}` })),
      }} />

      {/* Hero */}
      <div className="border-b-8 border-black pt-14 pb-10 px-4" style={{ backgroundColor: country.color }}>
        <div className="max-w-5xl mx-auto">
          <p className="font-black text-xs uppercase tracking-widest mb-3 opacity-70" style={{ color: country.textColor }}>
            University Tools
          </p>
          <h1 className="text-5xl sm:text-7xl font-black uppercase leading-none mb-4" style={{ color: country.textColor }}>
            {country.emoji} {country.name}
          </h1>
          <p className="text-lg font-bold max-w-2xl opacity-80" style={{ color: country.textColor }}>
            Free GPA calculators, attendance trackers, and admission tools for {unis.length}+ top universities in {country.name}.
          </p>
        </div>
      </div>

      <BrutalContainer maxWidth="max-w-5xl" className="py-12">
        {/* Quick Tool Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {TOOLS.map(t => (
            <Link key={t.id} href={`/${countryId}/${t.id}`} className="block group">
              <div className="border-4 border-black p-6 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1 group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all h-full" style={{ backgroundColor: t.color }}>
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{t.icon}</div>
                <p className="font-black text-[10px] uppercase tracking-widest">{t.label}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* University Grid */}
        <h2 className="text-3xl font-black uppercase mb-6 underline decoration-4 decoration-[#FFDF00] underline-offset-8">
          Top Universities in {country.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {unis.map(uni => (
            <Link key={uni.id} href={`/${countryId}/${uni.id}`}
              className="group border-4 border-black bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <div className="h-2 w-full border-b-4 border-black" style={{ backgroundColor: uni.color }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-black text-xs border-2 border-black px-2 py-0.5 bg-[#FFDF00]">{uni.short}</span>
                  {uni.qsRank && <span className="text-[10px] font-bold opacity-40">QS #{uni.qsRank}</span>}
                </div>
                <h3 className="font-black text-sm uppercase leading-tight mb-3">{uni.name}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold opacity-50 uppercase">{uni.city}</p>
                  <ArrowRight className="w-4 h-4 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Other Countries */}
        <div className="border-t-4 border-black/10 pt-10">
          <h2 className="text-2xl font-black uppercase mb-5">Explore Other Countries</h2>
          <div className="flex flex-wrap gap-3">
            {COUNTRIES.filter(c => c.id !== countryId).map(c => (
              <Link key={c.id} href={`/${c.id}`}
                className="flex items-center gap-2 border-4 border-black px-4 py-2 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all bg-white dark:bg-zinc-900"
              >
                <span>{c.emoji}</span> {c.name}
              </Link>
            ))}
          </div>
        </div>
      </BrutalContainer>
    </>
  );
}
