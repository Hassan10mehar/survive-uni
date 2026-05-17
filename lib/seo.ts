/**
 * lib/seo.ts
 * Single source of truth for all programmatic SEO output.
 * Exports metadata generators, schema data builders, and
 * department-level GPA context for every tool page.
 */
import type { Metadata } from "next";
import type { UniConfig } from "./unis";
import type { GlobalScale } from "./globalScales";

export const BASE_URL = "https://surviveuni.online";

/* ─────────────────────────────────────────────────
   ABBREVIATION MAP
   ───────────────────────────────────────────────── */
const UNI_ABBR: Record<string, string> = {
  nust: "NUST", fast: "FAST", pu: "PU", nutech: "NUTECH",
  ned: "NED", "au-eng": "AU", "au-noneng": "AU", "uet-lhr": "UET",
  cui: "COMSATS", pieas: "PIEAS", giki: "GIKI", bahria: "BU",
  "uet-pesh": "UET-P", muet: "MUET", qau: "QAU", uaf: "UAF",
  bzu: "BZU", "lums-iba": "LUMS/IBA", medical: "PMDC",
};

export function getUniAbbr(uni: UniConfig): string {
  return UNI_ABBR[uni.id] ?? uni.name.split(" ")[0];
}

/* ─────────────────────────────────────────────────
   DEPARTMENT GPA CONTEXT
   Shown on GPA + CGPA tool pages as "program-specific
   historical context" per the SEO spec.
   ───────────────────────────────────────────────── */
export type DeptGPAContext = {
  dept: string;
  honorsGPA: number;
  scholarshipGPA: number;
  note: string;
};

const PROBATION_ROW: DeptGPAContext = {
  dept: "All Programs — Academic Probation Floor",
  honorsGPA: 2.0,
  scholarshipGPA: 2.0,
  note: "HEC standard: CGPA below 2.0 triggers an Academic Warning. Two consecutive low-GPA semesters lead to formal probation and possible degree cancellation.",
};

