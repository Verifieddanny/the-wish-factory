"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- 1. THEMES CONFIGURATION ---
const THEMES: Record<string, {
  backgroundStyle: string;
  envelope: string;
  waxColor: string;
  cardBg: string;
  textColor: string;
  accentColor: string;
  subTextColor: string;
}> = {
  "classic-red": {
    backgroundStyle: "radial-gradient(circle at center, #7f1d1d 0%, #450a0a 40%, #000000 100%)", 
    envelope: "bg-amber-100 border-amber-200",
    waxColor: "bg-red-700 border-red-800 text-amber-100",
    cardBg: "bg-[#fffdf5]", 
    textColor: "text-red-950",
    accentColor: "border-red-900",
    subTextColor: "text-red-800",
  },
  "snow-blue": {
    backgroundStyle: "radial-gradient(circle at center, #1e3a8a 0%, #0f172a 40%, #000000 100%)",
    envelope: "bg-slate-200 border-slate-300",
    waxColor: "bg-cyan-700 border-cyan-800 text-white",
    cardBg: "bg-slate-50",
    textColor: "text-slate-900",
    accentColor: "border-cyan-700",
    subTextColor: "text-cyan-900",
  },
  "cozy-green": {
    backgroundStyle: "radial-gradient(circle at center, #14532d 0%, #052e16 40%, #000000 100%)",
    envelope: "bg-amber-50 border-amber-100",
    waxColor: "bg-red-700 border-red-800 text-white",
    cardBg: "bg-[#fcfbf9]",
    textColor: "text-green-950",
    accentColor: "border-green-800",
    subTextColor: "text-green-900",
  },
  "golden-star": {
    backgroundStyle: "radial-gradient(circle at center, #b45309 0%, #451a03 40%, #000000 100%)",
    envelope: "bg-neutral-100 border-neutral-200",
    waxColor: "bg-amber-600 border-amber-700 text-white",
    cardBg: "bg-[#fffbef]",
    textColor: "text-amber-950",
    accentColor: "border-amber-700",
    subTextColor: "text-amber-900",
  }
};

// --- 2. SNOWFALL COMPONENT (For Christmas) ---
const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<{ id: number; left: string; opacity: number; duration: number }[]>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 10 + 10,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-[-10px] w-2 h-2 bg-white rounded-full blur-[1px] animate-fall"
          style={{
            left: flake.left,
            opacity: flake.opacity,
            animation: `fall ${flake.duration}s linear infinite`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes fall {
          0% { transform: translateY(-10px) translateX(0); }
          50% { transform: translateY(50vh) translateX(20px); }
          100% { transform: translateY(105vh) translateX(-20px); }
        }
      `}</style>
    </div>
  );
};

// --- 3. NEW FIREWORKS COMPONENT (Using Framer Motion) ---
const Fireworks = () => {
  const colors = ['#ff0000', '#ffd700', '#ff4500', '#00ff00', '#00ffff', '#ff00ff'];
  const [bursts, setBursts] = useState<{ id: number; x: string; y: string; color: string; delay: number }[]>([]);

  useEffect(() => {
    // Create 8 fixed burst points across the upper screen
    const generatedBursts = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: `${Math.random() * 90 + 5}%`,
      y: `${Math.random() * 50 + 10}%`,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3, // Random start time
    }));
    setBursts(generatedBursts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-screen">
      {bursts.map((burst) => (
        <motion.div
          key={burst.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1.5, 8], // Explode outward dramatically
            opacity: [0, 1, 0], // Flash on then fade out
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
            times: [0, 0.1, 1], // Explode fast (0.1), then fade slowly
            repeat: Infinity, // Loop forever
            repeatDelay: burst.delay, // Wait randomly before next burst
          }}
          style={{
            position: 'absolute',
            left: burst.x,
            top: burst.y,
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: burst.color,
            // Strong glowing effect
            boxShadow: `0 0 20px 5px ${burst.color}, 0 0 60px 20px ${burst.color}`,
            transformOrigin: 'center center'
          }}
        />
      ))}
    </div>
  );
};


interface WishCardProps {
  sender: string;
  receiver: string;
  message: string;
  occasion: string;
  songId: string;
  styleVariant: string;
}

export default function WishCard({
  sender,
  receiver,
  message,
  occasion,
  songId,
  styleVariant,
}: WishCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const theme = THEMES[styleVariant] || THEMES["classic-red"];

  const handleOpen = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen relative overflow-hidden font-serif"
      style={{ background: theme.backgroundStyle }} 
    >
      {/* --- CONDITIONAL ANIMATION LOGIC --- */}
      {occasion === "NEW_YEAR" ? <Fireworks /> : <Snowfall />}
      
      <audio ref={audioRef} src={`/songs/${songId}.mp3`} loop />

      <div className="z-10 relative perspective-1000 w-full max-w-lg px-4">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            // STATE 1: THE ENVELOPE
            <motion.div
              key="envelope"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, y: 100, rotateX: -45 }}
              transition={{ duration: 0.6, ease: "backOut" }}
              onClick={handleOpen}
              className="cursor-pointer group mx-auto"
            >
              <div className={`w-full max-w-[400px] h-[260px] mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-md relative flex items-center justify-center overflow-hidden border-b-8 transition-transform group-hover:scale-105 duration-300 ${theme.envelope}`}>
                <div className={`absolute top-0 left-0 w-full h-full border-[12px] border-double opacity-20 pointer-events-none ${theme.accentColor}`}></div>
                <div className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-lg border-4 group-hover:scale-110 transition-transform ${theme.waxColor}`}>
                  <div className="font-bold text-3xl italic">
                    {receiver.charAt(0).toUpperCase()}
                  </div>
                </div>
                <div className="absolute bottom-4 w-full text-center">
                   <p className={`text-xs tracking-[0.3em] uppercase font-bold opacity-60 ${theme.textColor}`}>A Gift For You</p>
                </div>
              </div>
            </motion.div>
          ) : (
            // STATE 2: THE CARD
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.2 }}
              className="w-full"
            >
              <div className={`p-8 md:p-12 shadow-[0_0_60px_rgba(255,255,255,0.1)] rounded-sm relative text-center border-8 border-double ${theme.cardBg} ${theme.textColor} border-opacity-20 ${theme.accentColor}`}>
                <div className={`absolute top-3 left-3 w-16 h-16 border-l-4 border-t-4 opacity-20 ${theme.accentColor}`}></div>
                <div className={`absolute bottom-3 right-3 w-16 h-16 border-r-4 border-b-4 opacity-20 ${theme.accentColor}`}></div>

                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <p className="opacity-60 uppercase tracking-widest text-xs font-bold mb-2">
                    {occasion === "NEW_YEAR" ? "New Year's Eve" : "December 25th"}
                  </p>
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    {occasion === "NEW_YEAR" ? "Happy New Year" : "Merry Christmas"}
                  </h1>
                  <div className={`w-24 h-1 mx-auto mt-6 opacity-40 ${theme.accentColor.replace('border', 'bg')}`}></div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="mb-10"
                >
                  <p className="text-xl md:text-2xl leading-relaxed italic font-medium opacity-80">
                    "{message}"
                  </p>
                </motion.div>

                <div className={`mt-8 pt-6 border-t opacity-100 ${theme.accentColor.replace('border', 'border-opacity-20 border')}`}>
                  <p className="text-sm opacity-50 uppercase tracking-widest mb-1">
                    Warmest Wishes From
                  </p>
                  <p className={`text-2xl font-bold ${theme.subTextColor}`}>
                    {sender}
                  </p>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}