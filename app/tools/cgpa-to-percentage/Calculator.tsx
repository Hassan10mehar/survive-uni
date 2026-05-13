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

export default function CGPAToPercentageCalculator() {
  const [cgpa, setCgpa] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const val = parseFloat(cgpa);
    if (isNaN(val)) {
      setError("Please enter a valid CGPA.");
      setResult(null);
      return;
    }
    if (val < 0 || val > 4.0) {
      setError("CGPA must be between 0.0 and 4.0");
      setResult(null);
      return;
    }
    setError("");
    // HEC Standard: (CGPA / 4.0) * 100
    setResult((val / 4.0) * 100);
  };

  const reset = () => {
    setCgpa("");
    setResult(null);
    setError("");
  };

  return (
    <div className="flex-1 pb-20">
      <BrutalHeader 
        title="Percentage Calc" 
        subtitle="HEC Standard CGPA to %"
        backHref="/"
        bgColor="#00FFC2"
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
            <div className="bg-[#00FFC2] p-2 border-2 border-white shrink-0">
              <Info className="w-5 h-5 text-black" />
            </div>
            <div>
              <p className="font-black text-xs uppercase tracking-widest text-[#00FFC2] mb-1">HEC Policy</p>
              <p className="text-sm text-white/80 font-bold leading-relaxed">
                As per Higher Education Commission (HEC) Pakistan, the formula used for conversion is: <strong className="text-[#FFDF00] underline">(Obtained CGPA / 4.00) × 100</strong>.
              </p>
            </div>
          </div>
        </BrutalCard>

        <BrutalCard className="p-8 mb-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="space-y-6">
            <BrutalInput 
              label="Enter CGPA (Out of 4.0)" 
              type="number" 
              inputMode="decimal"
              step="0.01"
              placeholder="e.g. 3.50" 
              value={cgpa}
              onChange={e => setCgpa(e.target.value)}
              className="text-2xl py-4"
            />
            
            {error && (
              <div className="border-4 border-[#FF4911] bg-[#FF4911]/10 p-4">
                <p className="font-black text-sm text-[#FF4911] uppercase">{error}</p>
              </div>
            )}

            <BrutalButton 
              onClick={calculate} 
              variant="black" 
              className="w-full py-5 text-lg shadow-[6px_6px_0px_0px_rgba(0,255,194,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0px_0px_rgba(0,255,194,1)]"
            >
              Convert to Percentage →
            </BrutalButton>
          </div>
        </BrutalCard>

        <AnimatePresence>
          {result !== null && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              className="space-y-8"
            >
              <BrutalCard variant="success" className="p-10 text-center bg-[#00FFC2] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-xs uppercase tracking-[0.2em] mb-4 text-black/60">Equivalent Percentage</p>
                <div className="flex items-baseline justify-center gap-2">
                  <p className="font-black text-9xl leading-none">{result.toFixed(1)}</p>
                  <p className="font-black text-4xl">%</p>
                </div>
                <div className="mt-8 bg-black text-white px-6 py-2 inline-block font-black text-xs uppercase tracking-widest border-4 border-black">
                  Official HEC Conversion
                </div>
              </BrutalCard>

              <ShareImageCard 
                title="CGPA to Percentage"
                value={`${result.toFixed(1)}%`}
                subtitle={`From ${cgpa} CGPA (HEC Standard)`}
                color="#00FFC2"
                emoji="📈"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </BrutalContainer>
    </div>
  );
}
