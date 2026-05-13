"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ChevronLeft, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { UniConfig, Field } from "@/lib/unis";
import { 
  BrutalButton, 
  BrutalInput, 
  BrutalCard, 
  BrutalHeader, 
  BrutalContainer 
} from "@/app/components/BrutalUI";
import AdUnit from "@/app/components/AdUnit";
import ShareImageCard from "@/app/components/ShareImageCard";

function BenchmarkList({ benchmarks, result }: { benchmarks: { name: string; threshold: number }[]; result: number }) {
  return (
    <BrutalCard variant="white" className="p-8 bg-zinc-50 dark:bg-zinc-900 border-dashed border-4">
      <h3 className="font-black text-sm uppercase mb-6 tracking-[0.2em] text-black/40 dark:text-white/40 flex items-center gap-2">
        <Info className="w-4 h-4" /> Admission Benchmarks
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {benchmarks.map((b, i) => {
          const isMet = result >= b.threshold;
          return (
            <div 
              key={i} 
              className={`flex justify-between items-center p-5 border-4 transition-all ${isMet ? "bg-[#00FFC2] border-black text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] scale-[1.02]" : "bg-white dark:bg-zinc-800 border-black/10 dark:border-white/10 text-black/40 dark:text-white/40 shadow-none"}`}
            >
              <div className="flex flex-col">
                <span className="font-black text-lg leading-none mb-1">{b.name}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Expected Cut-off</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-black text-2xl">{b.threshold}%</span>
                {isMet ? (
                  <div className="bg-black text-[#00FFC2] w-8 h-8 flex items-center justify-center border-2 border-black rotate-3">
                    <span className="font-black text-lg">✓</span>
                  </div>
                ) : (
                  <div className="w-8 h-8 border-2 border-dashed border-black/20" />
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-8 p-4 bg-black/5 dark:bg-white/5 border-2 border-dashed border-black/10 dark:border-white/10">
        <p className="text-[10px] font-bold text-black/60 dark:text-white/60 uppercase text-center leading-relaxed">
          Historical data used for benchmarks. Competition varies by year. Use as a relative guide only.
        </p>
      </div>
    </BrutalCard>
  );
}

export default function UniCalculator({ uni, backHref = "/tools/aggregate-calculator" }: { uni: UniConfig, backHref?: string }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const reset = () => { setValues({}); setError(""); setResult(null); };

  const calc = () => {
    for (const f of uni.fields) {
      const v = parseFloat(values[f.id] ?? "");
      if (isNaN(v)) { setError(`Please enter a value for "${f.label}".`); return; }
      if (v < 0 || v > f.max) { setError(`"${f.label}" must be between 0 and ${f.max}.`); return; }
    }
    setError("");
    let agg = 0;
    for (const fm of uni.formula) {
      const raw = parseFloat(values[fm.fieldId] ?? "0");
      agg += (fm.divisor ? (raw / fm.divisor) * 100 : raw) * fm.weight;
    }
    setResult(agg);
  };

  return (
    <div className="flex-1 pb-20">
      <BrutalHeader 
        title={`${uni.name} Calculator`} 
        subtitle={uni.note}
        backHref={backHref}
        bgColor={uni.color}
        textColor={uni.textColor}
        onReset={reset}
      />

      <BrutalContainer>
        {/* Breadcrumb / Back Link */}
        <Link href={backHref} className="inline-block mb-6">
          <BrutalButton variant="white" className="px-4 py-2 text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-3 h-3" /> Back
            </div>
          </BrutalButton>
        </Link>

        {/* University Info Card */}
        <BrutalCard className="mb-8 border-4" style={{ backgroundColor: uni.color, color: uni.textColor, borderColor: 'black' }}>
          <div className="flex justify-between items-start">
            <div>
              <p className="font-black text-3xl uppercase leading-none">{uni.name}</p>
              {uni.program && (
                <span className="inline-block bg-black text-white text-[10px] font-black uppercase px-2 py-0.5 mt-2">
                  {uni.program}
                </span>
              )}
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase opacity-60">Weightage</p>
              <p className="font-black text-xs">{uni.note}</p>
            </div>
          </div>
          <p className="text-xs font-bold mt-4 opacity-70 border-t-2 border-black/10 pt-4">
            {uni.short}
          </p>
        </BrutalCard>

        {/* AdSense Top Slot */}
        <div className="mb-8">
          <AdUnit slotId="merit-top-responsive" format="horizontal" />
        </div>

        {uni.holistic ? (
          <BrutalCard variant="white" className="space-y-4 dark:bg-zinc-900">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-black flex items-center justify-center border-4 border-black shrink-0">
                <Info className="w-5 h-5 text-[#FFDF00]" />
              </div>
              <p className="font-black text-sm uppercase dark:text-white">Holistic Admissions Process</p>
            </div>
            <div className="space-y-3">
              {uni.holisticNote?.split("\n\n").map((para: string, i: number) => (
                <p key={i} className="text-sm font-medium text-black/80 dark:text-white/80 leading-relaxed">{para}</p>
              ))}
            </div>
            <div className="mt-6 border-l-8 border-black bg-[#FFDF00] p-4 text-black">
              <p className="font-black text-xs uppercase tracking-widest mb-1">💡 Pro-Tip</p>
              <p className="text-sm font-black italic">Focus on your SAT/Test scores and ECAs. Your percentage is just one part of the puzzle.</p>
            </div>
          </BrutalCard>
        ) : (
          <>
            <BrutalCard variant="white" className="p-8 sm:p-12 mb-10 dark:bg-zinc-900 border-4 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <div className="space-y-8">
                {uni.fields.map((f: Field) => (
                  <BrutalInput
                    key={f.id}
                    label={f.label}
                    placeholder={f.placeholder}
                    hint={f.hint}
                    type="number"
                    inputMode="decimal"
                    value={values[f.id] ?? ""}
                    onChange={e => setValues(p => ({ ...p, [f.id]: e.target.value }))}
                    onFocus={e => e.target.select()}
                    className="text-xl py-4"
                  />
                ))}
              </div>
 
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="mt-10 p-6 border-4 border-[#FF4911] bg-[#FF4911]/5"
                >
                  <p className="font-black text-sm text-[#FF4911] uppercase flex items-center gap-2">
                    <span className="bg-[#FF4911] text-white px-2 py-0.5">Error</span> {error}
                  </p>
                </motion.div>
              )}
 
              <BrutalButton 
                onClick={calc} 
                className="w-full mt-12 py-6 text-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              >
                Get Result <ArrowRight className="inline-block ml-2 w-6 h-6" />
              </BrutalButton>
            </BrutalCard>

            <AnimatePresence mode="wait">
              {result !== null && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8"
                >
                  <BrutalCard 
                    className="p-10 sm:p-16 text-center border-4 relative overflow-hidden group" 
                    style={{ backgroundColor: uni.color, color: uni.textColor, borderColor: 'black' }}
                  >
                    <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,_black_1px,_transparent_0)] bg-[size:20px_20px]"></div>
                    
                    <p className="font-black text-sm uppercase tracking-[0.3em] mb-4 opacity-50 relative z-10">Calculated Aggregate</p>
                    <div className="relative z-10 inline-block">
                      <motion.p 
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="font-black leading-none mb-2" 
                        style={{ fontSize: "clamp(4rem,20vw,8rem)" }}
                      >
                        {result.toFixed(4)}
                        <span className="text-2xl sm:text-4xl ml-2 opacity-30 font-black">%</span>
                      </motion.p>
                      <div className="h-4 bg-black/10 w-full absolute -bottom-2 -skew-x-12 -z-10"></div>
                    </div>
                    
                    <div className="mt-10 flex flex-wrap justify-center gap-4 relative z-10">
                      <div className="bg-black text-white px-6 py-2 border-4 border-black font-black text-xs uppercase tracking-widest -rotate-2">
                        {uni.name} 2026
                      </div>
                      <div className="bg-white text-black px-6 py-2 border-4 border-black font-black text-xs uppercase tracking-widest rotate-1">
                        Official Formula
                      </div>
                    </div>
                  </BrutalCard>

                  {uni.benchmarks.length > 0 && (
                    <BenchmarkList benchmarks={uni.benchmarks} result={result} />
                  )}

                  <div className="pt-4 border-t-4 border-black/10 dark:border-white/10">
                    <ShareImageCard 
                      title={`${uni.name} Aggregate`}
                      value={result.toFixed(2)}
                      subtitle={`${uni.short} Merit Score`}
                      color={uni.color}
                      emoji="🎓"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </BrutalContainer>
    </div>
  );
}
