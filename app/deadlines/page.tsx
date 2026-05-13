import type { Metadata } from "next";
import GlobalDeadlinePage from "@/app/components/GlobalDeadlinePage";
import { UNIS } from "@/lib/unis";
import { WORLD_UNIS } from "@/lib/globalUnis";

export const metadata: Metadata = {
  title: "Global University Admission Deadlines 2026 | Fall & Spring",
  description: "Check the latest application deadlines for universities worldwide. Find closing dates for Fall 2026 undergraduate and graduate admissions.",
  alternates: { canonical: "/deadlines" },
};

export default function DeadlinesPage() {
  const pkDeadlines = UNIS.map(u => ({
    uni: u.name,
    short: u.id,
    deadline: u.admissionDeadline || "TBA",
    countryId: "pakistan",
    countryName: "Pakistan",
    color: u.color
  }));

  const worldDeadlines = WORLD_UNIS.map(u => ({
    uni: u.name,
    short: u.id,
    deadline: (u as any).admissionDeadline || "TBA",
    countryId: u.country.toLowerCase(),
    countryName: u.country.toUpperCase(),
    color: u.color
  }));

  const allDeadlines = [...pkDeadlines, ...worldDeadlines];


  return (
    <GlobalDeadlinePage 
      deadlines={allDeadlines}
      countryName="Global"
      countryId=""
    />
  );
}
