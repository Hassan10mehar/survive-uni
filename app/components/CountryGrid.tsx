"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COUNTRIES } from "@/lib/countries";
import { ArrowRight } from "lucide-react";

const cardVariants = {
  initial: { y: 0, boxShadow: "6px 6px 0px 0px rgba(0,0,0,1)" },
  hover: {
    y: -4,
    boxShadow: "10px 10px 0px 0px rgba(0,0,0,1)",
    transition: { type: "tween", duration: 0.15 },
  },
};

export default function CountryGrid() {
  return (
    <section className="space-y-12">
      <div className="border-b-8 border-black dark:border-white pb-8">
        <h2 className="font-black text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tighter text-black dark:text-white">
          Global <span className="text-[#FF90E8]">Hubs</span>
        </h2>
        <p className="font-bold text-lg sm:text-xl text-black/50 dark:text-white/40 uppercase mt-4">
          Select your region for localized tools & admission guides
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {COUNTRIES.map((country) => (
          <Link key={country.id} href={`/${country.id}`} className="group">
            <motion.div
              className="border-4 border-black dark:border-white p-8 h-full flex flex-col justify-between group cursor-pointer"
              style={{ backgroundColor: country.color }}
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
            >
              <div>
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">
                  {country.emoji}
                </div>
                <h3 className="font-black text-3xl uppercase text-white leading-none mb-2 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                  {country.name}
                </h3>
                <p className="font-bold text-white/80 text-xs uppercase tracking-widest">
                  {country.terms.merit} • {country.terms.grade}
                </p>
              </div>
              
              <div className="mt-10 flex items-center justify-between">
                <span className="font-black text-[10px] uppercase text-white bg-black px-3 py-1 border-2 border-black">
                  Explore Hub
                </span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform" />
              </div>
            </motion.div>
          </Link>
        ))}

        {/* Global/Generic Card */}
        <Link href="/global/gpa-calculator" className="group">
          <motion.div
            className="border-4 border-black dark:border-white p-8 h-full flex flex-col justify-between bg-zinc-900 group cursor-pointer"
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
          >
            <div>
              <div className="text-5xl mb-6 group-hover:rotate-12 transition-transform inline-block">
                🌐
              </div>
              <h3 className="font-black text-3xl uppercase text-white leading-none mb-2">
                Universal
              </h3>
              <p className="font-bold text-white/40 text-xs uppercase tracking-widest">
                Any Scale • Any University
              </p>
            </div>
            
            <div className="mt-10 flex items-center justify-between">
              <span className="font-black text-[10px] uppercase text-zinc-900 bg-[#00FFC2] px-3 py-1 border-2 border-black">
                Generic Tools
              </span>
              <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
