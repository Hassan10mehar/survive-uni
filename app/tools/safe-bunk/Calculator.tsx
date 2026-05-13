"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { 
  BrutalButton, 
  BrutalInput, 
  BrutalCard, 
  BrutalHeader, 
  BrutalContainer 
} from "@/app/components/BrutalUI";
import ShareImageCard from "@/app/components/ShareImageCard";

const PRESETS = [
  { label: "FAST (80%)", value: "80" },
  { label: "NUST (75%)", value: "75" },
  { label: "Regular (75%)", value: "75" },
  { label: "Strict (85%)", value: "85" },
];

export default function SafeBunkCalculator() {
  const [conducted, setConducted] = useState("");
  const [attended, setAttended] = useState("");
  const [target, setTarget] = useState("75");
  const [error, setError] = useState("");
  const [result, setResult] = useState<null | {
    type: "budget" | "needed";
    value: number;
    currentPercent: number;
  }>(null);

  const reset = () => {
    setConducted(""); setAttended(""); setTarget("75");
    setResult(null); setError("");
  };

  const calculate = () => {
    const c = parseInt(conducted), a = parseInt(attended), t = parseFloat(target);
    if (!conducted || !attended) { setError("Please fill in all fields."); return; }
    if (isNaN(c) || c <= 0) { setError("Total classes must be greater than 0."); return; }
    if (isNaN(a) || a < 0) { setError("Attended classes cannot be negative."); return; }
    if (a > c) { setError("Attended classes cannot exceed total classes."); return; }
    if (isNaN(t) || t <= 0 || t >= 100) { setError("Target % must be between 1 and 99."); return; }
    
    setError("");
    const currentPercent = (a / c) * 100;

    if (currentPercent >= t) {
      const bunkBudget = Math.floor((a * 100) / t - c);
      setResult({ type: "budget", value: bunkBudget, currentPercent });
    } else {
      const needed = Math.ceil((t * c - 100 * a) / (100 - t));
      setResult({ type: "needed", value: Math.max(0, needed), currentPercent });
    }
  };

  return (
    <div className="flex-1 pb-20">
      <BrutalHeader 
        title="Safe Bunk" 
        subtitle="Know your bunk budget"
        backHref="/"
        bgColor="#FFDF00"
        textColor="#000"
        onReset={reset}
      />

      <BrutalContainer maxWidth="max-w-2xl">
        <Link href="/" className="inline-block mb-6">
          <BrutalButton variant="white" className="px-4 py-2 text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-3 h-3" /> Back to Tools
            </div>
          </BrutalButton>
        </Link>

        <BrutalCard variant="black" className="mb-6">
          <div className="flex items-start gap-4">
            <div className="bg-[#FFDF00] p-2 border-2 border-white shrink-0">
              <Info className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="font-black text-xs uppercase tracking-widest text-[#FFDF00] mb-1">Pakistani Attendance Rules</p>
              <p className="text-sm text-white/80 font-bold leading-relaxed">
                Most Pakistani universities require <strong className="text-[#00FFC2]">75% attendance</strong> to sit in final exams. Some like FAST require <strong className="text-[#FF90E8]">80%</strong>. Use the calculator to stay safe.
              </p>
            </div>
          </div>
        </BrutalCard>

        <BrutalCard className="mb-6 border-4 border-black">
          <p className="font-black text-[10px] uppercase text-black/40 dark:text-white/40 mb-3 tracking-widest px-1">Policy Presets</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <BrutalButton 
                key={p.label}
                variant={target === p.value ? "primary" : "white"}
                onClick={() => setTarget(p.value)}
                className="px-4 py-2 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {p.label}
              </BrutalButton>
            ))}
          </div>
        </BrutalCard>

        <BrutalCard className="p-8 mb-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <BrutalInput 
                label="Total Classes" 
                type="number" 
                placeholder="e.g. 40" 
                value={conducted}
                onChange={e => setConducted(e.target.value)}
              />
              <BrutalInput 
                label="Attended" 
                type="number" 
                placeholder="e.g. 28" 
                value={attended}
                onChange={e => setAttended(e.target.value)}
              />
            </div>
            <BrutalInput 
              label="Target Percentage (%)" 
              type="number" 
              value={target}
              onChange={e => setTarget(e.target.value)}
            />
            
            {error && (
              <div className="border-4 border-[#FF4911] bg-[#FF4911]/10 p-4 text-[#FF4911] font-black text-sm uppercase">
                {error}
              </div>
            )}

            <BrutalButton onClick={calculate} variant="black" className="w-full py-5 text-lg shadow-[6px_6px_0px_0px_rgba(255,223,0,1)]">
              Calculate Bunk Budget →
            </BrutalButton>
          </div>
        </BrutalCard>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <BrutalCard variant="white" className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white dark:bg-zinc-800">
                <div className="flex justify-between items-baseline mb-6">
                  <p className="font-black text-xs uppercase text-black/40 dark:text-white/40 tracking-widest">Current Status</p>
                  <p className="font-black text-5xl">{result.currentPercent.toFixed(1)}%</p>
                </div>
                <div className="w-full bg-zinc-100 dark:bg-zinc-900 border-4 border-black h-12 relative overflow-hidden">
                  <div 
                    className="h-full bg-black dark:bg-white transition-all duration-1000 ease-out" 
                    style={{ width: `${Math.min(result.currentPercent, 100)}%` }} 
                  />
                  <div 
                    className="absolute top-0 bottom-0 border-l-4 border-dashed border-[#FF4911] z-10"
                    style={{ left: `${Math.min(parseFloat(target), 100)}%` }} 
                  />
                </div>
                <div className="mt-3 flex justify-between text-[10px] font-black uppercase tracking-widest text-black/60 dark:text-white/60">
                  <span>0%</span>
                  <span className="text-[#FF4911]">Target: {target}%</span>
                  <span>100%</span>
                </div>
              </BrutalCard>

              {result.type === "budget" ? (
                <BrutalCard variant="success" className="p-10 text-center bg-[#00FFC2] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                  <p className="font-black text-xs uppercase tracking-[0.2em] mb-4 text-black/60">🎉 Bunk Budget</p>
                  <p className="font-black text-9xl leading-none text-black">{result.value}</p>
                  <p className="font-black text-lg uppercase mt-4 text-black/60">Classes you can skip</p>
                  <div className="mt-8 bg-black text-[#00FFC2] px-8 py-3 inline-block font-black text-sm uppercase tracking-widest border-4 border-black">
                    USE WISELY, KING 👑
                  </div>
                </BrutalCard>
              ) : (
                <BrutalCard variant="danger" className="p-10 text-center bg-[#FF4911] text-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                  <p className="font-black text-xs uppercase tracking-[0.2em] mb-4 text-white/60">⚠️ Classes Needed</p>
                  <p className="font-black text-9xl leading-none text-white">{result.value}</p>
                  <p className="font-black text-lg uppercase mt-4 text-white/60">Must attend consecutively</p>
                  <div className="mt-8 bg-white text-[#FF4911] px-8 py-3 inline-block font-black text-sm uppercase tracking-widest border-4 border-black">
                    STOP BUNKING. NOW. 🚨
                  </div>
                </BrutalCard>
              )}

              <ShareImageCard 
                title={result.type === "budget" ? "Bunk Budget" : "Classes Needed"}
                value={`${result.value}`}
                subtitle={result.type === "budget" ? "Classes I can skip safely" : "Classes I must attend now"}
                color={result.type === "budget" ? "#00FFC2" : "#FF4911"}
                emoji={result.type === "budget" ? "👑" : "🚨"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </BrutalContainer>
    </div>
  );
}
