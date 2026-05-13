"use client";

export default function AboutPage() {
  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-20">
      <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white p-6 sm:p-10 shadow-brutal dark:shadow-[8px_8px_0px_0px_white]">
        <h1 className="font-black text-4xl sm:text-7xl uppercase tracking-tighter mb-6 text-black dark:text-white">
          About Us
        </h1>
        <div className="bg-[#FFDF00] border-4 border-black p-4 mb-8">
          <p className="font-black text-sm text-black uppercase italic">
            "By students, for students. Because university is hard enough already."
          </p>
        </div>
        
        <div className="space-y-6 font-medium text-black/80 dark:text-white/80 text-lg leading-relaxed">
          <p>
            <strong>Survive Uni</strong> was built out of pure necessity. We realized that university students worldwide spend way too much time stressing over manual calculations: figuring out if they can afford to sleep in and skip that 8 AM class, or aggressively crunching numbers to see what they need to score in finals just to pass.
          </p>
          
          <p>
            While there are plenty of generic calculators out there, very few are actually tuned to the specific realities of modern educational systems—like the rigid attendance rules at top engineering schools, the strict 4.0 grading scales, and complex entry test aggregates for Ivy Leagues, NUST, UCAS, and beyond.
          </p>

          <h2 className="font-black text-2xl uppercase text-black dark:text-white pt-4">Global Mission, Local Accuracy</h2>
          <p>
            Accuracy is our top priority. Every calculator on Survive Uni is built using <strong>official institutional guidelines</strong> and university-specific handbooks. Our 2026/2027 Merit Predictors and GPA tools are verified against the latest formulas from the US, UK, Pakistan, and India.
          </p>

          <p>
            <strong>Privacy Matters:</strong> We believe your academic records are personal. That's why Survive Uni works entirely in your browser. We don't save your data to any server—everything stays on your device.
          </p>

          <h2 className="font-black text-2xl uppercase text-black dark:text-white pt-4">Our Mission</h2>
          <p>
            Our mission is simple: provide fast, accurate, and completely free utility tools for students globally. No sign-ups, no paywalls, and absolutely no BS. Just the numbers you need to survive university and plan your academic career.
          </p>

          <p className="font-bold border-l-4 border-[#FFDF00] pl-4 py-2 bg-zinc-50 dark:bg-zinc-800/50 italic text-sm">
            For feedback, university formula updates, or general inquiries, contact our team at <a href="mailto:hassan10mehar@gmail.com" className="text-[#4A90E2] underline hover:text-black dark:hover:text-white">hassan10mehar@gmail.com</a>.
          </p>

          <div className="mt-8 p-4 bg-black text-[#FFDF00] border-4 border-black dark:border-white">
            <p className="font-black text-sm uppercase tracking-widest text-center">
              Built for the students, by the students. Global Hub 2026.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
