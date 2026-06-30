"use client";

import React from "react";
import { useRecruiterMode } from "./RecruiterToggle";
import { Cloud, Server, Database, Shield, Zap, Terminal } from "lucide-react";

export function CloudOrbit() {
  const { isRecruiterMode } = useRecruiterMode();

  if (isRecruiterMode) return null;

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center select-none pointer-events-none">
      {/* Outer Orbit Ring */}
      <div className="absolute w-[300px] h-[300px] rounded-full border border-slate-200 animate-orbit-rotate" />
      {/* Middle Orbit Ring */}
      <div className="absolute w-[200px] h-[200px] rounded-full border border-slate-200 animate-orbit-rotate [animation-direction:reverse]" />

      {/* Orbiting Nodes (Absolute positioned, spun via keyframe wrappers) */}
      
      {/* Node 1: AWS (Outer) */}
      <div className="absolute w-[300px] h-[300px] animate-orbit-rotate">
        <div 
          className="absolute -top-5 left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#FF9900]/40 bg-[#FF9900]/10 text-[#FF9900] shadow-[0_0_15px_rgba(255,153,0,0.15)] [transform:rotate(calc(-1*var(--tw-rotate)))]"
          style={{ transform: "rotate(0deg)" }}
        >
          <span className="font-mono text-[9px] font-bold">AWS</span>
        </div>
      </div>

      {/* Node 2: K8s (Outer) */}
      <div className="absolute w-[300px] h-[300px] animate-orbit-rotate [animation-delay:-10s]">
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-[#326CE5]/40 bg-[#326CE5]/10 text-[#326CE5] shadow-[0_0_15px_rgba(50,108,229,0.15)]">
          <span className="font-mono text-[9px] font-bold">K8s</span>
        </div>
      </div>

      {/* Node 3: Terraform (Middle) */}
      <div className="absolute w-[200px] h-[200px] animate-orbit-rotate [animation-direction:reverse] [animation-delay:-5s]">
        <div className="absolute top-1/2 -left-5 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 text-[#a78bfa] shadow-[0_0_15px_rgba(124,58,237,0.15)]">
          <span className="font-mono text-[8px] font-bold">IaC</span>
        </div>
      </div>

      {/* Node 4: Docker (Middle) */}
      <div className="absolute w-[200px] h-[200px] animate-orbit-rotate [animation-direction:reverse] [animation-delay:-15s]">
        <div className="absolute top-1/2 -right-5 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-[#38BDF8]/40 bg-[#38BDF8]/10 text-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.15)]">
          <span className="font-mono text-[8px] font-bold">Dkr</span>
        </div>
      </div>

      {/* Central Server Core Card */}
      <div className="relative flex flex-col items-center justify-center h-36 w-36 rounded-2xl border border-black/5 bg-white/80 shadow-md backdrop-blur-md">
        {/* Pulsing server nodes */}
        <div className="flex items-center gap-1 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-light" />
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse-light [animation-delay:0.3s]" />
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse-light [animation-delay:0.6s]" />
        </div>
        <Server size={28} className="text-blue-500 animate-bounce [animation-duration:3s]" />
        <span className="mt-2 font-mono text-[9px] font-semibold text-slate-400 uppercase tracking-widest">
          Cloud Core
        </span>
      </div>
    </div>
  );
}
