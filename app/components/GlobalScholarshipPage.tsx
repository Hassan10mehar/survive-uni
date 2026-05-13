"use client";

import { useState } from "react";
import { 
  BrutalContainer, 
  BrutalHeader, 
  BrutalCard, 
  BrutalButton 
} from "@/app/components/BrutalUI";
import { Search, GraduationCap, DollarSign, Calendar, ExternalLink } from "lucide-react";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { Scholarship } from "@/lib/scholarships";
import Image from "next/image";
import AdUnit from "@/app/components/AdUnit";

interface GlobalScholarshipPageProps {
  scholarships: Scholarship[];
  countryName: string;
  countryId: string;
}

export default function GlobalScholarshipPage({ scholarships, countryName, countryId }: GlobalScholarshipPageProps) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Extract unique categories from the scholarships list dynamically
  const dynamicCategories = Array.from(new Set(scholarships.map(s => s.category))).filter(c => c !== "All");
  const categories = ["All", ...dynamicCategories];

  const filtered = scholarships.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                         s.provider.toLowerCase().includes(search.toLowerCase());
    const matchesTab = activeTab === "All" || s.category === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="flex-1 pb-20">
      <BrutalHeader 
        title={`${countryName} Scholarships`}
        subtitle={`Find financial aid, grants, and scholarships for universities in ${countryName}. Your academic future starts here.`}
        bgColor="#FFDF00"
        textColor="black"
        backHref={countryId ? `/${countryId}` : "/"}
      />

      <BrutalContainer maxWidth="max-w-7xl">
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" },
            ...(countryId ? [{ label: countryName, href: `/${countryId}` }] : []),
            { label: "Scholarships" }
          ]} 
        />

        {/* AdSense Top Slot */}
        <div className="mt-8 mb-8">
          <AdUnit slotId="scholarship-top" format="horizontal" />
        </div>

        {/* Hero Image Section */}
        <div className="relative h-[300px] md:h-[500px] w-full border-8 border-black dark:border-white shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] dark:shadow-[20px_20px_0px_0px_rgba(255,255,255,0.1)] mb-16 overflow-hidden">
          <Image 
            src="/images/assets/scholarships-hero.png" 
            alt={`Scholarship Opportunities ${countryName}`}
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16">
            <h2 className="text-white text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] max-w-3xl">
              Don&apos;t Let Finances Stop Your Dreams.
            </h2>
            <p className="text-[#00FFC2] text-xl md:text-3xl font-black uppercase tracking-widest mt-6 italic bg-black/50 w-fit px-4 py-2 border-l-8 border-[#00FFC2]">
              Explore Funding Sources in {countryName}
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="mb-16 flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between">
          <div className="w-full xl:max-w-2xl flex items-center gap-4 bg-white dark:bg-zinc-900 border-4 border-black p-5 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <Search className="w-8 h-8 text-black/40" />
            <input 
              type="text" 
              placeholder="Search by name or provider..." 
              className="bg-transparent border-none outline-none font-black uppercase text-lg w-full placeholder:text-black/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-3 font-black uppercase text-xs border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${activeTab === cat ? 'bg-[#00FFC2]' : 'bg-white dark:bg-zinc-800 dark:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12 sm:gap-16">
          {filtered.map((s) => (
            <BrutalCard 
              key={`${s.name}-${s.provider}`} 
              className="flex flex-col h-full border-4 border-black bg-white dark:bg-zinc-900 p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_#FFDF00] hover:-translate-y-2 transition-all"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2">
                  {s.category}
                </span>
                <div 
                  className="w-12 h-12 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_black]"
                  style={{ backgroundColor: s.color }}
                >
                  <GraduationCap className="w-6 h-6 text-black" />
                </div>
              </div>

              <h3 className="font-black text-3xl uppercase mb-3 dark:text-white leading-[1.1] tracking-tighter">
                {s.name}
              </h3>
              <p className="font-bold text-black/50 dark:text-white/40 uppercase text-[11px] tracking-widest mb-8 border-l-4 border-black pl-3 py-1">
                Official Provider: <span className="text-black dark:text-white">{s.provider}</span>
              </p>

              <div className="space-y-5 mb-10 flex-1">
                <div className="flex items-center gap-4 text-lg font-black dark:text-white bg-zinc-50 dark:bg-zinc-800 p-4 border-2 border-black border-dashed">
                  <DollarSign className="w-6 h-6 text-[#25D366]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase opacity-40">Benefit Amount</span>
                    <span>{s.amount}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-lg font-black dark:text-white bg-zinc-50 dark:bg-zinc-800 p-4 border-2 border-black border-dashed">
                  <Calendar className="w-6 h-6 text-[#FF4911]" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase opacity-40">Closing Date</span>
                    <span>{s.deadline}</span>
                  </div>
                </div>
              </div>

              <a 
                href={s.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block group"
              >
                <BrutalButton className="w-full bg-black text-white py-5 flex items-center justify-center gap-3 text-lg group-hover:bg-[#FFDF00] group-hover:text-black transition-colors shadow-[6px_6px_0px_0px_#FFDF00] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1">
                  Secure Funding <ExternalLink className="w-5 h-5" />
                </BrutalButton>
              </a>
            </BrutalCard>
          ))}
        </div>


        {filtered.length === 0 && (
          <div className="text-center py-20 opacity-40 italic font-black text-2xl uppercase">
            No scholarships found matching your search.
          </div>
        )}

        {/* AdSense Bottom Slot */}
        <div className="mt-12">
          <AdUnit slotId="scholarship-bottom" format="horizontal" />
        </div>

        {/* Informational Footer */}
        <div className="mt-20 border-t-4 border-black pt-12">
           <h2 className="font-black text-3xl uppercase mb-8 dark:text-white underline decoration-[#FF90E8] decoration-8 underline-offset-8">Financial Advice</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm font-medium text-black/70 dark:text-white/60 leading-relaxed">
              <p>
                Applying for scholarships in {countryName} requires early preparation. Be sure to check with your specific university&apos;s financial aid office as internal need-based programs often require applications *at the time of admission*. Don&apos;t miss the deadline!
              </p>
              <p>
                Keep your documents ready: Income certificates, utility bills, and bank statements are usually required. Carefully review the eligibility criteria for government-backed programs as they offer significant coverage.
              </p>
           </div>
        </div>
      </BrutalContainer>
    </div>
  );
}
