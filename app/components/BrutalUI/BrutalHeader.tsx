"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface BrutalHeaderProps {
  title: string;
  subtitle?: string;
  backHref: string;
  bgColor?: string;
  textColor?: string;
  onReset?: () => void;
}

export default function BrutalHeader({ 
  title, 
  subtitle, 
  backHref, 
  bgColor = "#FFDF00", 
  textColor = "#000",
  onReset 
}: BrutalHeaderProps) {
  return (
    <div className="border-b-4 border-black px-4 sm:px-6 py-3 flex items-center gap-3"
      style={{ backgroundColor: bgColor }}>
      <Link href={backHref}>
        <motion.div 
          whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
          className="border-4 border-black bg-white dark:bg-zinc-800 w-10 h-10 flex items-center justify-center cursor-pointer shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <ArrowLeft className="w-4 h-4 text-black dark:text-white" />
        </motion.div>
      </Link>
      
      <div className="flex-1 min-w-0">
        <h1 className="font-black text-base sm:text-xl uppercase leading-none truncate" style={{ color: textColor }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-[10px] sm:text-xs font-bold uppercase" style={{ color: textColor, opacity: 0.7 }}>
            {subtitle}
          </p>
        )}
      </div>

      {onReset && (
        <motion.button 
          onClick={onReset}
          whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
          className="border-4 border-black bg-white dark:bg-zinc-800 w-9 h-9 flex items-center justify-center cursor-pointer shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          title="Reset"
        >
          <RotateCcw className="w-4 h-4 text-black dark:text-white" />
        </motion.button>
      )}
    </div>
  );
}