const UNI_GPA_CONTEXT: Record<string, DeptGPAContext[]> = {
  nust: [
    { dept: "SEECS — CS / CE / EE", honorsGPA: 3.7, scholarshipGPA: 3.5, note: "Dean's List: 3.7+ per semester. Gold Medal goes to the highest CGPA graduate." },
    { dept: "SMME — Mechanical Engineering", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "Academic distinction for 3.5+ CGPA. HEC need-based scholarship from 3.0+." },
    { dept: "SCEE / CEME / S3H", honorsGPA: 3.5, scholarshipGPA: 3.2, note: "Departmental honours typically require 3.5+ CGPA at graduation." },
    PROBATION_ROW,
  ],
  fast: [
    { dept: "CS / SE / AI / Data Science", honorsGPA: 3.8, scholarshipGPA: 3.5, note: "President's Honour Roll (PHR): 3.8+ CGPA for 2 consecutive semesters. Dean's List: 3.5+ per sem." },
    { dept: "Engineering Programs", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "Dean's List requires 3.5+ semester GPA with no F or D grade in any course." },
    { dept: "BBA / Management Sciences", honorsGPA: 3.3, scholarshipGPA: 3.0, note: "Business distinction at FAST: 3.3+ cumulative GPA." },
    PROBATION_ROW,
  ],
  pu: [
    { dept: "CS / IT / Data Science", honorsGPA: 3.5, scholarshipGPA: 3.2, note: "PU Merit Scholarship: 3.5+ CGPA across all semesters required." },
    { dept: "Software Engineering", honorsGPA: 3.3, scholarshipGPA: 3.0, note: "Departmental distinction awarded to final-year students with 3.3+ CGPA." },
    PROBATION_ROW,
  ],
  nutech: [
    { dept: "Engineering Programs", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "NUTECH scholarships require 3.5+ CGPA and consistent fee payment history." },
    { dept: "BS Computer Science / IT", honorsGPA: 3.3, scholarshipGPA: 3.0, note: "Departmental distinction: top 10% of class by CGPA at graduation." },
    PROBATION_ROW,
  ],
  ned: [
    { dept: "Computer Engineering / CS", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "NED Alumni scholarships: 3.5+ CGPA required. Gold Medal for highest CGPA per department." },
    { dept: "Electrical Engineering", honorsGPA: 3.4, scholarshipGPA: 3.2, note: "Academic distinction for NED EE requires maintaining 3.4+ over 4 years." },
    { dept: "Civil / Mechanical Engg", honorsGPA: 3.3, scholarshipGPA: 3.0, note: "Top 5% by CGPA receive departmental honours at convocation." },
    PROBATION_ROW,
  ],
  "au-eng": [
    { dept: "Aerospace / Electrical Engg", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "AU academic distinction: 3.5+ CGPA. University medal for highest CGPA in graduating batch." },
    { dept: "Mechanical / Civil Engg", honorsGPA: 3.3, scholarshipGPA: 3.0, note: "Departmental honours for engineering programs at Air University." },
    PROBATION_ROW,
  ],
  "au-noneng": [
    { dept: "BS Computer Science", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "AU CS distinction: 3.5+ CGPA. Financial assistance scholarships from 3.0+." },
    { dept: "BBA / Social Sciences", honorsGPA: 3.3, scholarshipGPA: 3.0, note: "Dean's List recognition for business and social science students at AU." },
    PROBATION_ROW,
  ],
  "uet-lhr": [
    { dept: "CS / Software Engineering", honorsGPA: 3.7, scholarshipGPA: 3.5, note: "UET Gold Medal at convocation: highest CGPA graduate per department." },
    { dept: "Electrical Engineering", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "Top 5% by CGPA receive academic distinction at graduation." },
    { dept: "Mechanical / Civil Engg", honorsGPA: 3.4, scholarshipGPA: 3.2, note: "UET Merit Scholarship: 3.4+ CGPA. HEC need-based: 3.0+." },
    PROBATION_ROW,
  ],
  cui: [
    { dept: "CS / SE (ISB/LHR Campuses)", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "Rector's Honour List: 3.5+ GPA per semester. Need-based aid from 2.5+." },
    { dept: "Electrical Engineering", honorsGPA: 3.4, scholarshipGPA: 3.2, note: "CUI departmental distinction for EE requires 3.4+ at graduation." },
    { dept: "BBA / Management Sciences", honorsGPA: 3.3, scholarshipGPA: 3.0, note: "Business honours at COMSATS: 3.3+ CGPA across all 8 semesters." },
    PROBATION_ROW,
  ],
  pieas: [
    { dept: "Nuclear / Chemical Engg", honorsGPA: 3.7, scholarshipGPA: 3.5, note: "PIEAS NESCOM Fellowship: full tuition + stipend — requires 3.5+ CGPA throughout." },
    { dept: "Electrical / CS Programs", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "Gold Medal: highest CGPA graduate per department at convocation." },
    { dept: "Physics / Applied Maths", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "Research distinction track: 3.5+ CGPA for lab placements." },
    { ...PROBATION_ROW, honorsGPA: 2.5, scholarshipGPA: 2.5, note: "PIEAS has a stricter floor (2.5 CGPA) than most HEC universities." },
  ],
  giki: [
    { dept: "CS / Software Engineering", honorsGPA: 3.7, scholarshipGPA: 3.5, note: "Rector's Honour Roll: 3.7+ GPA per semester. Financial aid from 3.0+." },
    { dept: "Mechanical Engineering", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "Gold Medal at GIKI convocation for highest CGPA graduate per department." },
    { dept: "Electrical / Industrial Engg", honorsGPA: 3.6, scholarshipGPA: 3.4, note: "GIKI is highly competitive — 3.5+ CGPA is strong academic standing." },
    PROBATION_ROW,
  ],
  bahria: [
    { dept: "CS / SE / AI", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "BU Merit scholarship: 3.5+ CGPA and 75%+ attendance required." },
    { dept: "Electrical Engineering", honorsGPA: 3.3, scholarshipGPA: 3.0, note: "Departmental distinction at BU for top 10% graduates by CGPA." },
    { dept: "BBA / Management", honorsGPA: 3.2, scholarshipGPA: 3.0, note: "Business distinction: 3.2+ CGPA at BU Islamabad / Karachi campus." },
    PROBATION_ROW,
  ],
  "uet-pesh": [
    { dept: "Computer Systems Engineering", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "UET Peshawar distinction: top 10% by CGPA in graduating batch." },
    { dept: "Electrical / Mechanical Engg", honorsGPA: 3.4, scholarshipGPA: 3.2, note: "KPK provincial scholarships: 3.0+ CGPA required for renewal." },
    PROBATION_ROW,
  ],
  muet: [
    { dept: "CS / Software Engineering", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "MUET distinction: top students by CGPA receive departmental honours at convocation." },
    { dept: "Electrical / Civil Engg", honorsGPA: 3.3, scholarshipGPA: 3.0, note: "Sindh government merit scholarships: 3.0+ CGPA required." },
    PROBATION_ROW,
  ],
  qau: [
    { dept: "BS Physics / Chemistry", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "QAU distinction for sciences: top 5% by CGPA receive academic honours." },
    { dept: "BS Maths / Statistics", honorsGPA: 3.4, scholarshipGPA: 3.2, note: "QAU Gold Medal for highest CGPA graduate in each department." },
    { dept: "Biological / Social Sciences", honorsGPA: 3.3, scholarshipGPA: 3.0, note: "HEC need-based and merit scholarships from 3.0+ CGPA at QAU." },
    PROBATION_ROW,
  ],
  uaf: [
    { dept: "BS Agriculture / Food Science", honorsGPA: 3.4, scholarshipGPA: 3.2, note: "UAF distinction for agriculture programs. HEC need-based from 2.5+ CGPA." },
    { dept: "BS Computer Science", honorsGPA: 3.3, scholarshipGPA: 3.0, note: "CS departmental honours: top 10% by CGPA at graduation." },
    PROBATION_ROW,
  ],
  bzu: [
    { dept: "BS Computer Science / IT", honorsGPA: 3.4, scholarshipGPA: 3.2, note: "BZU distinction for CS: top 5% graduates by CGPA per session." },
    { dept: "Engineering Programs", honorsGPA: 3.3, scholarshipGPA: 3.0, note: "Punjab government scholarships at BZU: 3.0+ CGPA required." },
    PROBATION_ROW,
  ],
  "lums-iba": [
    { dept: "All Programs", honorsGPA: 3.7, scholarshipGPA: 3.0, note: "LUMS Dean's List: 3.7+ GPA per semester. IBA academic honours for top 10% by GPA." },
    { ...PROBATION_ROW, note: "LUMS/IBA are holistic programs — academic standing is monitored continuously. Low GPA triggers compulsory academic counselling." },
  ],
  medical: [
    { dept: "MBBS — All Medical Colleges", honorsGPA: 3.7, scholarshipGPA: 3.5, note: "PMDC/UHS medical distinction: top 10% aggregate scores at final professional exams." },
    { dept: "BDS — Dental Programs", honorsGPA: 3.5, scholarshipGPA: 3.3, note: "Dental distinction: top 5% of graduating batch receive academic honours." },
    PROBATION_ROW,
  ],
};

