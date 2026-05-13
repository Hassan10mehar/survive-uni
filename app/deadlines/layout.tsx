import { Metadata } from "next";

export const metadata: Metadata = {
  title: "University Admission Deadlines 2026-2027 | Pakistan | Survive Uni",
  description: "Stay updated with the latest admission dates for NUST, FAST, GIKI, PIEAS, and other top Pakistani universities. 2026-2027 academic cycle tracking.",
  keywords: ["university deadlines", "admission dates Pakistan", "NUST admission 2026", "FAST admission 2026", "MDCAT dates 2026", "ECAT deadlines"],
};

export default function DeadlinesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
