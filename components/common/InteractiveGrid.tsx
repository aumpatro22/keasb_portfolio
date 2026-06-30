"use client";

import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRecruiterMode } from "./RecruiterToggle";

export function InteractiveGrid() {
  const reducedMotion = useReducedMotion();
  const { isRecruiterMode } = useRecruiterMode();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (reducedMotion || isRecruiterMode || !isMounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [reducedMotion, isRecruiterMode, isMounted]);

  if (!isMounted) {
    return <div className="fixed inset-0 -z-10 bg-[#050816]" />;
  }

  // Recruiter mode or reduced motion disables dynamic animations & glows
  if (isRecruiterMode || reducedMotion) {
    return (
      <div className="fixed inset-0 -z-10 bg-[#050816] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10 bg-[#050816] overflow-hidden transition-colors duration-500"
    >
      {/* Aurora Ambient Mesh */}
      <div 
        className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-600/5 blur-[120px] animate-pulse-slow" 
        style={{ animationDuration: "10s" }}
      />
      <div 
        className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-purple-600/5 blur-[120px] animate-pulse-slow"
        style={{ animationDuration: "14s" }}
      />
      <div 
        className="absolute top-[30%] left-[60%] w-[40%] h-[40%] rounded-full bg-sky-600/5 blur-[120px] animate-pulse-slow"
        style={{ animationDuration: "18s" }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#4f8cff_1px,transparent_1px),linear-gradient(to_bottom,#4f8cff_1px,transparent_1px)] bg-[size:56px_56px]" />

      {/* Noise Texture Layer */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Mouse spotlight glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-70"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(79, 140, 255, 0.07), transparent 80%)`,
        }}
      />
    </div>
  );
}

