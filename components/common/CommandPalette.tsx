"use client";

import React, { useEffect, useState, useRef } from "react";
import { Terminal, CornerDownLeft, X } from "lucide-react";
import { NAV_ITEMS } from "@/constants";
import { useRecruiterMode } from "./RecruiterToggle";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Kesab OS v1.0.0 initialized.",
    "Type 'help' to see list of available commands.",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const { toggleRecruiterMode, isRecruiterMode } = useRecruiterMode();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    let response = "";
    let shouldScrollTo = "";

    switch (trimmed) {
      case "help":
        response =
          "Commands: about, experience, skills, certifications, education, contact, recruiter-mode, clear, exit";
        break;
      case "about":
        shouldScrollTo = "about";
        response = "Navigating to About section...";
        break;
      case "experience":
        shouldScrollTo = "experience";
        response = "Navigating to Experience section...";
        break;
      case "skills":
        shouldScrollTo = "skills";
        response = "Navigating to Skills section...";
        break;
      case "certifications":
        shouldScrollTo = "certifications";
        response = "Navigating to Certifications section...";
        break;
      case "education":
        shouldScrollTo = "education";
        response = "Navigating to Education section...";
        break;
      case "contact":
        shouldScrollTo = "contact";
        response = "Navigating to Contact section...";
        break;
      case "recruiter-mode":
        toggleRecruiterMode();
        response = `Recruiter Mode toggled: ${!isRecruiterMode ? "ENABLED (animations off, high density)" : "DISABLED (interactive)"}`;
        break;
      case "clear":
        setHistory([]);
        setInputValue("");
        return;
      case "exit":
        setIsOpen(false);
        setInputValue("");
        return;
      default:
        response = `Command not found: '${trimmed}'. Type 'help' for suggestions.`;
    }

    setHistory((prev) => [...prev, `> ${cmd}`, response]);
    setInputValue("");

    if (shouldScrollTo) {
      setTimeout(() => {
        document.getElementById(shouldScrollTo)?.scrollIntoView({
          behavior: isRecruiterMode ? "auto" : "smooth",
          block: "start",
        });
        setIsOpen(false);
      }, 300);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cmd-title"
    >
      <div 
        className="w-full max-w-lg overflow-hidden rounded-xl border border-brand-border bg-[#0d1530] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-brand-border bg-[#060d1f] px-4 py-3">
          <div className="flex items-center gap-2">
            <Terminal size={16} className="text-blue-400" aria-hidden="true" />
            <span id="cmd-title" className="font-mono text-xs font-semibold text-slate-300">
              Developer Command Console
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="Close console"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        {/* Terminal Output */}
        <div className="h-64 overflow-y-auto px-4 py-3 font-mono text-xs text-slate-300 space-y-2 select-text">
          {history.map((line, idx) => (
            <div
              key={idx}
              className={
                line.startsWith("> ")
                  ? "text-blue-400 font-semibold"
                  : line.startsWith("Error") || line.startsWith("Command not found")
                  ? "text-red-400"
                  : "text-slate-300"
              }
            >
              {line}
            </div>
          ))}
          <div ref={consoleEndRef} />
        </div>

        {/* Terminal Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputValue);
          }}
          className="flex items-center gap-2 border-t border-brand-border bg-[#060d1f] px-4 py-3"
        >
          <span className="font-mono text-xs text-blue-400 font-bold" aria-hidden="true">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-transparent font-mono text-xs text-white placeholder-slate-600 focus:outline-none"
            placeholder="Type 'about', 'experience' or 'help'..."
            aria-label="Terminal command"
          />
          <button
            type="submit"
            className="text-slate-500 hover:text-white transition-colors"
            aria-label="Submit command"
          >
            <CornerDownLeft size={14} aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
}
