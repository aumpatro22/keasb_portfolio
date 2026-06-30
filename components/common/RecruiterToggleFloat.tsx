"use client";

import React, { useState, useEffect } from "react";
import { useRecruiterMode } from "./RecruiterToggle";
import { Eye, EyeOff } from "lucide-react";

export function RecruiterToggleFloat() {
  const { isRecruiterMode, toggleRecruiterMode } = useRecruiterMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={toggleRecruiterMode}
        className="group relative flex items-center gap-2 rounded-full border border-blue-500/40 bg-[#0d1530]/90 backdrop-blur-md px-4 py-2.5 shadow-xl transition-all duration-200 hover:scale-105 hover:bg-[#162040] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 cursor-pointer"
        aria-label={`Switch to ${isRecruiterMode ? "Interactive Mode" : "Recruiter Quick Scan Mode"}`}
      >
        <span className="relative flex h-2 w-2">
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isRecruiterMode ? "bg-emerald-400" : "bg-blue-400 animate-ping"
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isRecruiterMode ? "bg-emerald-500" : "bg-blue-500"
            }`}
          />
        </span>
        <span className="font-mono text-xs font-bold text-white select-none">
          {isRecruiterMode ? "Recruiter Mode" : "Interactive Mode"}
        </span>

        {/* Dynamic icon */}
        {isRecruiterMode ? (
          <EyeOff size={13} className="text-emerald-400" aria-hidden="true" />
        ) : (
          <Eye size={13} className="text-blue-400" aria-hidden="true" />
        )}

        {/* Hover info tooltip */}
        <span className="absolute bottom-full right-0 mb-2 w-64 origin-bottom-right scale-0 rounded-lg border border-brand-border bg-[#060d1f] p-3 text-left font-sans text-xs text-slate-400 shadow-xl transition-all duration-200 group-hover:scale-100">
          <strong className="block text-white mb-0.5">Recruiter Scan Mode</strong>
          Toggling disables background animations and highlights key specs for ultra-quick assessment.
        </span>
      </button>
    </div>
  );
}
