export interface Scholarship {
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  link: string;
  category: string;
  color: string;
}

export const SCHOLARSHIPS: Scholarship[] = [
  {
    name: "Fulbright Scholarship",
    provider: "United States Government",
    amount: "Full Funding (Tuition + Living)",
    deadline: "May - Oct Yearly",
    link: "https://foreign.fulbrightonline.org/",
    category: "International",
    color: "#3B5BDB"
  },
  {
    name: "Chevening Scholarship",
    provider: "UK Government (FCDO)",
    amount: "Full Funding (UK Degree)",
    deadline: "November Yearly",
    link: "https://www.chevening.org/",
    category: "International",
    color: "#C92A2A"
  },
  {
    name: "Erasmus Mundus",
    provider: "European Union",
    amount: "Full Master's Funding",
    deadline: "Dec - Jan Yearly",
    link: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters-scholarships",
    category: "International",
    color: "#003399"
  },
  {
    name: "DAAD Scholarship",
    provider: "German Government",
    amount: "Tuition + Monthly Stipend",
    deadline: "Varies by Course",
    link: "https://www.daad.de/en/study-and-research-in-germany/scholarships/",
    category: "International",
    color: "#000000"
  },
  {
    name: "MEXT Scholarship",
    provider: "Japanese Government",
    amount: "Full Tuition + Airfare",
    deadline: "May - June Yearly",
    link: "https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm",
    category: "International",
    color: "#BC002D"
  },
  {
    name: "HEC Need Based Scholarship",
    provider: "Higher Education Commission",
    amount: "Full Tuition + Stipend",
    deadline: "Varies by Uni",
    link: "https://www.hec.gov.pk/english/scholarships/pages/needbased.aspx",
    category: "Need-based",
    color: "#4A90E2"
  },
  {
    name: "Ehsaas Undergraduate Program",
    provider: "Government of Pakistan",
    amount: "Full Tuition + 2000 Monthly",
    deadline: "Oct - Nov Yearly",
    link: "https://www.hec.gov.pk/english/scholarships/pages/ehsaas-program.aspx",
    category: "Government",
    color: "#00FFC2"
  },
  {
    name: "PeeF Scholarship",
    provider: "Punjab Education Endowment Fund",
    amount: "Partial to Full",
    deadline: "Nov Yearly",
    link: "https://peef.org.pk/",
    category: "Provincial",
    color: "#FF90E8"
  },
  {
    name: "SEEF Scholarship",
    provider: "Sindh Education Endowment Fund",
    amount: "Full Tuition",
    deadline: "Sept - Oct Yearly",
    link: "https://seef.sindh.gov.pk/",
    category: "Provincial",
    color: "#FF4911"
  },
  {
    name: "BEEF Scholarship",
    provider: "Balochistan Education Endowment Fund",
    amount: "Annual Stipend",
    deadline: "Dec Yearly",
    link: "https://beef.org.pk/",
    category: "Provincial",
    color: "#00FFC2"
  },
  {
    name: "NUST Need Based Aid (NNBAS)",
    provider: "NUST",
    amount: "Full/Partial Tuition",
    deadline: "With Admission",
    link: "https://nust.edu.pk/admissions/scholarships/",
    category: "University",
    color: "#FFDF00"
  },
  {
    name: "FAST Financial Aid",
    provider: "FAST-NUCES",
    amount: "Interest-free Loans",
    deadline: "Semester Start",
    link: "http://www.nu.edu.pk/Admissions/FinancialAid",
    category: "University",
    color: "#FF4911"
  }
];

