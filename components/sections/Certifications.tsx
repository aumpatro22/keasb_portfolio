"use client";

import { motion } from "framer-motion";
import { ExternalLink, Calendar, Shield, Award } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { certifications } from "@/data/certifications";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  cka: Shield,
  "aws-saa": Award,
};

const colorClassMap: Record<string, string> = {
  cka: "text-[#326CE5]",
  "aws-saa": "text-[#FF9900]",
};

import { useRecruiterMode } from "@/components/common/RecruiterToggle";

export function Certifications() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const reducedMotion = useReducedMotion();
  const { isRecruiterMode } = useRecruiterMode();

  return (
    <section
      id="certifications"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[#f8fafc]"
      aria-labelledby="certifications-heading"
    >
      <Container>
        <SectionHeader
          eyebrow="Credentials"
          title="Certifications"
          description="Industry-recognized certifications validating hands-on cloud and Kubernetes expertise."
          id="certifications-heading"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {certifications.map((cert, i) => {
            const Icon = iconMap[cert.id] || Shield;
            const colorClass = colorClassMap[cert.id] || "text-blue-600";

            return (
              <motion.article
                key={cert.id}
                initial={reducedMotion || isRecruiterMode ? {} : { opacity: 0, y: 24 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.1 }}
                className="group relative rounded-xl border border-black/5 bg-white p-6 hover:border-blue-500/35 transition-all duration-300 overflow-hidden shadow-md"
              >
                {/* Background accent */}
                <div
                  className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl opacity-5 transition-opacity duration-300 group-hover:opacity-10"
                  style={{ background: cert.badgeColor }}
                  aria-hidden="true"
                />

                <div className="relative">
                  {/* Icon + Issuer */}
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                      style={{
                        background: `${cert.badgeColor}12`,
                        border: `1px solid ${cert.badgeColor}25`,
                      }}
                    >
                      <Icon
                        size={22}
                        className={colorClass}
                        aria-hidden="true"
                      />
                    </div>
                    <a
                      href={cert.credlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      aria-label={`Verify ${cert.name} on Credly (opens in new tab)`}
                    >
                      <ExternalLink size={11} aria-hidden="true" />
                      Verify
                    </a>
                  </div>

                  {/* Name */}
                  <h3 className="mb-1 text-base font-semibold text-slate-800 leading-snug">
                    {cert.name}
                  </h3>

                  {/* Issuer */}
                  <p className="mb-3 text-sm font-medium" style={{ color: cert.badgeColor }}>
                    {cert.issuer}
                  </p>

                  {/* Description */}
                  <p className="mb-4 text-sm text-slate-600 leading-relaxed">
                    {cert.description}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar size={11} aria-hidden="true" />
                    <time>Issued: {cert.date}</time>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
