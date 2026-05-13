import { cn } from "@/lib/utils";

interface BrutalInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

export default function BrutalInput({ label, hint, error, className, ...props }: BrutalInputProps) {
  return (
    <div className="w-full">
      <label className="block font-black text-xs uppercase text-black dark:text-white mb-2 tracking-widest">
        {label}
      </label>
      <input
        className={cn(
          "w-full border-4 border-black px-4 py-3 font-black text-xl text-black bg-[#F4F4F0] dark:bg-zinc-900 dark:text-white focus:outline-none focus:bg-[#00FFC2] dark:focus:bg-[#00FFC2] dark:focus:text-black transition-colors placeholder:text-black/20",
          error && "border-[#FF4911] focus:bg-[#FF4911]/10",
          className
        )}
        {...props}
      />
      {hint && <p className="mt-1 text-xs font-bold text-black/50 dark:text-white/40">{hint}</p>}
      {error && <p className="mt-1 text-xs font-black text-[#FF4911] uppercase">{error}</p>}
    </div>
  );
}
