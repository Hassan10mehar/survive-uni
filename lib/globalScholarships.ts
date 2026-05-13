export interface Scholarship {
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  link: string;
  category: string;
  color: string;
}

export const GLOBAL_SCHOLARSHIPS: Record<string, Scholarship[]> = {
  "usa": [
    {
      name: "Fulbright Foreign Student Program",
      provider: "US Department of State",
      amount: "Full Tuition + Living Stipend",
      deadline: "Varies by Country",
      link: "https://foreign.fulbrightonline.org/about/foreign-student-program",
      category: "Government",
      color: "#4A90E2"
    },
    {
      name: "Hubert H. Humphrey Fellowship",
      provider: "US Department of State",
      amount: "Non-degree Full Coverage",
      deadline: "Varies by Country",
      link: "https://www.humphreyfellowship.org/",
      category: "Government",
      color: "#00FFC2"
    },
    {
      name: "MIT Need-Blind Financial Aid",
      provider: "MIT",
      amount: "Full Need Met",
      deadline: "Jan 1 Yearly",
      link: "https://sfs.mit.edu/",
      category: "University",
      color: "#FFDF00"
    },
    {
      name: "Harvard Financial Aid",
      provider: "Harvard University",
      amount: "100% Demonstrated Need",
      deadline: "Jan 1 Yearly",
      link: "https://college.harvard.edu/financial-aid",
      category: "University",
      color: "#FF4911"
    }
  ],
  "uk": [
    {
      name: "Chevening Scholarships",
      provider: "UK Government",
      amount: "Full Tuition + Living",
      deadline: "Nov Yearly",
      link: "https://www.chevening.org/",
      category: "Government",
      color: "#4A90E2"
    },
    {
      name: "Commonwealth Scholarships",
      provider: "UK Foreign, Commonwealth & Development Office",
      amount: "Full Tuition + Flights",
      deadline: "Oct Yearly",
      link: "https://cscuk.fcdo.gov.uk/",
      category: "Government",
      color: "#00FFC2"
    },
    {
      name: "Gates Cambridge Scholarship",
      provider: "Cambridge University",
      amount: "Full Cost of Study",
      deadline: "Dec Yearly",
      link: "https://www.gatescambridge.org/",
      category: "University",
      color: "#FF90E8"
    },
    {
      name: "Clarendon Fund",
      provider: "Oxford University",
      amount: "Tuition + Living Costs",
      deadline: "Jan Yearly",
      link: "https://www.ox.ac.uk/clarendon",
      category: "University",
      color: "#FFDF00"
    }
  ],
  "india": [
    {
      name: "Study in India (SII) Scholarship",
      provider: "Ministry of Education",
      amount: "Up to $3,500/year",
      deadline: "May Yearly",
      link: "https://studyinindia.gov.in/",
      category: "Government",
      color: "#4A90E2"
    },
    {
      name: "ICCR Scholarship",
      provider: "Indian Council for Cultural Relations",
      amount: "Full Tuition + Stipend",
      deadline: "April Yearly",
      link: "https://www.iccr.gov.in/",
      category: "Government",
      color: "#FF4911"
    },
    {
      name: "IIT Bombay Foreign Student Aid",
      provider: "IIT Bombay",
      amount: "Partial Tuition Waiver",
      deadline: "March Yearly",
      link: "https://www.ir.iitb.ac.in/",
      category: "University",
      color: "#FFDF00"
    }
  ],
  "pakistan": [
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
      name: "Scottish Council Scholarship",
      provider: "British Council",
      amount: "Tuition + Transport",
      deadline: "Aug Yearly",
      link: "https://www.britishcouncil.pk/programmes/education/scholarships",
      category: "International",
      color: "#4A90E2"
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
  ]
};
