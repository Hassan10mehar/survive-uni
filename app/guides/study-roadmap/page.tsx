"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  BrutalContainer, 
  BrutalHeader, 
  BrutalCard, 
  BrutalButton 
} from "@/app/components/BrutalUI";
import { CheckSquare, Square, Target, Book, Sparkles, Send } from "lucide-react";
import Breadcrumbs from "@/app/components/Breadcrumbs";

const ROADMAP_ITEMS = [
  {
    category: "Phase 1: Foundation",
    items: [
      { id: "f1", text: "Complete Physics FSc Part 1 (Ch 1-5)", done: false },
      { id: "f2", text: "Maths: Practice Integration & Differentiation", done: false },
      { id: "f3", text: "Chem: Master Atomic Structure & Bonding", done: false },
    ]
  },
  {
    category: "Phase 2: Speed & Logic",
    items: [
      { id: "s1", text: "Intelligence: Practice Analogy questions", done: false },
      { id: "s2", text: "Solve 5 years of NUST Mock Exams", done: false },
      { id: "s3", text: "English: Master Vocabulary lists", done: false },
    ]
  },
  {
    category: "Phase 3: Final Push",
    items: [
      { id: "p1", text: "Take 3 full-length Mock Tests", done: false },
      { id: "p2", text: "Revise Physics Formulas (Modern Physics)", done: false },
      { id: "p3", text: "Review NET-1 & NET-2 patterns", done: false },
    ]
  }
];

export default function StudyRoadmap() {
  const [items, setItems] = useState(ROADMAP_ITEMS);

  const toggle = (catIdx: number, itemIdx: number) => {
    const newItems = [...items];
    newItems[catIdx].items[itemIdx].done = !newItems[catIdx].items[itemIdx].done;
    setItems(newItems);
  };

  const progress = Math.round(
    (items.flatMap(c => c.items).filter(i => i.done).length / 
     items.flatMap(c => c.items).length) * 100
  );

  return (
    <div className="flex-1 pb-20">
      <BrutalHeader 
        title="Study Roadmap" 
        subtitle="The ultimate NUST / FAST preparation checklist."
        bgColor="#00FFC2"
        textColor="black"
        backHref="/guides"
      />

      <BrutalContainer>
        <Breadcrumbs 
          items={[
            { label: "Guides", href: "/guides" },
            { label: "Study Roadmap" }
          ]} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          
          {/* Progress Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <BrutalCard className="bg-black text-white p-8 shadow-[8px_8px_0px_0px_#00FFC2]">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-8 h-8 text-[#00FFC2]" />
                <h3 className="font-black text-2xl uppercase">Your Progress</h3>
              </div>
              <div className="relative h-12 bg-zinc-800 border-4 border-white mb-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="absolute inset-y-0 left-0 bg-[#00FFC2]"
                />
                <div className="absolute inset-0 flex items-center justify-center font-black text-xl mix-difference text-white">
                  {progress}%
                </div>
              </div>
              <p className="font-bold text-xs text-white/60 uppercase text-center italic">
                {progress === 100 ? "Ready to dominate! 🔥" : "Keep pushing, champ!"}
              </p>
            </BrutalCard>

            <BrutalCard className="bg-[#FF90E8] p-6 border-4 border-black">
               <div className="flex items-center gap-2 mb-4">
                 <Sparkles className="w-5 h-5" />
                 <h4 className="font-black text-lg uppercase">Daily Tip</h4>
               </div>
               <p className="font-bold text-sm text-black/70 italic">
                 &quot;Don&apos;t just read. Solve. Engineering tests are 70% speed and 30% knowledge.&quot;
               </p>
            </BrutalCard>
          </div>

          {/* Checklist */}
          <div className="lg:col-span-8 space-y-12">
            {items.map((cat, catIdx) => (
              <div key={cat.category}>
                <h3 className="font-black text-2xl uppercase mb-6 flex items-center gap-3 underline decoration-4 underline-offset-4">
                  <Book className="w-6 h-6" /> {cat.category}
                </h3>
                <div className="space-y-4">
                  {cat.items.map((item, itemIdx) => (
                    <button 
                      key={item.id}
                      onClick={() => toggle(catIdx, itemIdx)}
                      className={`w-full text-left p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4 transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none ${item.done ? 'bg-[#00FFC2] opacity-60' : 'bg-white dark:bg-zinc-900'}`}
                    >
                      {item.done ? <CheckSquare className="w-8 h-8 shrink-0" /> : <Square className="w-8 h-8 shrink-0" />}
                      <span className={`font-black uppercase text-sm sm:text-lg ${item.done ? 'line-through' : 'dark:text-white'}`}>
                        {item.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <div className="pt-10 border-t-4 border-black/10">
               <BrutalCard className="bg-white dark:bg-zinc-800 p-8 border-4 border-black text-center">
                  <Send className="w-12 h-12 mx-auto mb-4 text-[#4A90E2]" />
                  <h3 className="font-black text-2xl uppercase mb-2 dark:text-white">Save Progress?</h3>
                  <p className="font-bold text-black/60 dark:text-white/50 mb-6 uppercase text-xs tracking-widest">Bookmark this page to come back and track your study journey.</p>
                  <BrutalButton className="bg-[#4A90E2] text-white px-8">Bookmark Now →</BrutalButton>
               </BrutalCard>
            </div>
          </div>

        </div>
      </BrutalContainer>
    </div>
  );
}
