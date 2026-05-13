import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCountryById } from "@/lib/countries";
import { getUniById, getAllUniParams } from "@/lib/globalUnis";
import { UNIS } from "@/lib/unis";
import SEOSchema from "@/app/components/SEOSchema";
import AttendanceTrackerCalculator from "@/app/tools/attendance-tracker/Calculator";
import { BrutalContainer } from "@/app/components/BrutalUI";

export function generateStaticParams() {
  const global = getAllUniParams().map(p => ({ country: p.country, university: p.university }));
  const pk = UNIS.map(u => ({ country: "pakistan", university: u.id }));
  return [...global, ...pk];
}

export async function generateMetadata({ params }: { params: Promise<{ country: string; university: string }> }): Promise<Metadata> {
  const { country: countryId, university: uniId } = await params;
  const country = getCountryById(countryId);
  const uni = getUniById(uniId) || (countryId === "pakistan" ? UNIS.find(u => u.id === uniId) : undefined);
  if (!uni || !country) return { title: "Not Found" };
  const uniName = (uni as any).name;
  const isPK = countryId === "pakistan";
  const toolName = isPK ? "Bunk Tracker" : "Attendance Tracker";
  const title = `${uniName} ${toolName} 2026 | Class Skip Calculator`;
  const desc = `Free ${uniName} attendance tracker. Know exactly how many classes you can skip before falling below ${country.attendanceMin}% and plan your semester smartly.`;
  return {
    title, description: desc,
    keywords: [
      `${uniName.toLowerCase()} attendance tracker`,
      `${uniName.toLowerCase()} bunk calculator`,
      `${uniId} class skip calculator`,
      `${uniName.toLowerCase()} attendance percentage`,
    ],
    alternates: { canonical: `/${countryId}/${uniId}/attendance-tracker` },
  };
}

export default async function UniAttendancePage({ params }: { params: Promise<{ country: string; university: string }> }) {
  const { country: countryId, university: uniId } = await params;
  const country = getCountryById(countryId);
  const uni = getUniById(uniId) || (countryId === "pakistan" ? UNIS.find(u => u.id === uniId) : undefined);
  if (!country || !uni) notFound();

  const uniName = (uni as any).name;
  const isPK = countryId === "pakistan";
  const context = isPK ? "pk" : "global";

  return (
    <>
      <SEOSchema type="SoftwareApplication" data={{ name: `${uniName} Attendance Tracker`, description: `Track attendance and skip limits for ${uniName} students.` }} />
      <SEOSchema type="BreadcrumbList" data={{ items: [
        { position: 1, name: "Home", item: "https://surviveuni.online" },
        { position: 2, name: country.name, item: `https://surviveuni.online/${countryId}` },
        { position: 3, name: uniName, item: `https://surviveuni.online/${countryId}/${uniId}` },
        { position: 4, name: "Attendance Tracker", item: `https://surviveuni.online/${countryId}/${uniId}/attendance-tracker` },
      ]}} />

      <div className="bg-black border-b-4 border-black px-4 py-2">
        <nav className="max-w-4xl mx-auto flex items-center gap-2 text-[10px] font-black uppercase text-[#FFDF00]/60">
          <Link href="/" className="hover:text-[#FFDF00]">Home</Link><span>/</span>
          <Link href={`/${countryId}`} className="hover:text-[#FFDF00]">{country.emoji} {country.name}</Link><span>/</span>
          <Link href={`/${countryId}/${uniId}`} className="hover:text-[#FFDF00]">{uniName}</Link><span>/</span>
          <span className="text-[#FFDF00]">{isPK ? "Bunk Tracker" : "Attendance Tracker"}</span>
        </nav>
      </div>

      <AttendanceTrackerCalculator context={context} />

      <BrutalContainer maxWidth="max-w-3xl" className="mt-8 mb-24 space-y-8">
        <section>
          <h2 className="text-2xl font-black uppercase mb-4 underline decoration-4 decoration-[#FFDF00] underline-offset-8">
            Attendance Policy at {uniName}
          </h2>
          <div className="border-4 border-black p-6 bg-white dark:bg-zinc-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-bold text-sm leading-relaxed">
              Most courses at {uniName} require a minimum of <strong>{country.attendanceMin}% attendance</strong>.
              This tracker updates in real time, showing exactly how many more classes you can miss before penalties apply.
              Set your target percentage above to match your specific course policy.
            </p>
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-black uppercase mb-4">FAQs</h2>
          <div className="space-y-3">
            {[
              { q: `What is the minimum attendance at ${uniName}?`, a: `The standard minimum is ${country.attendanceMin}% at most ${country.name} universities. Some departments may require 80–85%. Always verify with your course handbook.` },
              { q: "What happens if I fall below minimum attendance?", a: "You may be debarred from sitting the final exam, receive an automatic F, or be required to repeat the course. The exact penalty varies by institution and department." },
            ].map(({ q, a }) => (
              <div key={q} className="border-4 border-black p-5 bg-white dark:bg-zinc-900">
                <h3 className="font-black text-xs uppercase mb-2">{q}</h3>
                <p className="text-xs font-medium leading-relaxed opacity-70">{a}</p>
              </div>
            ))}
          </div>
        </section>
        <Link href={`/${countryId}/${uniId}`} className="inline-flex items-center gap-2 border-4 border-black px-5 py-2 font-black text-xs uppercase bg-white dark:bg-zinc-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
          ← All {uniName} Tools
        </Link>
      </BrutalContainer>
    </>
  );
}
