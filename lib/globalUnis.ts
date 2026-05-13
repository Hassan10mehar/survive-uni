export type WorldUniversity = {
  id: string;
  name: string;
  short: string;
  country: string;
  city: string;
  gradingScaleId: string;
  qsRank?: number;
  attendanceMin?: number;
  hasAdmission: boolean;
  admissionNote?: string;
  admissionDeadline?: string;
  scholarships?: { name: string; amount: string; deadline: string; link: string }[];
  color: string;
  textColor: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
};

export const WORLD_UNIS: WorldUniversity[] = [
  // ── USA ──────────────────────────────────────────
  { 
    id:"mit", name:"Massachusetts Institute of Technology", short:"MIT", country:"usa", city:"Cambridge, MA", gradingScaleId:"us-4-0", qsRank:1, hasAdmission:true, admissionNote:"SAT/ACT + GPA holistic review", 
    admissionDeadline: "January 5, 2026", 
    scholarships: [
      { name: "MIT Financial Aid", amount: "100% Need-met", deadline: "February 15, 2026", link: "https://sfs.mit.edu" },
      { name: "International Excellence Award", amount: "$25,000", deadline: "March 1, 2026", link: "https://sfs.mit.edu" }
    ], 
    color:"#8B1A1A", textColor:"#fff", 
    seoTitle:"MIT GPA Calculator 2026 | Massachusetts Institute of Technology", 
    seoDescription:"Free MIT GPA calculator using the 4.0 scale. Track your semester GPA, predict final grades, and see what scores you need for MIT's academic standards.", 
    seoKeywords:["mit gpa calculator","massachusetts institute of technology gpa","mit grade calculator","mit academic calculator"] 
  },
  { 
    id:"stanford", name:"Stanford University", short:"Stanford", country:"usa", city:"Stanford, CA", gradingScaleId:"us-4-0", qsRank:5, hasAdmission:true, admissionNote:"SAT/ACT + GPA holistic review", 
    admissionDeadline: "January 5, 2026",
    scholarships: [
      { name: "Stanford Reliance Dhirubhai Fellowship", amount: "Full Tuition + Fees", deadline: "June 1, 2026", link: "https://www.gsb.stanford.edu" },
      { name: "Knight-Hennessy Scholars", amount: "Full Funding", deadline: "October 10, 2026", link: "https://knight-hennessy.stanford.edu" }
    ],
    color:"#8C1515", textColor:"#fff", 
    seoTitle:"Stanford GPA Calculator 2026", 
    seoDescription:"Calculate your Stanford University GPA on the 4.0 scale. Track semester performance and plan your academic goals.", 
    seoKeywords:["stanford gpa calculator","stanford university gpa","stanford grade calculator"] 
  },
  { 
    id:"harvard", name:"Harvard University", short:"Harvard", country:"usa", city:"Cambridge, MA", gradingScaleId:"us-4-0", qsRank:4, hasAdmission:true, admissionNote:"SAT/ACT + GPA holistic review", 
    admissionDeadline: "January 1, 2026", 
    scholarships: [{ name: "Harvard Financial Aid", amount: "Full Need-met", deadline: "February 1, 2026", link: "https://college.harvard.edu" }], 
    color:"#A51C30", textColor:"#fff", 
    seoTitle:"Harvard GPA Calculator 2026", 
    seoDescription:"Free Harvard University GPA calculator. Uses the standard 4.0 scale to track your semester GPA and cumulative average.", 
    seoKeywords:["harvard gpa calculator","harvard university grade calculator"] 
  },
  { 
    id:"uc-berkeley", name:"University of California, Berkeley", short:"UC Berkeley", country:"usa", city:"Berkeley, CA", gradingScaleId:"us-4-0", qsRank:12, hasAdmission:true, admissionNote:"GPA + SAT/ACT based admission", 
    admissionDeadline: "November 30, 2025",
    scholarships: [{ name: "Berkeley International Scholarship", amount: "Variable", deadline: "February 1, 2026", link: "https://internationaloffice.berkeley.edu" }],
    color:"#003262", textColor:"#FDB515", 
    seoTitle:"UC Berkeley GPA Calculator 2026", 
    seoDescription:"Calculate your UC Berkeley GPA using the 4.0 scale. Plan your semester and predict your cumulative GPA.", 
    seoKeywords:["uc berkeley gpa calculator","berkeley grade calculator","cal gpa calculator"] 
  },
  { 
    id:"ucla", name:"University of California, Los Angeles", short:"UCLA", country:"usa", city:"Los Angeles, CA", gradingScaleId:"us-4-0", qsRank:29, hasAdmission:true, admissionNote:"GPA + SAT/ACT based admission", 
    admissionDeadline: "November 30, 2025",
    color:"#2774AE", textColor:"#fff", 
    seoTitle:"UCLA GPA Calculator 2026", 
    seoDescription:"Free UCLA GPA calculator on the 4.0 scale. Track your academic progress and predict final semester GPA.", 
    seoKeywords:["ucla gpa calculator","university of california los angeles grade calculator"] 
  },
  { 
    id:"nyu", name:"New York University", short:"NYU", country:"usa", city:"New York, NY", gradingScaleId:"us-4-0", qsRank:38, hasAdmission:true, admissionNote:"GPA + SAT/ACT based admission", 
    admissionDeadline: "January 5, 2026",
    scholarships: [{ name: "NYU Global Scholarship", amount: "$15,000", deadline: "January 15, 2026", link: "https://www.nyu.edu" }],
    color:"#57068C", textColor:"#fff", 
    seoTitle:"NYU GPA Calculator 2026", 
    seoDescription:"Calculate your NYU semester and cumulative GPA using the 4.0 scale.", 
    seoKeywords:["nyu gpa calculator","new york university grade calculator"] 
  },
  { id:"georgia-tech", name:"Georgia Institute of Technology", short:"Georgia Tech", country:"usa", city:"Atlanta, GA", gradingScaleId:"us-4-0", qsRank:89, hasAdmission:true, admissionNote:"GPA + SAT/ACT", color:"#B3A369", textColor:"#000", seoTitle:"Georgia Tech GPA Calculator 2026", seoDescription:"Free Georgia Tech GPA calculator using the 4.0 scale for engineering and CS students.", seoKeywords:["georgia tech gpa calculator","gt gpa calculator"] },
  { id:"michigan", name:"University of Michigan", short:"U-M", country:"usa", city:"Ann Arbor, MI", gradingScaleId:"us-4-0", qsRank:33, hasAdmission:true, admissionNote:"GPA + SAT/ACT", color:"#00274C", textColor:"#FFCB05", seoTitle:"University of Michigan GPA Calculator 2026", seoDescription:"Calculate your University of Michigan GPA on the 4.0 scale.", seoKeywords:["university of michigan gpa calculator","umich gpa calculator"] },
  { id:"carnegie-mellon", name:"Carnegie Mellon University", short:"CMU", country:"usa", city:"Pittsburgh, PA", gradingScaleId:"us-4-0", qsRank:52, hasAdmission:true, admissionNote:"GPA + SAT/ACT holistic", color:"#C41230", textColor:"#fff", seoTitle:"Carnegie Mellon GPA Calculator 2026", seoDescription:"Free CMU GPA calculator for CS, Engineering and business students on the 4.0 scale.", seoKeywords:["carnegie mellon gpa calculator","cmu grade calculator"] },
  { id:"ut-austin", name:"University of Texas at Austin", short:"UT Austin", country:"usa", city:"Austin, TX", gradingScaleId:"us-4-0", qsRank:65, hasAdmission:true, admissionNote:"GPA + SAT/ACT", color:"#BF5700", textColor:"#fff", seoTitle:"UT Austin GPA Calculator 2026", seoDescription:"Calculate your UT Austin GPA using the 4.0 scale. Plan your semester and track academic progress.", seoKeywords:["ut austin gpa calculator","university of texas gpa calculator"] },
  { id:"purdue", name:"Purdue University", short:"Purdue", country:"usa", city:"West Lafayette, IN", gradingScaleId:"us-4-0", qsRank:99, hasAdmission:true, admissionNote:"GPA + SAT/ACT", color:"#CEB888", textColor:"#000", seoTitle:"Purdue University GPA Calculator 2026", seoDescription:"Free Purdue University GPA calculator using the 4.0 scale for engineering and STEM students.", seoKeywords:["purdue gpa calculator","purdue university grade calculator"] },
  { id:"usc", name:"University of Southern California", short:"USC", country:"usa", city:"Los Angeles, CA", gradingScaleId:"us-4-0", qsRank:113, hasAdmission:true, admissionNote:"GPA + SAT/ACT holistic", color:"#990000", textColor:"#FFC72C", seoTitle:"USC GPA Calculator 2026", seoDescription:"Calculate your University of Southern California GPA on the 4.0 scale.", seoKeywords:["usc gpa calculator","university of southern california grade calculator"] },
  { id:"boston-university", name:"Boston University", short:"BU", country:"usa", city:"Boston, MA", gradingScaleId:"us-4-0", qsRank:108, hasAdmission:true, admissionNote:"GPA + SAT/ACT", color:"#CC0000", textColor:"#fff", seoTitle:"Boston University GPA Calculator 2026", seoDescription:"Free BU GPA calculator using the 4.0 scale. Track semester GPA and cumulative average.", seoKeywords:["boston university gpa calculator","bu grade calculator"] },
  { id:"illinois", name:"University of Illinois Urbana-Champaign", short:"UIUC", country:"usa", city:"Champaign, IL", gradingScaleId:"us-4-0", qsRank:82, hasAdmission:true, admissionNote:"GPA + SAT/ACT", color:"#13294B", textColor:"#E84A27", seoTitle:"UIUC GPA Calculator 2026", seoDescription:"Calculate your University of Illinois Urbana-Champaign GPA on the 4.0 scale.", seoKeywords:["uiuc gpa calculator","illinois gpa calculator"] },
  { 
    id:"yale", name:"Yale University", short:"Yale", country:"usa", city:"New Haven, CT", gradingScaleId:"us-4-0", qsRank:16, hasAdmission:true, admissionNote:"SAT/ACT + GPA holistic", 
    admissionDeadline: "January 2, 2026",
    color:"#00356B", textColor:"#fff", 
    seoTitle:"Yale GPA Calculator 2026", 
    seoDescription:"Free Yale University GPA calculator using the 4.0 scale. Track your semester and cumulative GPA.", 
    seoKeywords:["yale gpa calculator","yale university grade calculator"] 
  },

  // ── UK ──────────────────────────────────────────
  { 
    id:"oxford", name:"University of Oxford", short:"Oxford", country:"uk", city:"Oxford, England", gradingScaleId:"uk-honours", qsRank:3, hasAdmission:true, admissionNote:"UCAS tariff + interview", 
    admissionDeadline: "October 15, 2025",
    scholarships: [
      { name: "Clarendon Fund", amount: "Full Tuition + Living Costs", deadline: "January 20, 2026", link: "https://www.ox.ac.uk" },
      { name: "Rhodes Scholarship", amount: "Complete Funding", deadline: "October 1, 2026", link: "https://www.rhodeshouse.ox.ac.uk" }
    ],
    color:"#002147", textColor:"#fff", 
    seoTitle:"Oxford Grade Calculator 2026 | Degree Classification", 
    seoDescription:"Calculate your University of Oxford degree classification. See if you'll graduate with a First, 2:1, or 2:2 based on your module marks.", 
    seoKeywords:["oxford grade calculator","oxford degree classification","oxford first class calculator","oxford university gpa"] 
  },
  { 
    id:"cambridge", name:"University of Cambridge", short:"Cambridge", country:"uk", city:"Cambridge, England", gradingScaleId:"uk-honours", qsRank:2, hasAdmission:true, admissionNote:"UCAS tariff + interview", 
    admissionDeadline: "October 15, 2025",
    scholarships: [{ name: "Gates Cambridge Scholarship", amount: "Full Funding", deadline: "January 5, 2026", link: "https://www.gatescambridge.org" }],
    color:"#A3C1AD", textColor:"#000", 
    seoTitle:"Cambridge Grade Calculator 2026 | Degree Classification", 
    seoDescription:"Free Cambridge University degree classification calculator. Check if you'll get a First, 2:1, or 2:2 honours degree.", 
    seoKeywords:["cambridge grade calculator","cambridge degree classification","cambridge university gpa"] 
  },
  { 
    id:"imperial", name:"Imperial College London", short:"Imperial", country:"uk", city:"London, England", gradingScaleId:"uk-honours", qsRank:8, hasAdmission:true, admissionNote:"UCAS tariff points", 
    admissionDeadline: "January 31, 2026",
    color:"#003E74", textColor:"#fff", 
    seoTitle:"Imperial College GPA Calculator 2026", 
    seoDescription:"Calculate your Imperial College London grade and degree classification. Track STEM module results.", 
    seoKeywords:["imperial college grade calculator","imperial college london gpa","imperial degree classification"] 
  },
  { id:"ucl", name:"University College London", short:"UCL", country:"uk", city:"London, England", gradingScaleId:"uk-honours", qsRank:9, hasAdmission:true, admissionNote:"UCAS tariff points", color:"#500778", textColor:"#fff", seoTitle:"UCL Grade Calculator 2026 | University College London", seoDescription:"Free UCL degree classification calculator. Check your University College London honours degree status.", seoKeywords:["ucl grade calculator","university college london gpa","ucl degree classification"] },
  { id:"edinburgh", name:"University of Edinburgh", short:"Edinburgh", country:"uk", city:"Edinburgh, Scotland", gradingScaleId:"uk-honours", qsRank:27, hasAdmission:true, admissionNote:"UCAS tariff points", color:"#041E42", textColor:"#C8102E", seoTitle:"Edinburgh University Grade Calculator 2026", seoDescription:"Calculate your University of Edinburgh degree classification and track your academic progress.", seoKeywords:["edinburgh university grade calculator","edinburgh degree classification"] },
  { id:"manchester", name:"University of Manchester", short:"Manchester", country:"uk", city:"Manchester, England", gradingScaleId:"uk-honours", qsRank:34, hasAdmission:true, admissionNote:"UCAS tariff points", color:"#660099", textColor:"#fff", seoTitle:"Manchester University Grade Calculator 2026", seoDescription:"Free University of Manchester grade and degree classification calculator for UK students.", seoKeywords:["manchester university grade calculator","manchester degree classification"] },
  { id:"kings-college", name:"King's College London", short:"KCL", country:"uk", city:"London, England", gradingScaleId:"uk-honours", qsRank:40, hasAdmission:true, admissionNote:"UCAS tariff points", color:"#1C2F6E", textColor:"#D4AF37", seoTitle:"King's College London Grade Calculator 2026", seoDescription:"Calculate your KCL degree classification and track module performance at King's College London.", seoKeywords:["kings college london grade calculator","kcl grade calculator","kcl degree classification"] },
  { id:"bristol", name:"University of Bristol", short:"Bristol", country:"uk", city:"Bristol, England", gradingScaleId:"uk-honours", qsRank:55, hasAdmission:true, admissionNote:"UCAS tariff points", color:"#C22B2B", textColor:"#fff", seoTitle:"Bristol University Grade Calculator 2026", seoDescription:"Free University of Bristol degree classification and grade calculator.", seoKeywords:["bristol university grade calculator","bristol degree classification"] },
  { id:"warwick", name:"University of Warwick", short:"Warwick", country:"uk", city:"Coventry, England", gradingScaleId:"uk-honours", qsRank:67, hasAdmission:true, admissionNote:"UCAS tariff points", color:"#4B0082", textColor:"#fff", seoTitle:"Warwick Grade Calculator 2026", seoDescription:"Calculate your University of Warwick degree classification. Track First, 2:1 and 2:2 thresholds.", seoKeywords:["warwick grade calculator","warwick university gpa","warwick degree classification"] },
  { id:"sheffield", name:"University of Sheffield", short:"Sheffield", country:"uk", city:"Sheffield, England", gradingScaleId:"uk-honours", qsRank:95, hasAdmission:true, admissionNote:"UCAS tariff points", color:"#2A2A72", textColor:"#fff", seoTitle:"Sheffield Grade Calculator 2026", seoDescription:"Free University of Sheffield degree classification calculator for UK students.", seoKeywords:["sheffield university grade calculator","sheffield degree classification"] },
  { id:"birmingham", name:"University of Birmingham", short:"Birmingham", country:"uk", city:"Birmingham, England", gradingScaleId:"uk-honours", qsRank:84, hasAdmission:true, admissionNote:"UCAS tariff points", color:"#00305E", textColor:"#BE9A28", seoTitle:"Birmingham University Grade Calculator 2026", seoDescription:"Calculate your University of Birmingham degree classification and academic standing.", seoKeywords:["birmingham university grade calculator","uob degree classification"] },
  { id:"leeds", name:"University of Leeds", short:"Leeds", country:"uk", city:"Leeds, England", gradingScaleId:"uk-honours", qsRank:93, hasAdmission:true, admissionNote:"UCAS tariff points", color:"#003865", textColor:"#fff", seoTitle:"Leeds University Grade Calculator 2026", seoDescription:"Free University of Leeds grade and degree classification calculator.", seoKeywords:["leeds university grade calculator","leeds degree classification"] },
  { id:"nottingham", name:"University of Nottingham", short:"Nottingham", country:"uk", city:"Nottingham, England", gradingScaleId:"uk-honours", qsRank:102, hasAdmission:true, admissionNote:"UCAS tariff points", color:"#003D71", textColor:"#fff", seoTitle:"Nottingham University Grade Calculator 2026", seoDescription:"Calculate your University of Nottingham degree classification instantly.", seoKeywords:["nottingham university grade calculator","uon degree classification"] },

  // ── INDIA ──────────────────────────────────────────
  { id:"iit-delhi", name:"IIT Delhi", short:"IITD", country:"india", city:"New Delhi", gradingScaleId:"india-10-0", qsRank:150, hasAdmission:true, admissionNote:"JEE Advanced rank based", color:"#8B0000", textColor:"#fff", seoTitle:"IIT Delhi CGPA Calculator 2026 | JEE Merit Tool", seoDescription:"Free IIT Delhi CGPA calculator using the 10-point UGC scale. Convert CGPA to percentage, track semester performance, and plan your academic goals.", seoKeywords:["iit delhi cgpa calculator","iitd gpa calculator","iit delhi grade calculator","iit delhi cgpa to percentage"] },
  { id:"iit-bombay", name:"IIT Bombay", short:"IITB", country:"india", city:"Mumbai", gradingScaleId:"india-10-0", qsRank:118, hasAdmission:true, admissionNote:"JEE Advanced rank based", color:"#00529B", textColor:"#fff", seoTitle:"IIT Bombay CGPA Calculator 2026", seoDescription:"Calculate your IIT Bombay CGPA on the 10-point scale. Track semester results and convert to percentage for job applications.", seoKeywords:["iit bombay cgpa calculator","iitb gpa calculator","iit bombay grade calculator"] },
  { id:"iit-madras", name:"IIT Madras", short:"IITM", country:"india", city:"Chennai", gradingScaleId:"india-10-0", qsRank:227, hasAdmission:true, admissionNote:"JEE Advanced rank based", color:"#CC0000", textColor:"#fff", seoTitle:"IIT Madras CGPA Calculator 2026", seoDescription:"Free IIT Madras CGPA calculator. Track your 10-point scale GPA and convert to percentage.", seoKeywords:["iit madras cgpa calculator","iitm gpa calculator","iit madras grade calculator"] },
  { id:"iit-kharagpur", name:"IIT Kharagpur", short:"IIT KGP", country:"india", city:"Kharagpur, West Bengal", gradingScaleId:"india-10-0", qsRank:271, hasAdmission:true, admissionNote:"JEE Advanced rank based", color:"#003366", textColor:"#fff", seoTitle:"IIT Kharagpur CGPA Calculator 2026", seoDescription:"Free IIT Kharagpur CGPA calculator on the 10-point scale. Track academic progress and plan your goals.", seoKeywords:["iit kharagpur cgpa calculator","iit kgp gpa calculator"] },
  { id:"bits-pilani", name:"BITS Pilani", short:"BITS", country:"india", city:"Pilani, Rajasthan", gradingScaleId:"india-10-0", qsRank:383, hasAdmission:true, admissionNote:"BITSAT score based", color:"#8B0000", textColor:"#FFD700", seoTitle:"BITS Pilani CGPA Calculator 2026 | BITSAT Merit", seoDescription:"Free BITS Pilani CGPA calculator. Calculate your 10-point scale GPA and track semester performance.", seoKeywords:["bits pilani cgpa calculator","bits gpa calculator","bitsat merit calculator","bits pilani grade calculator"] },
  { id:"vit", name:"VIT University", short:"VIT", country:"india", city:"Vellore, Tamil Nadu", gradingScaleId:"india-10-0", qsRank:651, hasAdmission:true, admissionNote:"VITEEE score based", color:"#003399", textColor:"#fff", seoTitle:"VIT University CGPA Calculator 2026 | VITEEE Merit", seoDescription:"Calculate your VIT University CGPA. Track semester GPA, attendance, and convert to percentage for placements.", seoKeywords:["vit cgpa calculator","vit university gpa calculator","vit vellore grade calculator","viteee merit calculator"] },
  { id:"delhi-university", name:"University of Delhi", short:"DU", country:"india", city:"New Delhi", gradingScaleId:"india-10-0", qsRank:521, hasAdmission:true, admissionNote:"CUET score + merit based", color:"#00008B", textColor:"#FFD700", seoTitle:"Delhi University CGPA Calculator 2026 | DU Grade", seoDescription:"Free Delhi University CGPA calculator. Calculate your DU grade and convert CGPA to percentage for job applications.", seoKeywords:["delhi university cgpa calculator","du gpa calculator","delhi university grade calculator","cuet merit calculator"] },
  { id:"manipal", name:"Manipal Academy of Higher Education", short:"MAHE", country:"india", city:"Manipal, Karnataka", gradingScaleId:"india-10-0", qsRank:751, hasAdmission:true, admissionNote:"MET score based", color:"#D40000", textColor:"#fff", seoTitle:"Manipal University CGPA Calculator 2026", seoDescription:"Calculate your Manipal University (MAHE) CGPA on the 10-point scale. Track semester results and attendance.", seoKeywords:["manipal cgpa calculator","mahe gpa calculator","manipal university grade calculator"] },
  { id:"anna-university", name:"Anna University", short:"AU", country:"india", city:"Chennai, Tamil Nadu", gradingScaleId:"india-10-0", qsRank:801, hasAdmission:true, admissionNote:"TNEA rank based", color:"#004080", textColor:"#fff", seoTitle:"Anna University CGPA Calculator 2026 | TNEA Merit", seoDescription:"Free Anna University CGPA calculator for Tamil Nadu engineering students. Track GPA and attendance.", seoKeywords:["anna university cgpa calculator","au gpa calculator","anna university grade calculator","tnea merit calculator"] },
  { id:"nit-trichy", name:"NIT Trichy", short:"NIT-T", country:"india", city:"Tiruchirappalli, Tamil Nadu", gradingScaleId:"india-10-0", qsRank:601, hasAdmission:true, admissionNote:"JEE Main rank based", color:"#8B0000", textColor:"#FFD700", seoTitle:"NIT Trichy CGPA Calculator 2026 | JEE Merit", seoDescription:"Free NIT Trichy CGPA calculator. Calculate semester GPA and convert to percentage for placement drives.", seoKeywords:["nit trichy cgpa calculator","nit trichy gpa calculator","nit trichy grade calculator"] },
  { id:"iit-roorkee", name:"IIT Roorkee", short:"IITR", country:"india", city:"Roorkee, Uttarakhand", gradingScaleId:"india-10-0", qsRank:369, hasAdmission:true, admissionNote:"JEE Advanced rank based", color:"#8B1A1A", textColor:"#fff", seoTitle:"IIT Roorkee CGPA Calculator 2026", seoDescription:"Free IIT Roorkee CGPA calculator on the 10-point scale. Track your semester GPA and academic progress.", seoKeywords:["iit roorkee cgpa calculator","iitr gpa calculator","iit roorkee grade calculator"] },
  { id:"srm", name:"SRM Institute of Science & Technology", short:"SRM", country:"india", city:"Chennai, Tamil Nadu", gradingScaleId:"india-10-0", qsRank:801, hasAdmission:true, admissionNote:"SRMJEEE score based", color:"#CC0000", textColor:"#fff", seoTitle:"SRM University CGPA Calculator 2026", seoDescription:"Calculate your SRM University CGPA. Track semester performance and convert to percentage for job applications.", seoKeywords:["srm cgpa calculator","srm university gpa calculator","srmjeee merit calculator"] },
  { id:"iit-hyderabad", name:"IIT Hyderabad", short:"IITH", country:"india", city:"Hyderabad, Telangana", gradingScaleId:"india-10-0", qsRank:520, hasAdmission:true, admissionNote:"JEE Advanced rank based", color:"#00274C", textColor:"#FFCB05", seoTitle:"IIT Hyderabad CGPA Calculator 2026", seoDescription:"Free IIT Hyderabad CGPA calculator. Calculate your 10-point scale GPA for engineering programs.", seoKeywords:["iit hyderabad cgpa calculator","iith gpa calculator","iit hyderabad grade calculator"] },
];

export function getUniById(id: string): WorldUniversity | undefined {
  return WORLD_UNIS.find(u => u.id === id);
}

export function getUnisByCountry(countryId: string): WorldUniversity[] {
  return WORLD_UNIS.filter(u => u.country === countryId);
}

export function getAllUniParams(): { country: string; university: string }[] {
  return WORLD_UNIS.map(u => ({ country: u.country, university: u.id }));
}
