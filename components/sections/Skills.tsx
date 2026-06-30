"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { skills } from "@/data/skills";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRecruiterMode } from "@/components/common/RecruiterToggle";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Cloud, Settings, Box, Shield } from "lucide-react";

// ─── Data ───────────────────────────────────────────────────────────────────

interface SkillCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  gradStart: string;
  gradEnd: string;
  icon: React.ComponentType<any>;
  items: string[];
}

const categories: SkillCategory[] = [
  {
    id: "cloud",
    name: "Cloud & AWS",
    description:
      "Provisioning and operating scalable AWS services across compute, storage, networking, and managed databases.",
    color: "#3b82f6",
    gradStart: "#3b82f6",
    gradEnd: "#0ea5e9",
    icon: Cloud,
    items: ["AWS EC2", "AWS S3", "AWS RDS", "Lambda", "Route 53", "CloudWatch", "AWS ALB"],
  },
  {
    id: "iac",
    name: "IaC & Automation",
    description:
      "Infrastructure-as-Code using Terraform modules, Ansible playbooks, and automated shell workflows.",
    color: "#7c3aed",
    gradStart: "#7c3aed",
    gradEnd: "#a78bfa",
    icon: Settings,
    items: ["Terraform", "Ansible", "Git Workflow", "Bash Script", "Helm", "Jenkins"],
  },
  {
    id: "containers",
    name: "Containers & Orch",
    description:
      "CKA-certified Kubernetes administration — cluster bootstrapping, Helm deployments, and autoscaling.",
    color: "#0ea5e9",
    gradStart: "#0ea5e9",
    gradEnd: "#06b6d4",
    icon: Box,
    items: ["Kubernetes", "Docker", "ArgoCD", "Helm Deploy", "EKS", "Ingress"],
  },
  {
    id: "security",
    name: "Security & Monitor",
    description:
      "Enterprise security posture through IAM hardening, audit logging, WAF rules, and observability pipelines.",
    color: "#ef4444",
    gradStart: "#ef4444",
    gradEnd: "#f97316",
    icon: Shield,
    items: ["Splunk Audit", "IAM Security", "ServiceNow", "CloudWatch", "AWS WAF", "tfsec"],
  },
];

// ─── SVG layout constants ────────────────────────────────────────────────────
// Canvas: 600 wide, nodes at fixed x positions
//   trunk x = 300  (centre)
//   left  x = 120  (left-side skill pills)
//   right x = 480  (right-side skill pills)

const TRUNK_X = 300;
const LEFT_X = 108;
const RIGHT_X = 492;
const CAT_Y_START = 60;    // y of first category node
const CAT_SPACING = 140;   // vertical distance between categories
const PILL_H = 22;         // height of each skill pill
const PILL_W = 126;        // width of each skill pill
const PILL_SPACING = 29;   // vertical spacing between pills

function getPillsForSide(items: string[], side: "left" | "right") {
  // Alternate items: left gets even indices, right gets odd indices
  return items.filter((_, i) => (side === "left" ? i % 2 === 0 : i % 2 !== 0));
}

