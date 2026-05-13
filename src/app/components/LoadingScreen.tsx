import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";

export function LoadingScreen({ isVisible, text = "LOADING DATA..." }: { isVisible: boolean, text?: string }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FFBD12] text-black border-8 border-black font-mono overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 10px)' }}></div>
          
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="mb-8"
          >
            <Loader2 className="w-32 h-32 stroke-[3]" />
          </motion.div>
          
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-center px-4 relative z-10">
            {text}
          </h2>

          <div className="absolute bottom-12 left-0 w-full overflow-hidden whitespace-nowrap bg-black text-[#FFBD12] py-4 text-2xl font-black uppercase tracking-widest border-y-8 border-black">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
              STAND BY • INCOMING FLAVOR • DO NOT REFRESH • STAND BY • INCOMING FLAVOR • DO NOT REFRESH •
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
