"use client";

import { motion } from "framer-motion";
import { Cloud, Code2, Users, Globe } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CANDIDATE } from "@/constants";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useRecruiterMode } from "@/components/common/RecruiterToggle";

const strengths = [
  {
    icon: Cloud,
    title: "Cloud-Native Infrastructure",
    description:
      "Deep AWS expertise across EC2, S3, Lambda, RDS, IAM, and CloudWatch. Proven track record automating and scaling enterprise cloud environments.",
  },
  {
    icon: Code2,
    title: "Infrastructure as Code",
    description:
      "Terraform-driven provisioning that reduces deployment times and eliminates manual configuration drift across production environments.",
  },
  {
    icon: Users,
    title: "Enterprise Operations",
    description:
      "Experienced operating within SLA-bound enterprise environments for clients including Volkswagen Group, Morgan Stanley, and Bank of America.",
  },
  {
    icon: Globe,
    title: "Multilingual Professional",
    description:
      "Fluent English with German B2 proficiency — effective in international and German-speaking enterprise engineering teams.",
  },
];

export function About() {
  const reducedMotion = useReducedMotion();
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  const { isRecruiterMode } = useRecruiterMode();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[#f8fafc]"
      aria-labelledby="about-heading"
    >
      <Container>
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24 items-start">
          {/* Left: Text */}
          <motion.div
            initial={reducedMotion || isRecruiterMode ? {} : { opacity: 0, x: -24 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SectionHeader
              eyebrow="About"
              title="Engineering infrastructure that enterprise teams depend on."
              id="about-heading"
            />
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                With over 6 years of hands-on experience, I specialize in designing and automating
                cloud infrastructures that are reliable, secure, and cost-efficient. My work spans
                the full DevOps lifecycle — from Terraform provisioning to Kubernetes orchestration
                and production incident response.
              </p>
              <p>
                I hold both the{" "}
                <strong className="text-slate-800 font-semibold">Certified Kubernetes Administrator (CKA)</strong>{" "}
                and{" "}
                <strong className="text-slate-800 font-semibold">AWS Certified Solutions Architect – Associate</strong>{" "}
                credentials, validating my hands-on cloud and container expertise.
              </p>
              <p>
                Based in Osnabrück, Germany as a permanent resident, I bring international experience
                from enterprise engagements across Germany, Mexico, and India — collaborating with
                teams at Volkswagen Group, Morgan Stanley, and Bank of America.
              </p>
            </div>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "6+", label: "Years Experience" },
                { value: "2", label: "Certifications" },
                { value: "4", label: "Enterprise Clients" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-black/5 bg-white p-4 text-center shadow-md"
                >
                  <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
                  <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Strength cards */}
          <motion.div
            initial={reducedMotion || isRecruiterMode ? {} : { opacity: 0, x: 24 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {strengths.map((item, i) => (
              <motion.div
                key={item.title}
                initial={reducedMotion || isRecruiterMode ? {} : { opacity: 0, y: 16 }}
                animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 + i * 0.08 }}
                className="group rounded-xl border border-black/5 bg-white p-5 hover:border-blue-500/35 transition-all duration-300 shadow-md"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10">
                  <item.icon size={18} className="text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-slate-800">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