export function getUniGPAContext(uni: UniConfig): DeptGPAContext[] {
  return UNI_GPA_CONTEXT[uni.id] ?? [PROBATION_ROW];
}

/* ─────────────────────────────────────────────────
   METADATA GENERATORS
   ───────────────────────────────────────────────── */
export function getUniGPAMeta(uni: UniConfig, countryId: string): Metadata {
  const abbr = getUniAbbr(uni);
  const name = uni.name;
  const title = `${name} GPA & CGPA Calculator | Official ${abbr} Grading`;
  const desc = `Calculate your semester GPA and cumulative CGPA at ${name} instantly. Completely updated for the latest ${abbr} grading criteria, absolute/relative marking systems, credit hours, and academic probation warning rules.`;
  const toolUrl = `/${countryId}/${uni.id}/gpa-calculator`;
  return {
    title,
    description: desc,
    keywords: [
      `${name.toLowerCase()} gpa calculator`,
      `${name.toLowerCase()} cgpa calculator`,
      `${uni.id} gpa calculator 2026`,
      `how to calculate gpa at ${name.toLowerCase()}`,
      `${abbr.toLowerCase()} grading scale`,
      `${uni.id} cgpa to percentage`,
      `${name.toLowerCase()} academic probation gpa`,
      `${abbr.toLowerCase()} degree honours gpa requirements`,
    ],
    alternates: { canonical: toolUrl },
    openGraph: { title, description: desc, url: `${BASE_URL}${toolUrl}`, type: "website" },
  };
}

