"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { CONTACT_INFO, CANDIDATE } from "@/constants";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import type { ContactFormData } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_INFO.email,
    href: `mailto:${CONTACT_INFO.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: CONTACT_INFO.phone,
    href: `tel:${CONTACT_INFO.phone}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: CANDIDATE.location,
    href: null,
  },
  {
    icon: ExternalLink,
    label: "LinkedIn",
    value: "kesab-nayak-371858a1",
    href: CONTACT_INFO.linkedin,
    external: true,
  },
  {
    icon: ExternalLink,
    label: "GitHub",
    value: "Kesab2018",
    href: CONTACT_INFO.github,
    external: true,
  },
];

export function Contact() {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.05 });
  const reducedMotion = useReducedMotion();
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus("success");
        reset();
        setTimeout(() => setSubmitStatus("idle"), 5000);
      } else {
        setSubmitStatus("error");
        setTimeout(() => setSubmitStatus("idle"), 5000);
      }
    } catch {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const inputClass = cn(
    "w-full rounded-lg border bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-450",
    "transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-[#4F8CFF]/50 focus:border-[#4F8CFF]/30",
    "border-slate-200 hover:border-slate-350"
  );

  return (
    <section
      id="contact"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-[#f8fafc]"
      aria-labelledby="contact-heading"
    >
      <Container>
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's Connect"
          description="Open to senior DevOps, Cloud Infrastructure, and Platform Engineering opportunities in Germany and remote."
          id="contact-heading"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact methods */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: -20 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <h3 className="mb-6 text-sm font-semibold text-slate-800">Contact Information</h3>
            <ul className="space-y-4" role="list">
              {contactMethods.map((method) => (
                <li key={method.label}>
                  {method.href ? (
                    <a
                      href={method.href}
                      target={method.external ? "_blank" : undefined}
                      rel={method.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-3 rounded-lg border border-black/5 bg-white p-3.5 hover:border-[#4F8CFF]/35 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 shadow-sm"
                      aria-label={`${method.label}${method.external ? " (opens in new tab)" : ""}`}
                    >
                      <div className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10">
                        <method.icon size={15} className="text-blue-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">{method.label}</p>
                        <p className="text-sm text-slate-700">{method.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 rounded-lg border border-black/5 bg-white p-3.5 shadow-sm">
                      <div className="shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10">
                        <method.icon size={15} className="text-blue-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">{method.label}</p>
                        <p className="text-sm text-slate-700">{method.value}</p>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={reducedMotion ? {} : { opacity: 0, x: 20 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.1 }}
          >
            <h3 className="mb-6 text-sm font-semibold text-slate-800">Send a Message</h3>

            {submitStatus === "success" && (
              <div
                role="alert"
                className="mb-6 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-600"
              >
                <CheckCircle2 size={16} aria-hidden="true" />
                Message sent successfully. I will respond as soon as possible.
              </div>
            )}
            {submitStatus === "error" && (
              <div
                role="alert"
                className="mb-6 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-650"
              >
                <AlertCircle size={16} aria-hidden="true" />
                Something went wrong. Please email me directly.
              </div>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4"
              aria-label="Contact form"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-xs text-slate-500">
                    Name <span className="text-red-550" aria-hidden="true">*</span>
                  </label>
                  <input
                    {...register("name")}
                    id="name"
                    type="text"
                    placeholder="Your name"
                    autoComplete="name"
                    className={inputClass}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1 text-xs text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-xs text-slate-500">
                    Email <span className="text-red-550" aria-hidden="true">*</span>
                  </label>
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    className={inputClass}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1 text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-xs text-slate-500">
                  Subject <span className="text-red-550" aria-hidden="true">*</span>
                </label>
                <input
                  {...register("subject")}
                  id="subject"
                  type="text"
                  placeholder="Opportunity / Collaboration"
                  className={inputClass}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                  aria-invalid={!!errors.subject}
                />
                {errors.subject && (
                  <p id="subject-error" role="alert" className="mt-1 text-xs text-red-500">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs text-slate-500">
                  Message <span className="text-red-550" aria-hidden="true">*</span>
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={5}
                  placeholder="Tell me about the opportunity..."
                  className={cn(inputClass, "resize-none")}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  aria-invalid={!!errors.message}
                />
                {errors.message && (
                  <p id="message-error" role="alert" className="mt-1 text-xs text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer",
                  "bg-blue-600 text-white shadow-md shadow-blue-500/20",
                  "hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f8fafc]",
                  "disabled:opacity-50 disabled:cursor-not-allowed"
                )}
                aria-describedby="submit-status"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
