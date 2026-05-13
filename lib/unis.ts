export type Field = { id: string; label: string; placeholder: string; max: number; hint?: string };
export type Formula = { weight: number; fieldId: string; divisor?: number };
export type Benchmark = { name: string; threshold: number };

export type UniConfig = {
  id: string;
  name: string;
  short: string;
  color: string;
  textColor: string;
  program?: string;
  holistic?: true; // no formula — info card only
  holisticNote?: string;
  fields: Field[];
  formula: Formula[];
  note: string;
  benchmarks: Benchmark[];
  gpaScale?: Record<string, number>; // Personalized GPA scale for the university
  admissionDeadline?: string;
  scholarships?: { name: string; amount: string; deadline: string; link: string }[];
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
};

/* ── Shared field presets ─────────────────────────── */
const matric: Field = { id: "matric", label: "Matric %", placeholder: "e.g. 85.0", max: 100 };
const fsc: Field = { id: "fsc", label: "FSc / A-Level %", placeholder: "e.g. 88.0", max: 100 };
const fscEq = (label: string): Field => ({ id: "fsc", label, placeholder: "e.g. 88.0", max: 100 });
const testPct = (id: string, label: string, hint = "Enter as percentage score"): Field => ({ id, label, placeholder: "e.g. 72.0", max: 100, hint });

/* ── Medical benchmarks ─────────────────────────────────── */
export const MED_BENCHMARKS: Benchmark[] = [
  { name: "KEMU / AMC / Nishtar (Top Public)", threshold: 85 },
  { name: "Allama Iqbal / Quaid-e-Azam", threshold: 83 },
  { name: "Services / Fatima Jinnah", threshold: 80 },
  { name: "Dow Medical (Karachi)", threshold: 82 },
  { name: "Khyber / Ayub Medical (KPK)", threshold: 80 },
  { name: "Private Medical Colleges", threshold: 65 },
];

