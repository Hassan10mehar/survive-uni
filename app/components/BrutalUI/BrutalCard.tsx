import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BrutalCardProps {
  children: ReactNode;
  className?: string;
  variant?: "white" | "primary" | "secondary" | "danger" | "success" | "black";
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function BrutalCard({ children, className, variant = "white", style, onClick }: BrutalCardProps) {
  const variants = {
    white: "bg-white text-black dark:bg-zinc-800 dark:text-white",
    primary: "bg-[#4A90E2] text-white",
    secondary: "bg-[#FFDF00] text-black",
    danger: "bg-[#FF4911] text-white",
    success: "bg-[#00FFC2] text-black",
    black: "bg-black text-white",
  };

  return (
    <div 
      className={cn(
        "border-4 border-black p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
        variants[variant],
        className
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
