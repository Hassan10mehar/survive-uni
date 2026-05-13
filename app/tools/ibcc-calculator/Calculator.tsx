"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Info, Share2, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { 
  BrutalButton, 
  BrutalCard, 
  BrutalHeader, 
  BrutalContainer 
} from "@/app/components/BrutalUI";

const GRADES = {
  "A*": 90,
  "A": 85,
  "B": 75,
  "C": 65,
  "D": 55,
  "E": 45,
};

type SubjectInfo = { id: string; grade: string };

export default function IbccCalculator() {
  const [subjects, setSubjects] = useState<SubjectInfo[]>(Array(8).fill(null).map((_, i) => ({ id: `sub-${i}`, grade: "" })));
  const [result, setResult] = useState<null | { marks: number; total: number; percentage: number }>(null);

  const addSubject = () => {
    setSubjects([...subjects, { id: Math.random().toString(36).substr(2, 9), grade: "" }]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length <= 1) return;
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const updateGrade = (id: string, grade: string) => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, grade } : s));
  };

  const reset = () => {
    if (confirm("Reset all subjects?")) {
      setSubjects(Array(8).fill(null).map((_, i) => ({ id: `sub-${i}`, grade: "" })));
      setResult(null);
    }
  };

  const calculate = () => {
    let obtained = 0;
    const total = subjects.length * 100;

    for (const sub of subjects) {
      if (sub.grade && GRADES[sub.grade as keyof typeof GRADES]) {
        obtained += GRADES[sub.grade as keyof typeof GRADES];
      }
    }

    if (total === 0) return;
    
    setResult({
      marks: obtained,
      total,
      percentage: (obtained / total) * 100
    });
  };

  const share = async () => {
    if (!result) return;
    const text = `🎯 My IBCC Estimated Equivalence is ${result.percentage.toFixed(2)}% (${result.marks}/${result.total})! Check yours at surviveuni.online 🎓`;
    if (typeof navigator !== "undefined" && navigator.share) await navigator.share({ title: "IBCC Calculator", text });
    else window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <div className="pb-20">
      <BrutalHeader 
        title="IBCC Equivalence" 
        subtitle="O/A Level to Pakistani Marks"
        backHref="/"
        bgColor="#4A90E2"
        textColor="#fff"
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
            <div className="bg-[#4A90E2] p-2 border-2 border-white shrink-0">
              <Info className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-xs uppercase tracking-widest text-[#4A90E2] mb-1">Equivalence Policy</p>
              <p className="text-sm text-white/80 font-bold leading-relaxed">
                IBCC Pakistan converts foreign qualifications (O/A Levels) to local marks. For O-Levels, 8 subjects are usually required. The calculation is based on standard IBCC grade points.
              </p>
            </div>
          </div>
        </BrutalCard>

        <BrutalCard className="p-0 overflow-hidden mb-8" variant="white">
          <div className="bg-black text-white px-4 py-3 font-black text-[10px] uppercase tracking-widest border-b-4 border-black">
            Enter Your Subject Grades
          </div>
          
          <div className="divide-y-4 divide-black">
            {subjects.map((sub, idx) => (
              <div key={sub.id} className="flex gap-4 p-4 items-center bg-white dark:bg-zinc-800">
                <span className="font-black text-xs w-6 text-black/40 dark:text-white/40">{idx + 1}.</span>
                <select
                  value={sub.grade}
                  onChange={(e) => updateGrade(sub.id, e.target.value)}
                  className="w-full border-4 border-black px-4 py-3 font-black text-sm bg-white dark:bg-zinc-900 dark:text-white focus:outline-none focus:bg-[#FFDF00] dark:focus:bg-[#FFDF00] dark:focus:text-black appearance-none cursor-pointer"
                >
                  <option value="">Select Grade...</option>
                  {Object.keys(GRADES).map(g => (
                    <option key={g} value={g}>{g} ({GRADES[g as keyof typeof GRADES]})</option>
                  ))}
                </select>
                <BrutalButton 
                  variant="danger" 
                  onClick={() => removeSubject(sub.id)}
                  disabled={subjects.length <= 1}
                  className="w-12 h-12 p-0 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <Trash2 className="w-5 h-5" />
                </BrutalButton>
              </div>
            ))}
          </div>

          <div className="p-4 bg-[#F4F4F0] dark:bg-zinc-900 flex items-center justify-between border-t-4 border-black">
            <BrutalButton onClick={addSubject} variant="primary" className="py-2.5 px-4 text-xs">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Subject
              </div>
            </BrutalButton>
            <span className="text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest">{subjects.length} Subjects</span>
          </div>
        </BrutalCard>

        <BrutalButton onClick={calculate} variant="black" className="w-full py-5 text-lg mb-8 shadow-[6px_6px_0px_0px_#4A90E2]">
          Calculate Equivalence →
        </BrutalButton>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              <BrutalCard variant="success" className="p-10 text-center bg-[#4A90E2] text-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-xs uppercase tracking-[0.2em] mb-4 opacity-80">Estimated Equivalence</p>
                <p className="font-black text-9xl leading-none">{result.percentage.toFixed(1)}%</p>
                <p className="font-black text-xl uppercase mt-6 opacity-70">
                  {result.marks} / {result.total} Marks
                </p>
                <div className="mt-8 bg-black text-white px-6 py-2 inline-block font-black text-xs uppercase tracking-widest border-4 border-white">ESTIMATED RESULT 📊</div>
              </BrutalCard>

              <BrutalButton onClick={share} variant="success" className="w-full py-5 bg-[#25D366] text-white">
                <div className="flex items-center justify-center gap-3">
                  <Share2 className="w-5 h-5"/> Share Equivalence
                </div>
              </BrutalButton>
            </motion.div>
          )}
        </AnimatePresence>
      </BrutalContainer>
    </div>
  );
}
