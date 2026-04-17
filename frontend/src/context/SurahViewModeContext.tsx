"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { SurahViewMode } from "@/features/quran/components/SurahList";

type SurahViewModeContextValue = {
  viewMode: SurahViewMode;
  setViewMode: (mode: SurahViewMode) => void;
};

const SurahViewModeContext = createContext<SurahViewModeContextValue | null>(null);

export function SurahViewModeProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<SurahViewMode>("list");

  const value = useMemo(() => ({ viewMode, setViewMode }), [viewMode]);

  return (
    <SurahViewModeContext.Provider value={value}>
      {children}
    </SurahViewModeContext.Provider>
  );
}

export function useSurahViewMode() {
  const ctx = useContext(SurahViewModeContext);
  if (!ctx) throw new Error("useSurahViewMode must be used within SurahViewModeProvider");
  return ctx;
}

