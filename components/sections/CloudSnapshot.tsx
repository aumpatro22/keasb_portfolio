"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  TrendingDown,
  Lock,
  Server,
  RefreshCw,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CLOUD_HIGHLIGHTS } from "@/constants";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useReducedMotion } from "@/hooks/useReducedMotion";

import { DevOpsPipeline } from "@/components/common/DevOpsPipeline";
import { CloudArchitecture } from "@/components/common/CloudArchitecture";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  Shield,
  Zap,
  TrendingDown,
  Lock,
  Server,
  RefreshCw,
};

export function CloudSnapshot() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05 });
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="cloud-snapshot"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[#f8fafc] relative overflow-hidden"
      aria-labelledby="cloud-heading"
    >
      {/* Background texture */}
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:32px_32px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-blue-600/5 blur-[100px]"
        aria-hidden="true"
      />

      <Container className="relative space-y-12">
        <div>
          <SectionHeader
            eyebrow="Cloud Infrastructure"
            title="Enterprise Operations Highlights"
            description="Verified outcomes from enterprise-scale cloud and infrastructure work — all supported by documented experience."
            id="cloud-heading"
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {C_HIGHLIGHTS_MAP(C_HIGHLIGHTS_DATA, iconMap, isIntersecting, reducedMotion)}
          </div>
        </div>

        {/* DevOps Pipeline Widget */}
        <DevOpsPipeline />

        {/* Cloud Architecture Widget */}
        <CloudArchitecture />

        {/* Bottom note */}
        <p className="mt-8 text-xs text-slate-700 text-center">
          All figures sourced from verified resume experience. No fabricated metrics.
        </p>
      </Container>
    </section>
  );
}

// Helper block to make the code cleaner
const C_HIGHLIGHTS_DATA = CLOUD_HIGHLIGHTS;
function C_HIGHLIGHTS_MAP(data: typeof CLOUD_HIGHLIGHTS, iconMap: any, isIntersecting: boolean, reducedMotion: boolean) {
  return data.map((item, i) => {
    const Icon = iconMap[item.icon] || Shield;
    return (
      <motion.div
        key={item.title}
        initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.07 }}
        className="group relative rounded-xl border border-black/5 bg-white p-6 hover:border-blue-500/35 transition-all duration-300 shadow-sm"
      >
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10">
          <Icon size={18} className="text-blue-600" aria-hidden="true" />
        </div>
        <h3 className="mb-2 text-sm font-semibold text-slate-800">{item.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
      </motion.div>
    );
  });
}
