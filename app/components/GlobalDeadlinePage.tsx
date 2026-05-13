"use client";

import { useState } from "react";
import { 
  BrutalContainer, 
  BrutalHeader, 
  BrutalCard, 
  BrutalButton 
} from "@/app/components/BrutalUI";
import { Search, Calendar, Clock, ArrowRight, ExternalLink, Filter } from "lucide-react";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Link from "next/link";
import AdUnit from "@/app/components/AdUnit";

interface DeadlineItem {
  uni: string;
  short: string;
  deadline: string;
  countryId: string;
  countryName: string;
  link?: string;
  color: string;
  status?: string;
}

interface GlobalDeadlinePageProps {
  deadlines: DeadlineItem[];
  countryName: string;
  countryId: string;
}

export default function GlobalDeadlinePage({ deadlines, countryName, countryId }: GlobalDeadlinePageProps) {
  const [search, setSearch] = useState("");

  const filtered = deadlines.filter(d => 
    d.uni.toLowerCase().includes(search.toLowerCase()) || 
    d.short.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 pb-20">
      <BrutalHeader 
        title={`${countryName} Deadlines 2026`}
        subtitle={`Track admission closing dates for universities in ${countryName}. Don't miss your chance.`}
        bgColor="#FF4911"
        textColor="white"
        backHref={countryId ? `/${countryId}` : "/"}
      />

      <BrutalContainer maxWidth="max-w-7xl">
        <Breadcrumbs 
          items={[
            { label: "Home", href: "/" },
            ...(countryId ? [{ label: countryName, href: `/${countryId}` }] : []),
            { label: "Deadlines" }
          ]} 
        />

        <div className="mt-8 mb-12">
          <AdUnit slotId="deadline-top" format="horizontal" />
        </div>

        {/* Search */}
        <div className="mb-16 max-w-3xl">
          <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 border-4 border-black p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <Search className="w-8 h-8 text-black/40" />
            <input 
              type="text" 
              placeholder="Search university or college..." 
              className="bg-transparent border-none outline-none font-black uppercase text-xl w-full placeholder:text-black/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-12 sm:gap-16">
          {filtered.map((d) => (
            <Link key={d.uni} href={`/${d.countryId}/${d.short.toLowerCase()}/deadlines`} className="group">
              <BrutalCard className="h-full bg-white dark:bg-zinc-900 border-4 border-black p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 border-4 border-black flex items-center justify-center font-black text-2xl shadow-[4px_4px_0px_0px_black]" style={{ backgroundColor: d.color }}>
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-[12px] font-black uppercase bg-black text-white px-3 py-1.5 tracking-widest">{d.countryName}</span>
                </div>

                <h3 className="text-3xl font-black uppercase mb-4 leading-[1.1] group-hover:underline decoration-4 underline-offset-8 decoration-[#FF4911]">{d.uni}</h3>
                
                <div className="mt-auto">
                  <div className="bg-black text-white p-6 border-4 border-black flex items-center justify-between shadow-[6px_6px_0px_0px_#FF4911] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all">
                     <div className="flex flex-col gap-1">
                       <span className="text-[10px] font-black uppercase text-white/40 tracking-[0.2em]">Application Deadline</span>
                       <div className="flex items-center gap-3">
                         <Clock className="w-6 h-6 text-[#FFDF00]" />
                         <span className="font-black text-xl">{d.deadline}</span>
                       </div>
                     </div>
                     <ArrowRight className="w-6 h-6 opacity-40 group-hover:opacity-100 transition-all group-hover:translate-x-2" />
                  </div>
                </div>
              </BrutalCard>
            </Link>
          ))}
        </div>


        {filtered.length === 0 && (
          <div className="text-center py-20 opacity-40 italic font-black text-2xl uppercase">
            No deadlines found matching your search.
          </div>
        )}

        <div className="mt-20">
          <AdUnit slotId="deadline-bottom" format="horizontal" />
        </div>
      </BrutalContainer>
    </div>
  );
}
