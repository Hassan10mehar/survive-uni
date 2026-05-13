"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Plus, Trash2, Info, ChevronLeft, Target, HelpCircle, Zap } from "lucide-react";
import Link from "next/link";
import {
  BrutalButton,
  BrutalInput,
  BrutalCard,
  BrutalHeader,
  BrutalContainer
} from "@/app/components/BrutalUI";
import ShareImageCard from "@/app/components/ShareImageCard";

type Course = { id: string; name: string; conducted: string; attended: string };

const DEFAULT_COURSES: Course[] = [
  { id: "1", name: "Programming Fundamentals", conducted: "20", attended: "18" },
  { id: "2", name: "Calculus & Geometry", conducted: "20", attended: "15" },
];

/** Regional config for context-aware copy */
type RegionContext = "pk" | "global";

interface RegionCopy {
  toolTitle: string;
  toolSubtitle: string;
  targetLabel: string;
  targetHint: string;
  skipLabel: string;        // "Can skip X classes" vs "X classes buffer"
  attendLabel: string;      // "Must attend X more" vs "Attend X more to reach target"
  safeStatus: string;
  dangerStatus: string;
  whatIfTitle: string;
}

const COPY: Record<RegionContext, RegionCopy> = {
  pk: {
    toolTitle: "Bunk Tracker",
    toolSubtitle: "Manage your bunk budget per course",
    targetLabel: "Target %",
    targetHint: "Standard is 75% for most Pakistani unis.",
    skipLabel: "Can bunk",
    attendLabel: "Must attend",
    safeStatus: "LOOKING GOOD ✨",
    dangerStatus: "ATTEND CLASSES! 🚨",
    whatIfTitle: "What If I Miss More?",
  },
  global: {
    toolTitle: "Attendance Buffer",
    toolSubtitle: "Track your skip limit & attendance buffer",
    targetLabel: "Minimum Attendance %",
    targetHint: "Most universities require 75–80%. Check your handbook.",
    skipLabel: "buffer classes",
    attendLabel: "classes needed",
    safeStatus: "BUFFER SAFE ✨",
    dangerStatus: "ATTEND CLASSES! 🚨",
    whatIfTitle: "What-If Scenario",
  },
};

interface Props {
  /** Region context: "pk" (Pakistan) or "global" (international). Defaults to "pk". */
  context?: RegionContext;
}

