"use client";

import Link from "next/link";
import Image from "next/image";

const TOOL_LINKS = [
  { href: "/tools/gpa-calculator", label: "GPA Calculator" },
  { href: "/tools/cgpa-calculator", label: "CGPA Calculator" },
  { href: "/tools/aggregate-calculator", label: "Aggregate Calculator" },
  { href: "/tools/cgpa-to-percentage", label: "CGPA ↔ Percentage" },
  { href: "/tools/attendance-tracker", label: "Attendance Tracker" },
  { href: "/tools/safe-bunk", label: "Safe Bunk Calculator" },
  { href: "/tools/pass-predictor", label: "Pass Predictor" },
  { href: "/tools/ibcc-calculator", label: "IBCC Calculator" },
];

const GUIDE_LINKS = [
  { href: "/guides/how-to-get-into-ivy-league-2026", label: "Ivy League Roadmap" },
  { href: "/guides/uk-degree-classification-explained", label: "UK Grading Guide" },
  { href: "/guides/us-gpa-scale-explained", label: "US GPA Explained" },
  { href: "/guides/nust-net-aggregate-calculator-guide", label: "NUST NET Strategy" },
  { href: "/guides/university-attendance-rules-pakistan", label: "Attendance Hacks" },
  { href: "/guides/how-to-calculate-gpa-manually", label: "Manual GPA Calc" },
];


export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-black text-[#F4F4F0] px-4 sm:px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Logo + tagline */}
        <div className="flex items-center gap-2 mb-4">
          <Image 
            src="/logo.svg" 
            alt="Survive Uni Logo" 
            width={280} 
            height={70} 
            className="h-14 w-auto" 
          />
        </div>
        <p className="text-sm text-[#F4F4F0]/50 mb-8 max-w-md">
          Free academic tools built for students worldwide. No login required. Works offline. Auto-saves your data.
        </p>

        {/* 4-column link grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-white/10 pt-8 mb-8">
          <div>
            <h3 className="text-[#FFDF00] font-black text-xs uppercase tracking-widest mb-4">Tools</h3>
            <div className="flex flex-col gap-2">
              {TOOL_LINKS.slice(0, 4).map(l => (
                <Link key={l.href} href={l.href} className="text-xs font-bold text-white/50 hover:text-[#FFDF00] transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[#FFDF00] font-black text-xs uppercase tracking-widest mb-4">More Tools</h3>
            <div className="flex flex-col gap-2">
              {TOOL_LINKS.slice(4).map(l => (
                <Link key={l.href} href={l.href} className="text-xs font-bold text-white/50 hover:text-[#FFDF00] transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[#FFDF00] font-black text-xs uppercase tracking-widest mb-4">Guides</h3>
            <div className="flex flex-col gap-2">
              {GUIDE_LINKS.map(l => (
                <Link key={l.href} href={l.href} className="text-xs font-bold text-white/50 hover:text-[#FFDF00] transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[#FFDF00] font-black text-xs uppercase tracking-widest mb-4">Company</h3>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="text-xs font-bold text-white/50 hover:text-[#FFDF00] transition-colors">About Us</Link>
              <Link href="/contact" className="text-xs font-bold text-white/50 hover:text-[#FFDF00] transition-colors">Contact</Link>
              <Link href="/guides" className="text-xs font-bold text-white/50 hover:text-[#FFDF00] transition-colors">All Guides</Link>
              <Link href="/deadlines" className="text-xs font-bold text-white/50 hover:text-[#FFDF00] transition-colors">Deadlines</Link>
              <Link href="/privacy-policy" className="text-xs font-bold text-white/50 hover:text-[#FFDF00] transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-xs font-bold text-white/50 hover:text-[#FFDF00] transition-colors">Terms</Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-white/30 font-medium">
            © {new Date().getFullYear()} Survive Uni · Not affiliated with any university · Calculations are estimates only.
          </p>
          <p className="text-xs text-white/30 font-medium italic">
            Made by <a href="https://hmgraphix.xyz" target="_blank" rel="noopener noreferrer" className="text-[#FFDF00] hover:underline">HMgraphix.xyz</a>
          </p>

        </div>
      </div>
    </footer>
  );
}
