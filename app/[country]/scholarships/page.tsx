import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryById, COUNTRIES } from "@/lib/countries";
import { getUnisByCountry } from "@/lib/globalUnis";
import { UNIS } from "@/lib/unis";
import GlobalScholarshipPage from "@/app/components/GlobalScholarshipPage";
import { SCHOLARSHIPS } from "@/lib/scholarships";

export function generateStaticParams() {
  return COUNTRIES.map(c => ({ country: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);
  if (!country) return { title: "Not Found" };
  
  const title = `${country.name} University Scholarships & Financial Aid 2026`;
  const desc = `Browse verified scholarships, grants, and financial aid for universities in ${country.name}. Find funding for undergraduate and graduate studies for the 2026 academic year.`;
  
  return {
    title,
    description: desc,
    alternates: { canonical: `/${countryId}/scholarships` },
  };
}

export default async function RegionalScholarshipsPage({ params }: { params: Promise<{ country: string }> }) {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);
  if (!country) notFound();

  // Get uni-specific scholarships
  const globalUnis = getUnisByCountry(countryId);
  const pkUnis = countryId === "pakistan" ? UNIS : [];
  
  const allUniScholarships = [
    ...globalUnis.flatMap(u => (u as any).scholarships || []),
    ...pkUnis.flatMap(u => (u as any).scholarships || [])
  ];

  // Merge with generic scholarships (filter by country if possible, or just show featured)
  const combined = [...allUniScholarships, ...SCHOLARSHIPS];

  return (
    <GlobalScholarshipPage 
      scholarships={combined}
      countryName={country.name}
      countryId={countryId}
    />
  );
}
