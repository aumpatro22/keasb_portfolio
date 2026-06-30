"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Globe,
  ShieldCheck,
  Network,
  Server,
  Cpu,
  Database,
  Lock,
} from "lucide-react";

interface ArchNode {
  id: string;
  name: string;
  type: string;
  tech: string;
  details: string;
  subnet: string;
  icon: React.ComponentType<any>;
  color: string;
  bg: string;
}

// Vertical flow: top-to-bottom, two-column split at compute level
const tiers = [
  {
    label: "EDGE / DNS LAYER",
    nodes: [
      {
        id: "r53",
        name: "Route 53 DNS",
        type: "DNS GATEWAY",
        tech: "AWS Route 53 / Cloudflare",
        details:
          "High-performance edge DNS resolving. Routes incoming clients using latency policies and health checks.",
        subnet: "External Edge",
        icon: Globe,
        color: "#FF9900",
        bg: "#FFF7ED",
      },
    ],
  },
  {
    label: "SECURITY LAYER",
    nodes: [
      {
        id: "waf",
        name: "AWS WAF Shield",
        type: "EDGE FIREWALL",
        tech: "AWS WAF / Shield",
        details:
          "Protects applications against SQL Injection, XSS, and DDoS floods. Blocks automated scrapers.",
        subnet: "External Edge",
        icon: ShieldCheck,
        color: "#ef4444",
        bg: "#FEF2F2",
      },
    ],
  },
  {
    label: "LOAD BALANCER",
    nodes: [
      {
        id: "alb",
        name: "Application Load Balancer",
        type: "PUBLIC LOAD BALANCER",
        tech: "AWS ALB",
        details:
          "Decrypts SSL (ACM certificate) and routes client sessions to target container nodes in private subnets.",
        subnet: "Public Subnet (VPC: 10.0.0.0/16)",
        icon: Network,
        color: "#3b82f6",
        bg: "#EFF6FF",
      },
    ],
  },
  {
    label: "COMPUTE & CACHE",
    nodes: [
      {
        id: "pods",
        name: "Kubernetes Worker Nodes",
        type: "CONTAINER COMPUTE",
        tech: "AWS EC2 / EKS",
        details:
          "Docker containers organized in private subnets. Scale based on CPU target logs using Cluster Autoscaler.",
        subnet: "Private Subnet (10.0.2.0/24)",
        icon: Server,
        color: "#0ea5e9",
        bg: "#F0F9FF",
      },
      {
        id: "redis",
        name: "ElastiCache Redis",
        type: "IN-MEMORY CACHE",
        tech: "AWS ElastiCache",
        details:
          "Cache node handling user session memory, queries, and transient variables. Relieves DB read query load.",
        subnet: "Private Subnet (10.0.3.0/24)",
        icon: Cpu,
        color: "#a78bfa",
        bg: "#F5F3FF",
      },
    ],
  },
  {
    label: "DATABASE LAYER",
    nodes: [
      {
        id: "db-master",
        name: "RDS Database (Master)",
        type: "PRIMARY DB",
        tech: "AWS RDS PostgreSQL",
        details:
          "Primary transactional database instance. Writes replicate synchronously to stand-by cluster instances.",
        subnet: "Database Subnet (10.0.4.0/24)",
        icon: Database,
        color: "#10b981",
        bg: "#ECFDF5",
      },
      {
        id: "db-standby",
        name: "RDS Standby Replica",
        type: "FAILOVER STANDBY",
        tech: "Postgres Multi-AZ",
        details:
          "Automatic failover target. Syncs transactions from master in real-time, promoting if incident triggers.",
        subnet: "Database Subnet (10.0.5.0/24)",
        icon: Database,
        color: "#64748b",
        bg: "#F8FAFC",
      },
    ],
  },
];

// Flatten all nodes for lookup
const allNodes: ArchNode[] = tiers.flatMap((t) => t.nodes);

