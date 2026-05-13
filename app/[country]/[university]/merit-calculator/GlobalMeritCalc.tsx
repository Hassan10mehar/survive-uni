"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Info, Trophy } from "lucide-react";
import {
  BrutalButton, BrutalInput, BrutalCard, BrutalContainer,
} from "@/app/components/BrutalUI";
import AdUnit from "@/app/components/AdUnit";

type Field = { id: string; label: string; placeholder: string; hint: string; max: number; weight: number };
type Tier  = { label: string; min: number; color: string };

interface Props {
  uniName:    string;
  uniShort:   string;
  uniColor:   string;
  countryName: string;
  scaleLabel: string; // "4.0 GPA" | "A-Level Points" | "CGPA / 10"
  fields:     Field[];
  tiers:      Tier[];
  note:       string;
}

export default function GlobalMeritCalculator({
  uniName, uniShort, uniColor, countryName, scaleLabel, fields, tiers, note,
}: Props) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [score,  setScore]  = useState<number | null>(null);
  const [error,  setError]  = useState("");

  const calc = () => {
    for (const f of fields) {
      const v = parseFloat(values[f.id] ?? "");
      if (isNaN(v)) { setError(`Enter a value for "${f.label}".`); return; }
      if (v < 0 || v > f.max) { setError(`"${f.label}" must be 0–${f.max}.`); return; }
    }
    setError("");
    let total = 0;
    for (const f of fields) {
      total += (parseFloat(values[f.id]) / f.max) * f.weight * 100;
    }
    setScore(total);
  };

  const activeTier = score !== null ? [...tiers].reverse().find(t => score >= t.min) : null;

  return (
    <div className="flex-1 pb-20">
      <div className="border-b-8 border-black pt-14 pb-10 px-4" style={{ backgroundColor: uniColor }}>
        <div className="max-w-3xl mx-auto">
          <p className="text-white/60 font-black text-xs uppercase tracking-widest mb-2">{countryName} · {scaleLabel}</p>
          <h1 className="text-4xl sm:text-6xl font-black uppercase text-white leading-none mb-2">
            {uniShort}<br />Admission Calc
          </h1>
          <p className="text-white/70 text-sm font-bold">{note}</p>
        </div>
      </div>

      <BrutalContainer maxWidth="max-w-3xl" className="py-10">
        {/* Info */}
        <BrutalCard variant="black" className="mb-8 p-5">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-[#FFDF00] shrink-0" />
            <p className="text-white/80 text-xs font-bold leading-relaxed">{note}</p>
          </div>
        </BrutalCard>

        {/* AdSense Top Slot */}
        <div className="mb-8">
          <AdUnit slotId="merit-global-top" format="horizontal" />
        </div>

        {/* Fields */}
        <BrutalCard variant="white" className="p-8 mb-8 border-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:bg-zinc-900">
          <div className="space-y-6">
            {fields.map(f => (
              <BrutalInput
                key={f.id}
                label={`${f.label} (max ${f.max})`}
                placeholder={f.placeholder}
                hint={f.hint}
                type="number"
                value={values[f.id] ?? ""}
                onChange={e => setValues(p => ({ ...p, [f.id]: e.target.value }))}
                className="text-xl py-4"
              />
            ))}
          </div>
          {error && (
            <div className="mt-6 p-4 border-4 border-[#FF4911] bg-[#FF4911]/10">
              <p className="font-black text-sm text-[#FF4911] uppercase">{error}</p>
            </div>
          )}
          <BrutalButton onClick={calc} className="w-full mt-8 py-5 text-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            Check Admission Chances <ArrowRight className="inline ml-2 w-5 h-5" />
          </BrutalButton>
        </BrutalCard>

        {/* Results */}
        <AnimatePresence>
          {score !== null && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Score display */}
              <div className="border-8 border-black p-10 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
                style={{ backgroundColor: activeTier?.color ?? "#FFDF00" }}>
                <p className="font-black text-xs uppercase tracking-widest text-black/50 mb-2">Admission Score</p>
                <p className="font-black text-8xl text-black leading-none">{score.toFixed(1)}</p>
                <p className="font-black text-2xl text-black/40 mt-1">/ 100</p>
                {activeTier && (
                  <div className="mt-6 inline-block bg-black text-white font-black text-sm uppercase px-6 py-2 tracking-widest">
                    {activeTier.label}
                  </div>
                )}
              </div>

              {/* Tier ladder */}
              <BrutalCard variant="white" className="p-6 border-4 dark:bg-zinc-900">
                <h3 className="font-black text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> Admission Tiers
                </h3>
                <div className="space-y-3">
                  {[...tiers].reverse().map(t => {
                    const active = score >= t.min;
                    return (
                      <div key={t.label} className={`flex items-center justify-between p-4 border-4 transition-all ${active ? "border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] scale-[1.01]" : "border-black/10 dark:border-white/10 opacity-40"}`}
                        style={active ? { backgroundColor: t.color } : {}}>
                        <span className="font-black text-sm uppercase">{t.label}</span>
                        <span className="font-black text-sm">{t.min}%+</span>
                        {active && <span className="font-black text-lg">✓</span>}
                      </div>
                    );
                  })}
                </div>
              </BrutalCard>
            </motion.div>
          )}
        </AnimatePresence>
      </BrutalContainer>
    </div>
  );
}
