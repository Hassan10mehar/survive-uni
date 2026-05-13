"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Share2 } from "lucide-react";
import { 
  BrutalButton, 
  BrutalInput, 
  BrutalCard, 
  BrutalHeader, 
  BrutalContainer 
} from "@/app/components/BrutalUI";

const GRADING_SCALE = [
  { p: 85, g: 4.0, l: "A" },
  { p: 80, g: 3.66, l: "A-" },
  { p: 75, g: 3.33, l: "B+" },
  { p: 71, g: 3.0, l: "B" },
  { p: 68, g: 2.66, l: "B-" },
  { p: 64, g: 2.33, l: "C+" },
  { p: 60, g: 2.0, l: "C" },
  { p: 58, g: 1.66, l: "C-" },
  { p: 54, g: 1.33, l: "D+" },
  { p: 50, g: 1.0, l: "D" },
];

export default function MarksToGPACalculator() {
  const [totalMarks, setTotalMarks] = useState("100");
  const [obtainedMarks, setObtainedMarks] = useState("");

  const total = parseFloat(totalMarks);
  const obtained = parseFloat(obtainedMarks);
  const pct = (obtained / total) * 100;

  const calculateGrade = (p: number) => {
    for (const scale of GRADING_SCALE) {
      if (p >= scale.p) return { gpa: scale.g, grade: scale.l };
    }
    return { gpa: 0.0, grade: "F" };
  };

  const result = !isNaN(pct) && obtained >= 0 && obtained <= total ? calculateGrade(pct) : null;

  const share = async () => {
    if (!result) return;
    const text = `🎯 I'm getting a ${result.grade} (${result.gpa.toFixed(2)}) in my course! Check your grades at surviveuni.online 🎓`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title: "Grade Predictor", text }); } 
      catch { window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank"); }
    } else {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
    }
  };

  return (
    <div className="pb-20">
      <BrutalHeader 
        title="Marks to GPA" 
        subtitle="Subject Grade Predictor"
        backHref="/"
        bgColor="#00FFC2"
      />

      <BrutalContainer maxWidth="max-w-2xl">
        <BrutalCard variant="black" className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Info className="w-5 h-5 text-[#00FFC2]" />
            <p className="font-black text-xs uppercase tracking-widest text-[#00FFC2]">HEC Standard Scale</p>
          </div>
          <p className="text-sm font-medium text-white/80 leading-relaxed">
            Enter your total sessional and final marks for a single course to see your predicted letter grade and grade points.
          </p>
        </BrutalCard>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <BrutalCard>
            <BrutalInput 
              label="Obtained Marks" 
              placeholder="e.g. 75" 
              type="number" 
              value={obtainedMarks}
              onChange={e => setObtainedMarks(e.target.value)}
              className="text-3xl py-5 text-center"
            />
          </BrutalCard>
          <BrutalCard>
            <BrutalInput 
              label="Total Marks" 
              placeholder="e.g. 100" 
              type="number" 
              value={totalMarks}
              onChange={e => setTotalMarks(e.target.value)}
              className="text-3xl py-5 text-center"
            />
          </BrutalCard>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              <BrutalCard variant="success" className="text-center py-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-center gap-8 sm:gap-12">
                  <div className="text-center">
                    <p className="font-black text-7xl sm:text-9xl leading-none">{result.grade}</p>
                    <p className="font-black text-xs uppercase mt-4 opacity-50">Grade</p>
                  </div>
                  <div className="w-1 h-24 bg-black/20" />
                  <div className="text-center">
                    <p className="font-black text-7xl sm:text-9xl leading-none">{result.gpa.toFixed(2)}</p>
                    <p className="font-black text-xs uppercase mt-4 opacity-50">Points</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t-4 border-black/10">
                  <p className="font-black text-2xl uppercase tracking-tighter">
                    Percentage: {pct.toFixed(2)}%
                  </p>
                </div>
              </BrutalCard>

              <BrutalButton 
                variant="white"
                onClick={share}
                className="w-full bg-[#25D366] text-white flex items-center justify-center gap-3 py-5"
              >
                <Share2 className="w-5 h-5" /> Share on WhatsApp
              </BrutalButton>

              <BrutalCard variant="white" className="mt-8">
                <h3 className="font-black text-sm uppercase mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4" /> Why absolute grading?
                </h3>
                <p className="text-sm text-black/70 dark:text-white/70 font-medium leading-relaxed">
                  Most Pakistani universities use the HEC-recommended absolute scale below. However, universities like <strong>NUST</strong> or <strong>FAST</strong> may use relative grading (curving) where the A starts from the class average plus standard deviation.
                </p>
                <div className="grid grid-cols-2 gap-4 mt-6 border-t-2 border-black/10 pt-6">
                  <div className="space-y-2">
                    {GRADING_SCALE.slice(0, 5).map(s => (
                      <p key={s.l} className="text-xs font-black uppercase text-black/40">{s.p}%+ → {s.l} ({s.g.toFixed(2)})</p>
                    ))}
                  </div>
                  <div className="space-y-2">
                    {GRADING_SCALE.slice(5).map(s => (
                      <p key={s.l} className="text-xs font-black uppercase text-black/40">{s.p}%+ → {s.l} ({s.g.toFixed(2)})</p>
                    ))}
                    <p className="text-xs font-black uppercase text-red-500/50">Below 50% → F (0.00)</p>
                  </div>
                </div>
              </BrutalCard>
            </motion.div>
          )}
        </AnimatePresence>
      </BrutalContainer>
    </div>
  );
}
