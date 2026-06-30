"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { useRecruiterMode } from "./RecruiterToggle";
import { Server, Shield, Code, GitBranch, RefreshCw, Terminal, CheckCircle } from "lucide-react";

interface TreeNode {
  id: string;
  name: string;
  x: number; // coordinates relative to 600px width SVG canvas space
  y: number;
  details: string;
  icon: React.ComponentType<any>;
  color: string;
}

const treeNodes: TreeNode[] = [
  {
    id: "dev",
    name: "1. Developer Workspace",
    x: 300,
    y: 40,
    details: "Agile SCRUM environment using Docker environments and hot-reloading Vue/Laravel workspaces for local testing.",
    icon: Code,
    color: "#3b82f6",
  },
  // Left Branch: Application Code
  {
    id: "vcs",
    name: "2a. Git / VCS",
    x: 140,
    y: 120,
    details: "Git repository structures, branch security settings, and automated PR merging pipelines using trunk-based models.",
    icon: GitBranch,
    color: "#0ea5e9",
  },
  {
    id: "ci",
    name: "3a. CI Orchestration",
    x: 140,
    y: 200,
    details: "Continuous integration workflows using GitHub Actions and Jenkins. Automates unit tests, static code analysis, and artifact generation.",
    icon: RefreshCw,
    color: "#0ea5e9",
  },
  {
    id: "docker",
    name: "4a. Container Registry",
    x: 140,
    y: 280,
    details: "Multi-stage Docker builds compiled and stored in secure cloud container registries with vulnerability scanning active.",
    icon: Server,
    color: "#0ea5e9",
  },
  // Right Branch: Infrastructure as Code
  {
    id: "iac",
    name: "2b. IaC / Terraform",
    x: 460,
    y: 160,
    details: "Terraform configuration scripting for modular environment definition. Manages VPC subnets, route tables, and instance groups.",
    icon: Terminal,
    color: "#7c3aed",
  },
  {
    id: "sec",
    name: "3b. SecOps Scanning",
    x: 460,
    y: 245,
    details: "Automatic static analysis checks (tfsec, checkov) and credential leak scanning validating state files before deployment.",
    icon: Shield,
    color: "#7c3aed",
  },
  // CD Integration Node
  {
    id: "cd",
    name: "5. CD Deployer",
    x: 300,
    y: 360,
    details: "GitOps deployment pipelines using Helm charts and ArgoCD triggers. Deploys workloads into cluster namespaces safely.",
    icon: RefreshCw,
    color: "#10b981",
  },
  // Output Targets
  {
    id: "k8s",
    name: "6a. Kubernetes Cluster",
    x: 140,
    y: 440,
    details: "Production CKA-administered Kubernetes node groups running auto-scaled workloads, ingress controllers, and ingress policies.",
    icon: Server,
    color: "#10b981",
  },
  {
    id: "aws",
    name: "6b. AWS Infrastructure",
    x: 460,
    y: 440,
    details: "Highly-available AWS environments including Application Load Balancers, Route 53 routes, and RDS Multi-AZ replicated databases.",
    icon: Server,
    color: "#FF9900",
  },
  {
    id: "prod",
    name: "7. Live Production",
    x: 300,
    y: 520,
    details: "99.9% uptime live services. Cost-optimized setups monitored with CloudWatch alarms and real-time alerts.",
    icon: CheckCircle,
    color: "#22c55e",
  },
];

