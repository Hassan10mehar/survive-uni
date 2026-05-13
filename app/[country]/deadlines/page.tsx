import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryById, COUNTRIES } from "@/lib/countries";
import { getUnisByCountry } from "@/lib/globalUnis";
import { UNIS } from "@/lib/unis";
import GlobalDeadlinePage from "@/app/components/GlobalDeadlinePage";

export function generateStaticParams() {
  return COUNTRIES.map(c => ({ country: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);
  if (!country) return { title: "Not Found" };
  
  const title = `${country.name} University Admission Deadlines 2026`;
  const desc = `Latest admission closing dates for all top universities in ${country.name}. Find the last date to apply for Fall 2026 undergraduate and graduate programs.`;
  
  return {
    title,
    description: desc,
    alternates: { canonical: `/${countryId}/deadlines` },
  };
}

export default async function RegionalDeadlinesPage({ params }: { params: Promise<{ country: string }> }) {
  const { country: countryId } = await params;
  const country = getCountryById(countryId);
  if (!country) notFound();

  const globalUnis = getUnisByCountry(countryId).map(u => ({
    uni: u.name,
    short: u.id,
    deadline: (u as any).admissionDeadline || "TBA",
    countryId: countryId,
    countryName: country.name,
    color: u.color
  }));

  const pkUnis = countryId === "pakistan" ? UNIS.map(u => ({
    uni: u.name,
    short: u.id,
    deadline: u.admissionDeadline || "TBA",
    countryId: "pakistan",
    countryName: "Pakistan",
    color: u.color
  })) : [];
  
  const allDeadlines = [...globalUnis, ...pkUnis];

  return (
    <GlobalDeadlinePage 
      deadlines={allDeadlines}
      countryName={country.name}
      countryId={countryId}
    />
  );
}
