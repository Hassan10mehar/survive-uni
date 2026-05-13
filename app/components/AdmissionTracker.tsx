"use client";
import { useEffect, useState } from 'react';
import { DEADLINES, Deadline } from '@/lib/deadlines';
import { BrutalCard, BrutalButton } from './BrutalUI';
import { Clock, ExternalLink, Calendar } from 'lucide-react';

export default function AdmissionTracker() {
  const [activeDeadlines, setActiveDeadlines] = useState<Deadline[]>([]);

  useEffect(() => {
    const sorted = [...DEADLINES]
      .filter(d => new Date(d.deadline) > new Date())
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
      .slice(0, 5);
    setActiveDeadlines(sorted);
  }, []);

  if (activeDeadlines.length === 0) return null;

  return (
    <div className="space-y-4">
      {activeDeadlines.map((deadline) => (
        <BrutalCard 
          key={deadline.short} 
          className="p-4 border-2 border-black dark:border-white bg-white dark:bg-zinc-900 group"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 border-2 border-black" 
                style={{ backgroundColor: deadline.color }}
              />
              <span className="font-black text-[10px] uppercase tracking-widest text-black/50 dark:text-white/40">
                {deadline.short}
              </span>
            </div>
            <span className="bg-black text-white text-[8px] font-black px-2 py-0.5 border border-black uppercase">
              {getTimeRemaining(deadline.deadline)}
            </span>
          </div>
          
          <h4 className="font-black text-sm uppercase mb-3 dark:text-white group-hover:text-[#FF4911] transition-colors">
            {deadline.test}
          </h4>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-bold text-black/60 dark:text-white/50 uppercase">
              <Calendar className="w-3 h-3" />
              {new Date(deadline.deadline).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}
            </div>
            <a 
              href={deadline.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-black uppercase flex items-center gap-1 hover:underline underline-offset-2"
            >
              Portal <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </BrutalCard>
      ))}
    </div>
  );
}

function getTimeRemaining(date: string) {
  const diff = new Date(date).getTime() - new Date().getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  if (days === 1) return "Last Day!";
  if (days < 7) return `${days} Days Left`;
  return `${Math.floor(days / 7)} Weeks Left`;
}