export function getUniCGPAMeta(uni: UniConfig, countryId: string): Metadata {
  const abbr = getUniAbbr(uni);
  const name = uni.name;
  const title = `${name} CGPA Calculator | Cumulative GPA Tracker — ${abbr}`;
  const desc = `Track your cumulative GPA across all semesters at ${name}. Updated for the latest ${abbr} grading system with target prediction, semester simulation, and academic recovery planning.`;
  const toolUrl = `/${countryId}/${uni.id}/cgpa-calculator`;
  return {
    title,
    description: desc,
    keywords: [
      `${name.toLowerCase()} cgpa calculator`,
      `${uni.id} cumulative gpa`,
      `how to calculate cgpa ${name.toLowerCase()}`,
      `${abbr.toLowerCase()} cgpa to percentage`,
      `improve cgpa at ${name.toLowerCase()}`,
      `${uni.id} cgpa 2026`,
    ],
    alternates: { canonical: toolUrl },
    openGraph: { title, description: desc, url: `${BASE_URL}${toolUrl}`, type: "website" },
  };
}

export function getUniMeritMeta(uni: UniConfig, countryId: string): Metadata {
  const abbr = getUniAbbr(uni);
  const name = uni.name;
  const title = `${name} Merit & Aggregate Calculator 2026`;
  const desc = `Find your exact ${abbr} aggregate score for Computer Science, Software Engineering, and Engineering fields. Check previous years' closing merit positions, entry test weights, and predict your admission chances instantly.`;
  const toolUrl = `/${countryId}/${uni.id}/merit-calculator`;
  return {
    title,
    description: desc,
    keywords: [
      `${name.toLowerCase()} merit calculator`,
      `${name.toLowerCase()} aggregate calculator 2026`,
      `${uni.id} merit calculator`,
      `${uni.id} closing merit 2026`,
      `${abbr.toLowerCase()} entry test weight`,
      `how much aggregate for ${name.toLowerCase()}`,
      ...(uni.seoKeywords ?? []),
    ],
    alternates: { canonical: toolUrl },
    openGraph: { title, description: desc, url: `${BASE_URL}${toolUrl}`, type: "website" },
  };
}

export function getGlobalScaleMeta(scale: GlobalScale): Metadata {
  const title = `${scale.system} GPA Calculator | Convert to ${scale.maxLabel}`;
  const desc = `Convert your local university grades and percentages into the official ${scale.system} instantly. Perfect for international students tracking admissions eligibility for study abroad programs.`;
  return {
    title,
    description: desc,
    keywords: scale.seoKeywords,
    alternates: { canonical: `/global/gpa-calculator/${scale.id}` },
    openGraph: { title, description: desc, url: `${BASE_URL}/global/gpa-calculator/${scale.id}`, type: "website" },
  };
}

/* ─────────────────────────────────────────────────
   SCHEMA DATA BUILDERS
   Returns plain data objects — pass to <SEOSchema> type prop.
   ───────────────────────────────────────────────── */
export function buildWebAppData(
  name: string,
  url: string,
  desc: string,
  features: string[],
  ratingCount = "847"
) {
  return { name, url, description: desc, featureList: features, ratingCount };
}

export function buildGPAFAQData(uni: UniConfig, toolType: "gpa" | "cgpa") {
  const abbr = getUniAbbr(uni);
  const isGPA = toolType === "gpa";
  return {
    faqs: [
      {
        question: `How do I calculate my ${isGPA ? "GPA" : "CGPA"} at ${uni.name}?`,
        answer: `Use this dedicated ${uni.name} ${isGPA ? "GPA" : "CGPA"} Calculator. Select your course credit hours and input your obtained letter grades. The system processes the calculation instantly using ${abbr}'s official weightage guidelines — no manual formula needed.`,
      },
      {
        question: `What is the passing ${isGPA ? "GPA" : "CGPA"} at ${uni.name}?`,
        answer: `The standard minimum CGPA to remain in good academic standing at ${uni.name} is 2.0 out of 4.0 for Bachelor's programs, following HEC Pakistan's guidelines. Falling below 2.0 triggers an Academic Warning. Two consecutive low-GPA semesters typically lead to formal academic probation.`,
      },
      {
        question: `What ${isGPA ? "GPA" : "CGPA"} do I need for a scholarship at ${uni.name}?`,
        answer: `Most institutional merit scholarships at ${uni.name} require a ${isGPA ? "semester GPA" : "CGPA"} of 3.5 or above. HEC need-based scholarships generally require 2.5+ CGPA with a demonstrated financial need. Check the grading context table below for department-specific scholarship thresholds.`,
      },
      {
        question: `How do I convert my ${uni.name} CGPA to a percentage?`,
        answer: `The HEC Pakistan standard formula is: Percentage = (CGPA ÷ 4.0) × 100. For example, a CGPA of 3.00 = 75%. This is used for government job applications, HEC degree attestation, and international graduate school applications.`,
      },
    ],
  };
}