function pillsStartY(catY: number, count: number): number {
  const totalH = (count - 1) * PILL_SPACING + PILL_H;
  return catY - totalH / 2;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function Skills() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05 });
  const reducedMotion = useReducedMotion();
  const { isRecruiterMode } = useRecruiterMode();
  const [activeId, setActiveId] = useState<string>("cloud");

  const activeCategory = categories.find((c) => c.id === activeId)!;

  // Total SVG height
  const svgH = CAT_Y_START + (categories.length - 1) * CAT_SPACING + 60;

  // Gradient IDs for trunk segments
  const gradIds = categories.map((_, i) => `trunk-grad-${i}`);

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[#f8fafc] relative overflow-hidden"
      aria-labelledby="skills-heading"
    >
      <Container>
        <SectionHeader
          eyebrow="Expertise"
          title="Technical Skills Galaxy"
          description="A vertical skill tree mapping primary engineering competencies and their supporting technologies."
          id="skills-heading"
        />

        {!isRecruiterMode ? (
          <div className="flex flex-col gap-6">
            {/* ── Tree Diagram ─────────────────────────────────── */}
            <div className="relative w-full max-w-2xl mx-auto border border-slate-100 bg-white/60 rounded-2xl p-4 shadow-inner">
              <div className="relative w-full" style={{ height: `${svgH}px` }}>
                {/* ── SVG: trunk + branch paths ─── */}
                <svg
                  viewBox={`0 0 600 ${svgH}`}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  fill="none"
                  strokeWidth={2}
                >
                  <defs>
                    {/* Trunk gradient segments between successive categories */}
                    {categories.slice(0, -1).map((cat, i) => {
                      const next = categories[i + 1];
                      return (
                        <linearGradient
                          key={gradIds[i]}
                          id={gradIds[i]}
                          x1="0%"
                          y1="0%"
                          x2="0%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor={cat.color} />
                          <stop offset="100%" stopColor={next.color} />
                        </linearGradient>
                      );
                    })}
                  </defs>

                  {/* Vertical trunk segments between categories */}
                  {categories.slice(0, -1).map((cat, i) => {
                    const y1 = CAT_Y_START + i * CAT_SPACING;
                    const y2 = CAT_Y_START + (i + 1) * CAT_SPACING;
                    return (
                      <line
                        key={`trunk-${i}`}
                        x1={TRUNK_X}
                        y1={y1}
                        x2={TRUNK_X}
                        y2={y2}
                        stroke={`url(#${gradIds[i]})`}
                        strokeWidth={2.5}
                      />
                    );
                  })}

                  {/* Branch lines to skill pills */}
                  {categories.map((cat, ci) => {
                    const catY = CAT_Y_START + ci * CAT_SPACING;
                    const leftPills = getPillsForSide(cat.items, "left");
                    const rightPills = getPillsForSide(cat.items, "right");
                    const isActive = activeId === cat.id;

                    return (
                      <g key={`branches-${cat.id}`}>
                        {/* Left branches */}
                        {leftPills.map((_, pi) => {
                          const startY = pillsStartY(catY, leftPills.length);
                          const pillCY = startY + pi * PILL_SPACING + PILL_H / 2;
                          return (
                            <path
                              key={`l-${pi}`}
                              d={`M ${TRUNK_X},${catY} C ${TRUNK_X - 60},${catY} ${LEFT_X + PILL_W / 2},${pillCY} ${LEFT_X + PILL_W / 2},${pillCY}`}
                              stroke={isActive ? cat.color : "#e2e8f0"}
                              strokeWidth={isActive ? 1.5 : 1}
                              strokeDasharray={isActive ? "5 3" : "4 4"}
                              opacity={isActive ? 0.9 : 0.6}
                            />
                          );
                        })}
                        {/* Right branches */}
                        {rightPills.map((_, pi) => {
                          const startY = pillsStartY(catY, rightPills.length);
                          const pillCY = startY + pi * PILL_SPACING + PILL_H / 2;
                          return (
                            <path
                              key={`r-${pi}`}
                              d={`M ${TRUNK_X},${catY} C ${TRUNK_X + 60},${catY} ${RIGHT_X - PILL_W / 2},${pillCY} ${RIGHT_X - PILL_W / 2},${pillCY}`}
                              stroke={isActive ? cat.color : "#e2e8f0"}
                              strokeWidth={isActive ? 1.5 : 1}
                              strokeDasharray={isActive ? "5 3" : "4 4"}
                              opacity={isActive ? 0.9 : 0.6}
                            />
                          );
                        })}
                      </g>
                    );
                  })}
                </svg>

                {/* ── Absolute-positioned nodes ─── */}
                {categories.map((cat, ci) => {
                  const Icon = cat.icon;
                  const catY = CAT_Y_START + ci * CAT_SPACING;
                  const isActive = activeId === cat.id;
                  const leftPills = getPillsForSide(cat.items, "left");
                  const rightPills = getPillsForSide(cat.items, "right");

                  return (
                    <React.Fragment key={cat.id}>
                      {/* ── Category nucleus node ── */}
                      <button
                        onClick={() => setActiveId(cat.id)}
                        className={cn(
                          "absolute z-10 flex flex-col items-center justify-center p-2 rounded-xl border bg-white shadow-md transition-all duration-300 cursor-pointer -translate-x-1/2 -translate-y-1/2",
                          isActive
                            ? "scale-110 border-transparent ring-2 ring-offset-1"
                            : "border-slate-200 hover:border-blue-400 hover:bg-slate-50"
                        )}
                        style={{
                          left: `${(TRUNK_X / 600) * 100}%`,
                          top: `${catY}px`,
                          width: "140px",
                          boxShadow: isActive
                            ? `0 8px 20px ${cat.color}30, 0 0 0 3px ${cat.color}18`
                            : undefined,
                          background: isActive ? `${cat.color}0d` : "white",
                          borderColor: isActive ? cat.color : undefined,
                        }}
                        aria-pressed={isActive}
                      >
                        <div
                          className="p-1.5 rounded-lg mb-1 flex items-center justify-center"
                          style={{ background: isActive ? `${cat.color}20` : "rgba(0,0,0,0.03)" }}
                        >
                          <Icon size={14} color={cat.color} />
                        </div>
                        <span
                          className="text-[9px] font-mono font-semibold text-center leading-tight"
                          style={{ color: isActive ? cat.color : "#475569" }}
                        >
                          {cat.name}
                        </span>
                      </button>

                      {/* ── Left skill pills ── */}
                      {leftPills.map((pill, pi) => {
                        const startY = pillsStartY(catY, leftPills.length);
                        const pillTop = startY + pi * PILL_SPACING;
                        return (
                          <div
                            key={`lp-${pill}`}
                            className={cn(
                              "absolute z-10 flex items-center justify-center rounded-full border text-[8px] font-mono font-semibold transition-all duration-300",
                              isActive
                                ? "border-transparent text-white shadow-md"
                                : "border-slate-200 bg-white text-slate-500 shadow-sm"
                            )}
                            style={{
                              left: `${(LEFT_X / 600) * 100}%`,
                              top: `${pillTop}px`,
                              width: `${PILL_W}px`,
                              height: `${PILL_H}px`,
                              transform: "translateX(-50%)",
                              background: isActive ? cat.color : "white",
                              borderColor: isActive ? cat.color : undefined,
                            }}
                          >
                            {pill}
                          </div>
                        );
                      })}

                      {/* ── Right skill pills ── */}
                      {rightPills.map((pill, pi) => {
                        const startY = pillsStartY(catY, rightPills.length);
                        const pillTop = startY + pi * PILL_SPACING;
                        return (
                          <div
                            key={`rp-${pill}`}
                            className={cn(
                              "absolute z-10 flex items-center justify-center rounded-full border text-[8px] font-mono font-semibold transition-all duration-300",
                              isActive
                                ? "border-transparent text-white shadow-md"
                                : "border-slate-200 bg-white text-slate-500 shadow-sm"
                            )}
                            style={{
                              left: `${(RIGHT_X / 600) * 100}%`,
                              top: `${pillTop}px`,
                              width: `${PILL_W}px`,
                              height: `${PILL_H}px`,
                              transform: "translateX(-50%)",
                              background: isActive ? cat.color : "white",
                              borderColor: isActive ? cat.color : undefined,
                            }}
                          >
                            {pill}
                          </div>
                        );
                      })}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* ── Details Drawer (same as DevOps Pipeline) ──── */}
            <div className="w-full max-w-2xl mx-auto mt-1 p-5 rounded-xl border border-black/5 bg-white/70 backdrop-blur-sm shadow-inner transition-all duration-200 min-h-[90px]">
              <h4 className="font-mono text-xs font-bold text-slate-800 mb-1 border-b border-slate-100 pb-1 flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: activeCategory.color }}
                />
                {activeCategory.name} — Details
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans mt-2">
                {activeCategory.description}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {activeCategory.items.map((item) => (
                  <span
                    key={item}
                    className="inline-block px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold text-white"
                    style={{ background: activeCategory.color }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Recruiter Mode: Clean Grid Listing */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((category) => (
              <div
                key={category.category}
                className="rounded-xl border border-black/5 bg-white p-5 shadow-sm"
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-4 border-b pb-1.5">
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item.name}
                      className={cn(
                        "inline-block px-2.5 py-1 text-[10px] font-mono font-medium rounded-md",
                        item.featured
                          ? "bg-blue-50 text-blue-600 border border-blue-100"
                          : "bg-slate-50 text-slate-500 border border-slate-100"
                      )}
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
