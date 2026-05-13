"use client";

import { useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import { Download, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { BrutalCard, BrutalButton } from "./BrutalUI";

interface ShareImageCardProps {
  title: string;
  value: string;
  subtitle: string;
  color?: string;
  emoji?: string;
}

export default function ShareImageCard({ title, value, subtitle, color = "#FFDF00", emoji = "🔥" }: ShareImageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateImage = async (action: "download" | "share") => {
    if (!cardRef.current) return;
    try {
      setIsGenerating(true);
      const dataUrl = await htmlToImage.toPng(cardRef.current, { 
        cacheBust: true, 
        backgroundColor: color,
        pixelRatio: 2,
      });
      
      if (action === "download") {
        const link = document.createElement("a");
        link.download = `survive-uni-${title.toLowerCase().replace(/\s+/g, "-")}.png`;
        link.href = dataUrl;
        link.click();
      } else {
        const text = `📊 My ${title}: ${value}% — Check yours at surviveuni.pk ${emoji}`;
        if (typeof navigator !== "undefined" && navigator.share) {
          // Convert dataUrl to blob
          const res = await fetch(dataUrl);
          const blob = await res.blob();
          const file = new File([blob], "result.png", { type: "image/png" });
          
          await navigator.share({
            title: "My Result - Survive Uni",
            text,
            files: [file],
          });
        } else {
          window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
        }
      }
    } catch (err) {
      console.error("Failed to generate image", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      {/* Hidden Capture Area (rendered off-screen or scaled) */}
      <div className="overflow-hidden h-0 w-0 absolute opacity-0 pointer-events-none">
        <div 
          ref={cardRef} 
          className="w-[600px] h-[600px] flex flex-col items-center justify-center p-12 relative"
          style={{ backgroundColor: color }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, black 1px, transparent 0)", backgroundSize: "24px 24px" }}></div>
          
          <div className="z-10 bg-white border-8 border-black p-8 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg] mb-8 w-full">
            <p className="font-black text-xl uppercase tracking-widest text-black/50 mb-2">{title}</p>
            <div className="font-black text-8xl text-black">{value}<span className="text-4xl ml-2">%</span></div>
          </div>

          <div className="z-10 font-black text-center text-black text-3xl bg-white border-4 border-black px-6 py-3 mb-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {subtitle} {emoji}
          </div>

          <div className="z-10 mt-auto flex items-center gap-4 bg-black text-white px-6 py-3 border-4 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-[#FFDF00] text-black font-black px-2 py-1 text-xl">S</div>
            <span className="font-black text-2xl uppercase tracking-widest">Survive Uni</span>
          </div>
          
          <p className="absolute bottom-4 right-6 font-black text-black/20 text-xl italic uppercase">surviveuni.pk</p>
        </div>
      </div>

      {/* Preview Card */}
      <BrutalCard variant="white" className="w-full max-w-sm overflow-hidden bg-zinc-50 dark:bg-zinc-800 border-dashed">
        <p className="font-black text-[10px] uppercase text-center mb-4 opacity-40">Result Share Preview</p>
        <div className="aspect-square w-full border-4 border-black bg-white dark:bg-black p-4 flex flex-col items-center justify-center relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_#FFDF00]">
           <div className="w-full h-full border-2 border-black/10 flex flex-col items-center justify-center" style={{ backgroundColor: color + '20' }}>
              <p className="font-black text-[10px] uppercase text-black/50 dark:text-white/50">{title}</p>
              <p className="font-black text-4xl dark:text-white">{value}%</p>
              <p className="text-[10px] font-bold mt-1 dark:text-white/70">{subtitle} {emoji}</p>
           </div>
           <div className="absolute top-2 right-2 flex gap-1">
              <div className="w-2 h-2 rounded-full bg-black/10"></div>
              <div className="w-2 h-2 rounded-full bg-black/10"></div>
           </div>
        </div>
      </BrutalCard>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        <BrutalButton 
          variant="black"
          onClick={() => generateImage("share")}
          disabled={isGenerating}
          className="flex items-center justify-center gap-2 py-4 bg-[#25D366] text-white border-black"
        >
          <MessageCircle className="w-5 h-5" />
          Flex on WhatsApp
        </BrutalButton>

        <BrutalButton 
          variant="white"
          onClick={() => generateImage("download")}
          disabled={isGenerating}
          className="flex items-center justify-center gap-2 py-4 dark:bg-zinc-900 dark:text-white"
        >
          <Download className="w-5 h-5" />
          Save Image
        </BrutalButton>
      </div>
    </div>
  );
}
