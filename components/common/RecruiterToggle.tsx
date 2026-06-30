"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface RecruiterModeContextType {
  isRecruiterMode: boolean;
  toggleRecruiterMode: () => void;
}

const RecruiterModeContext = createContext<RecruiterModeContextType | undefined>(
  undefined
);

export function RecruiterModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isRecruiterMode, setIsRecruiterMode] = useState(false);

  // Sync preference with localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recruiter-mode");
    if (saved === "true") {
      setIsRecruiterMode(true);
      document.documentElement.classList.add("recruiter-mode");
    }
  }, []);

  const toggleRecruiterMode = () => {
    setIsRecruiterMode((prev) => {
      const newVal = !prev;
      localStorage.setItem("recruiter-mode", String(newVal));
      if (newVal) {
        document.documentElement.classList.add("recruiter-mode");
      } else {
        document.documentElement.classList.remove("recruiter-mode");
      }
      return newVal;
    });
  };

  return (
    <RecruiterModeContext.Provider
      value={{ isRecruiterMode, toggleRecruiterMode }}
    >
      {children}
    </RecruiterModeContext.Provider>
  );
}

export function useRecruiterMode() {
  const context = useContext(RecruiterModeContext);
  if (!context) {
    throw new Error(
      "useRecruiterMode must be used within a RecruiterModeProvider"
    );
  }
  return context;
}
