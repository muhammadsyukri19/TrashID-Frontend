"use client";

import React, { useState, useEffect } from "react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200); // Sedikit lebih lama dari animasi fade-out
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-[#154212] flex items-center justify-center animate-splash-screen overflow-hidden">
      <div className="relative flex flex-col items-center gap-12">
        {/* Ikon Raksasa */}
        <div className="w-64 h-64 md:w-[450px] md:h-[450px] bg-white/10 rounded-[4rem] backdrop-blur-2xl border border-white/20 flex items-center justify-center shadow-[0_0_150px_rgba(255,255,255,0.15)] animate-splash-logo">
          <img src="/logo.png" alt="TrashID" className="w-40 h-40 md:w-72 md:h-72 object-contain brightness-0 invert" />
        </div>
        
        <div className="flex flex-col items-center gap-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter font-headline italic">TrashID</h1>
          <p className="text-[#94f990] font-bold tracking-[0.5em] uppercase text-[10px] md:text-base opacity-80">Lingkungan Bersih, Masa Depan Cerah</p>
        </div>

        {/* Decorative background light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10"></div>
      </div>

      <style jsx global>{`
        @keyframes splash-pulse {
          0% { transform: scale(0.85); opacity: 0; filter: blur(10px); }
          50% { transform: scale(1.05); opacity: 1; filter: blur(0px); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes splash-fade-out {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(1.1); visibility: hidden; }
        }
        .animate-splash-logo {
          animation: splash-pulse 1.2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }
        .animate-splash-screen {
          animation: splash-fade-out 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          animation-delay: 1.6s;
        }
      `}</style>
    </div>
  );
}
