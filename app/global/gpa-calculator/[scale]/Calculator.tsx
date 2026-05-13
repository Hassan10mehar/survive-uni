"use client";
import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, RotateCcw, Globe, ChevronLeft, Info } from "lucide-react";
import Link from "next/link";
import {
  BrutalButton,
  BrutalCard,
  BrutalHeader,
  BrutalContainer,
} from "@/app/components/BrutalUI";
import AdUnit from "@/app/components/AdUnit";
import { GlobalScale, buildGradeMap } from "@/lib/globalScales";

type Course = { id: string; name: string; credits: number; grade: string };

function getStatusColor(score: number, max: number): string {
  const ratio = score / max;
  if (ratio >= 0.85) return "#00FFC2";
  if (ratio >= 0.65) return "#FFDF00";
  if (ratio >= 0.45) return "#FF90E8";
  return "#FF4911";
}

function getStatusLabel(score: number, scale: GlobalScale): string {
  const ratio = score / scale.maxScale;
  if (ratio >= 0.9) return "Outstanding 🔥";
  if (ratio >= 0.75) return "Excellent ✨";
  if (ratio >= 0.6) return "Good Work 📚";
  if (ratio >= 0.45) return "Keep Going 💪";
  return "Needs Work 🚨";
}

interface Props {
  scale: GlobalScale;
}

