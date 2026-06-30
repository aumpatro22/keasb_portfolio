"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ChevronDown, ChevronUp, Building2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TechBadge } from "@/components/common/TechBadge";
import { experiences } from "@/data/experience";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

import { useRecruiterMode } from "@/components/common/RecruiterToggle";

export function Experience() {
  const [expandedId, setExpandedId] = useState<string>("alter-solutions");
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05 });
  const reducedMotion = useReducedMotion();
  const { isRecruiterMode } = useRecruiterMode();

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="experience"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[#f8fafc]"
      aria-labelledby="experience-heading"
    >
      <Container>
        <SectionHeader
          eyebrow="Career"
          title="Professional Experience"
          description="6+ years of enterprise-grade DevOps and cloud infrastructure delivery across Germany, Mexico, and India."
          id="experience-heading"
        />

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#4F8CFF]/50 via-[#38BDF8]/10 to-transparent ml-[19px] hidden sm:block"
            aria-hidden="true"
          />

          <ol className="space-y-4" aria-label="Work experience timeline">
            {experiences.map((exp, index) => {
              const isExpanded = expandedId === exp.id;

              return (
                <motion.li
                  key={exp.id}
                  initial={reducedMotion || isRecruiterMode ? {} : { opacity: 0, x: -20 }}
                  animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.1 }}
                  className="sm:pl-12 relative"
                >
                  {/* Timeline dot */}
                  <div
                    className={cn(
                      "absolute left-0 top-5 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
                      isExpanded
                        ? "border-[#4F8CFF]/40 bg-[#4F8CFF]/10"
                        : "border-white/10 bg-[#050816]"
                    )}
                    aria-hidden="true"
                  >
                    <Building2
                      size={16}
                      className={isExpanded ? "text-blue-400" : "text-slate-500"}
                    />
                  </div>

                  {/* Card */}
                  <article
                    className={cn(
                      "rounded-xl border transition-all duration-300 backdrop-blur-md shadow-xl",
                      isExpanded
                        ? "border-[#4F8CFF]/35 bg-white/[0.04]"
                        : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]"
                    )}
                  >
                    {/* Header — always visible */}
                    <button
                      onClick={() => toggle(exp.id)}
                      className="w-full text-left p-5 sm:p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl block"
                      aria-expanded={isExpanded}
                      aria-controls={`exp-${exp.id}-details`}
                    >
                      <span className="flex items-start justify-between gap-4">
                        <span className="flex-1 min-w-0 block">
                          <span className="flex flex-wrap items-center gap-2 mb-1">
                            <span className="text-base font-semibold text-slate-800 block">{exp.role}</span>
                            {index === 0 && (
                              <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-600">
                                Most Recent
                              </span>
                            )}
                          </span>
                          <span className="text-sm font-medium text-blue-600 block">{exp.company}</span>
                          {exp.client && (
                            <span className="text-xs text-slate-500 mt-0.5 block">
                              Client: {exp.client}
                            </span>
                          )}
                          <span className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <Calendar size={11} aria-hidden="true" />
                              {exp.startDate} – {exp.endDate}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={11} aria-hidden="true" />
                              {exp.location}
                            </span>
                          </span>
                        </span>
                        <span className="shrink-0 text-slate-450 block">
                          {isExpanded ? (
                            <ChevronUp size={18} aria-hidden="true" />
                          ) : (
                            <ChevronDown size={18} aria-hidden="true" />
                          )}
                        </span>
                      </span>

                      {/* Highlights preview when collapsed */}
                      {!isExpanded && exp.highlights.length > 0 && (
                        <span className="mt-3 flex flex-wrap gap-2 block" aria-label="Key highlights">
                          {exp.highlights.slice(0, 2).map((h) => (
                            <span
                              key={h}
                              className="text-xs text-slate-500 bg-slate-100 rounded px-2 py-1 block"
                            >
                              {h}
                            </span>
                          ))}
                        </span>
                      )}
                    </button>

                    {/* Expanded details */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          id={`exp-${exp.id}-details`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: isRecruiterMode ? 0 : 0.3, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-slate-200/60 px-5 sm:px-6 pb-6 pt-5 space-y-5">
                            {/* Highlights */}
                            <div>
                              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                                Key Highlights
                              </h4>
                              <ul className="space-y-2" role="list">
                                {exp.highlights.map((h) => (
                                  <li key={h} className="flex items-start gap-2 text-sm">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0" aria-hidden="true" />
                                    <span className="text-slate-600">{h}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Responsibilities */}
                            <div>
                              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                                Responsibilities
                              </h4>
                              <ul className="space-y-2" role="list">
                                {exp.responsibilities.map((r) => (
                                  <li key={r} className="flex items-start gap-2 text-sm">
                                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" aria-hidden="true" />
                                    <span className="text-slate-500">{r}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Technologies */}
                            <div>
                              <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
                                Technologies
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech) => (
                                  <TechBadge key={tech} label={tech} />
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
