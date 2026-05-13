import type { Metadata } from "next";
import AttendanceTrackerCalculator from "./Calculator";
import SEOSchema from "@/app/components/SEOSchema";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { BrutalContainer, BrutalCard } from "@/app/components/BrutalUI";

export const metadata: Metadata = {
  title: "Multi-Subject Attendance Tracker | Pakistan University Hub | Survive Uni",
  description: "Track attendance for all your university subjects at once. Know your bunk budget per subject for NUST, FAST, COMSATS and more. Auto-saved to your device for 2026 academic cycle.",
  alternates: { canonical: "/tools/attendance-tracker" },
  keywords: ["attendance tracker for students", "university attendance manager", "track bunk budget", "attendance planner pakistan"],
};

export default function Page() {
  return (
    <>
      <SEOSchema 
        type="SoftwareApplication" 
        data={{
          name: "University Attendance Tracker",
          description: "Manage multiple subjects, track total conducted classes, and calculate safe bunks for the entire semester."
        }} 
      />
      <SEOSchema 
        type="FAQPage" 
        data={{
          faqs: [
            {
              question: "Does this save my data?",
              answer: "Yes! Your attendance data is saved locally on your device (LocalStorage). No one else can see it, and it will be there when you come back."
            },
            {
              question: "Can I track multiple semesters?",
              answer: "Currently, you can track all subjects for your current semester. To start fresh, you can reset all data."
            }
          ]
        }} 
      />

      <div className="flex-1 pb-20">
        <AttendanceTrackerCalculator />

        <BrutalContainer maxWidth="max-w-2xl" className="mt-12">
          <Breadcrumbs items={[{ label: "Tools", href: "/" }, { label: "Attendance Tracker" }]} />
          
          <div className="mt-16 space-y-12">
            <section>
              <h2 className="text-3xl font-black uppercase mb-6 text-black dark:text-white underline decoration-4 decoration-[#FF90E8] underline-offset-8">
                Master Your Semester
              </h2>
              <div className="prose dark:prose-invert max-w-none font-medium text-black/70 dark:text-white/70 leading-relaxed">
                <p className="mb-4">
                  Tracking one subject is easy, but tracking 6 subjects with different class schedules can be a nightmare. Our **Multi-Subject Attendance Tracker** is designed for the high-pressure environments of Pakistani engineering and medical universities.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <BrutalCard variant="white" className="p-4 border-2 border-black">
                    <h3 className="font-black uppercase text-xs mb-2">Subject Wise Budget</h3>
                    <p className="text-xs">See exactly how many classes you can skip for Math vs. Physics independently.</p>
                  </BrutalCard>
                  <BrutalCard variant="white" className="p-4 border-2 border-black">
                    <h3 className="font-black uppercase text-xs mb-2 text-[#FF90E8]">Local Auto-Save</h3>
                    <p className="text-xs">Close the tab, restart your phone—your data stays safe in your browser.</p>
                  </BrutalCard>
                </div>
              </div>
            </section>

            <section className="bg-zinc-900 text-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_#FF90E8]">
              <h2 className="text-2xl font-black uppercase mb-6 text-[#FF90E8]">Semester Planning</h2>
              <p className="text-sm font-bold text-white/70 leading-relaxed mb-6">
                For a typical 18-week semester in Pakistan, excluding mid-terms and finals, you have roughly 15 weeks of teaching. 
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#FF90E8] border-2 border-white flex items-center justify-center font-black text-black">15</div>
                  <p className="text-xs font-bold uppercase tracking-widest">Weeks of Teaching</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center font-black text-black">45</div>
                  <p className="text-xs font-bold uppercase tracking-widest">Classes per 3-credit course</p>
                </div>
              </div>
            </section>

            <section className="mt-12 text-center">
              <p className="text-sm font-black uppercase tracking-tighter text-black/40 dark:text-white/40 mb-4">
                Used by students at
              </p>
              <div className="flex flex-wrap justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                <span className="text-xs font-bold uppercase">NUST</span>
                <span className="text-xs font-bold uppercase">FAST</span>
                <span className="text-xs font-bold uppercase">GIKI</span>
                <span className="text-xs font-bold uppercase">LUMS</span>
                <span className="text-xs font-bold uppercase">COMSATS</span>
              </div>
            </section>
          </div>
        </BrutalContainer>
      </div>
    </>
  );
}
