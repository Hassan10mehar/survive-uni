import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "./components/ThemeProvider";
import CookieBanner from "./components/CookieBanner";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://surviveuni.online'),
  title: {
    default: "Survive Uni — Global Academic Tools & Admission Calculators",
    template: "%s | Survive Uni"
  },
  description:
    "Universal GPA & Merit Calculators for top universities worldwide. Track attendance, calculate aggregates, and predict your grades for 2026-2027 with no login required.",
  keywords: [
    "GPA Calculator", "University Merit Calculator", "Admission Predictor", 
    "Ivy League Aggregate", "UCAS Points Calculator", "NUST Aggregate Calculator",
    "Calculate GPA", "University Admission 2026", "Global Scholarship Hub",
    "Semester GPA Tracker", "CGPA to Percentage", "Attendance Tracker"
  ],
  authors: [{ name: "Survive Uni Team" }],
  creator: "Survive Uni",
  publisher: "Survive Uni",
  robots: { index: true, follow: true },
  alternates: {
    canonical: '/',
  },
  verification: {
    google: "googled22169675e6a0a2e", 
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ['my-email', 'my-link'],
    },
  },
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Survive Uni — Global Academic Tools & Admission Calculators",
    description: "Official GPA, CGPA, Aggregate & Merit calculators for top universities worldwide. Fast, accurate, and free.",
    type: "website",
    url: "https://surviveuni.online",
    siteName: "Survive Uni",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.svg",
        width: 1200,
        height: 630,
        alt: "Survive Uni — Global Academic Tools & Admission Calculators",
      },
    ],
  },
  twitter: {
    title: "Survive Uni — Global University Tools & Calculators",
    description: "Universal GPA, CGPA, Aggregate, Bunk & Pass Predictor calculators for top global universities.",
    creator: "@surviveuni",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Survive Uni",
  "url": "https://surviveuni.online",
  "description": "Global academic tools and guides for students",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://surviveuni.online/guides?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PanicButton from "./components/PanicButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} h-full`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google AdSense - Replace YOUR_CLIENT_ID with your actual publisher ID */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_CLIENT_ID"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="min-h-full bg-base dark:bg-zinc-950 text-black dark:text-white antialiased transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <PanicButton />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
