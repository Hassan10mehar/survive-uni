/**
 * UniSEOContent.tsx
 * Server component — injected below every university tool calculator.
 * Renders: schemas, grading table, dept GPA context, probation explainer,
 * CGPA recovery tips (GPA/CGPA pages), benchmark table (merit pages),
 * tool cross-links, and global scale bridge CTA.
 */
import Link from "next/link";
import type { UniConfig } from "@/lib/unis";
import {
  getUniAbbr, getUniGPAContext,
  buildWebAppData, buildGPAFAQData, buildMeritFAQData,
  buildGPAHowToData, buildMeritHowToData, buildBreadcrumbs,
  BASE_URL,
} from "@/lib/seo";
import { DEFAULT_GPA_SCALE } from "@/lib/grading";
import SEOSchema from "./SEOSchema";

interface Props {
  uni: UniConfig;
  countryId: string;
  countryName: string;
  toolType: "gpa" | "cgpa" | "merit";
}

const GLOBAL_BRIDGE = [
  { id: "us-4-0",       label: "US 4.0 Scale",    emoji: "🇺🇸" },
  { id: "uk-honours",   label: "UK Honours",       emoji: "🇬🇧" },
  { id: "india-10-0",   label: "India 10-point",   emoji: "🇮🇳" },
  { id: "aus-wam",      label: "Australia WAM",    emoji: "🇦🇺" },
];

