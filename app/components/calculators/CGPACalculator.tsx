"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Target, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { 
  BrutalButton, 
  BrutalCard, 
  BrutalHeader, 
  BrutalContainer 
} from "@/app/components/BrutalUI";
import ShareImageCard from "@/app/components/ShareImageCard";
import { 
  DEFAULT_GPA_SCALE, 
  getGPAColor, 
  getGPAStatus, 
  getLetterGradeFromGPA 
} from "@/lib/grading";

type Sem = { id: string; name: string; gpa: string; credits: string };

const DEFAULT_SEMS: Sem[] = [
  { id: "1", name: "Semester 1", gpa: "3.50", credits: "18" },
  { id: "2", name: "Semester 2", gpa: "3.20", credits: "18" },
];

export interface CGPACalculatorProps {
  uniName?: string;
  themeColor?: string;
  textColor?: string;
  gpaScale?: Record<string, number>;
  backHref?: string;
}

export default function CGPACalculator({ 
  uniName, 
  themeColor = "#FFDF00", 
  textColor = "#000", 
  gpaScale,
  backHref = "/tools/cgpa-calculator"
}: CGPACalculatorProps) {
  const activeScale = gpaScale || DEFAULT_GPA_SCALE;
  const [sems, setSems] = useState<Sem[]>(DEFAULT_SEMS);
  const [hydrated, setHydrated] = useState(false);
  const [targetCGPA, setTargetCGPA] = useState("3.50");
  const [targetCH, setTargetCH] = useState("18");
  const [showTarget, setShowTarget] = useState(false);

  const LS_KEY = uniName ? `survive-uni-cgpa-${uniName.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : "survive-uni-cgpa-sems";

  useEffect(() => {
    const s = localStorage.getItem(LS_KEY);
    if (s) {
      try {
        const parsed = JSON.parse(s);
        setSems(parsed);
      } catch (e) {
        console.error("Failed to parse sems", e);
      }
    }
    setHydrated(true);
  }, [LS_KEY]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(LS_KEY, JSON.stringify(sems)); } catch {}
  }, [sems, hydrated, LS_KEY]);

  const add = () => setSems(p => [...p, { id: Math.random().toString(36).substr(2, 9), name: `Sem ${p.length + 1}`, gpa: "", credits: "18" }]);
  const remove = (id: string) => setSems(p => p.length > 1 ? p.filter(s => s.id !== id) : p);
  const update = (id: string, f: keyof Sem, v: string) => setSems(p => p.map(s => s.id === id ? { ...s, [f]: v } : s));
  
  const reset = () => {
    if (confirm("Reset all semesters?")) {
      setSems(DEFAULT_SEMS.map(s => ({ ...s, id: Math.random().toString(36).substr(2, 9) })));
    }
  };

  const valid = sems.filter(s => {
    const g = parseFloat(s.gpa), ch = parseFloat(s.credits);
    return !isNaN(g) && !isNaN(ch) && ch > 0 && g >= 0 && g <= 4;
  });

  const totalCH = valid.reduce((a, s) => a + parseFloat(s.credits), 0);
  const totalPts = valid.reduce((a, s) => a + parseFloat(s.gpa) * parseFloat(s.credits), 0);
  const cgpa = totalCH > 0 ? totalPts / totalCH : 0;

  const tCGPA = parseFloat(targetCGPA);
  const tCH = parseFloat(targetCH);
  const neededGPA = (!isNaN(tCGPA) && !isNaN(tCH) && tCH > 0 && totalCH > 0)
    ? ((tCGPA * (totalCH + tCH)) - totalPts) / tCH : null;

  return (
    <div className="flex-1 pb-48">
      <BrutalHeader 
        title={uniName ? `${uniName} CGPA` : "CGPA Calculator"}
        subtitle="Cumulative academic performance"
        backHref={backHref}
        bgColor={themeColor}
        textColor={textColor}
        onReset={reset}
      />

      <BrutalContainer maxWidth="max-w-3xl">
        <Link href={backHref} className="inline-block mb-6">
          <BrutalButton variant="white" className="px-4 py-2 text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-3 h-3" /> Back
            </div>
          </BrutalButton>
        </Link>

        <BrutalCard variant="black" className="mb-6">
          <p className="font-black text-xs uppercase mb-1 tracking-widest text-[#FFDF00]">🏛️ Cumulative Tracking</p>
          <p className="text-sm text-white/80 font-bold leading-relaxed">
            Enter each semester&apos;s GPA and total credits. We calculate the weighted average for your official CGPA. Data is saved in your browser.
          </p>
        </BrutalCard>

        {/* Semesters Table */}
        <BrutalCard className="p-0 overflow-hidden mb-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" variant="white">
          <div className="bg-black text-white grid border-b-4 border-black" style={{gridTemplateColumns:"1fr 90px 90px 48px"}}>
            <div className="px-4 py-3 font-black text-[10px] uppercase tracking-widest">Semester</div>
            <div className="px-2 py-3 font-black text-[10px] uppercase border-l-4 border-white/20 tracking-widest text-center">GPA</div>
            <div className="px-2 py-3 font-black text-[10px] uppercase border-l-4 border-white/20 tracking-widest text-center">CH</div>
            <div className="px-2 py-3 border-l-4 border-white/20"></div>
          </div>

          <div className="divide-y-4 divide-black">
            {sems.map((s) => {
              const g = parseFloat(s.gpa);
              const isValid = !isNaN(g) && g >= 0 && g <= 4;
              const gColor = isValid ? getGPAColor(g) : "transparent";
              return (
                <div key={s.id} className="grid items-center bg-white dark:bg-zinc-800" style={{gridTemplateColumns:"1fr 90px 90px 48px"}}>
                  <div className="p-2">
                    <input
                      type="text"
                      className="w-full border-4 border-black px-3 py-2 font-black text-xs uppercase bg-zinc-50 dark:bg-zinc-900 dark:text-white focus:outline-none focus:bg-[#FFDF00] dark:focus:bg-[#FFDF00] dark:focus:text-black transition-colors"
                      placeholder="e.g. Sem 1"
                      value={s.name}
                      onChange={e => update(s.id, "name", e.target.value)}
                    />
                  </div>
                  <div className="p-2 border-l-4 border-black">
                    <input 
                      type="number" inputMode="decimal" step="0.01"
                      className="w-full border-4 border-black px-1 py-2 font-black text-base text-center focus:outline-none dark:bg-zinc-900 dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      style={{ backgroundColor: gColor }}
                      placeholder="0.00"
                      value={s.gpa}
                      onChange={e => update(s.id, "gpa", e.target.value)}
                      onFocus={e => e.target.select()}
                    />
                  </div>
                  <div className="p-2 border-l-4 border-black">
                    <input 
                      type="number" inputMode="numeric"
                      className="w-full border-4 border-black px-1 py-2 font-black text-base text-center focus:outline-none bg-zinc-50 dark:bg-zinc-900 dark:text-white"
                      placeholder="18"
                      value={s.credits}
                      onChange={e => update(s.id, "credits", e.target.value)}
                      onFocus={e => e.target.select()}
                    />
                  </div>
                  <div className="p-2 border-l-4 border-black flex items-center justify-center">
                    <BrutalButton variant="danger" onClick={() => remove(s.id)} disabled={sems.length <= 1} className="w-9 h-9 p-0 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <Trash2 className="w-4 h-4" />
                    </BrutalButton>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t-4 border-black p-4 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-between">
            <BrutalButton onClick={add} variant="primary" className="py-2.5 px-6 text-xs bg-[#FFDF00] text-black">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Semester
              </div>
            </BrutalButton>
            <span className="text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest">{sems.length} Semesters · {totalCH} CH</span>
          </div>
        </BrutalCard>

        {/* Target Calculator */}
        <BrutalCard className="p-0 overflow-hidden mb-8 border-4 border-black" variant="white">
          <button 
            onClick={() => setShowTarget(!showTarget)}
            className="w-full px-6 py-4 flex items-center justify-between font-black text-sm uppercase bg-black text-white hover:bg-zinc-900 transition-colors"
          >
            <div className="flex items-center gap-3"><Target className="w-5 h-5 text-[#FFDF00]"/> Target CGPA Planner</div>
            <span className="text-[#FFDF00] font-black">{showTarget ? "[-]" : "[+]"}</span>
          </button>
          <AnimatePresence>
            {showTarget && (
              <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-zinc-50 dark:bg-zinc-900/50">
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-black/40 dark:text-white/40 mb-3 tracking-widest">Goal CGPA</label>
                      <input 
                        type="number" step="0.01" 
                        className="w-full border-4 border-black p-4 font-black text-3xl focus:outline-none dark:bg-zinc-900 dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        value={targetCGPA} onChange={e => setTargetCGPA(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-black/40 dark:text-white/40 mb-3 tracking-widest">Next Sem CH</label>
                      <input 
                        type="number" 
                        className="w-full border-4 border-black p-4 font-black text-3xl focus:outline-none dark:bg-zinc-900 dark:text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        value={targetCH} onChange={e => setTargetCH(e.target.value)}
                      />
                    </div>
                  </div>

                  {neededGPA !== null && totalCH > 0 ? (
                    <div className="border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-colors duration-500" style={{ backgroundColor: neededGPA > 4 ? "#FF4911" : neededGPA < 2 ? "#00FFC2" : "#FFDF00" }}>
                      <p className="font-black text-xs uppercase mb-3 tracking-[0.2em] text-black/60">Required GPA Next Semester</p>
                      <p className="font-black text-6xl text-black">
                        {neededGPA > 4 ? "IMPOSSIBLE" : neededGPA < 0 ? "PASSED" : neededGPA.toFixed(2)}
                      </p>
                      <p className="text-[10px] font-black mt-4 uppercase tracking-widest text-black/60">
                        {neededGPA > 4 ? "Goal too high for one semester" : neededGPA <= 2 ? "Goal already achieved!" : "Lock-in required!"}
                      </p>
                    </div>
                  ) : (
                    <div className="border-4 border-black border-dashed p-8 text-center text-black/40 dark:text-white/40 uppercase font-black text-xs tracking-widest">
                      Add semesters to calculate target
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </BrutalCard>

        <div className="pt-8 border-t-4 border-black/10 dark:border-white/10">
          <ShareImageCard 
            title="Cumulative GPA"
            value={cgpa.toFixed(2)}
            subtitle={`${totalCH} Credits — ${getGPAStatus(cgpa)}`}
            color={getGPAColor(cgpa)}
            emoji="📚"
          />
        </div>
      </BrutalContainer>

      {/* Floating CGPA Footer */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 border-t-8 border-black z-50 shadow-[0_-8px_0_0_rgba(0,0,0,0.1)]" 
        style={{ backgroundColor: getGPAColor(cgpa) }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 text-black">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-black text-xs uppercase tracking-widest text-black/50 mb-1">Live Cumulative GPA</p>
              <div className="flex items-baseline gap-2">
                <p className="font-black text-5xl sm:text-7xl leading-none">{cgpa.toFixed(2)}</p>
                <span className="font-black text-lg sm:text-2xl text-black/40">/ 4.0</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="border-4 border-black bg-black text-white font-black text-xs sm:text-lg uppercase px-4 py-2 mb-2 inline-block shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                {getGPAStatus(cgpa)}
              </div>
              <div className="flex items-center justify-end gap-2">
                <div className="w-3 h-3 rounded-full bg-black/20 animate-pulse"></div>
                <p className="text-xs sm:text-sm font-black text-black/60 uppercase">{totalCH} Total Credit Hours</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
