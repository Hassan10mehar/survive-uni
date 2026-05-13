import { cn } from "@/lib/utils";
import React from "react";

export default function BrutalContainer({ children, className, maxWidth = "max-w-xl" }: { children: React.ReactNode, className?: string, maxWidth?: "max-w-xl" | "max-w-2xl" | "max-w-3xl" | "max-w-4xl" | "max-w-5xl" | "max-w-6xl" | "max-w-7xl" }) {
  return (
    <div className={cn("mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full", maxWidth, className)}>
      {children}
    </div>
  );
}
