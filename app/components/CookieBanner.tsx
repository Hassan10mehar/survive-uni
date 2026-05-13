"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("surviveuni-cookie-consent");
    if (!consent) {
      // Delay showing banner slightly so it doesn't jarringly appear immediately
      const timer = setTimeout(() => setShow(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("surviveuni-cookie-consent", "true");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 bg-white border-4 border-black p-4 z-50 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="flex flex-col gap-3">
            <div>
              <p className="font-black text-sm uppercase tracking-widest text-black">
                🍪 We use cookies
              </p>
              <p className="text-xs text-black/70 font-medium mt-1">
                We use cookies to personalize content, serve ads, and analyze our traffic. 
                By clicking "Accept", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={accept}
                className="flex-1 bg-[#00FFC2] border-2 border-black py-2 font-black text-xs uppercase cursor-pointer hover:bg-black hover:text-[#00FFC2] transition-colors"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
