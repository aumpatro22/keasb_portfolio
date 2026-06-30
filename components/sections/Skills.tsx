"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { skills } from "@/data/skills";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRecruiterMode } from "@/components/common/RecruiterToggle";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Cloud,
  Layers,
  Code2,
  GitBranch,
  Terminal,
  Activity,
  Server,
  GitMerge,
  Star,
} from "lucide-react";

// Icon mapping from skills data
const iconMap: Record<string, React.ComponentType<any>> = {
  Cloud: Cloud,
  Layers: Layers,
  Code2: Code2,
  GitBranch: GitBranch,
  Terminal: Terminal,
  Activity: Activity,
  Server: Server,
  GitMerge: GitMerge,
};

// Descriptions and color styles for each category to enhance UI
const categoryDetails: Record<
  string,
  { description: string; color: string; bgClass: string; textClass: string; borderClass: string }
> = {
  "Cloud & AWS": {
    description: "Designing, deploying, and managing scalable, highly available, and fault-tolerant systems on AWS compute, storage, database, and networking services.",
    color: "#3b82f6",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-400",
    borderClass: "border-blue-500/20",
  },
  "Containers & Orchestration": {
    description: "Configuring and managing containerized applications with Docker and orchestrating them at scale using Kubernetes clusters and Helm.",
    color: "#0ea5e9",
    bgClass: "bg-sky-500/10",
    textClass: "text-sky-400",
    borderClass: "border-sky-500/20",
  },
  "Infrastructure as Code": {
    description: "Defining, provisioning, and managing cloud infrastructure using declarative configuration files with Terraform modules.",
    color: "#7c3aed",
    bgClass: "bg-violet-500/10",
    textClass: "text-violet-400",
    borderClass: "border-violet-500/20",
  },
  "CI/CD & Automation": {
    description: "Automating software delivery pipelines, builds, testing, and application deployment configurations using modern CI/CD tools.",
    color: "#ec4899",
    bgClass: "bg-pink-500/10",
    textClass: "text-pink-400",
    borderClass: "border-pink-500/20",
  },
  "Programming & Scripting": {
    description: "Writing clean, efficient code and automated automation scripts using Python, Bash, and modern web languages to connect and manage platform operations.",
    color: "#f59e0b",
    bgClass: "bg-amber-500/10",
    textClass: "text-amber-400",
    borderClass: "border-amber-500/20",
  },
  "Monitoring & Incident": {
    description: "Establishing comprehensive observability, audit logs, and monitoring alerts using Splunk, ServiceNow, and APM tools to guarantee uptime.",
    color: "#10b981",
    bgClass: "bg-emerald-500/10",
    textClass: "text-emerald-400",
    borderClass: "border-emerald-500/20",
  },
  "Operating Systems": {
    description: "Configuring, tuning, hardening, and maintaining enterprise Linux server distributions (RHEL, Ubuntu) and Unix-like environments.",
    color: "#94a3b8",
    bgClass: "bg-slate-500/10",
    textClass: "text-slate-350",
    borderClass: "border-slate-500/20",
  },
  "Version Control": {
    description: "Collaborating on source code repositories, branch management, and git-based deployment workflows (GitOps) with GitHub and Bitbucket.",
    color: "#6366f1",
    bgClass: "bg-indigo-500/10",
    textClass: "text-indigo-400",
    borderClass: "border-indigo-500/20",
  },
};