export function DevOpsPipeline() {
  const { isRecruiterMode } = useRecruiterMode();
  const [activeNode, setActiveNode] = useState<string>("dev");

  return (
    <div className="w-full rounded-2xl border border-black/5 bg-white/50 p-6 md:p-8 backdrop-blur-md shadow-xl">
      <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-slate-800">
        Vertical DevOps Deployment Tree
      </h3>
      <p className="mb-6 text-xs text-slate-500 max-w-xl">
        A vertical deployment flow representing trunk commits and environment configurations moving down to live production nodes.
      </p>

      {/* Vertical SVG Tree Box */}
      <div className="relative w-full max-w-2xl mx-auto border border-slate-100 bg-white/60 rounded-2xl p-4 shadow-inner">
        {/* Aspect-ratio container for SVG vertical layout */}
        <div className="relative w-full h-[560px]">
          {/* SVG Connection Paths */}
          <svg 
            viewBox="0 0 600 560" 
            className="absolute inset-0 w-full h-full pointer-events-none" 
            fill="none" 
            strokeWidth={2}
          >
            <defs>
              <linearGradient id="v-grad-top-left" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
              <linearGradient id="v-grad-top-right" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
              <linearGradient id="v-grad-merge-left" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
              <linearGradient id="v-grad-merge-right" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>

            {/* Split from Developer core to Left Branch (Git VCS) */}
            <path d="M 300,40 C 300,80 140,80 140,120" stroke="url(#v-grad-top-left)" />
            {/* Split from Developer core to Right Branch (IaC) */}
            <path d="M 300,40 C 300,90 460,90 460,160" stroke="url(#v-grad-top-right)" />

            {/* Left Branch straight path */}
            <line x1="140" y1="120" x2="140" y2="280" stroke="#0ea5e9" />
            {/* Right Branch straight path */}
            <line x1="460" y1="160" x2="460" y2="245" stroke="#7c3aed" />

            {/* Merge from Left Branch to CD Deployer */}
            <path d="M 140,280 C 140,320 300,320 300,360" stroke="url(#v-grad-merge-left)" />
            {/* Merge from Right Branch to CD Deployer */}
            <path d="M 460,245 C 460,300 300,300 300,360" stroke="url(#v-grad-merge-right)" />

            {/* CD Deployer splits to EKS K8s and AWS targets */}
            <path d="M 300,360 C 300,400 140,400 140,440" stroke="#10b981" />
            <path d="M 300,360 C 300,400 460,400 460,440" stroke="#FF9900" />

            {/* Targets merge down to Live Production */}
            <path d="M 140,440 C 140,480 300,480 300,520" stroke="#10b981" />
            <path d="M 460,440 C 460,480 300,480 300,520" stroke="#22c55e" />
          </svg>

          {/* Render Interactive Nodes */}
          {treeNodes.map((node) => {
            const Icon = node.icon;
            const isActive = activeNode === node.id;

            return (
              <button
                key={node.id}
                onClick={() => setActiveNode(node.id)}
                className={cn(
                  "absolute z-10 flex flex-col items-center justify-center p-2 rounded-xl border bg-white shadow-md transition-all duration-300 cursor-pointer -translate-x-1/2 -translate-y-1/2",
                  isActive
                    ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50 text-emerald-600 scale-105"
                    : "border-slate-200 hover:border-blue-400 hover:bg-slate-50 text-slate-600"
                )}
                style={{ 
                  left: `${(node.x / 600) * 100}%`, 
                  top: `${node.y}px`, 
                  width: "140px" 
                }}
              >
                <div 
                  className="p-1 rounded-lg mb-1 flex items-center justify-center"
                  style={{
                    background: isActive ? `${node.color}15` : "rgba(0,0,0,0.03)",
                  }}
                >
                  <Icon size={14} color={node.color} />
                </div>
                <span className="text-[9px] font-mono font-semibold">{node.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Details Display Drawer */}
      <div className="mt-6 p-5 rounded-xl border border-black/5 bg-white/70 backdrop-blur-sm shadow-inner transition-all duration-200 min-h-[90px]">
        {activeNode ? (
          <div>
            <h4 className="font-mono text-xs font-bold text-slate-800 mb-1 border-b border-slate-100 pb-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              {treeNodes.find((n) => n.id === activeNode)?.name} Details
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans mt-2">
              {treeNodes.find((n) => n.id === activeNode)?.details}
            </p>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-xs text-slate-400 font-mono">
            Select a tree node above to display integration workflow specifications.
          </div>
        )}
      </div>
    </div>
  );
}
