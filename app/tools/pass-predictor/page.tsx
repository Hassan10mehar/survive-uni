import type { Metadata } from "next";
import PassPredictorCalculator from "./Calculator";
import SEOSchema from "@/app/components/SEOSchema";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import { BrutalContainer, BrutalCard } from "@/app/components/BrutalUI";

export const metadata: Metadata = {
  title: "Pass Predictor Calculator | Final Exam Score Predictor | Survive Uni",
  description: "Calculate how many marks you need in your final exam to pass a course. Predict your final grade based on sessional marks (quizzes, mids, assignments).",
  alternates: { canonical: "/tools/pass-predictor" },
  keywords: ["pass predictor", "final exam marks needed", "how many marks to pass", "sessional marks calculator pakistan"],
};

export default function Page() {
  return (
    <>
      <SEOSchema 
        type="SoftwareApplication" 
        data={{
          name: "University Pass Predictor",
          description: "Calculate the exact score needed in final examinations based on sessional weightage and current marks."
        }} 
      />
      <SEOSchema 
        type="FAQPage" 
        data={{
          faqs: [
            {
              question: "How are sessional marks weighted in Pakistan?",
              answer: "Most Pakistani universities (NUST, FAST, UET) use a 50/50 or 40/60 split between sessional (internal) and final exam marks."
            },
            {
              question: "What is the minimum passing marks in Pakistani universities?",
              answer: "Usually, the passing threshold is 50% overall. However, some courses might have a 'final-only' passing threshold (e.g., must score 40% in final to pass overall)."
            }
          ]
        }} 
      />

      <div className="flex-1 pb-20">
        <PassPredictorCalculator />

        <BrutalContainer maxWidth="max-w-2xl" className="mt-12">
          <Breadcrumbs items={[{ label: "Tools", href: "/" }, { label: "Pass Predictor" }]} />
          
          <div className="mt-16 space-y-12">
            <section>
              <h2 className="text-3xl font-black uppercase mb-6 text-black dark:text-white underline decoration-4 decoration-[#FF90E8] underline-offset-8">
                Predict Your Academic Fate
              </h2>
              <div className="prose dark:prose-invert max-w-none font-medium text-black/70 dark:text-white/70 leading-relaxed">
                <p className="mb-4">
                  The final exam week is the most stressful time for any student. The **Pass Predictor** removes the guesswork by showing you the exact target you need to hit in your finals to survive the semester.
                </p>
                <BrutalCard variant="white" className="p-6 mb-6">
                  <h3 className="font-black uppercase text-sm mb-2">Weightage Awareness</h3>
                  <p className="text-sm italic">&quot;If you scored 40/50 in sessionals, you only need 10/50 in finals to hit the 50% passing mark. You&apos;re safe!&quot;</p>
                </BrutalCard>
              </div>
            </section>

            <section className="bg-black text-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_#FF90E8]">
              <h2 className="text-2xl font-black uppercase mb-6 text-[#FF90E8]">Final Exam Strategies</h2>
              <p className="text-sm font-bold text-white/70 leading-relaxed mb-6">
                Depending on your sessional performance, you should adopt one of these three strategies:
              </p>
              <div className="space-y-6">
                <div>
                  <p className="font-black text-sm uppercase text-[#00FFC2]">1. Maintenance Mode</p>
                  <p className="text-xs text-white/60">Sessionals 80%+: You already passed. Focus on other tough subjects.</p>
                </div>
                <div>
                  <p className="font-black text-sm uppercase text-[#FFDF00]">2. Grade Chasing</p>
                  <p className="text-xs text-white/60">Sessionals 60-70%: You need a solid final score to secure an A or B+.</p>
                </div>
                <div>
                  <p className="font-black text-sm uppercase text-[#FF4911]">3. Survival Mode</p>
                  <p className="text-xs text-white/60">Sessionals Below 50%: You need to score near-perfect in finals to pass.</p>
                </div>
              </div>
            </section>

            <section className="mt-12 text-center">
              <p className="text-xs font-black uppercase tracking-widest text-black/30 dark:text-white/30">
                Calculated using standard HEC weightage principles.
              </p>
            </section>
          </div>
        </BrutalContainer>
      </div>
    </>
  );
}