export default function GlobalGPACalculator({ scale }: Props) {
  const gradeMap = buildGradeMap(scale);
  const gradeLabels = scale.grades.map(g => g.label);

  const defaultCourses: Course[] = [
    { id: "1", name: "Course 1", credits: scale.defaultCredits, grade: scale.defaultGrade },
    { id: "2", name: "Course 2", credits: scale.defaultCredits, grade: scale.defaultGrade },
    { id: "3", name: "Course 3", credits: scale.defaultCredits, grade: scale.defaultGrade },
  ];

  const [courses, setCourses] = useState<Course[]>(defaultCourses);
  const [hydrated, setHydrated] = useState(false);
  const LS_KEY = `survive-uni-global-gpa-${scale.id}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) setCourses(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, [LS_KEY]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(LS_KEY, JSON.stringify(courses)); } catch {}
  }, [courses, hydrated, LS_KEY]);

  const addCourse = () => {
    setCourses(p => [...p, {
      id: Math.random().toString(36).substr(2, 9),
      name: `${scale.creditLabel} ${p.length + 1}`,
      credits: scale.defaultCredits,
      grade: scale.defaultGrade,
    }]);
  };

  const removeCourse = (id: string) => {
    setCourses(p => p.length > 1 ? p.filter(c => c.id !== id) : p);
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(p => p.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const resetCourses = () => {
    if (confirm("Reset all courses?")) setCourses(defaultCourses);
  };

  const calcScore = useCallback(() => {
    let totalCredits = 0, totalPoints = 0;
    for (const c of courses) {
      if (c.credits > 0) {
        totalCredits += c.credits;
        totalPoints += (gradeMap[c.grade] ?? 0) * c.credits;
      }
    }
    const score = totalCredits > 0 ? totalPoints / totalCredits : 0;
    return { score, totalCredits, totalPoints };
  }, [courses, gradeMap]);

  const { score, totalCredits } = calcScore();
  const statusColor = getStatusColor(score, scale.maxScale);
  const statusLabel = getStatusLabel(score, scale);

  return (
    <div className="flex-1 pb-48">
      <BrutalHeader
        title={`${scale.emoji} ${scale.system}`}
        subtitle={`${scale.region} · ${scale.note}`}
        backHref="/global/gpa-calculator"
        bgColor={scale.color}
        textColor={scale.textColor}
        onReset={resetCourses}
      />

      <BrutalContainer maxWidth="max-w-3xl">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/global/gpa-calculator">
            <BrutalButton variant="white" className="px-4 py-2 text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-3 h-3" /> All Scales
              </div>
            </BrutalButton>
          </Link>
          <Link href="/">
            <BrutalButton variant="white" className="px-4 py-2 text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:bg-zinc-900">
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3" /> Pakistan Tools
              </div>
            </BrutalButton>
          </Link>
        </div>

        {/* System Info Card */}
        <BrutalCard variant="black" className="mb-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl">{scale.emoji}</div>
            <div>
              <p className="font-black text-xs uppercase tracking-widest mb-1" style={{ color: scale.color }}>
                {scale.region} · {scale.system}
              </p>
              <p className="text-sm text-white/80 font-bold leading-relaxed">{scale.note}</p>
              <p className="text-xs text-white/40 font-bold mt-2 uppercase">
                Max: {scale.maxLabel} · Passing: {scale.targetMin}+ · Credits: {scale.creditLabel}
              </p>
            </div>
          </div>
        </BrutalCard>

        {/* AdSense Top Slot */}
        <div className="mb-6">
          <AdUnit slotId="gpa-top-responsive" format="horizontal" />
        </div>

        {/* Grade Reference Grid */}
        <BrutalCard variant="white" className="mb-6 p-4 border-dashed bg-zinc-50 dark:bg-zinc-900">
          <p className="font-black text-[10px] uppercase mb-3 text-black/40 dark:text-white/40 tracking-widest text-center">
            Grade Scale Reference · {scale.system}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {scale.grades.map((g, i) => {
              const colors = ["#FFDF00", "#00FFC2", "#FF90E8", "#3B5BDB", "#F76707", "#C92A2A"];
              const bg = colors[i % colors.length];
              return (
                <div key={g.label} className="border-4 border-black p-2 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" style={{ backgroundColor: bg }}>
                  <p className="font-black text-xs text-black leading-tight">{g.label}</p>
                  {g.display && <p className="text-[10px] font-bold text-black/60">{g.display}</p>}
                  <p className="text-[10px] font-black text-black/60">{g.points.toFixed(1)} pts</p>
                </div>
              );
            })}
          </div>
        </BrutalCard>

        {/* Courses Table */}
        <BrutalCard className="p-0 overflow-hidden mb-8 border-4 border-black" variant="white">
          <div className="bg-black text-white grid border-b-4 border-black" style={{ gridTemplateColumns: "1fr 90px 1fr 48px" }}>
            <div className="px-4 py-3 font-black text-[10px] uppercase tracking-widest">Course Name</div>
            <div className="px-3 py-3 font-black text-[10px] uppercase border-l-4 border-white/20 tracking-widest text-center">{scale.creditLabel.split("/")[0]}</div>
            <div className="px-3 py-3 font-black text-[10px] uppercase border-l-4 border-white/20 tracking-widest text-center">Grade</div>
            <div className="px-2 py-3 border-l-4 border-white/20" />
          </div>

          <div className="divide-y-4 divide-black">
            {courses.map((course) => (
              <div key={course.id} className="grid items-center bg-white dark:bg-zinc-800" style={{ gridTemplateColumns: "1fr 90px 1fr 48px" }}>
                <div className="p-2">
                  <input
                    type="text"
                    className="w-full border-4 border-black px-3 py-2 font-black text-xs uppercase bg-zinc-50 dark:bg-zinc-900 dark:text-white focus:outline-none focus:bg-[#FFDF00] dark:focus:bg-[#FFDF00] dark:focus:text-black transition-colors"
                    placeholder="e.g. Mathematics"
                    value={course.name}
                    onChange={e => updateCourse(course.id, "name", e.target.value)}
                  />
                </div>
                <div className="p-2 border-l-4 border-black">
                  <select
                    className="w-full border-4 border-black px-1 py-2 font-black text-base text-black dark:text-white bg-zinc-50 dark:bg-zinc-900 focus:outline-none appearance-none text-center cursor-pointer"
                    value={course.credits}
                    onChange={e => updateCourse(course.id, "credits", parseInt(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10, 12].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div className="p-2 border-l-4 border-black">
                  <select
                    className="w-full border-4 border-black px-2 py-2 font-black text-sm focus:outline-none text-center cursor-pointer bg-zinc-50 dark:bg-zinc-900 dark:text-white"
                    value={course.grade}
                    onChange={e => updateCourse(course.id, "grade", e.target.value)}
                  >
                    {gradeLabels.map(g => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div className="p-2 border-l-4 border-black flex items-center justify-center">
                  <BrutalButton
                    variant="danger"
                    onClick={() => removeCourse(course.id)}
                    disabled={courses.length <= 1}
                    className="w-9 h-9 p-0 flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <Trash2 className="w-4 h-4" />
                  </BrutalButton>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t-4 border-black p-4 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-between">
            <BrutalButton onClick={addCourse} variant="primary" className="py-2.5 px-6 text-xs" style={{ backgroundColor: scale.color, color: scale.textColor }}>
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add {scale.creditLabel.split("/")[0]}
              </div>
            </BrutalButton>
            <span className="text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest">{courses.length} Added</span>
          </div>
        </BrutalCard>
      </BrutalContainer>

      {/* Floating Score Footer */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 border-t-8 border-black z-50 shadow-[0_-8px_0_0_rgba(0,0,0,0.1)]"
        style={{ backgroundColor: statusColor }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-black text-xs uppercase tracking-widest text-black/50 mb-1">
                Live {scale.system}
              </p>
              <div className="flex items-baseline gap-2">
                <p className="font-black text-5xl sm:text-7xl leading-none text-black">
                  {score.toFixed(2)}
                </p>
                <span className="font-black text-lg sm:text-2xl text-black/40">/ {scale.maxScale}</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="border-4 border-black bg-black text-white font-black text-xs sm:text-lg uppercase px-4 py-2 mb-2 inline-block shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                {statusLabel}
              </div>
              <div className="flex items-center justify-end gap-2">
                <div className="w-3 h-3 rounded-full bg-black/20 animate-pulse" />
                <p className="text-xs sm:text-sm font-black text-black/60 uppercase">{totalCredits} Total Credits</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
