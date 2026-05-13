/**
 * lib/countries.ts
 * Country configuration for Survive Uni's global programmatic SEO engine.
 */



export type CountryTerms = {
  merit: string;       // "Aggregate Calculator" | "GPA Calculator" | "UCAS Points"
  bunk: string;        // "Bunk Tracker" | "Attendance Buffer" | "Skip Calculator"
  grade: string;       // "GPA" | "CAP" | "WAM" | "CGPA" | "Mark"
  credit: string;      // "Credit Hours" | "Units" | "Modules" | "Credits"
};

export type Country = {
  id: string;          // URL slug: "usa", "uk", "india", "pakistan"
  name: string;        // "United States"
  emoji: string;
  color: string;       // Hub page accent color
  textColor: string;
  gradingScaleId: string;  // references GLOBAL_SCALES id
  attendanceMin: number;   // 75 (PK), 80 (UK/India), 85 (Aus)
  terms: CountryTerms;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
};

export const COUNTRIES: Country[] = [
  {
    id: "usa",
    name: "United States",
    emoji: "🇺🇸",
    color: "#3B5BDB",
    textColor: "#ffffff",
    gradingScaleId: "us-4-0",
    attendanceMin: 80,
    terms: {
      merit: "Admission Calculator",
      bunk:  "Class Skip Tracker",
      grade: "GPA",
      credit: "Credit Hours",
    },
    seoTitle: "US University GPA Calculator | College GPA Tools for American Students",
    seoDescription: "Free GPA calculators for MIT, Stanford, Harvard, UC Berkeley, and 15+ top US universities. Calculate your 4.0 scale GPA, track attendance, and plan your admission strategy.",
    seoKeywords: ["us university gpa calculator", "college gpa calculator usa", "american university gpa", "4.0 gpa calculator", "mit gpa calculator", "stanford gpa calculator"],
  },
  {
    id: "uk",
    name: "United Kingdom",
    emoji: "🇬🇧",
    color: "#C92A2A",
    textColor: "#ffffff",
    gradingScaleId: "uk-honours",
    attendanceMin: 80,
    terms: {
      merit: "UCAS Tariff Calculator",
      bunk:  "Absence Tracker",
      grade: "Degree Classification",
      credit: "Modules",
    },
    seoTitle: "UK University Grade Calculator | Degree Classification & UCAS Points",
    seoDescription: "Free grade calculators for Oxford, Cambridge, Imperial, UCL, and 12+ UK universities. Check if you'll get a First, 2:1 or 2:2 degree and calculate UCAS tariff points.",
    seoKeywords: ["uk university grade calculator", "degree classification calculator", "first class degree calculator", "ucas points calculator", "oxford grade calculator", "cambridge grade calculator"],
  },
  {
    id: "india",
    name: "India",
    emoji: "🇮🇳",
    color: "#F76707",
    textColor: "#ffffff",
    gradingScaleId: "india-10-0",
    attendanceMin: 75,
    terms: {
      merit: "JEE Merit Calculator",
      bunk:  "Bunk Tracker",
      grade: "CGPA",
      credit: "Credits",
    },
    seoTitle: "Indian University CGPA Calculator | IIT, NIT & Top College GPA Tools",
    seoDescription: "Free CGPA calculators for IIT Delhi, IIT Bombay, IIT Madras, BITS Pilani, VIT, and 10+ top Indian universities. Convert CGPA to percentage, track attendance, plan merit.",
    seoKeywords: ["indian university cgpa calculator", "iit cgpa calculator", "cgpa to percentage india", "iit delhi gpa calculator", "bits pilani cgpa calculator", "vit cgpa calculator"],
  },
  {
    id: "pakistan",
    name: "Pakistan",
    emoji: "🇵🇰",
    color: "#1A7A3C",
    textColor: "#ffffff",
    gradingScaleId: "us-4-0", // HEC follows 4.0
    attendanceMin: 75,
    terms: {
      merit: "Aggregate Calculator",
      bunk:  "Bunk Tracker",
      grade: "GPA",
      credit: "Credit Hours",
    },
    seoTitle: "Pakistani University Calculators | NUST, FAST, UET Aggregate & GPA Tools",
    seoDescription: "Official aggregate calculators for NUST, FAST-NUCES, UET, COMSATS, PIEAS, GIKI, and 17+ Pakistani universities. Calculate your merit, GPA, and plan your admissions.",
    seoKeywords: ["pakistan university calculator", "nust aggregate calculator", "fast merit calculator", "uet aggregate calculator", "pakistan gpa calculator", "hec gpa calculator"],
  },
];

export function getCountryById(id: string): Country | undefined {
  return COUNTRIES.find(c => c.id === id);
}

export function getAllCountryIds(): string[] {
  return COUNTRIES.map(c => c.id);
}