export default function UniSEOContent({ uni, countryId, countryName, toolType }: Props) {
  const abbr   = getUniAbbr(uni);
  const scale  = uni.gpaScale ?? DEFAULT_GPA_SCALE;
  const grades = Object.entries(scale);
  const isGPA    = toolType === "gpa";
  const isCGPA   = toolType === "cgpa";
  const isMerit  = toolType === "merit";
  const toolPath = `/${countryId}/${uni.id}/${toolType}-calculator`;
  const toolUrl  = `${BASE_URL}${toolPath}`;
  const toolLabel = isGPA ? "GPA Calculator" : isCGPA ? "CGPA Calculator" : "Merit Calculator";
  const deptContext = getUniGPAContext(uni);

  // ── Schema data ─────────────────────────────────
  const webAppDesc = isMerit
    ? `Find your exact ${abbr} aggregate score for Computer Science, Software Engineering, and Engineering fields. Check previous years' closing merit positions and predict admission chances.`
    : `Calculate your ${isGPA ? "semester GPA" : "cumulative CGPA"} at ${uni.name} instantly using the official ${abbr} grading scale. Includes academic standing alerts, target simulation, and scholarship thresholds.`;

  const webAppData = buildWebAppData(
    `${uni.name} ${toolLabel}`,
    toolUrl,
    webAppDesc,
    isGPA
      ? ["Semester GPA calculator", "Official grade-point scale", "Real-time academic standing", "What-if simulation"]
      : isCGPA
        ? ["Cumulative CGPA tracker", "Multi-semester weighted average", "Target CGPA planner", "Academic recovery simulation"]
        : ["Aggregate percentage calculator", "Entry test weight analysis", "Historical closing merit comparison", "Admission chance predictor"]
  );
  const faqData = isMerit ? buildMeritFAQData(uni) : buildGPAFAQData(uni, isGPA ? "gpa" : "cgpa");
  const howToData = isMerit ? buildMeritHowToData(uni) : buildGPAHowToData(uni, isGPA ? "gpa" : "cgpa");
  const breadcrumbData = buildBreadcrumbs(countryId, countryName, uni.name, uni.id, toolLabel);

  // GPA color helper (matches existing grading.ts)
  const gpaColor = (pts: number) => {
    if (pts >= 3.5) return "#00FFC2";
    if (pts >= 3.0) return "#4A90E2";
    if (pts >= 2.0) return "#FFDF00";
    if (pts >= 1.0) return "#FF90E8";
    return "#FF4911";
  };

  return (
    <>
      {/* ── Schemas ──────────────────────────────── */}
      <SEOSchema type="WebApplication" data={webAppData} />
      <SEOSchema type="HowTo"          data={howToData} />
      <SEOSchema type="FAQPage"        data={faqData} />
      <SEOSchema type="BreadcrumbList" data={breadcrumbData} />

      {/* ── On-page SEO content ───────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 mt-16 mb-24 space-y-14" aria-label="SEO content section">

        {/* ── 1. Official Grading Scale Table ──────── */}
        <section>
          <h2 className="font-black text-2xl uppercase tracking-tight text-black dark:text-white border-b-4 border-black dark:border-white pb-3 mb-6">
            {abbr} Official Grading Scale
          </h2>
          <div className="border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid bg-black text-white font-black text-[10px] uppercase tracking-widest"
                 style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
              <div className="px-4 py-3">Letter Grade</div>
              <div className="px-4 py-3 border-l-4 border-white/20">Grade Points</div>
              <div className="px-4 py-3 border-l-4 border-white/20">Standing</div>
            </div>
            <div className="divide-y-4 divide-black bg-white dark:bg-zinc-900">
              {grades.map(([grade, pts]) => (
                <div key={grade} className="grid items-center"
                     style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                  <div className="px-4 py-3 font-black text-sm" style={{ backgroundColor: gpaColor(pts) }}>
                    {grade}
                  </div>
                  <div className="px-4 py-3 border-l-4 border-black font-black text-base dark:text-white">
                    {pts.toFixed(2)}
                  </div>
                  <div className="px-4 py-3 border-l-4 border-black font-bold text-xs uppercase text-black/60 dark:text-white/50">
                    {pts >= 3.5 ? "Distinction" : pts >= 3.0 ? "Good" : pts >= 2.0 ? "Average" : pts >= 1.0 ? "At Risk" : "Fail"}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-3 text-xs font-bold text-black/40 dark:text-white/30 uppercase tracking-widest">
            Source: {uni.name} official academic regulations / HEC Pakistan grading policy.
          </p>
        </section>

        {/* ── 2. Department GPA Context (GPA + CGPA pages) ── */}
        {!isMerit && (
          <section>
            <h2 className="font-black text-2xl uppercase tracking-tight text-black dark:text-white border-b-4 border-black dark:border-white pb-3 mb-6">
              {abbr} Program-Specific GPA Benchmarks
            </h2>
            <p className="font-bold text-sm text-black/60 dark:text-white/50 uppercase mb-6 leading-relaxed">
              Honours thresholds, scholarship GPA requirements, and academic standing rules by department at {uni.name}.
            </p>
            <div className="border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="grid bg-black text-white font-black text-[10px] uppercase tracking-widest"
                   style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
                <div className="px-4 py-3">Department / Program</div>
                <div className="px-4 py-3 border-l-4 border-white/20 text-center">Honours GPA</div>
                <div className="px-4 py-3 border-l-4 border-white/20 text-center">Scholarship GPA</div>
              </div>
              <div className="divide-y-4 divide-black bg-white dark:bg-zinc-900">
                {deptContext.map((row, i) => (
                  <div key={i}>
                    <div className="grid items-center" style={{ gridTemplateColumns: "2fr 1fr 1fr" }}>
                      <div className="px-4 py-3 font-black text-xs uppercase text-black dark:text-white">{row.dept}</div>
                      <div className="px-4 py-3 border-l-4 border-black font-black text-xl text-center"
                           style={{ color: gpaColor(row.honorsGPA) }}>
                        {row.honorsGPA.toFixed(1)}+
                      </div>
                      <div className="px-4 py-3 border-l-4 border-black font-black text-xl text-center"
                           style={{ color: gpaColor(row.scholarshipGPA) }}>
                        {row.scholarshipGPA.toFixed(1)}+
                      </div>
                    </div>
                    <div className="px-4 pb-3 text-[10px] font-bold text-black/50 dark:text-white/40 uppercase tracking-wide leading-relaxed">
                      {row.note}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── 3. Closing Merit Table (merit pages) ── */}
        {isMerit && uni.benchmarks.length > 0 && (
          <section>
            <h2 className="font-black text-2xl uppercase tracking-tight text-black dark:text-white border-b-4 border-black dark:border-white pb-3 mb-6">
              {abbr} Historical Closing Merit — 2025
            </h2>
            <div className="border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="grid bg-black text-white font-black text-[10px] uppercase tracking-widest"
                   style={{ gridTemplateColumns: "2fr 1fr" }}>
                <div className="px-4 py-3">Program</div>
                <div className="px-4 py-3 border-l-4 border-white/20 text-center">Closing Merit %</div>
              </div>
              <div className="divide-y-4 divide-black bg-white dark:bg-zinc-900">
                {uni.benchmarks.map((b, i) => (
                  <div key={i} className="grid items-center" style={{ gridTemplateColumns: "2fr 1fr" }}>
                    <div className="px-4 py-4 font-black text-xs uppercase text-black dark:text-white">{b.name}</div>
                    <div className="px-4 py-4 border-l-4 border-black font-black text-2xl text-center"
                         style={{ color: b.threshold >= 80 ? "#FF4911" : b.threshold >= 70 ? "#FFDF00" : "#00FFC2" }}>
                      {b.threshold}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-xs font-bold text-black/40 dark:text-white/30 uppercase tracking-widest">
              ⚠ Based on student-reported data. Official lists published by {uni.name} after each admission cycle.
            </p>
          </section>
        )}

        {/* ── 4. Academic Probation Explainer (GPA + CGPA) ── */}
        {!isMerit && (
          <section>
            <h2 className="font-black text-2xl uppercase tracking-tight text-black dark:text-white border-b-4 border-black dark:border-white pb-3 mb-2">
              Academic Probation at {uni.name}
            </h2>
            <div className="border-4 border-black bg-[#FF4911] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4 mt-6">
              <p className="font-black text-lg uppercase text-black">⚠ What Happens Below 2.0 CGPA?</p>
              <ul className="space-y-3 list-none">
                {[
                  `Academic Warning: Issued after any semester where your CGPA drops below 2.0. ${uni.name} registrar notifies you and your department.`,
                  "Probation Period: If CGPA remains below 2.0 for two consecutive semesters, you are placed on formal academic probation — restricting club memberships, hostel access, and some campus facilities.",
                  "Recovery Plan: Work with your academic advisor to identify weak courses. Repeating F or D-graded courses replaces the old grade in the CGPA calculation at most HEC universities.",
                  "Dismissal Risk: Persistent CGPA below 2.0 after the probation window (typically 2–3 semesters) may result in degree cancellation under HEC's academic regulations.",
                ].map((text, i) => (
                  <li key={i} className="font-bold text-sm text-black leading-relaxed flex gap-3">
                    <span className="font-black shrink-0">{i + 1}.</span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ── 5. How to Raise Your CGPA (GPA + CGPA) ─ */}
        {!isMerit && (
          <section>
            <h2 className="font-black text-2xl uppercase tracking-tight text-black dark:text-white border-b-4 border-black dark:border-white pb-3 mb-6">
              How to Raise Your CGPA at {uni.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  color: "#00FFC2",
                  icon: "🔁",
                  title: "Repeat Weak Courses",
                  body: `At ${abbr}, repeating an F or D grade course replaces the original grade in your CGPA calculation. A single course upgrade from F (0.0) to B (3.0) in a 3-credit course can lift a 2.5 CGPA by ~0.08 points over time.`,
                },
                {
                  color: "#FFDF00",
                  icon: "📊",
                  title: "Load Heavy on Credits",
                  body: `CGPA is a weighted average — more credit hours dilute the impact of past bad semesters. Taking a high credit-hour semester (21 CH) and scoring 3.8+ can shift your cumulative average significantly faster than light semesters.`,
                },
                {
                  color: "#4A90E2",
                  icon: "🎯",
                  title: "Simulate Your Target",
                  body: `Use the Target CGPA Planner in the calculator above. Enter your goal CGPA and next semester's credit hours. It calculates exactly what semester GPA you need — so your study targets are mathematically precise, not guesswork.`,
                },
              ].map((card) => (
                <div key={card.title}
                     className="border-4 border-black bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6 space-y-3">
                  <div className="w-10 h-10 border-4 border-black flex items-center justify-center text-lg font-black"
                       style={{ backgroundColor: card.color }}>
                    {card.icon}
                  </div>
                  <p className="font-black text-sm uppercase tracking-wide text-black dark:text-white">{card.title}</p>
                  <p className="font-bold text-sm text-black/60 dark:text-white/50 leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── 6. FAQ Section ────────────────────────── */}
        <section>
          <h2 className="font-black text-2xl uppercase tracking-tight text-black dark:text-white border-b-4 border-black dark:border-white pb-3 mb-6">
            Frequently Asked Questions — {uni.name} {toolLabel}
          </h2>
          <div className="space-y-4">
            {faqData.faqs.map((faq, i) => (
              <div key={i} className="border-4 border-black bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="border-b-4 border-black px-6 py-4 bg-zinc-100 dark:bg-zinc-800">
                  <p className="font-black text-sm uppercase tracking-wide text-black dark:text-white">
                    Q{i + 1}. {faq.question}
                  </p>
                </div>
                <div className="px-6 py-4">
                  <p className="font-bold text-sm text-black/70 dark:text-white/60 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 7. Internal Tool Cross-links ─────────── */}
        <section>
          <h2 className="font-black text-2xl uppercase tracking-tight text-black dark:text-white border-b-4 border-black dark:border-white pb-3 mb-6">
            More {abbr} Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "GPA Calculator",   path: `/${countryId}/${uni.id}/gpa-calculator`,   active: isGPA,   color: "#00FFC2", emoji: "📐" },
              { label: "CGPA Calculator",  path: `/${countryId}/${uni.id}/cgpa-calculator`,  active: isCGPA,  color: "#FFDF00", emoji: "📊" },
              { label: "Merit Calculator", path: `/${countryId}/${uni.id}/merit-calculator`, active: isMerit, color: "#FF4911", emoji: "🎯" },
            ].map((tool) => (
              tool.active ? (
                <div key={tool.label}
                     className="border-4 border-black px-5 py-4 font-black text-xs uppercase tracking-widest text-center opacity-40 cursor-default"
                     style={{ backgroundColor: tool.color }}>
                  {tool.emoji} {tool.label} (Current)
                </div>
              ) : (
                <Link key={tool.label} href={tool.path}
                      className="border-4 border-black px-5 py-4 font-black text-xs uppercase tracking-widest text-center transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                      style={{ backgroundColor: tool.color }}>
                  {tool.emoji} {tool.label}
                </Link>
              )
            ))}
          </div>
        </section>

        {/* ── 8. Global Scale Bridge CTA ───────────── */}
        <section className="border-4 border-black bg-black text-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)]">
          <p className="font-black text-xs uppercase tracking-widest text-white/50 mb-2">Study Abroad Preparation</p>
          <h2 className="font-black text-2xl uppercase text-[#00FFC2] mb-3">
            Planning to Apply Abroad?
          </h2>
          <p className="font-bold text-sm text-white/70 leading-relaxed mb-6">
            Convert your {abbr} CGPA to international grading systems instantly. Graduate schools in the US, UK, and Australia use different scales — make sure your application reflects your true academic standing.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GLOBAL_BRIDGE.map((s) => (
              <Link key={s.id} href={`/global/gpa-calculator/${s.id}`}
                    className="border-4 border-white/30 hover:border-[#00FFC2] bg-white/5 hover:bg-white/10 px-3 py-3 font-black text-[10px] uppercase tracking-widest text-center transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,255,194,0.4)]">
                {s.emoji} {s.label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
