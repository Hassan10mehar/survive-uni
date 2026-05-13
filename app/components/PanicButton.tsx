"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function PanicButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show only after a delay to not distract immediately
    const timer = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[100] pointer-events-none">
      <AnimatePresence>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          className="pointer-events-auto"
        >
          <Link href="/tools/safe-bunk">
            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#FF4911] text-white border-4 border-black p-3 sm:p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 group relative"
            >
              <div className="bg-black text-[#FF4911] p-2 border-2 border-white group-hover:animate-pulse">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <p className="font-black text-[10px] sm:text-xs uppercase tracking-widest leading-none mb-1">Panic Mode?</p>
                <p className="font-black text-sm sm:text-lg uppercase leading-none">Safe Bunk Calc</p>
              </div>
              
              {/* Close Button */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setShow(false);
                }}
                className="absolute -top-3 -right-3 bg-white text-black border-2 border-black p-1 rounded-full hover:bg-black hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
