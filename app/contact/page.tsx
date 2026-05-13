"use client";

import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-12 sm:py-20">
      <div className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white p-6 sm:p-10 shadow-brutal dark:shadow-[8px_8px_0px_0px_white]">
        <div className="w-12 h-12 bg-black dark:bg-white flex items-center justify-center border-4 border-black dark:border-white mb-6">
          <MessageSquare className="w-6 h-6 text-[#FF90E8] dark:text-black" />
        </div>
        
        <h1 className="font-black text-3xl sm:text-5xl uppercase tracking-tighter text-black dark:text-white mb-4">
          Get in Touch
        </h1>
        
        <p className="font-medium text-black/70 dark:text-white/70 text-lg mb-8">
          Found a bug in our calculators? Want us to add your university's aggregate formula? Or just want to say hi? Drop us an email.
        </p>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="mailto:hassan10mehar@gmail.com"
              className="flex-1 flex items-center justify-center gap-3 bg-[#FFDF00] border-4 border-black py-4 font-black text-lg uppercase cursor-pointer hover:bg-black hover:text-[#FFDF00] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1"
            >
              <Mail className="w-5 h-5" />
              General Support
            </a>
            <a 
              href="mailto:hassan10mehar@gmail.com"
              className="flex-1 flex items-center justify-center gap-3 bg-white dark:bg-black border-4 border-black dark:border-white py-4 font-black text-lg uppercase cursor-pointer hover:bg-[#00FFC2] hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_white] hover:shadow-none hover:translate-y-1 hover:translate-x-1"
            >
              <Mail className="w-5 h-5" />
              Advertising
            </a>
          </div>

          <div className="mt-8 p-6 border-4 border-black border-dashed bg-zinc-50 dark:bg-zinc-800 flex flex-col items-center gap-2">
            <span className="font-black text-xs uppercase text-black/40 dark:text-white/40 tracking-widest">Direct Email</span>
            <span className="font-black text-xl sm:text-2xl text-black dark:text-[#FFDF00] select-all break-all">
              hassan10mehar@gmail.com
            </span>
            <p className="text-[10px] font-bold uppercase text-black/30 dark:text-white/30 mt-2">
              (Click to select and copy)
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t-4 border-black dark:border-white border-dashed">
          <h3 className="font-black text-xl uppercase mb-4 text-black dark:text-white">Business Inquiries</h3>
          <p className="font-medium text-black/70 dark:text-white/70 mb-4">
            For partnership opportunities, advertising, or content contributions, please reach out specifically to our business desk.
          </p>
          <p className="font-bold text-sm text-black/50 dark:text-white/50 uppercase tracking-widest text-center">
            Response Time: We try to reply within 48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
