"use client";

import React, { useEffect, useState, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useRecruiterMode } from "./RecruiterToggle";

export function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { isRecruiterMode } = useRecruiterMode();
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isDesktop || reducedMotion || isRecruiterMode) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest('[role="button"]') ||
        target.classList.contains("cursor-pointer");

      setHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mounted, isDesktop, reducedMotion, isRecruiterMode]);

  if (!mounted || !isDesktop || reducedMotion || isRecruiterMode) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-50 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/40 bg-blue-500/5 mix-blend-screen transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
          width: hovered ? "48px" : "24px",
          height: hovered ? "48px" : "24px",
          borderColor: hovered ? "rgba(16, 185, 129, 0.6)" : "rgba(59, 130, 246, 0.4)",
          backgroundColor: hovered ? "rgba(16, 185, 129, 0.08)" : "rgba(59, 130, 246, 0.03)",
        }}
      />
      {/* Inner Dot */}
      <div
        className="pointer-events-none fixed left-0 top-0 z-50 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400 mix-blend-screen transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      />
    </>
  );
}
