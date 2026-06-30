"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Mail, MapPin } from "lucide-react";
import { CONTACT_INFO, CANDIDATE, NAV_ITEMS } from "@/constants";
import { Container } from "./Container";

export function Footer() {
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer
      className="border-t border-slate-200 bg-[#f8fafc] py-12"
      aria-label="Site footer"
    >
      <Container>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <img
              src="/logo.png"
              alt="Kesab Nayak – DevOps & Cloud Engineer"
              className="h-9 w-auto object-contain opacity-90"
            />
            <p className="text-sm text-slate-500 max-w-xs">
              DevOps & Cloud Infrastructure Engineer based in Osnabrück, Germany.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <MapPin size={12} aria-hidden="true" />
              <span>{CANDIDATE.location}</span>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Navigation
            </p>
            <ul className="space-y-2" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-slate-500 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Connect
            </p>
            <ul className="space-y-2" role="list">
              <li>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                >
                  <Mail size={14} aria-hidden="true" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  aria-label="LinkedIn profile (opens in new tab)"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                  aria-label="GitHub profile (opens in new tab)"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-[#1e3a5f]/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            &copy; {year} {CANDIDATE.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-700">
            Built with Next.js · Deployed on Vercel
          </p>
        </div>
      </Container>
    </footer>
  );
}
