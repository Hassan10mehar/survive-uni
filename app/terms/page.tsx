"use client";

export default function TermsPage() {
  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-20">
      <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white p-6 sm:p-10 shadow-brutal dark:shadow-[8px_8px_0px_0px_white] prose prose-black dark:prose-invert max-w-none">
        <h1 className="font-black text-3xl sm:text-5xl uppercase tracking-tighter mb-8 text-black dark:text-white">
          Terms of Service
        </h1>
        
        <h2 className="font-black text-xl uppercase mb-4 mt-8 text-black dark:text-white">1. Acceptance of Terms</h2>
        <p className="font-medium text-black/80 dark:text-white/80 mb-4">
          By accessing and using Survive Uni (the "Website"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or tools.
        </p>

        <h2 className="font-black text-xl uppercase mb-4 mt-8 text-black dark:text-white">2. Educational & Estimation Purposes Only</h2>
        <p className="font-medium text-black/80 dark:text-white/80 mb-4">
          All tools, calculators, and content provided on Survive Uni are for <strong>estimation and educational purposes only</strong>. While we strive to use the most accurate and up-to-date formulas (such as HEC guidelines, UCAS standards, and specific university admission criteria), we make no guarantees regarding the absolute accuracy of the results.
        </p>
        <div className="bg-[#FFDF00] border-4 border-black p-4 mb-4 font-bold text-sm text-black">
          DISCLAIMER: Survive Uni is not affiliated with, endorsed by, or officially connected to any educational institution mentioned on the site. Always verify your grades, attendance, and merit aggregates with official university portals. For inquiries, contact hassan10mehar@gmail.com.
        </div>

        <h2 className="font-black text-xl uppercase mb-4 mt-8 text-black dark:text-white">3. Limitation of Liability</h2>
        <p className="font-medium text-black/80 dark:text-white/80 mb-4">
          Under no circumstances shall Survive Uni, its creators, or affiliates be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of the Website. If you fail a class, get debarred due to low attendance, or do not meet merit criteria, we are not legally responsible. Use the tools at your own discretion.
        </p>

        <h2 className="font-black text-xl uppercase mb-4 mt-8 text-black dark:text-white">4. User Conduct</h2>
        <p className="font-medium text-black/80 dark:text-white/80 mb-4">
          You agree to use the Website only for lawful purposes. You are prohibited from violating or attempting to violate the security of the Website, including accessing data not intended for you or attempting to probe, scan, or test the vulnerability of the system.
        </p>

        <h2 className="font-black text-xl uppercase mb-4 mt-8 text-black dark:text-white">5. Modifications</h2>
        <p className="font-medium text-black/80 dark:text-white/80 mb-4">
          Survive Uni reserves the right to revise these Terms of Service at any time without notice. By using this website, you are agreeing to be bound by the then-current version of these Terms of Service.
        </p>
      </div>
    </div>
  );
}
