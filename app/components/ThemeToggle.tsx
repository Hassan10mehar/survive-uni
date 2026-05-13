"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 border-2 border-black dark:border-white bg-transparent shrink-0" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-9 h-9 border-2 border-black dark:border-[#FFDF00] bg-white dark:bg-black flex items-center justify-center cursor-pointer shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_#FFDF00] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
      whileTap={{ scale: 0.95 }}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-black dark:text-[#FFDF00]" />
      ) : (
        <Moon className="w-4 h-4 text-black dark:text-[#FFDF00]" />
      )}
    </motion.button>
  );
}