export function buildMeritFAQData(uni: UniConfig) {
  const abbr = getUniAbbr(uni);
  const minMerit = uni.benchmarks.length > 0
    ? Math.min(...uni.benchmarks.map((b) => b.threshold))
    : 65;
  const maxMerit = uni.benchmarks.length > 0
    ? Math.max(...uni.benchmarks.map((b) => b.threshold))
    : 85;
  return {
    faqs: [
      {
        question: `What is the merit formula for ${uni.name}?`,
        answer: `${uni.name} uses: ${uni.note}. Enter your marks in the calculator above to get your exact aggregate score instantly, updated for Fall 2026 admission weights.`,
      },
      {
        question: `What aggregate is required for admission at ${uni.name}?`,
        answer: `Based on historical closing merit data, competitive programs at ${uni.name} close between ${minMerit}% and ${maxMerit}%. Calculating your aggregate early helps you identify gaps and target your entry test preparation more precisely.`,
      },
      {
        question: `What is the entry test weight at ${uni.name}?`,
        answer: `At ${abbr}, the entry test carries the largest weight in the aggregate formula: ${uni.note}. This means strong entry test performance can significantly improve your overall merit score even with moderate FSc marks.`,
      },
      {
        question: `How accurate are the ${uni.name} closing merit estimates?`,
        answer: `The benchmarks shown are based on historical Fall data and student-reported merit lists. Official merit lists are released by ${uni.name} after the admission cycle closes — always verify on the official ${uni.name} admissions portal.`,
      },
    ],
  };
}

export function buildGPAHowToData(uni: UniConfig, toolType: "gpa" | "cgpa") {
  const isGPA = toolType === "gpa";
  return {
    name: `How to Calculate Your ${isGPA ? "GPA" : "CGPA"} at ${uni.name}`,
    description: `Step-by-step guide using the free ${uni.name} ${isGPA ? "GPA" : "CGPA"} calculator.`,
    steps: isGPA ? [
      { name: "Add your courses", text: `Enter each subject name and its credit hours as listed in your ${uni.name} course plan.` },
      { name: "Select your grade", text: `Choose the grade you received or expect from the dropdown. ${uni.name}'s official grade-point mapping is pre-loaded.` },
      { name: "Read your live GPA", text: "Your semester GPA appears instantly at the bottom with a color-coded academic standing indicator." },
      { name: "Simulate what-if scenarios", text: "Add future courses with target grades to see the GPA you could achieve by the end of semester." },
    ] : [
      { name: "Enter your first semester", text: `Add Semester 1's GPA and total credit hours. Use the GPA calculator tab first if you haven't calculated your semester GPA yet.` },
      { name: "Add all completed semesters", text: "Add each additional semester. Your cumulative CGPA is recalculated automatically with the weighted average formula." },
      { name: "Read your CGPA", text: "Your official CGPA appears in real-time. The color shows your academic standing vs. probation thresholds." },
      { name: "Set a target and simulate", text: `Enter your desired final CGPA and next semester's credit hours. The calculator shows exactly what GPA you need to hit your goal.` },
    ],
  };
}

export function buildMeritHowToData(uni: UniConfig) {
  return {
    name: `How to Calculate Your ${uni.name} Merit Aggregate`,
    description: `Step-by-step guide to the ${uni.name} aggregate calculator for Fall 2026.`,
    steps: [
      { name: "Enter your Matric percentage", text: `Type your Matric or O-Level equivalent percentage. Formula: ${uni.note}.` },
      { name: "Enter your FSc / Intermediate percentage", text: "Enter your FSc Pre-Engineering or A-Level equivalent result as a percentage." },
      { name: "Enter your entry test score", text: "Enter your test score — the calculator converts it to a percentage automatically if needed." },
      { name: "Read your aggregate", text: "Your aggregate score appears instantly. Compare it against the closing merit table on this page." },
    ],
  };
}

export function buildBreadcrumbs(
  countryId: string,
  countryName: string,
  uniName: string,
  uniId: string,
  toolLabel: string
) {
  return {
    items: [
      { position: 1, name: "Home", item: BASE_URL },
      { position: 2, name: countryName, item: `${BASE_URL}/${countryId}` },
      { position: 3, name: uniName, item: `${BASE_URL}/${countryId}/${uniId}` },
      { position: 4, name: toolLabel, item: `${BASE_URL}/${countryId}/${uniId}/${toolLabel.toLowerCase().replace(" ", "-")}` },
    ],
  };
}
