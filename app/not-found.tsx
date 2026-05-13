import Link from "next/link";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F4F4F0] flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Big 404 */}
        <div className="border-4 border-black bg-[#FF4911] p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] mb-8 inline-block">
          <Frown className="w-16 h-16 text-white mx-auto mb-2" />
          <p className="font-black text-8xl text-white leading-none">404</p>
        </div>

        <h1 className="font-black text-3xl uppercase text-black mb-3">Page Not Found</h1>
        <p className="font-semibold text-black/60 mb-8">
          This page doesn&apos;t exist. Maybe you mistyped the URL, or this calculator is for a university we haven&apos;t added yet.
        </p>

        {/* Quick links */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Link href="/tools/gpa-calculator" className="border-4 border-black bg-[#00FFC2] p-3 font-black text-sm uppercase text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
            GPA Calculator
          </Link>
          <Link href="/tools/cgpa-calculator" className="border-4 border-black bg-[#FF4911] p-3 font-black text-sm uppercase text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
            CGPA Calculator
          </Link>
          <Link href="/tools/aggregate-calculator" className="border-4 border-black bg-[#4A90E2] p-3 font-black text-sm uppercase text-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
            Aggregate Calc
          </Link>
          <Link href="/tools/cgpa-to-percentage" className="border-4 border-black bg-[#FFDF00] p-3 font-black text-sm uppercase text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
            CGPA → %
          </Link>
        </div>

        <Link href="/" className="inline-block border-4 border-black bg-black text-[#FFDF00] font-black text-sm uppercase px-6 py-3 hover:bg-[#FFDF00] hover:text-black transition-colors">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