export function CloudArchitecture() {
  const [activeNode, setActiveNode] = useState<string>("r53");

  const activeData = allNodes.find((n) => n.id === activeNode);

  return (
    <div className="w-full rounded-2xl border border-black/5 bg-white/60 p-6 md:p-8 backdrop-blur-md shadow-xl">
      <h3 className="mb-1 text-sm font-semibold uppercase tracking-wider text-slate-800">
        Enterprise Cloud Infrastructure Layout
      </h3>
      <p className="mb-8 text-xs text-slate-500 max-w-xl">
        Vertical traffic flow tracing encrypted client requests from the internet edge down to
        private Kubernetes EC2 nodes and Multi-AZ database layers.
      </p>

      {/* Vertical Flow Diagram */}
      <div className="relative flex flex-col items-center gap-0">
        {tiers.map((tier, ti) => (
          <div key={tier.label} className="flex flex-col items-center w-full">
            {/* Tier label */}
            <span className="text-[9px] font-bold font-mono uppercase tracking-widest text-slate-400 mb-2 mt-1">
              {tier.label}
            </span>

            {/* Nodes row */}
            <div
              className={cn(
                "flex gap-4 justify-center w-full",
                tier.nodes.length === 1 ? "max-w-[260px]" : "max-w-[580px]"
              )}
            >
              {tier.nodes.map((node) => {
                const Icon = node.icon;
                const isActive = activeNode === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setActiveNode(node.id)}
                    className={cn(
                      "group flex-1 flex flex-col items-center justify-center gap-1.5 px-4 py-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer text-center min-w-[140px]",
                      isActive
                        ? "scale-105 shadow-lg border-transparent ring-2 ring-offset-1"
                        : "border-slate-100 hover:border-slate-300 hover:scale-[1.02] shadow-sm"
                    )}
                    style={{
                      background: isActive ? node.bg : "white",
                      borderColor: isActive ? node.color : undefined,
                      boxShadow: isActive
                        ? `0 8px 24px ${node.color}22, 0 0 0 3px ${node.color}15`
                        : undefined,
                    }}
                    aria-pressed={isActive}
                  >
                    {/* Icon bubble */}
                    <div
                      className="h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isActive ? node.color : `${node.color}15`,
                      }}
                    >
                      <Icon
                        size={18}
                        color={isActive ? "white" : node.color}
                        strokeWidth={2}
                      />
                    </div>

                    {/* Type badge */}
                    <span
                      className="text-[7px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full"
                      style={{
                        color: node.color,
                        background: `${node.color}18`,
                      }}
                    >
                      {node.type}
                    </span>

                    {/* Node name */}
                    <span
                      className={cn(
                        "text-[11px] font-semibold leading-tight transition-colors duration-200",
                        isActive ? "text-slate-900" : "text-slate-700"
                      )}
                    >
                      {node.name}
                    </span>

                    {/* Tech stack */}
                    <span className="text-[9px] font-mono text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
                      {node.tech}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Vertical connector arrow (not on last tier) */}
            {ti < tiers.length - 1 && (
              <div className="flex flex-col items-center my-1">
                <div className="w-px h-5 bg-gradient-to-b from-slate-200 to-slate-300" />
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                  <path d="M7 8L0.5 0.5H13.5L7 8Z" fill="#cbd5e1" />
                </svg>
              </div>
            )}
          </div>
        ))}

        {/* Split indicator between ALB and compute */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none select-none" style={{ top: "57%", zIndex: 0 }}>
          <div className="text-[8px] font-mono text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full shadow-sm whitespace-nowrap">
            ↙ load balanced ↘
          </div>
        </div>
      </div>

      {/* Details Panel */}
      {activeData && (
        <div className="mt-8 p-5 rounded-xl border border-black/5 bg-white/80 shadow-inner transition-all duration-300 min-h-[100px]">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-2 border-b border-slate-100">
            <h4 className="font-mono text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: activeData.color }}
              />
              {activeData.name} — Specs
            </h4>
            <span className="inline-flex items-center gap-1 text-[9px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              <Lock size={9} />
              {activeData.subnet}
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{activeData.details}</p>
        </div>
      )}
    </div>
  );
}
