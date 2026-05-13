import type { Metadata } from "next";
import SafeBunkCalculator from "./Calculator";
import SEOSchema from "@/app/components/SEOSchema";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { BrutalContainer, BrutalCard } from "@/app/components/BrutalUI";

export const metadata: Metadata = {
  title: "Safe Bunk Calculator Pakistan | University Attendance Budget | Survive Uni",
  description: "Calculate how many classes you can safely skip (bunk) while maintaining 75% or 80% attendance. Supports NUST, FAST, UET, and all Pakistani universities.",
  alternates: { canonical: "/tools/safe-bunk" },
  keywords: ["safe bunk calculator", "attendance budget calculator", "75 percent attendance calculator", "how many classes can i skip"],
};

export default function Page() {
  return (
    <>
      <SEOSchema 
        type="SoftwareApplication" 
        data={{
          name: "Safe Bunk & Attendance Calculator",
          description: "A tool for Pakistani university students to manage their attendance budget and avoid getting barred from exams."
        }} 
      />
      <SEOSchema 
        type="FAQPage" 
        data={{
          faqs: [
            {
              question: "How many classes can I skip for 75% attendance?",
              answer: "If you have 40 total classes, you must attend 30. This means you have a budget of 10 safe bunks."
            },
            {
              question: "What happens if I fall below 75% attendance in Pakistan?",
              answer: "Most universities like NUST and UET will bar you from sitting in the final examination (Shortage of Attendance), leading to an F grade."
            }
          ]
        }} 
      />

      <div className="flex-1 pb-20">
        <SafeBunkCalculator />

        <BrutalContainer maxWidth="max-w-2xl" className="mt-12">
          <Breadcrumbs items={[{ label: "Tools", href: "/" }, { label: "Safe Bunk" }]} />
          
          <div className="mt-16 space-y-12">
            <section>
              <h2 className="text-3xl font-black uppercase mb-6 text-black dark:text-white underline decoration-4 decoration-[#FFDF00] underline-offset-8">
                The Art of the Safe Bunk
              </h2>
              <div className="prose dark:prose-invert max-w-none font-medium text-black/70 dark:text-white/70 leading-relaxed">
                <p className="mb-4">
                  University life in Pakistan is a balancing act between academics, societies, and sleep. The **Safe Bunk Calculator** helps you manage your attendance professionally so you never face a "Shortage of Attendance" notice.
                </p>
                <BrutalCard variant="white" className="p-6 mb-6">
                  <h3 className="font-black uppercase text-sm mb-2">The 75% Rule</h3>
                  <p className="text-sm">Standard across most public and private sector universities (NUST, UET, PU, COMSATS).</p>
                </BrutalCard>
                <BrutalCard variant="black" className="p-6 text-white border-[#FFDF00] border-2">
                  <h3 className="font-black uppercase text-sm mb-2 text-[#FFDF00]">The 80% Rule</h3>
                  <p className="text-sm font-bold text-[#FFDF00]">Common in stricter institutions like FAST-NUCES. One extra bunk can be the difference between a degree and a repeat.</p>
                </BrutalCard>
              </div>
            </section>

            <section className="bg-[#FFDF00] p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black uppercase mb-6 text-black">How Attendance is Calculated</h2>
              <p className="text-sm font-bold text-black/70 leading-relaxed mb-4">
                Attendance is calculated per subject. If a course has 3 credit hours, you usually have 3 classes a week (approx 42-45 classes a semester).
              </p>
              <ul className="list-disc pl-6 text-sm font-bold text-black/80 space-y-2">
                <li><strong>75% Target:</strong> You can miss roughly 1 in every 4 classes.</li>
                <li><strong>80% Target:</strong> You can miss roughly 1 in every 5 classes.</li>
              </ul>
            </section>

            <section className="mt-12">
              <BrutalCard variant="white" className="p-8 text-center border-4 border-black">
                <p className="font-black text-sm uppercase mb-4">Pro Tip for Students</p>
                <p className="text-sm text-black/60 italic mb-0">
                  &quot;Always keep 1-2 bunks in reserve for medical emergencies or unannounced quizzes. Don&apos;t exhaust your budget in the first month!&quot;
                </p>
              </BrutalCard>
            </section>
          </div>
        </BrutalContainer>
      </div>
    </>
  );
}
