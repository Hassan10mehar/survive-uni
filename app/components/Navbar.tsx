"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Globe, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { COUNTRIES } from "@/lib/countries";

interface NavLink { href: string; label: string; }

const TOOLS: NavLink[] = [
  { href: "/tools/gpa-calculator",      label: "GPA Calc" },
  { href: "/tools/aggregate-calculator", label: "Merit Hub" },
  { href: "/tools/safe-bunk",           label: "Safe Bunk" },
  { href: "/tools/attendance-tracker",  label: "Attendance" },
  { href: "/scholarships",              label: "Scholarships" },
  { href: "/deadlines",                 label: "Deadlines" },
];

const NAV_LINKS: NavLink[] = [
  { href: "/",           label: "Home" },
  { href: "/guides",     label: "Guides" },
  { href: "/scholarships",label: "Scholarships" },
  { href: "/deadlines",  label: "Deadlines" },
  { href: "/about",      label: "About" },
  { href: "/contact",    label: "Contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen]           = useState(false);
  const [countriesOpen, setCountriesOpen]   = useState(false);
  const pathname = usePathname();

  return (
    <>
      <nav className="border-b-4 border-black dark:border-white bg-black text-[#FFDF00] px-4 sm:px-6 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex-1 lg:flex-none">
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <Image src="/logo.svg" alt="Survive Uni Logo" width={180} height={50} className="h-10 w-auto transition-transform group-hover:scale-105" />
            </Link>
          </div>

          {/* Desktop Nav - Centered */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className={`px-4 py-2 font-black text-sm uppercase tracking-widest transition-all hover:bg-[#FFDF00] hover:text-black rounded-sm ${pathname === link.href ? "bg-[#FFDF00] text-black" : "text-[#FFDF00]"}`}>
                {link.label}
              </Link>
            ))}

            {/* Tools Dropdown */}
            <div className="relative ml-2" onMouseEnter={() => setToolsOpen(true)} onMouseLeave={() => setToolsOpen(false)}>
              <button className={`flex items-center gap-2 px-4 py-2 font-black text-sm uppercase tracking-widest transition-all rounded-sm hover:bg-[#FFDF00] hover:text-black ${toolsOpen ? "bg-[#FFDF00] text-black" : "text-[#FFDF00]"}`}>
                Tools <ChevronDown className={`w-4 h-4 transition-transform ${toolsOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {toolsOpen && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-black border-4 border-[#FFDF00] shadow-[12px_12px_0px_0px_#FFDF00] z-50 overflow-hidden">
                    <div className="p-3 bg-[#FFDF00] text-black font-black text-xs uppercase tracking-tighter border-b-4 border-black">Academic Power Tools</div>
                    <div className="grid grid-cols-1 divide-y-2 divide-[#FFDF00]/20">
                      {TOOLS.map((t) => (
                        <Link key={t.href} href={t.href}
                          className={`px-5 py-4 font-black text-xs uppercase tracking-widest hover:bg-[#FFDF00] hover:text-black transition-all group relative flex items-center justify-between ${pathname?.startsWith(t.href) ? "bg-[#FFDF00]/20" : "text-[#FFDF00]"}`}>
                          {t.label}
                          <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 🌍 Country Switcher Dropdown */}
            <div className="relative ml-2" onMouseEnter={() => setCountriesOpen(true)} onMouseLeave={() => setCountriesOpen(false)}>
              <button className={`flex items-center gap-2 px-4 py-2 font-black text-sm uppercase tracking-widest transition-all rounded-sm hover:bg-[#FFDF00] hover:text-black ${countriesOpen ? "bg-[#FFDF00] text-black" : "text-[#FFDF00]"}`}>
                <Globe className="w-4 h-4" /> Global <ChevronDown className={`w-4 h-4 transition-transform ${countriesOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {countriesOpen && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-96 bg-black border-4 border-[#FFDF00] shadow-[12px_12px_0px_0px_#FFDF00] z-50 overflow-hidden">
                    <div className="p-3 bg-[#FFDF00] text-black font-black text-xs uppercase tracking-tighter border-b-4 border-black flex items-center gap-2">
                      <Globe className="w-4 h-4" /> Tools by Country
                    </div>
                    <div className="divide-y-2 divide-[#FFDF00]/20">
                      <div className="grid grid-cols-1 divide-y-2 divide-[#FFDF00]/20">
                        {COUNTRIES.map((c) => {
                          const isActive = pathname.startsWith(`/${c.id}`);
                          return (
                            <Link key={c.id} href={`/${c.id}`}
                              className={`flex items-center gap-4 px-5 py-4 font-black text-xs uppercase tracking-widest hover:bg-[#FFDF00] hover:text-black transition-all group ${isActive ? "bg-[#FFDF00]/20 text-[#FFDF00]" : "text-[#FFDF00]"}`}>
                              <span className="text-2xl">{c.emoji}</span>
                              <div className="flex-1">
                                <p className="leading-none mb-1">{c.name}</p>
                                <p className="font-medium normal-case text-[10px] opacity-50">{c.seoKeywords[0]}</p>
                              </div>
                              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                            </Link>
                          );
                        })}
                      </div>
                      <Link href="/global/gpa-calculator"
                        className="flex items-center gap-4 px-5 py-4 font-black text-xs uppercase tracking-widest text-[#FFDF00] hover:bg-[#FFDF00] hover:text-black transition-all group bg-zinc-900/50">
                        <span className="text-2xl">🌍</span>
                        <div className="flex-1">
                          <p className="leading-none mb-1">Global GPA Hub</p>
                          <p className="font-medium normal-case text-[10px] opacity-50">Compare grading systems worldwide</p>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Actions Right */}
          <div className="flex-1 lg:flex-none flex items-center justify-end gap-4">
            <ThemeToggle />
            <button className="lg:hidden border-4 border-[#FFDF00] w-12 h-12 flex items-center justify-center bg-black hover:bg-[#FFDF00] group transition-colors shadow-[4px_4px_0px_0px_#FFDF00] active:shadow-none active:translate-x-1 active:translate-y-1" onClick={() => setMobileMenuOpen(o => !o)}>
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#FFDF00] group-hover:text-black" /> : <Menu className="w-6 h-6 text-[#FFDF00] group-hover:text-black" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween" }}
            className="lg:hidden fixed inset-0 z-[60] bg-black flex flex-col">
            <div className="border-b-4 border-black bg-black text-[#FFDF00] px-4 py-3 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Image src="/logo.svg" alt="Survive Uni Logo" width={140} height={40} className="h-8 w-auto" />
              </Link>
              <button className="w-9 h-9 flex items-center justify-center border-2 border-[#FFDF00]/50" onClick={() => setMobileMenuOpen(false)}>
                <X className="w-4 h-4 text-[#FFDF00]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-8">
              {/* Nav Links */}
              <div className="flex flex-col gap-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Navigation</p>
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                    className={`text-3xl font-black uppercase tracking-tighter ${pathname === link.href ? "text-[#FFDF00]" : "text-white"}`}>
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* 🌍 Country Switcher (Mobile) */}
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40 flex items-center gap-2">
                  <Globe className="w-3 h-3" /> Universities by Country
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {COUNTRIES.map((c) => (
                    <Link key={c.id} href={`/${c.id}`} onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-3 border-2 border-[#FFDF00] font-black text-[10px] uppercase tracking-widest text-[#FFDF00] hover:bg-[#FFDF00] hover:text-black transition-all">
                      <span>{c.emoji}</span> {c.name}
                    </Link>
                  ))}
                  <Link href="/global/gpa-calculator" onClick={() => setMobileMenuOpen(false)}
                    className="col-span-2 flex items-center gap-2 px-3 py-3 border-2 border-[#FFDF00]/50 font-black text-[10px] uppercase tracking-widest text-[#FFDF00]/70">
                    🌍 All Grading Systems
                  </Link>
                </div>
              </div>

              {/* Tools Suite (Mobile) */}
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Tools Suite</p>
                <div className="grid grid-cols-2 gap-2">
                  {TOOLS.map((t) => (
                    <Link key={t.href} href={t.href} onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 border-2 border-[#FFDF00] font-black text-[10px] uppercase tracking-widest shadow-[4px_4px_0px_0px_#FFDF00] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all ${pathname?.startsWith(t.href) ? "bg-[#FFDF00] text-black" : "bg-black text-[#FFDF00]"}`}>
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
