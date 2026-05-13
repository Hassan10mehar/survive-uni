"use client";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface BrutalButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "danger" | "success" | "white" | "black";
}

export default function BrutalButton({ children, className, variant = "primary", ...props }: BrutalButtonProps) {
  const variants = {
    primary: "bg-black text-white hover:bg-zinc-800",
    secondary: "bg-[#FFDF00] text-black",
    danger: "bg-[#FF4911] text-white",
    success: "bg-[#00FFC2] text-black",
    white: "bg-white text-black",
    black: "bg-black text-white hover:bg-zinc-800",
  };

  return (
    <motion.button
      whileTap={{ x: 4, y: 4, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
      className={cn(
        "border-4 border-black px-6 py-3 font-black uppercase text-sm tracking-widest cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors active:translate-x-1 active:translate-y-1 active:shadow-none",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
