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

type Result = { 
  finalNeeded: number; 
  targetTotal: number; 
  totalCourse: number; 
  status: "safe"|"warning"|"danger"; 
  percentNeeded: number; 
};

const MARKS_PRESETS = [
  { label: "50+50", s: "50", f: "50" },
  { label: "40+60", s: "40", f: "60" },
  { label: "30+70", s: "30", f: "70" },
  { label: "25+75", s: "25", f: "75" },
];

export default function PassPredictorCalculator() {
  const [sessionalObtained, setSessionalObtained] = useState("");
  const [sessionalTotal, setSessionalTotal] = useState("");
  const [finalTotal, setFinalTotal] = useState("");
  const [targetPercent, setTargetPercent] = useState("50");
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const reset = () => {
    setSessionalObtained(""); setSessionalTotal(""); setFinalTotal(""); setTargetPercent("50");
    setResult(null); setError("");
  };

  const calculate = () => {
    const so = parseFloat(sessionalObtained), st = parseFloat(sessionalTotal);
    const ft = parseFloat(finalTotal), tp = parseFloat(targetPercent);
    if (isNaN(so) || isNaN(st) || isNaN(ft) || isNaN(tp)) { setError("Please fill in all fields."); return; }
    if (st <= 0 || ft <= 0) { setError("Totals must be greater than 0."); return; }
    if (so > st) { setError("Marks obtained cannot exceed total sessional marks."); return; }
    if (tp <= 0 || tp > 100) { setError("Target % must be between 1 and 100."); return; }
    
    setError("");
    const totalCourse = st + ft;
    const targetTotal = (tp / 100) * totalCourse;
    const finalNeeded = targetTotal - so;
    const percentNeeded = (finalNeeded / ft) * 100;
    const status: Result["status"] = percentNeeded > 80 ? "danger" : percentNeeded >= 40 ? "warning" : "safe";
    setResult({ finalNeeded, targetTotal, totalCourse, status, percentNeeded });
  };

  return (
    <div className="flex-1 pb-20">
      <BrutalHeader 
        title="Pass Predictor" 
        subtitle="Will you survive finals?"
        backHref="/"
        bgColor="#FF90E8"
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
            <div className="bg-[#FF90E8] p-2 border-2 border-white shrink-0">
              <Info className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="font-black text-xs uppercase tracking-widest text-[#FF90E8] mb-1">Grading Logic</p>
              <p className="text-sm text-white/80 font-bold leading-relaxed">
                Enter your sessional marks (Quizzes, Assignments, Mids) and the weightage of the final exam. We&apos;ll tell you exactly what you need to score to pass.
              </p>
            </div>
          </div>
        </BrutalCard>

        <BrutalCard className="mb-6 border-4 border-black">
          <p className="font-black text-[10px] uppercase text-black/40 dark:text-white/40 mb-3 tracking-widest px-1">Weightage Presets</p>
          <div className="flex flex-wrap gap-2">
            {MARKS_PRESETS.map((p) => (
              <BrutalButton 
                key={p.label}
                variant={sessionalTotal === p.s && finalTotal === p.f ? "primary" : "white"}
                onClick={() => { setSessionalTotal(p.s); setFinalTotal(p.f); }}
                className="px-4 py-2 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {p.label}
              </BrutalButton>
            ))}
          </div>
        </BrutalCard>

        <BrutalCard className="p-8 mb-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <BrutalInput 
                label="Sessional Obtained" 
                type="number" 
                placeholder="e.g. 32" 
                value={sessionalObtained}
                onChange={e => setSessionalObtained(e.target.value)}
              />
              <BrutalInput 
                label="Sessional Total" 
                type="number" 
                placeholder="e.g. 50" 
                value={sessionalTotal}
                onChange={e => setSessionalTotal(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <BrutalInput 
                label="Final Exam Total" 
                type="number" 
                placeholder="e.g. 50" 
                value={finalTotal}
                onChange={e => setFinalTotal(e.target.value)}
              />
              <BrutalInput 
                label="Target Overall %" 
                type="number" 
                value={targetPercent}
                onChange={e => setTargetPercent(e.target.value)}
              />
            </div>

            {error && (
              <div className="border-4 border-[#FF4911] bg-[#FF4911]/10 p-4 text-[#FF4911] font-black text-sm uppercase">
                {error}
              </div>
            )}

            <BrutalButton onClick={calculate} variant="black" className="w-full py-5 text-lg shadow-[6px_6px_0px_0px_rgba(255,144,232,1)]">
              Predict My Fate →
            </BrutalButton>
          </div>
        </BrutalCard>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <BrutalCard 
                variant={result.status === "danger" ? "danger" : result.status === "warning" ? "primary" : "success"}
                className="p-10 text-center border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
              >
                <p className="font-black text-xs uppercase tracking-[0.2em] mb-4 opacity-80">Marks Needed in Final</p>
                <div className="flex items-baseline justify-center gap-2">
                  <p className="font-black text-9xl leading-none">{Math.max(0, result.finalNeeded).toFixed(1)}</p>
                  <p className="font-black text-4xl opacity-50">/ {finalTotal}</p>
                </div>
                <p className="font-black text-xl uppercase mt-6 tracking-widest">
                  ({Math.max(0, result.percentNeeded).toFixed(1)}% of final)
                </p>
                <div className="mt-8 bg-black text-white dark:bg-white dark:text-black px-8 py-3 inline-block font-black text-sm uppercase tracking-widest border-4 border-black">
                  {result.status === "danger" ? "LOCK-IN MODE REQUIRED 🔥" : result.status === "warning" ? "YOU CAN DO IT 📚" : "YOU ARE SAFE 😌"}
                </div>
              </BrutalCard>

              <BrutalCard variant="white" className="p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white dark:bg-zinc-800">
                <p className="font-black text-xs uppercase text-black/40 dark:text-white/40 tracking-widest mb-6 border-b-4 border-black/10 pb-3">Score Breakdown</p>
                <div className="space-y-4 font-black text-base uppercase">
                  <div className="flex justify-between">
                    <span className="text-black/40">Total Course Marks</span>
                    <span>{result.totalCourse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/40">Target Marks ({targetPercent}%)</span>
                    <span>{result.targetTotal.toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-black/40">Sessional Scored</span>
                    <span className="text-[#4A90E2]">{sessionalObtained}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t-8 border-black">
                    <span className="text-xl">Required in Final</span>
                    <span className="text-[#FF4911] text-3xl">{Math.max(0, result.finalNeeded).toFixed(1)}</span>
                  </div>
                </div>
              </BrutalCard>

              <ShareImageCard 
                title="Pass Predictor"
                value={`${Math.max(0, result.finalNeeded).toFixed(1)}/${finalTotal}`}
                subtitle={`Needed in final to score ${targetPercent}% total`}
                color={result.status === "danger" ? "#FF4911" : result.status === "warning" ? "#FFDF00" : "#00FFC2"}
                emoji={result.status === "danger" ? "🔥" : "📚"}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </BrutalContainer>
    </div>
  );
}
