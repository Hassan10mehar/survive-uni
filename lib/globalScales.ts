/**
 * globalScales.ts
 * International grading system configurations for Survive Uni's Global Expansion.
 * Each entry defines a complete grading system for programmatic SEO page generation.
 */

export type GradeEntry = {
  label: string;  // Display label (e.g. "A+", "First Class", "Distinction")
  points: number; // Normalized 0–100 or 0–4 equivalent for comparison
  display?: string; // Optional alternate display (e.g. "1.0" for German)
};

export type GlobalScale = {
  id: string;
  region: string;
  system: string;
  emoji: string;
  color: string;         // Theme color for the page
  textColor: string;
  maxScale: number;      // The max value of the scale (4, 10, 100, etc.)
  maxLabel: string;      // "4.0", "ECTS", "First", etc.
  grades: GradeEntry[];  // All valid grades for this system
  defaultGrade: string;  // The grade label to pre-select
  creditLabel: string;   // "Credit Hours", "Units", "Credits", "Modules"
  defaultCredits: number;
  targetMin: number;     // Typical minimum passing standard
  // SEO
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  // Content
  note: string;          // One-line explanation of the grading system
  faqWhatIf: string;     // "What-if" scenario description for the FAQ
};

export const GLOBAL_SCALES: GlobalScale[] = [
  /* ── 1. US 4.0 Scale ─────────────────────────── */
  {
    id: "us-4-0",
    region: "United States",
    system: "4.0 GPA Scale",
    emoji: "🇺🇸",
    color: "#3B5BDB",
    textColor: "#ffffff",
    maxScale: 4.0,
    maxLabel: "4.0",
    defaultGrade: "B",
    creditLabel: "Credit Hours",
    defaultCredits: 3,
    targetMin: 2.0,
    grades: [
      { label: "A+", points: 4.0 },
      { label: "A",  points: 4.0 },
      { label: "A-", points: 3.67 },
      { label: "B+", points: 3.33 },
      { label: "B",  points: 3.0 },
      { label: "B-", points: 2.67 },
      { label: "C+", points: 2.33 },
      { label: "C",  points: 2.0 },
      { label: "C-", points: 1.67 },
      { label: "D+", points: 1.33 },
      { label: "D",  points: 1.0 },
      { label: "F",  points: 0.0 },
    ],
    note: "Used at US universities. GPA = Σ(Grade Points × Credits) / Σ(Credits).",
    faqWhatIf: "If I get a B in my 3-credit course, what happens to my cumulative GPA?",
    seoTitle: "GPA Calculator 4.0 Scale | US College GPA Calculator 2026",
    seoDescription: "Free US GPA calculator using the standard 4.0 scale. Calculate your cumulative GPA, semester GPA, and see what grades you need to hit your target. Trusted by 10,000+ students.",
    seoKeywords: ["gpa calculator 4.0 scale", "us college gpa calculator", "cumulative gpa calculator", "semester gpa calculator usa", "gpa calculator college", "4.0 gpa scale"],
  },

  /* ── 2. UK Honours System ─────────────────────────── */
  {
    id: "uk-honours",
    region: "United Kingdom",
    system: "UK Honours Degree",
    emoji: "🇬🇧",
    color: "#C92A2A",
    textColor: "#ffffff",
    maxScale: 100,
    maxLabel: "First Class",
    defaultGrade: "Upper Second (2:1)",
    creditLabel: "Modules",
    defaultCredits: 1,
    targetMin: 40,
    grades: [
      { label: "First Class (1st)",   points: 85, display: "85–100%" },
      { label: "Upper Second (2:1)",  points: 65, display: "60–69%" },
      { label: "Lower Second (2:2)",  points: 55, display: "50–59%" },
      { label: "Third Class (3rd)",   points: 45, display: "40–49%" },
      { label: "Fail",                points: 0,  display: "0–39%" },
    ],
    note: "UK degrees are classified: First (1st), Upper Second (2:1), Lower Second (2:2), Third (3rd).",
    faqWhatIf: "If I score 65% on my final exam, will I get a 2:1 or a First Class degree?",
    seoTitle: "UK University Degree Classification Calculator | 1st, 2:1, 2:2 Grade Checker",
    seoDescription: "Calculate your UK university degree classification instantly. Enter your module marks to find out if you'll graduate with a First, Upper Second (2:1), or Lower Second (2:2).",
    seoKeywords: ["uk degree classification calculator", "first class degree calculator", "2:1 grade calculator uk", "uk university grade calculator", "honours degree classification"],
  },

  /* ── 3. India 10-Point CGPA ─────────────────────────── */
  {
    id: "india-10-0",
    region: "India",
    system: "10-Point CGPA (UGC)",
    emoji: "🇮🇳",
    color: "#F76707",
    textColor: "#ffffff",
    maxScale: 10,
    maxLabel: "10.0",
    defaultGrade: "B+ (8)",
    creditLabel: "Credits",
    defaultCredits: 4,
    targetMin: 6.0,
    grades: [
      { label: "O (Outstanding)", points: 10 },
      { label: "A+ (Excellent)",  points: 9 },
      { label: "A (Very Good)",   points: 8 },
      { label: "B+ (Good)",       points: 7 },
      { label: "B (Above Avg)",   points: 6 },
      { label: "C (Average)",     points: 5 },
      { label: "P (Pass)",        points: 4 },
      { label: "F (Fail)",        points: 0 },
    ],
    note: "India UGC 10-point CGPA. CGPA = Σ(Grade Point × Credits) / Σ(Credits).",
    faqWhatIf: "How do I convert my 8.5 CGPA to a percentage for a job application?",
    seoTitle: "India CGPA Calculator | 10-Point UGC Scale | CGPA to Percentage Converter",
    seoDescription: "Free Indian CGPA calculator using the UGC 10-point scale. Convert CGPA to percentage, calculate semester GPA, and track your academic progress. Used by engineering and college students.",
    seoKeywords: ["cgpa calculator india", "10 point cgpa calculator", "ugc cgpa calculator", "cgpa to percentage india", "indian university gpa calculator", "sgpa cgpa calculator"],
  },

  /* ── 4. Europe ECTS System ─────────────────────────── */
  {
    id: "europe-ects",
    region: "Europe (EU/Erasmus)",
    system: "ECTS Grading Scale",
    emoji: "🇪🇺",
    color: "#1971C2",
    textColor: "#ffffff",
    maxScale: 30,
    maxLabel: "ECTS Credits",
    defaultGrade: "B (Good)",
    creditLabel: "ECTS Credits",
    defaultCredits: 6,
    targetMin: 12,
    grades: [
      { label: "A (Excellent)",     points: 5, display: "Top 10%" },
      { label: "B (Very Good)",     points: 4, display: "Next 25%" },
      { label: "C (Good)",          points: 3, display: "Next 30%" },
      { label: "D (Satisfactory)",  points: 2, display: "Next 25%" },
      { label: "E (Sufficient)",    points: 1, display: "Bottom 10%" },
      { label: "F (Fail)",          points: 0, display: "Fail" },
    ],
    note: "European Credit Transfer System (ECTS) uses a 5-point percentile-based scale (A–F).",
    faqWhatIf: "How many ECTS credits do I need to transfer from one EU university to another?",
    seoTitle: "ECTS Grade Calculator | European University Credit System | Erasmus Grade Converter",
    seoDescription: "Calculate your ECTS grade and credits for European universities, Erasmus exchange programs, and EU degree transfers. Convert your home university grades to the ECTS scale.",
    seoKeywords: ["ects grade calculator", "ects credit calculator", "european university grade calculator", "erasmus grade converter", "eu gpa calculator", "ects to gpa converter"],
  },

  /* ── 5. Australia WAM ─────────────────────────── */
  {
    id: "aus-wam",
    region: "Australia",
    system: "Weighted Average Mark (WAM)",
    emoji: "🇦🇺",
    color: "#2F9E44",
    textColor: "#ffffff",
    maxScale: 100,
    maxLabel: "100%",
    defaultGrade: "Credit (65–74)",
    creditLabel: "Units/Credit Points",
    defaultCredits: 6,
    targetMin: 50,
    grades: [
      { label: "High Distinction (85–100)", points: 92 },
      { label: "Distinction (75–84)",       points: 80 },
      { label: "Credit (65–74)",            points: 70 },
      { label: "Pass (50–64)",              points: 57 },
      { label: "Fail (0–49)",              points: 25 },
    ],
    note: "Australian WAM = Σ(Mark × Credit Points) / Σ(Credit Points). Higher than GPA.",
    faqWhatIf: "What WAM do I need for an Honours degree or a graduate scholarship in Australia?",
    seoTitle: "WAM Calculator Australia | Weighted Average Mark Calculator for Uni Students",
    seoDescription: "Free Australian WAM calculator. Calculate your Weighted Average Mark for ANU, Sydney, Melbourne, Monash, and other Australian universities. Essential for Honours and scholarship applications.",
    seoKeywords: ["wam calculator australia", "weighted average mark calculator", "australian university gpa", "anu wam calculator", "sydney uni wam", "monash wam calculator"],
  },

  /* ── 6. Singapore CAP ─────────────────────────── */
  {
    id: "singapore-cap",
    region: "Singapore",
    system: "Cumulative Average Point (CAP)",
    emoji: "🇸🇬",
    color: "#E03131",
    textColor: "#ffffff",
    maxScale: 5.0,
    maxLabel: "5.0 CAP",
    defaultGrade: "B+ (3.5)",
    creditLabel: "Module Credits",
    defaultCredits: 4,
    targetMin: 2.0,
    grades: [
      { label: "A+ (5.0)", points: 5.0 },
      { label: "A (5.0)",  points: 5.0 },
      { label: "A- (4.5)", points: 4.5 },
      { label: "B+ (4.0)", points: 4.0 },
      { label: "B (3.5)",  points: 3.5 },
      { label: "B- (3.0)", points: 3.0 },
      { label: "C+ (2.5)", points: 2.5 },
      { label: "C (2.0)",  points: 2.0 },
      { label: "D+ (1.5)", points: 1.5 },
      { label: "D (1.0)",  points: 1.0 },
      { label: "F (0.0)",  points: 0.0 },
    ],
    note: "NUS/NTU CAP system: max 5.0. CAP = Σ(Grade Points × MCs) / Σ(MCs).",
    faqWhatIf: "What CAP do I need to make the Dean's List at NUS or NTU?",
    seoTitle: "CAP Calculator Singapore | NUS NTU Cumulative Average Point Calculator",
    seoDescription: "Calculate your NUS or NTU CAP (Cumulative Average Point) instantly. Predict your final CAP, check your standing, and see if you'll make the Dean's List or qualify for a scholarship.",
    seoKeywords: ["cap calculator singapore", "nus cap calculator", "ntu cap calculator", "singapore university gpa", "cumulative average point calculator", "nus dean's list calculator"],
  },
];

/** Helper: Get a scale by its ID */
export function getScaleById(id: string): GlobalScale | undefined {
  return GLOBAL_SCALES.find(s => s.id === id);
}

/** Helper: Build a grade map (label → points) for use in GPA calculations */
export function buildGradeMap(scale: GlobalScale): Record<string, number> {
  return Object.fromEntries(scale.grades.map(g => [g.label, g.points]));
}