export default function AttendanceTrackerCalculator({ context = "pk" }: Props) {
  const copy = COPY[context];

  const [courses, setCourses] = useState<Course[]>(DEFAULT_COURSES);
  const [hydrated, setHydrated] = useState(false);
  const [target, setTarget] = useState("75");
  const [showWhatIf, setShowWhatIf] = useState(false);
  const [whatIfMissing, setWhatIfMissing] = useState("2");
  const [whatIfCourseId, setWhatIfCourseId] = useState<string | null>(null);

  const LS_KEY = `survive-uni-attendance-v3-${context}`;

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

  const add = () => setCourses(p => [...p, {
    id: Math.random().toString(36).substr(2, 9),
    name: `Course ${p.length + 1}`,
    conducted: "0",
    attended: "0",
  }]);
  const remove = (id: string) => setCourses(p => p.length > 1 ? p.filter(c => c.id !== id) : p);
  const update = (id: string, f: keyof Course, v: string) => setCourses(p => p.map(c => c.id === id ? { ...c, [f]: v } : c));

  const reset = () => {
    if (confirm("Reset all courses?")) {
      setCourses(DEFAULT_COURSES.map(c => ({ ...c, id: Math.random().toString(36).substr(2, 9) })));
    }
  };

  const calculateStats = (c: Course, overrideMissing?: number) => {
    const conducted = parseInt(c.conducted) || 0;
    const rawAttended = parseInt(c.attended) || 0;
    const attended = overrideMissing !== undefined ? rawAttended : rawAttended;
    const t = parseFloat(target) || 75;
    const percent = conducted > 0 ? (attended / conducted) * 100 : 100;

    let status: "safe" | "warning" | "danger" = "safe";
    let message = "";
    let value = 0;

    if (percent >= t) {
      status = "safe";
      value = Math.floor((attended * 100) / t - conducted);
      message = value > 0
        ? `${value} ${copy.skipLabel}`
        : "On the edge!";
    } else {
      value = Math.ceil((t * conducted - 100 * attended) / (100 - t));
      status = value > 5 ? "danger" : "warning";
      message = `${value} ${copy.attendLabel}`;
    }

    return { percent, status, message, value };
  };

  /** What-If: project attendance after N more missed classes */
  const whatIfStats = (c: Course, missing: number) => {
    const conducted = parseInt(c.conducted) || 0;
    const attended = parseInt(c.attended) || 0;
    const t = parseFloat(target) || 75;
    // Simulate: N more classes are conducted, student attends 0 of them
    const newConducted = conducted + missing;
    const newPercent = newConducted > 0 ? (attended / newConducted) * 100 : 0;
    const wouldPass = newPercent >= t;
    const extraNeeded = wouldPass ? 0 : Math.ceil((t * newConducted - 100 * attended) / (100 - t));
    return { newPercent, wouldPass, extraNeeded };
  };

  const overallConducted = courses.reduce((a, c) => a + (parseInt(c.conducted) || 0), 0);
  const overallAttended = courses.reduce((a, c) => a + (parseInt(c.attended) || 0), 0);
  const overallPercent = overallConducted > 0 ? (overallAttended / overallConducted) * 100 : 0;
  const isSafe = overallPercent >= parseFloat(target);

  const selectedCourse = courses.find(c => c.id === whatIfCourseId) || courses[0];

  return (
    <div className="flex-1 pb-48">
      <BrutalHeader
        title={copy.toolTitle}
        subtitle={copy.toolSubtitle}
        backHref="/"
        bgColor="#FF90E8"
        textColor="#000"
        onReset={reset}
      />

      <BrutalContainer maxWidth="max-w-3xl">
        <Link href="/" className="inline-block mb-6">
          <BrutalButton variant="white" className="px-4 py-2 text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:bg-zinc-900">
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-3 h-3" /> Back to Tools
            </div>
          </BrutalButton>
        </Link>

        {/* Target Setting */}
        <BrutalCard variant="black" className="mb-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="bg-[#FF90E8] p-2 border-2 border-white shrink-0">
                <Target className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="font-black text-xs uppercase tracking-widest text-[#FF90E8] mb-1">{copy.targetLabel}</p>
                <p className="text-xs text-white/60 font-bold">{copy.targetHint}</p>
              </div>
            </div>
            <input
              type="number"
              value={target}
              onChange={e => setTarget(e.target.value)}
              className="w-20 border-4 border-white bg-transparent text-white font-black text-2xl p-2 text-center focus:outline-none focus:bg-white focus:text-black transition-colors"
            />
          </div>
        </BrutalCard>

        {/* What-If Toggle */}
        <div className="flex gap-3 mb-6">
          <BrutalButton
            variant={showWhatIf ? "primary" : "white"}
            onClick={() => setShowWhatIf(v => !v)}
            className="flex items-center gap-2 text-xs px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <Zap className="w-4 h-4" />
            {copy.whatIfTitle}
          </BrutalButton>
        </div>

        {/* What-If Panel */}
        {showWhatIf && (
          <BrutalCard variant="secondary" className="mb-8 p-6">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="w-5 h-5" />
              <h3 className="font-black uppercase text-sm">
                {context === "pk" ? "What if I bunk more classes?" : "What happens if I miss more classes?"}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="font-black text-[10px] uppercase block mb-1">Select Course</label>
                <select
                  className="w-full border-4 border-black p-2 font-bold text-sm bg-white dark:bg-zinc-900 dark:text-white"
                  value={whatIfCourseId || courses[0]?.id}
                  onChange={e => setWhatIfCourseId(e.target.value)}
                >
                  {courses.map(c => <option key={c.id} value={c.id}>{c.name || `Course`}</option>)}
                </select>
              </div>
              <div>
                <label className="font-black text-[10px] uppercase block mb-1">
                  Classes I plan to miss
                </label>
                <input
                  type="number"
                  value={whatIfMissing}
                  min="1"
                  onChange={e => setWhatIfMissing(e.target.value)}
                  className="w-full border-4 border-black px-3 py-2 font-black text-2xl text-center focus:outline-none focus:bg-[#FFDF00] transition-colors"
                />
              </div>
            </div>
            {selectedCourse && (() => {
              const { newPercent, wouldPass, extraNeeded } = whatIfStats(selectedCourse, parseInt(whatIfMissing) || 0);
              return (
                <div className={`p-4 border-4 border-black ${wouldPass ? "bg-[#00FFC2]" : "bg-[#FF4911]"}`}>
                  <p className="font-black text-xs uppercase tracking-widest mb-1 text-black/60">
                    Projected Attendance
                  </p>
                  <p className="font-black text-4xl text-black">{newPercent.toFixed(1)}%</p>
                  <p className="font-black text-sm text-black mt-2">
                    {wouldPass
                      ? `✅ You will still be ${context === "pk" ? "safe to bunk" : "within your attendance buffer"}.`
                      : `🚨 You would need to attend ${extraNeeded} more classes to recover.`}
                  </p>
                </div>
              );
            })()}
          </BrutalCard>
        )}

        {/* Course Cards */}
        <div className="space-y-6">
          {courses.map((course) => {
            const { percent, status, message } = calculateStats(course);
            const statusColor = status === "safe" ? "#00FFC2" : status === "warning" ? "#FFDF00" : "#FF4911";

            return (
              <BrutalCard key={course.id} className="p-0 overflow-hidden border-4 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]" variant="white">
                <div className="flex flex-col lg:flex-row bg-white dark:bg-zinc-800">
                  <div className="p-8 flex-1 space-y-6">
                    <BrutalInput
                      label="Course Name"
                      value={course.name}
                      onChange={e => update(course.id, "name", e.target.value)}
                      className="text-lg font-black uppercase"
                    />
                    <div className="grid grid-cols-2 gap-6">
                      <BrutalInput
                        label="Conducted"
                        type="number"
                        value={course.conducted}
                        onChange={e => update(course.id, "conducted", e.target.value)}
                        className="text-lg"
                      />
                      <BrutalInput
                        label="Attended"
                        type="number"
                        value={course.attended}
                        onChange={e => update(course.id, "attended", e.target.value)}
                        className="text-lg"
                      />
                    </div>
                  </div>

                  <div
                    className="lg:w-72 flex flex-col justify-between border-t-4 lg:border-t-0 lg:border-l-4 border-black p-8 relative overflow-hidden min-h-[200px]"
                    style={{ backgroundColor: statusColor }}
                  >
                    <div className="flex justify-between items-start relative z-10">
                      <div>
                        <p className="font-black text-[10px] uppercase text-black/50 tracking-[0.2em]">Attendance</p>
                        <p className="font-black text-5xl text-black">{percent.toFixed(1)}%</p>
                      </div>
                      <BrutalButton
                        variant="danger"
                        onClick={() => remove(course.id)}
                        className="p-3 border-4 border-black bg-black text-white hover:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <Trash2 className="w-5 h-5" />
                      </BrutalButton>
                    </div>

                    <div className="mt-6 relative z-10">
                      <div className="bg-black text-white px-4 py-2 inline-block font-black text-xs uppercase tracking-widest border-4 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
                        {message}
                      </div>
                    </div>

                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_1px_1px,_black_1px,_transparent_0)] bg-[size:16px_16px]" />
                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-3 bg-black/10">
                      <div className="h-full bg-black/30" style={{ width: `${Math.min(percent, 100)}%` }} />
                    </div>
                  </div>
                </div>
              </BrutalCard>
            );
          })}
        </div>

        <BrutalButton onClick={add} variant="primary" className="w-full py-5 mt-8 border-4 border-black bg-[#FF90E8] text-black text-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-center gap-2">
            <Plus className="w-6 h-6" /> Add Another Course
          </div>
        </BrutalButton>

        <div className="mt-16 pt-8 border-t-4 border-black/10 dark:border-white/10">
          <ShareImageCard
            title="Total Attendance"
            value={`${overallPercent.toFixed(1)}%`}
            subtitle={`Across ${courses.length} courses (Target: ${target}%)`}
            color={isSafe ? "#00FFC2" : "#FF4911"}
            emoji="🏫"
          />
        </div>
      </BrutalContainer>

      {/* Floating Stats Footer */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 border-t-8 border-black z-50 shadow-[0_-8px_0_0_rgba(0,0,0,0.1)]"
        style={{ backgroundColor: isSafe ? "#00FFC2" : "#FFDF00" }}
        initial={{ y: 100 }}
        animate={{ y: 0 }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 sm:py-6 text-black">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-black text-xs uppercase tracking-widest text-black/50 mb-1">Overall Attendance</p>
              <div className="flex items-baseline gap-2">
                <p className="font-black text-5xl sm:text-7xl leading-none">{overallPercent.toFixed(1)}%</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="border-4 border-black bg-black text-white font-black text-xs sm:text-lg uppercase px-4 py-2 mb-2 inline-block shadow-[4px_4px_0_0_rgba(0,0,0,0.2)]">
                {isSafe ? copy.safeStatus : copy.dangerStatus}
              </div>
              <p className="text-xs sm:text-sm font-black text-black/60 uppercase">
                {overallAttended}/{overallConducted} Total Classes
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
