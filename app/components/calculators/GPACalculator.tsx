"use client";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Plus, Trash2, RotateCcw, ChevronLeft } from "lucide-react";
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
  getGradeColor,
  getGradeTextColor
} from "@/lib/grading";

type Course = { id: string; name: string; credits: number; grade: string; };

const DEFAULT_COURSES: Course[] = [
  { id: "1", name: "Calculus", credits: 3, grade: "A" },
  { id: "2", name: "Programming", credits: 3, grade: "B+" },
  { id: "3", name: "Physics", credits: 3, grade: "B" },
];

export interface GPACalculatorProps {
  uniName?: string;
  themeColor?: string;
  textColor?: string;
  gpaScale?: Record<string, number>;
  backHref?: string;
}

export default function GPACalculator({ 
  uniName, 
  themeColor = "#00FFC2", 
  textColor = "#000", 
  gpaScale,
  backHref = "/tools/gpa-calculator"
}: GPACalculatorProps) {
  const activeScale = gpaScale || DEFAULT_GPA_SCALE;
  const activeGrades = Object.keys(activeScale);
  const [courses, setCourses] = useState<Course[]>(DEFAULT_COURSES);
  const [hydrated, setHydrated] = useState(false);

  const LS_KEY = uniName ? `survive-uni-gpa-${uniName.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : "survive-uni-gpa-courses";

  useEffect(() => {
    // Run asynchronously to avoid set-state-in-effect warning and cascading renders during commit phase
    const timer = setTimeout(() => {
      try {
        const saved = localStorage.getItem(LS_KEY);
        if (saved) setCourses(JSON.parse(saved));
      } catch {}
      setHydrated(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [LS_KEY]);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(LS_KEY, JSON.stringify(courses)); } catch {}
  }, [courses, hydrated, LS_KEY]);

  const addCourse = () => {
    const defaultGrade = activeScale["B"] !== undefined ? "B" : activeGrades[0];
    setCourses(prev => [...prev, { id: Math.random().toString(36).substr(2, 9), name: "", credits: 3, grade: defaultGrade }]);
  };

  const removeCourse = (id: string) => {
    setCourses(prev => prev.length > 1 ? prev.filter(c => c.id !== id) : prev);
  };

  const updateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(prev => prev.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const resetCourses = () => {
    if (confirm("Reset all courses?")) {
      const safeDefaults = DEFAULT_COURSES.map(c => ({
        ...c,
        grade: activeScale[c.grade] !== undefined ? c.grade : activeGrades[0]
      }));
      setCourses(safeDefaults);
    }
  };

  const calcGPA = useCallback(() => {
    let totalCredits = 0, totalPoints = 0;
    for (const c of courses) {
      if (c.credits > 0) {
        totalCredits += c.credits;
        totalPoints += (activeScale[c.grade] ?? 0) * c.credits;
      }
    }
    return { gpa: totalCredits > 0 ? totalPoints / totalCredits : 0, totalCredits, totalPoints };
  }, [courses, activeScale]);

  const { gpa, totalCredits } = calcGPA();
  const gpaColor = getGPAColor(gpa);

  return (
    <div className="flex-1 pb-48">
      <BrutalHeader 
        title={uniName ? `${uniName} GPA` : "GPA Calculator"}
        subtitle="Real-time semester tracking"
        backHref={backHref}
        bgColor={themeColor}
        textColor={textColor}
        onReset={resetCourses}
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
          <p className="font-black text-xs uppercase mb-1 tracking-widest" style={{ color: themeColor }}>🎓 HEC Pakistan Scale</p>
          <p className="text-sm text-white/80 font-bold leading-relaxed">
            Using the official {uniName || "Standard HEC"} 4.0 grading scale. Your courses are saved automatically in your browser.
          </p>
        </BrutalCard>

        {/* Grade Reference Grid */}
        <BrutalCard variant="white" className="mb-6 p-4 border-dashed bg-zinc-50 dark:bg-zinc-900">
          <p className="font-black text-[10px] uppercase mb-3 text-black/40 dark:text-white/40 tracking-widest text-center">Grade Points Reference</p>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-2">
            {activeGrades.map(g => {
              const pts = activeScale[g];
              const bg = getGradeColor(g, activeScale);
              const fg = getGradeTextColor(g, activeScale);
              return (
                <div key={g} className="text-center border-4 border-black p-2 transition-transform hover:-translate-y-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" style={{ backgroundColor: bg }}>
                  <p className="font-black text-xs" style={{ color: fg }}>{g}</p>
                  <p className="text-[10px] font-black opacity-60" style={{ color: fg }}>{pts.toFixed(1)}</p>
                </div>
              );
            })}
          </div>
        </BrutalCard>

        {/* Courses Table */}
        <BrutalCard className="p-0 overflow-hidden mb-8 border-4 border-black" variant="white">
          <div className="bg-black text-white grid border-b-4 border-black" style={{gridTemplateColumns:"1fr 80px 88px 48px"}}>
            <div className="px-4 py-3 font-black text-[10px] uppercase tracking-widest">Course Name</div>
            <div className="px-3 py-3 font-black text-[10px] uppercase border-l-4 border-white/20 tracking-widest text-center">CH</div>
            <div className="px-3 py-3 font-black text-[10px] uppercase border-l-4 border-white/20 tracking-widest text-center">Grade</div>
            <div className="px-2 py-3 border-l-4 border-white/20"></div>
          </div>

          <div className="divide-y-4 divide-black">
            {courses.map((course) => {
              const bg = getGradeColor(course.grade, activeScale);
              const fg = getGradeTextColor(course.grade, activeScale);
              return (
                <div key={course.id} className="grid items-center bg-white dark:bg-zinc-800" style={{gridTemplateColumns:"1fr 80px 88px 48px"}}>
                  <div className="p-2">
                    <input
                      type="text"
                      className="w-full border-4 border-black px-3 py-2 font-black text-xs uppercase bg-zinc-50 dark:bg-zinc-900 dark:text-white focus:outline-none focus:bg-[#FFDF00] dark:focus:bg-[#FFDF00] dark:focus:text-black transition-colors"
                      placeholder="e.g. Physics"
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
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="p-2 border-l-4 border-black">
                    <select
                      className="w-full border-4 border-black px-1 py-2 font-black text-base focus:outline-none appearance-none text-center cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      style={{ backgroundColor: bg, color: fg }}
                      value={course.grade}
                      onChange={e => updateCourse(course.id, "grade", e.target.value)}
                    >
                      {activeGrades.map(g => <option key={g} value={g} style={{backgroundColor:"#fff",color:"#000"}}>{g}</option>)}
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
              );
            })}
          </div>

          <div className="border-t-4 border-black p-4 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-between">
            <BrutalButton onClick={addCourse} variant="primary" className="py-2.5 px-6 text-xs bg-[#00FFC2] text-black">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Course
              </div>
            </BrutalButton>
            <span className="text-[10px] font-black text-black/40 dark:text-white/40 uppercase tracking-widest">{courses.length} Courses Added</span>
          </div>
        </BrutalCard>

        <div className="pt-8 border-t-4 border-black/10 dark:border-white/10">
          <ShareImageCard 
            title={`${uniName ? uniName : "Semester"} GPA`}
            value={gpa.toFixed(2)}
            subtitle={`${totalCredits} Credits — ${getGPAStatus(gpa)}`}
            color={themeColor}
            emoji="🔥"
          />
        </div>
      </BrutalContainer>

      {/* Floating GPA Footer */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 border-t-8 border-black z-50 shadow-[0_-8px_0_0_rgba(0,0,0,0.1)]" 
        style={{ backgroundColor: gpaColor }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-black text-xs uppercase tracking-widest text-black/50 mb-1">Live Semester GPA</p>
              <div className="flex items-baseline gap-2">
                <p className="font-black text-5xl sm:text-7xl leading-none text-black">{gpa.toFixed(2)}</p>
                <span className="font-black text-lg sm:text-2xl text-black/40">/ 4.0</span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="border-4 border-black bg-black text-white font-black text-xs sm:text-lg uppercase px-4 py-2 mb-2 inline-block shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                {getGPAStatus(gpa)}
              </div>
              <div className="flex items-center justify-end gap-2">
                <div className="w-3 h-3 rounded-full bg-black/20 animate-pulse"></div>
                <p className="text-xs sm:text-sm font-black text-black/60 uppercase">{totalCredits} Total Credits</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
