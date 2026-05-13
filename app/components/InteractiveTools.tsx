"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, BookOpen, GraduationCap } from "lucide-react";
import AdmissionTracker from "./AdmissionTracker";

const tools = [
  {
    href: "/tools/aggregate-calculator",
    title: "Merit Hub",
    subtitle: "Global University Admission Hub",
    color: "#FF90E8",
    icon: Calculator,
    tag: "ADMISSIONS",
    emoji: "🏫",
  },
  {
    href: "/tools/safe-bunk",
    title: "Safe Bunk",
    subtitle: "Attendance Survival Tool",
    color: "#FF4911",
    icon: BookOpen,
    tag: "PANIC",
    emoji: "💤",
  },
  {
    href: "/tools/gpa-calculator",
    title: "GPA Tracker",
    subtitle: "Global Semester Tracking",
    color: "#00FFC2",
    icon: GraduationCap,
    tag: "SEMESTER",
    emoji: "⚖️",
  },
  {
    href: "/tools/cgpa-calculator",
    title: "CGPA Calc",
    subtitle: "Cumulative Average Hub",
    color: "#FFDF00",
    icon: Calculator,
    tag: "REQUIRED",
    emoji: "📊",
  },
  {
    href: "/scholarships",
    title: "Scholarships",
    subtitle: "Find Global Funding",
    color: "#4A90E2",
    icon: GraduationCap,
    tag: "FINANCIAL",
    emoji: "💰",
  },
];

const cardVariants = {
  initial: { y: 0, boxShadow: "8px 8px 0px 0px rgba(0,0,0,1)" },
  hover: {
    y: -6,
    boxShadow: "14px 14px 0px 0px rgba(0,0,0,1)",
    transition: { type: "tween" as const, duration: 0.15 },
  },
  tap: {
    y: 8,
    x: 8,
    boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)",
    transition: { type: "tween" as const, duration: 0.1 },
  },
};

export default function InteractiveTools() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
      <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">
        <Link href={tools[0].href} className="md:col-span-12 lg:col-span-12">
          <motion.div
            className="border-4 border-black dark:border-white p-10 sm:p-14 lg:p-16 cursor-pointer relative overflow-hidden h-full flex flex-col md:flex-row gap-10 items-center group"
            style={{ backgroundColor: tools[0].color }}
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <div className="flex-1 relative z-10">
              <span className="bg-black text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 border-4 border-black mb-6 inline-block shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
                {tools[0].tag}
              </span>
              <h2 className="font-black text-5xl sm:text-6xl lg:text-8xl uppercase text-black leading-[0.85] mb-6">
                {tools[0].title}
              </h2>
              <p className="font-bold text-black/80 text-xl lg:text-2xl mb-10 max-w-xl leading-relaxed">
                Official formulas for <span className="bg-white/30 px-2 border-2 border-black/10">US, UK, India & Pakistan</span> universities.
              </p>
              <div className="inline-flex items-center gap-3 bg-black text-white font-black text-sm uppercase px-8 py-4 border-4 border-black w-fit group-hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] transition-all">
                Start Calculating <ArrowRight className="w-5 h-5" />
              </div>
            </div>
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </motion.div>
        </Link>

        {tools.slice(1).map((tool) => {
          const Icon = tool.icon;
          return (
            <Link key={tool.href} href={tool.href} className="md:col-span-6 lg:col-span-6">
              <motion.div
                className="border-4 border-black dark:border-white p-8 cursor-pointer relative overflow-hidden h-full flex flex-col group"
                style={{ backgroundColor: tool.color }}
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-black flex items-center justify-center border-4 border-black group-hover:rotate-12 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-4xl">{tool.emoji}</span>
                </div>
                <h2 className="font-black text-2xl uppercase text-black leading-tight mb-2">
                  {tool.title}
                </h2>
                <p className="font-bold text-black/60 text-sm mb-6 flex-1">
                  {tool.subtitle}
                </p>
                <div className="flex items-center gap-2 font-black text-[10px] uppercase text-black group-hover:translate-x-2 transition-transform">
                  Open Tool <ArrowRight className="w-3 h-3" />
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>

      <div className="md:col-span-4 space-y-10">
        {/* Admission Tracker */}
        <div className="border-4 border-black dark:border-white bg-[#FFDF00] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black text-xl uppercase flex items-center gap-3">
              Admissions
            </h3>
            <div className="bg-black text-[#FFDF00] px-3 py-1 text-[8px] font-black uppercase border-2 border-black">Live</div>
          </div>
          <div className="flex-1 min-h-[300px]">
            <AdmissionTracker />
          </div>
          <Link href="/deadlines" className="mt-8 block text-center bg-black text-white py-3 font-black text-xs uppercase border-4 border-black hover:shadow-[4px_4px_0px_0px_rgba(255,223,0,1)] transition-all">
            All Deadlines
          </Link>
        </div>
      </div>
    </div>
  );
}
