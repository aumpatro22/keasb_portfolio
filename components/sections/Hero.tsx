"use client";

import { motion } from "framer-motion";
import { ArrowDown, ExternalLink, Mail, MapPin, Shield, Award, Check } from "lucide-react";
import { CANDIDATE, CONTACT_INFO } from "@/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRecruiterMode } from "@/components/common/RecruiterToggle";
import { CloudOrbit } from "@/components/common/CloudOrbit";
import { useEffect, useState } from "react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: "easeOut", delay },
});

// Count-up helper component
function AnimatedNumber({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const [current, setCurrent] = useState(0);
  const target = parseInt(value) || 0;
  const isPlus = value.includes("+");

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 20);
    
    const timer = setInterval(() => {
      start += 1;
      setCurrent(start);
      if (start >= end) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <span>
      {current}
      {isPlus && "+"}
    </span>
  );
}

export function Hero() {
  const reducedMotion = useReducedMotion();
  const { isRecruiterMode } = useRecruiterMode();

  const animProps = (delay: number) =>
    reducedMotion || isRecruiterMode
      ? {}
      : fadeUp(delay);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f8fafc] px-4 py-24"
      aria-label="Hero section"
    >
      {/* Visual background grids (hidden in Recruiter Mode) */}
      {!isRecruiterMode && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000000_1px,transparent_1px),linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:48px_48px]"
          aria-hidden="true"
        />
      )}

      <div className="relative mx-auto max-w-6xl w-full">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center text-left">
          
          {/* Left Column: Details */}
          <div className="space-y-6">
            {/* Status badge */}
            <motion.div {...animProps(0)} className="flex">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1.5 text-xs font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
                Available for Cloud / DevOps roles in Germany
              </span>
            </motion.div>

            {/* Name & Title */}
            <div className="space-y-3">
              <motion.h1
                {...animProps(0.1)}
                className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
              >
                {CANDIDATE.name}
              </motion.h1>
              <motion.p
                {...animProps(0.15)}
                className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent sm:text-xl"
              >
                {CANDIDATE.title}
              </motion.p>
            </div>

            {/* Summary */}
            <motion.p
              {...animProps(0.2)}
              className="text-sm leading-relaxed text-slate-600 max-w-xl"
            >
              {CANDIDATE.summary}
            </motion.p>

            {/* Recruiter Quick Overview Card */}
            <motion.div
              {...animProps(0.25)}
              className="rounded-xl border border-black/5 bg-white/70 p-4 text-left shadow-md backdrop-blur-sm"
            >
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-slate-600" role="list">
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>
                    <AnimatedNumber value={`${CANDIDATE.yearsOfExperience}+`} /> Years DevOps Experience
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>CKA Certified Administrator</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>AWS Solutions Architect</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check size={13} className="text-emerald-500 shrink-0" aria-hidden="true" />
                  <span>German Permanent Resident</span>
                </li>
              </ul>
            </motion.div>

            {/* CTAs */}
            <motion.div
              {...animProps(0.3)}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-500 transition-all duration-200 focus-visible:outline-none"
              >
                Get In Touch
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 bg-slate-100/60 px-5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-250 hover:text-slate-800 transition-all duration-200 focus-visible:outline-none"
              >
                Download Resume
              </a>
            </motion.div>
          </div>

          {/* Right Column: Orbiting Cloud Graphic */}
          <div className="flex items-center justify-center">
            <CloudOrbit />
          </div>

        </div>
      </div>

      {/* Scroll indicator (hidden when recruiter mode active) */}
      {!isRecruiterMode && !reducedMotion && (
        <button
          onClick={scrollToAbout}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-600 hover:text-slate-400 transition-colors focus-visible:outline-none rounded-full p-2"
          aria-label="Scroll to about section"
        >
          <ArrowDown size={18} className="animate-bounce" aria-hidden="true" />
        </button>
      )}
    </section>
  );
}
