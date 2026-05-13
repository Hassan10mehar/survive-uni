export interface Deadline {
  uni: string;
  short: string;
  test: string;
  deadline: string;
  status: "OPEN" | "UPCOMING" | "CLOSED";
  merit: string;
  color: string;
  link?: string;
}

export const DEADLINES: Deadline[] = [
  {
    uni: "Harvard University (USA)",
    short: "Harvard",
    test: "Common App",
    deadline: "January 1, 2026",
    status: "CLOSED",
    merit: "Acceptance Rate ~ 3.4%",
    color: "#A51C30",
    link: "https://college.harvard.edu/admissions"
  },
  {
    uni: "UCAS (United Kingdom)",
    short: "UCAS",
    test: "Undergraduate Entry",
    deadline: "January 26, 2026",
    status: "CLOSED",
    merit: "Varies by University",
    color: "#0055A4",
    link: "https://www.ucas.com/"
  },
  {
    uni: "MIT (USA)",
    short: "MIT",
    test: "MIT Early Action",
    deadline: "November 1, 2026",
    status: "UPCOMING",
    merit: "STEM Excellence",
    color: "#A31F34",
    link: "https://mitadmissions.org/"
  },
  {
    uni: "NUST (National University of Sciences & Technology)",
    short: "NUST",
    test: "NET Series 2",
    deadline: "February 28, 2026",
    status: "OPEN",
    merit: "CS closing merit ~ 80.5%",
    color: "#FF90E8",
    link: "https://ugadmissions.nust.edu.pk/"
  },
  {
    uni: "FAST (NUCES)",
    short: "FAST",
    test: "NU Online Test",
    deadline: "July 5, 2026",
    status: "UPCOMING",
    merit: "CS closing merit ~ 73.2% (Lahore)",
    color: "#00FFC2",
    link: "https://admissions.nu.edu.pk/"
  },
  {
    uni: "UET Lahore",
    short: "UET",
    test: "ECAT",
    deadline: "March 15, 2026",
    status: "OPEN",
    merit: "Software Eng closing merit ~ 78.1%",
    color: "#4A90E2",
    link: "https://admission.uet.edu.pk/"
  },
  {
    uni: "GIKI (Top Engineering Institute)",
    short: "GIKI",
    test: "Admission Test",
    deadline: "June 20, 2026",
    status: "UPCOMING",
    merit: "CS closing merit ~ 82%",
    color: "#FFDF00",
    link: "https://giki.edu.pk/admissions/"
  },
  {
    uni: "PIEAS (National Research University)",
    short: "PIEAS",
    test: "Admission Test",
    deadline: "July 15, 2026",
    status: "UPCOMING",
    merit: "Top 1% candidates",
    color: "#4A90E2",
    link: "https://admissions.pieas.edu.pk/"
  },
  {
    uni: "University of Oxford (UK)",
    short: "Oxford",
    test: "UCAS 2027 Entry",
    deadline: "October 15, 2026",
    status: "UPCOMING",
    merit: "High Academic Standard",
    color: "#002147",
    link: "https://www.ox.ac.uk/admissions"
  },
  {
    uni: "LUMS (SBASSE)",
    short: "LUMS",
    test: "SSE Entry Test / SAT",
    deadline: "April 10, 2027",
    status: "UPCOMING",
    merit: "Holistic Review",
    color: "#D4AF37",
    link: "https://admissions.lums.edu.pk/"
  }
];