/* ── University configs ──────────────────────────── */
export const UNIS: UniConfig[] = [
  /* ─ 1. NUST ─ */
  {
    id: "nust", name: "NUST", short: "National University of Sciences & Technology",
    color: "#FFDF00", textColor: "#000",
    fields: [matric, fsc, { id: "net", label: "NET Score", placeholder: "e.g. 155", max: 200, hint: "Raw score out of 200 — auto-converted to %" }],
    formula: [{ weight: 0.10, fieldId: "matric" }, { weight: 0.15, fieldId: "fsc" }, { weight: 0.75, fieldId: "net", divisor: 200 }],
    note: "NET×75% + FSc×15% + Matric×10%",
    benchmarks: [{ name: "SEECS (CS / CE / EE)", threshold: 85 }, { name: "SMME (Mech / Civil)", threshold: 80 }, { name: "SCEE / CEME", threshold: 78 }, { name: "Other Departments", threshold: 75 }],
    gpaScale: { "A": 4.0, "B+": 3.5, "B": 3.0, "C+": 2.5, "C": 2.0, "D+": 1.5, "D": 1.0, "F": 0.0 },
    admissionDeadline: "June 25, 2026",
    scholarships: [
      { name: "NUST Need-based Scholarship", amount: "Up to 100% Tuition", deadline: "June 30, 2026", link: "https://nust.edu.pk/admissions/scholarships/" },
      { name: "HEC Ehsaas Undergraduate", amount: "Full Tuition + Stipend", deadline: "October 15, 2026", link: "https://hec.gov.pk" }
    ],
    seoTitle: "NUST Aggregate Calculator 2026 | NUST NET Merit Predictor",
    seoDescription: "Official NUST Aggregate Calculator for NET 2026. Calculate your NUST merit based on NET score, FSc, and Matric marks.",
    seoKeywords: ["nust aggregate calculator", "nust merit calculator", "nust net merit predictor", "nust gpa calculator"],
  },

  /* ─ 2. FAST-NUCES ─ */
  {
    id: "fast", name: "FAST-NUCES", short: "Foundation for Advancement of Science & Technology",
    color: "#FF4911", textColor: "#fff",
    fields: [matric, fsc, testPct("nu", "NU Test %")],
    formula: [{ weight: 0.10, fieldId: "matric" }, { weight: 0.40, fieldId: "fsc" }, { weight: 0.50, fieldId: "nu" }],
    note: "NU Test×50% + FSc×40% + Matric×10%",
    benchmarks: [{ name: "CS / SE / AI / DS", threshold: 80 }, { name: "Engineering Programs", threshold: 78 }, { name: "Campuses (LHR/KHI/ISB)", threshold: 70 }, { name: "BBA / Management", threshold: 68 }],
    gpaScale: { "A+": 4.0, "A": 4.0, "A-": 3.67, "B+": 3.33, "B": 3.0, "B-": 2.67, "C+": 2.33, "C": 2.0, "C-": 1.67, "D+": 1.33, "D": 1.0, "F": 0.0 },
    admissionDeadline: "July 5, 2026",
    scholarships: [
      { name: "FAST Financial Assistance", amount: "Partial to Full Tuition", deadline: "July 15, 2026", link: "http://nu.edu.pk/Admissions/FinancialAid" },
      { name: "OSAF Scholarship", amount: "Tuition Support", deadline: "August 1, 2026", link: "http://nu.edu.pk" }
    ],
    seoTitle: "FAST NU Merit Calculator 2026 | FAST NUCES Aggregate Predictor",
    seoDescription: "Official FAST NU Merit Calculator for 2026 admissions. Calculate your aggregate for FAST-NUCES CS, SE, and Engineering programs.",
    seoKeywords: ["fast merit calculator", "fast nu aggregate calculator", "fast nuces merit predictor", "fast nu cgpa calculator"],
  },

  /* ─ 3. Punjab University ─ */
  {
    id: "pu", name: "Punjab University", short: "University of the Punjab",
    color: "#00FFC2", textColor: "#000",
    fields: [matric, fscEq("FSc / ICS %"), testPct("et", "PU Entry Test %")],
    formula: [{ weight: 0.25, fieldId: "matric" }, { weight: 0.50, fieldId: "fsc" }, { weight: 0.25, fieldId: "et" }],
    note: "FSc×50% + Entry Test×25% + Matric×25%",
    benchmarks: [{ name: "BS Computer Science", threshold: 72 }, { name: "BS Data Science", threshold: 72 }, { name: "BS Software Engineering", threshold: 68 }, { name: "BS Information Technology", threshold: 65 }],
    gpaScale: { "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "C-": 1.7, "D": 1.0, "F": 0.0 },
    admissionDeadline: "August 15, 2026",
    scholarships: [
      { name: "PU Need-based Merit", amount: "Tuition Waiver", deadline: "September 10, 2026", link: "http://pu.edu.pk" },
      { name: "PEEF Scholarship", amount: "Full Support", deadline: "September 30, 2026", link: "https://peef.org.pk" }
    ]
  },

  /* ─ 4. NUTECH ─ */
  {
    id: "nutech", name: "NUTECH", short: "National University of Technology",
    color: "#FF90E8", textColor: "#000",
    fields: [matric, fsc, testPct("nuet", "NUET %")],
    formula: [{ weight: 0.10, fieldId: "matric" }, { weight: 0.20, fieldId: "fsc" }, { weight: 0.70, fieldId: "nuet" }],
    note: "NUET×70% + FSc×20% + Matric×10%",
    benchmarks: [{ name: "BS Engineering Programs", threshold: 68 }, { name: "BS Computer Science", threshold: 65 }, { name: "BS Information Technology", threshold: 60 }, { name: "Other Programs", threshold: 58 }],
    admissionDeadline: "July 20, 2026",
    scholarships: [{ name: "NUTECH Financial Aid", amount: "Up to 100% Tuition", deadline: "August 1, 2026", link: "https://nutech.edu.pk" }]
  },

  /* ─ 5. NED University ─ */
  {
    id: "ned", name: "NED University", short: "NED UET — Karachi (Matric excluded per updated policy)",
    color: "#4A90E2", textColor: "#fff",
    fields: [fscEq("FSc / HSSC Part-I %"), testPct("nedtest", "NED Test %")],
    formula: [{ weight: 0.40, fieldId: "fsc" }, { weight: 0.60, fieldId: "nedtest" }],
    note: "NED Test×60% + FSc×40% — Matric excluded",
    benchmarks: [{ name: "Computer Engineering", threshold: 74 }, { name: "Electrical Engineering", threshold: 72 }, { name: "Mechanical Engineering", threshold: 70 }, { name: "Civil Engineering", threshold: 68 }],
    admissionDeadline: "July 10, 2026",
    scholarships: [{ name: "NED Alumni Scholarship", amount: "Tuition Assistance", deadline: "August 15, 2026", link: "https://neduet.edu.pk" }]
  },

  /* ─ 6a. Air University Engineering ─ */
  {
    id: "au-eng", name: "Air University", short: "Air University — Engineering Programs",
    color: "#FFDF00", textColor: "#000", program: "Engineering",
    fields: [matric, fsc, testPct("aucbt", "AU-CBT / Test %")],
    formula: [{ weight: 0.10, fieldId: "matric" }, { weight: 0.50, fieldId: "fsc" }, { weight: 0.40, fieldId: "aucbt" }],
    note: "FSc×50% + Test×40% + Matric×10%",
    benchmarks: [{ name: "Aerospace Engineering", threshold: 72 }, { name: "Electrical Engineering", threshold: 70 }, { name: "Mechanical Engineering", threshold: 68 }, { name: "Civil Engineering", threshold: 65 }],
    admissionDeadline: "July 15, 2026",
    scholarships: [{ name: "Air University Need-based", amount: "Variable", deadline: "August 5, 2026", link: "https://mail.au.edu.pk" }]
  },

  /* ─ 6b. Air University Non-Engineering ─ */
  {
    id: "au-noneng", name: "Air University", short: "Air University — Computing / BBA / Social Sciences",
    color: "#FF90E8", textColor: "#000", program: "Non-Engineering",
    fields: [matric, fsc, testPct("aucbt", "AU-CBT / Test %")],
    formula: [{ weight: 0.15, fieldId: "matric" }, { weight: 0.35, fieldId: "fsc" }, { weight: 0.50, fieldId: "aucbt" }],
    note: "Test×50% + FSc×35% + Matric×15%",
    benchmarks: [{ name: "BS Computer Science", threshold: 65 }, { name: "BBA / Business", threshold: 62 }, { name: "Social Sciences", threshold: 58 }, { name: "Mass Communication", threshold: 60 }],
    admissionDeadline: "July 15, 2026",
  },

  /* ─ 7. UET Lahore ─ */
  {
    id: "uet-lhr", name: "UET Lahore", short: "University of Engineering & Technology, Lahore",
    color: "#4A90E2", textColor: "#fff",
    fields: [fsc, testPct("ecat", "ECAT %", "ECAT score as percentage")],
    formula: [{ weight: 0.70, fieldId: "fsc" }, { weight: 0.30, fieldId: "ecat" }],
    note: "FSc×70% + ECAT×30% — Matric excluded",
    benchmarks: [{ name: "CS / Software Engineering", threshold: 80 }, { name: "Electrical Engineering", threshold: 78 }, { name: "Mechanical Engineering", threshold: 75 }, { name: "Civil Engineering", threshold: 72 }],
    gpaScale: { "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "F": 0.0 },
    admissionDeadline: "June 20, 2026",
    scholarships: [{ name: "UET Merit Scholarship", amount: "Full/Partial Tuition", deadline: "August 1, 2026", link: "https://uet.edu.pk" }]
  },

  /* ─ 8. COMSATS ─ */
  {
    id: "cui", name: "COMSATS (CUI)", short: "COMSATS University Islamabad",
    color: "#00FFC2", textColor: "#000",
    fields: [matric, fscEq("FSc / A-Level %"), testPct("nat", "NTS NAT %")],
    formula: [{ weight: 0.10, fieldId: "matric" }, { weight: 0.40, fieldId: "fsc" }, { weight: 0.50, fieldId: "nat" }],
    note: "NTS NAT×50% + FSc×40% + Matric×10%",
    benchmarks: [{ name: "BS Computer Science (ISB/LHR)", threshold: 75 }, { name: "BS Software Engineering", threshold: 72 }, { name: "BS Electrical Engineering", threshold: 72 }, { name: "BBA / Management", threshold: 68 }],
    admissionDeadline: "July 25, 2026",
    scholarships: [{ name: "CUI Need-based", amount: "Partial Tuition", deadline: "August 15, 2026", link: "https://comsats.edu.pk" }]
  },

  /* ─ 9. PIEAS ─ */
  {
    id: "pieas", name: "PIEAS", short: "Pakistan Institute of Engineering & Applied Sciences",
    color: "#FF4911", textColor: "#fff",
    fields: [matric, { id: "hssc1", label: "HSSC Part-1 %", placeholder: "e.g. 85.0", max: 100, hint: "First-year college result (Part-1 only)" }, testPct("pieastest", "PIEAS Test %")],
    formula: [{ weight: 0.15, fieldId: "matric" }, { weight: 0.25, fieldId: "hssc1" }, { weight: 0.60, fieldId: "pieastest" }],
    note: "PIEAS Test×60% + HSSC Part-1×25% + Matric×15%",
    benchmarks: [{ name: "Nuclear Engineering", threshold: 85 }, { name: "Mechanical / Chemical Engg", threshold: 83 }, { name: "Electrical / CS", threshold: 80 }, { name: "Physics / Maths (BS)", threshold: 78 }],
    admissionDeadline: "May 30, 2026",
    scholarships: [{ name: "PIEAS Fellowship", amount: "Monthly Stipend + Fee Waiver", deadline: "June 15, 2026", link: "https://pieas.edu.pk" }]
  },

  /* ─ 10. GIKI ─ */
  {
    id: "giki", name: "GIKI", short: "Ghulam Ishaq Khan Institute (Test-heavy — FSc not factored)",
    color: "#FFDF00", textColor: "#000",
    fields: [{ id: "matric", label: "Matric % (eligibility ≥60%)", placeholder: "e.g. 83.0", max: 100 }, testPct("gikitest", "GIKI Test %", "Requires 60% FSc to be eligible — but not in formula")],
    formula: [{ weight: 0.15, fieldId: "matric" }, { weight: 0.85, fieldId: "gikitest" }],
    note: "GIKI Test×85% + Matric×15% — FSc is eligibility only",
    benchmarks: [{ name: "CS / Software Engineering", threshold: 82 }, { name: "Mechanical Engineering", threshold: 80 }, { name: "Electrical Engineering", threshold: 81 }, { name: "Industrial & Mfg Engg", threshold: 78 }],
    admissionDeadline: "June 10, 2026",
    scholarships: [
      { name: "GIKI Financial Assistance", amount: "Loans/Grants", deadline: "June 30, 2026", link: "https://giki.edu.pk" },
      { name: "Luminar Scholarship", amount: "Full Tuition", deadline: "July 1, 2026", link: "https://giki.edu.pk" }
    ]
  },

  /* ─ 11. Bahria University ─ */
  {
    id: "bahria", name: "Bahria University", short: "Bahria University (Eng / CS / IT / Management)",
    color: "#FF90E8", textColor: "#000",
    fields: [matric, fsc, testPct("cbt", "CBT %", "Bahria University Computer Based Test score as %")],
    formula: [{ weight: 0.10, fieldId: "matric" }, { weight: 0.40, fieldId: "fsc" }, { weight: 0.50, fieldId: "cbt" }],
    note: "CBT×50% + FSc×40% + Matric×10%",
    benchmarks: [{ name: "CS / SE / AI", threshold: 68 }, { name: "Electrical Engineering", threshold: 65 }, { name: "BBA / Management", threshold: 62 }, { name: "Civil / Mechanical", threshold: 63 }],
    admissionDeadline: "July 30, 2026",
  },

  /* ─ 12. UET Peshawar ─ */
  {
    id: "uet-pesh", name: "UET Peshawar", short: "University of Engineering & Technology, Peshawar (KPK)",
    color: "#4A90E2", textColor: "#fff",
    fields: [fscEq("FSc Pre-Engineering %"), testPct("etea", "ETEA / UET Test %")],
    formula: [{ weight: 0.70, fieldId: "fsc" }, { weight: 0.30, fieldId: "etea" }],
    note: "FSc×70% + ETEA×30% — Matric excluded",
    benchmarks: [{ name: "Electrical Engineering", threshold: 75 }, { name: "Mechanical Engineering", threshold: 73 }, { name: "Civil Engineering", threshold: 70 }, { name: "Computer Systems Engg", threshold: 74 }],
    admissionDeadline: "August 1, 2026",
  },

  /* ─ 13. Mehran UET ─ */
  {
    id: "muet", name: "Mehran UET", short: "Mehran University of Engineering & Technology, Jamshoro",
    color: "#00FFC2", textColor: "#000",
    fields: [fscEq("FSc / HSSC %"), testPct("muettest", "MUET Test %")],
    formula: [{ weight: 0.40, fieldId: "fsc" }, { weight: 0.60, fieldId: "muettest" }],
    note: "MUET Test×60% + FSc×40% — Matric excluded",
    benchmarks: [{ name: "CS / Software Engineering", threshold: 72 }, { name: "Electrical Engineering", threshold: 70 }, { name: "Civil Engineering", threshold: 65 }, { name: "Mechanical / Chemical", threshold: 67 }],
    admissionDeadline: "August 5, 2026",
  },

  /* ─ 14. QAU ─ */
  {
    id: "qau", name: "QAU Islamabad", short: "Quaid-i-Azam University (No entry test for most BS programs)",
    color: "#FFDF00", textColor: "#000",
    fields: [matric, fscEq("FSc / A-Level %")],
    formula: [{ weight: 0.30, fieldId: "matric" }, { weight: 0.70, fieldId: "fsc" }],
    note: "FSc×70% + Matric×30% — No Entry Test required",
    benchmarks: [{ name: "BS Physics / Chemistry", threshold: 80 }, { name: "BS Maths / Statistics", threshold: 78 }, { name: "BS Biological Sciences", threshold: 82 }, { name: "Social Sciences Programs", threshold: 70 }],
    admissionDeadline: "July 10, 2026",
  },

  /* ─ 15. UAF ─ */
  {
    id: "uaf", name: "UAF", short: "University of Agriculture Faisalabad",
    color: "#FF90E8", textColor: "#000",
    fields: [fscEq("FSc / ICS %"), testPct("uaftest", "UAF Test %")],
    formula: [{ weight: 0.50, fieldId: "fsc" }, { weight: 0.50, fieldId: "uaftest" }],
    note: "FSc×50% + UAF Test×50% — Matric excluded",
    benchmarks: [{ name: "BS Agriculture / Food Sci", threshold: 65 }, { name: "BS Computer Science", threshold: 62 }, { name: "BS Engineering", threshold: 68 }, { name: "BS Horticulture / Env. Sci.", threshold: 60 }],
    admissionDeadline: "July 20, 2026",
  },

  /* ─ 16. BZU ─ */
  {
    id: "bzu", name: "BZU Multan", short: "Bahauddin Zakariya University, Multan",
    color: "#4A90E2", textColor: "#fff",
    fields: [fscEq("FSc / Equivalent %"), testPct("bzutest", "Departmental Test %", "Enter 0 if dept has no test — 70% FSc + 30% Matric formula applies")],
    formula: [{ weight: 0.70, fieldId: "fsc" }, { weight: 0.30, fieldId: "bzutest" }],
    note: "FSc×70% + Test×30% (if no test: FSc×70% + Matric×30%)",
    benchmarks: [{ name: "BS Computer Science", threshold: 65 }, { name: "BS Engineering Programs", threshold: 68 }, { name: "BS IT / Software Engg", threshold: 62 }, { name: "Other BS Programs", threshold: 58 }],
    admissionDeadline: "August 10, 2026",
  },

  /* ─ 17. LUMS / IBA — holistic ─ */
  {
    id: "lums-iba", name: "LUMS / IBA", short: "Holistic Admissions — No Formula",
    color: "#000", textColor: "#FFDF00",
    holistic: true,
    holisticNote: "LUMS uses a holistic review: SAT/LCAT score + absolute grades (A*/A or 90%+) + extracurriculars + personal essays. No published % formula.\n\nIBA Karachi uses a cutoff system: pass the IBA Aptitude Test (or high SAT), then admission is based entirely on Interview + Group Discussion performance.\n\nNeither can be reduced to a merit percentage. Focus on acing your test and application instead.",
    fields: [],
    formula: [],
    note: "No aggregate formula — holistic / interview-based",
    benchmarks: [],
    admissionDeadline: "February 1, 2026",
    scholarships: [
      { name: "LUMS Financial Aid (NOFA)", amount: "Up to 100% Tuition", deadline: "February 15, 2026", link: "https://lums.edu.pk" },
      { name: "IBA Financial Assistance", amount: "Need-based Support", deadline: "March 1, 2026", link: "https://iba.edu.pk" }
    ]
  },

  /* ─ 18. Medical Admissions (MDCAT) ─ */
  {
    id: "medical", name: "Medical Colleges (MDCAT)", short: "PMDC / UHS / Dow / SZAMBU Medical Aggregate",
    color: "#C92A2A", textColor: "#fff",
    fields: [matric, fsc, testPct("mdcat", "MDCAT %")],
    formula: [{ weight: 0.10, fieldId: "matric" }, { weight: 0.40, fieldId: "fsc" }, { weight: 0.50, fieldId: "mdcat" }],
    note: "MDCAT×50% + FSc×40% + Matric×10%",
    benchmarks: MED_BENCHMARKS,
    admissionDeadline: "October 10, 2026",
    seoTitle: "Medical Aggregate Calculator 2026 | MDCAT PMDC Merit Predictor",
    seoDescription: "Calculate your MDCAT medical aggregate using the official PMDC formula. Check merit cutoffs for KEMU, Dow, and all public medical colleges.",
    seoKeywords: ["mdcat aggregate calculator", "medical merit calculator pakistan", "pmdc merit formula"],
  },
];
