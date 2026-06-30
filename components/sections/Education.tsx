"use client";

import { motion } from "framer-motion";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { education } from "@/data/education";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function Education() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="education"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[#f8fafc]"
      aria-labelledby="education-heading"
    >
      <Container>
        <SectionHeader
          eyebrow="Academic"
          title="Education"
          description="Formal academic foundation in Computer Science and Information Technology."
          id="education-heading"
        />

        <ol className="space-y-5 max-w-2xl" aria-label="Education timeline">
          {education.map((edu, i) => (
            <motion.li
              key={edu.id}
              initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.1 }}
              className="group rounded-xl border border-black/5 bg-white p-6 hover:border-blue-500/35 transition-all duration-300 shadow-md"
            >
              <article>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
                    <GraduationCap size={18} className="text-blue-600" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-slate-800 leading-snug">
                      {edu.degree}
                      <span className="text-slate-500 font-normal"> in </span>
                      {edu.field}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-blue-600">{edu.institution}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} aria-hidden="true" />
                        <time>{edu.startDate} – {edu.endDate}</time>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={11} aria-hidden="true" />
                        {edu.location}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
