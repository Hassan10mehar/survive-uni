"use client";

import { useState } from "react";
import { UNIS, UniConfig } from "@/lib/unis";
import { 
  BrutalContainer, 
  BrutalHeader, 
  BrutalCard, 
  BrutalButton 
} from "@/app/components/BrutalUI";
import { Search, X, Plus, Info } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/app/components/Breadcrumbs";

export default function ComparePage() {
  const [selectedUnis, setSelectedUnis] = useState<UniConfig[]>([]);
  const [search, setSearch] = useState("");

  const filteredUnis = UNIS.filter(uni => 
    uni.name.toLowerCase().includes(search.toLowerCase()) && 
    !selectedUnis.find(s => s.id === uni.id)
  ).slice(0, 5);

  const addUni = (uni: UniConfig) => {
    if (selectedUnis.length < 3) {
      setSelectedUnis([...selectedUnis, uni]);
      setSearch("");
    }
  };

  const removeUni = (id: string) => {
    setSelectedUnis(selectedUnis.filter(u => u.id !== id));
  };

  return (
    <div className="flex-1 pb-20">
      <BrutalHeader 
        title="Compare Universities" 
        subtitle="Compare merit weightage and admission criteria side-by-side."
        bgColor="#4A90E2"
        textColor="black"
        backHref="/"
      />

      <BrutalContainer>
        <Breadcrumbs 
          items={[
            { label: "Tools", href: "/" },
            { label: "Compare" }
          ]} 
        />

        {/* Selection Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {selectedUnis.map((uni) => (
            <BrutalCard 
              key={uni.id} 
              className="relative p-6 border-4" 
              style={{ backgroundColor: uni.color, color: uni.textColor, borderColor: 'black' }}
            >
              <button 
                onClick={() => removeUni(uni.id)}
                className="absolute top-2 right-2 bg-black text-white p-1 border-2 border-black hover:scale-110 transition-transform"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="font-black text-xl uppercase mb-1">{uni.name}</p>
              <p className="font-bold text-xs opacity-70 uppercase tracking-tighter">{uni.program}</p>
            </BrutalCard>
          ))}

          {selectedUnis.length < 3 && (
            <div className="relative">
              <div className="border-4 border-black dark:border-white p-6 bg-white dark:bg-zinc-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_#fff] flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4 bg-zinc-100 dark:bg-zinc-800 border-4 border-black p-2">
                  <Search className="w-4 h-4 text-black/40" />
                  <input 
                    type="text" 
                    placeholder="Search Uni..." 
                    className="bg-transparent border-none outline-none font-black uppercase text-xs w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                
                {search && (
                  <div className="absolute top-full left-0 right-0 z-50 bg-white border-4 border-black mt-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    {filteredUnis.map(uni => (
                      <button 
                        key={uni.id}
                        onClick={() => addUni(uni)}
                        className="w-full text-left px-4 py-3 font-black text-xs uppercase hover:bg-[#00FFC2] border-b-2 border-black last:border-none"
                      >
                        {uni.name} ({uni.id.toUpperCase()})
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex-1 flex flex-col items-center justify-center opacity-40">
                  <Plus className="w-8 h-8 mb-2" />
                  <p className="font-black text-[10px] uppercase">Add University</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Comparison Matrix */}
        {selectedUnis.length > 1 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border-4 border-black p-4 bg-black text-white font-black uppercase text-xs text-left w-1/4">Criteria</th>
                  {selectedUnis.map(uni => (
                    <th key={uni.id} className="border-4 border-black p-4 font-black uppercase text-sm" style={{ backgroundColor: uni.color }}>
                      {uni.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-900">
                <ComparisonRow label="Weightage" values={selectedUnis.map(u => u.note)} />
                <ComparisonRow label="Entry Test" values={selectedUnis.map(u => u.program || "Standard")} />
                <ComparisonRow 
                  label="Min. Eligibility" 
                  values={selectedUnis.map(u => u.holistic ? "Holistic Review" : "60% FSC/Equiv.")} 
                />
                <ComparisonRow 
                  label="Difficulty" 
                  values={selectedUnis.map(u => u.benchmarks.length > 70 ? "Hard" : "Medium")} 
                  isBadges
                />
                <ComparisonRow 
                  label="Grading" 
                  values={selectedUnis.map(u => u.id === 'fast' ? 'Relative' : 'Absolute/Relative')} 
                />
              </tbody>
            </table>
          </div>
        ) : (
          <BrutalCard variant="white" className="text-center py-20 dark:bg-zinc-900">
            <Info className="w-12 h-12 mx-auto mb-4 opacity-20" />
            <p className="font-black text-xl uppercase opacity-40 italic">Select at least 2 universities to compare</p>
          </BrutalCard>
        )}

        {/* CTA */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
           <BrutalCard className="bg-[#FF90E8] border-4 border-black p-8">
              <h3 className="font-black text-2xl uppercase mb-4 text-black">Don&apos;t See a Uni?</h3>
              <p className="font-bold text-black/70 mb-6">We are constantly adding more universities. If your dream university is missing, let us know!</p>
              <BrutalButton className="bg-black text-white">Request Uni →</BrutalButton>
           </BrutalCard>
           
           <BrutalCard className="bg-[#00FFC2] border-4 border-black p-8">
              <h3 className="font-black text-2xl uppercase mb-4 text-black">Calculate Aggregate</h3>
              <p className="font-bold text-black/70 mb-6">Done comparing? Now calculate your actual chance of getting in.</p>
              <Link href="/tools/aggregate-calculator">
                <BrutalButton className="bg-black text-white">Go to Calculator →</BrutalButton>
              </Link>
           </BrutalCard>
        </div>
      </BrutalContainer>
    </div>
  );
}

function ComparisonRow({ label, values, isBadges }: { label: string, values: string[], isBadges?: boolean }) {
  return (
    <tr>
      <td className="border-4 border-black p-4 font-black uppercase text-[10px] bg-zinc-100 dark:bg-zinc-800 dark:text-white">
        {label}
      </td>
      {values.map((v, i) => (
        <td key={i} className="border-4 border-black p-4 font-bold text-sm dark:text-white/80">
          {isBadges ? (
            <span className={`px-2 py-1 border-2 border-black text-[10px] font-black uppercase ${v === 'Hard' ? 'bg-[#FF4911] text-white' : 'bg-[#00FFC2] text-black'}`}>
              {v}
            </span>
          ) : v}
        </td>
      ))}
    </tr>
  );
}