export function Skills() {
  const { ref } = useIntersectionObserver({ threshold: 0.05 });
  const reducedMotion = useReducedMotion();
  const { isRecruiterMode } = useRecruiterMode();
  const [activeCategoryName, setActiveCategoryName] = useState<string>(skills[0]?.category || "Cloud & AWS");

  const activeCategory = skills.find((s) => s.category === activeCategoryName) || skills[0];
  const activeDetails = categoryDetails[activeCategoryName] || {
    description: "",
    color: "#3b82f6",
    bgClass: "bg-blue-500/10",
    textClass: "text-blue-400",
    borderClass: "border-blue-500/20",
  };

  const ActiveIcon = iconMap[activeCategory?.icon] || Cloud;

  return (
    <section
      id="skills"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-transparent relative overflow-hidden"
      aria-labelledby="skills-heading"
    >
      <Container>
        <SectionHeader
          eyebrow="Expertise"
          title="Technical Skills"
          description="A categorized roadmap of my engineering competencies, tooling, and core technologies."
          id="skills-heading"
        />

        {!isRecruiterMode ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
            {/* Left Column: Interactive Navigation Tabs */}
            <div className="lg:col-span-4 flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 gap-2 scrollbar-none snap-x">
              {skills.map((skill) => {
                const CategoryIcon = iconMap[skill.icon] || Cloud;
                const details = categoryDetails[skill.category] || { color: "#3b82f6", textClass: "text-blue-400" };
                const isActive = activeCategoryName === skill.category;

                return (
                  <button
                    key={skill.category}
                    onClick={() => setActiveCategoryName(skill.category)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all duration-200 snap-center shrink-0 cursor-pointer w-[240px] lg:w-full",
                      isActive
                        ? "bg-white/[0.04] border-white/10 shadow-lg"
                        : "bg-transparent border-transparent hover:bg-white/[0.02]"
                    )}
                    style={{
                      borderLeftWidth: isActive ? "4px" : "1px",
                      borderLeftColor: isActive ? details.color : "transparent",
                    }}
                  >
                    <div
                      className={cn(
                        "p-2 rounded-lg transition-colors shrink-0",
                        isActive ? details.bgClass : "bg-white/[0.02]"
                      )}
                    >
                      <CategoryIcon
                        size={18}
                        className={cn(
                          "transition-colors",
                          isActive ? details.textClass : "text-slate-500 hover:text-slate-400"
                        )}
                      />
                    </div>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-xs font-semibold truncate",
                          isActive ? "text-white" : "text-slate-450 hover:text-slate-300"
                        )}
                      >
                        {skill.category}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                        {skill.items.length} tools / concepts
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Detailed Skill Display */}
            <div className="lg:col-span-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategoryName}
                  initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? {} : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "rounded-2xl border bg-white/[0.02] p-6 md:p-8 shadow-xl backdrop-blur-md relative overflow-hidden",
                    activeDetails.borderClass
                  )}
                >
                  {/* Decorative faint glow */}
                  <div
                    className="absolute -right-24 -top-24 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none"
                    style={{ backgroundColor: activeDetails.color }}
                  />

                  {/* Header info */}
                  <div className="flex items-start gap-4 pb-6 border-b border-white/5">
                    <div className={cn("p-3 rounded-xl shrink-0", activeDetails.bgClass)}>
                      <ActiveIcon size={24} className={activeDetails.textClass} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {activeCategoryName}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {activeDetails.description}
                      </p>
                    </div>
                  </div>

                  {/* Skills Grid */}
                  <div className="mt-8">
                    <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-4">
                      Core Technologies & Competencies
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      {activeCategory?.items.map((item, index) => (
                        <motion.div
                          key={item.name}
                          initial={reducedMotion ? {} : { opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.15, delay: index * 0.03 }}
                          className={cn(
                            "group flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-200",
                            item.featured
                              ? "bg-white/[0.03] border-blue-500/20 hover:border-blue-500/40 shadow-sm"
                              : "bg-white/[0.01] border-white/5 hover:border-white/10"
                          )}
                        >
                          <span className="text-xs font-mono font-medium text-slate-200">
                            {item.name}
                          </span>
                          {item.featured && (
                            <div
                              className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider shrink-0"
                              style={{
                                backgroundColor: `${activeDetails.color}20`,
                                color: activeDetails.color,
                              }}
                            >
                              <Star size={8} fill="currentColor" />
                              <span>Core</span>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          /* Recruiter Mode: Clean Grid Listing */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
            {skills.map((category) => (
              <div
                key={category.category}
                className="rounded-xl border border-white/5 bg-white/[0.02] p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 border-b border-white/5 pb-2 flex items-center justify-between">
                  <span>{category.category}</span>
                  <span className="text-[10px] text-slate-500 font-mono font-normal">
                    ({category.items.length})
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item) => (
                    <span
                      key={item.name}
                      className={cn(
                        "inline-block px-2.5 py-1 text-[10px] font-mono font-medium rounded-md border",
                        item.featured
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          : "bg-white/[0.02] text-slate-400 border-white/5"
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
