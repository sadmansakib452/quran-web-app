"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type ArabicFontId = "lateef" | "harmattan" | "amiri" | "notoNaskhArabic";

export type ReadingSettings = {
  arabicFont: ArabicFontId;
  arabicFontSizePx: number;
  translationFontSizePx: number;
};

const STORAGE_KEY = "quran.readingSettings.v1";

const DEFAULT_SETTINGS: ReadingSettings = {
  arabicFont: "lateef",
  arabicFontSizePx: 34,
  translationFontSizePx: 14,
};

type ReadingSettingsContextValue = {
  settings: ReadingSettings;
  setArabicFont: (font: ArabicFontId) => void;
  setArabicFontSizePx: (px: number) => void;
  setTranslationFontSizePx: (px: number) => void;
  reset: () => void;
};

const ReadingSettingsContext = createContext<ReadingSettingsContextValue | null>(null);

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function parseStored(raw: string | null): ReadingSettings | null {
  if (!raw) return null;
  try {
    const obj = JSON.parse(raw) as Partial<ReadingSettings>;
    const arabicFont = obj.arabicFont;
    const arabicFontSizePx = obj.arabicFontSizePx;
    const translationFontSizePx = obj.translationFontSizePx;

    if (
      arabicFont !== "lateef" &&
      arabicFont !== "harmattan" &&
      arabicFont !== "amiri" &&
      arabicFont !== "notoNaskhArabic"
    ) {
      return null;
    }
    if (typeof arabicFontSizePx !== "number" || typeof translationFontSizePx !== "number") {
      return null;
    }
    return {
      arabicFont,
      arabicFontSizePx: clamp(arabicFontSizePx, 22, 56),
      translationFontSizePx: clamp(translationFontSizePx, 12, 24),
    };
  } catch {
    return null;
  }
}

function applyCssVars(s: ReadingSettings) {
  const root = document.documentElement;
  root.style.setProperty("--q-arabic-font", `var(--q-arabic-font-${s.arabicFont})`);
  root.style.setProperty("--q-arabic-size", `${s.arabicFontSizePx}px`);
  root.style.setProperty("--q-translation-size", `${s.translationFontSizePx}px`);
}

export function ReadingSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ReadingSettings>(DEFAULT_SETTINGS);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const stored = parseStored(localStorage.getItem(STORAGE_KEY));
    setSettings(stored ?? DEFAULT_SETTINGS);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (!initialized) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    applyCssVars(settings);
  }, [settings, initialized]);

  useEffect(() => {
    if (!initialized) return;
    applyCssVars(settings);
  }, [initialized]); // eslint-disable-line react-hooks/exhaustive-deps

  const value = useMemo<ReadingSettingsContextValue>(
    () => ({
      settings,
      setArabicFont: (font) => setSettings((prev) => ({ ...prev, arabicFont: font })),
      setArabicFontSizePx: (px) =>
        setSettings((prev) => ({ ...prev, arabicFontSizePx: clamp(px, 22, 56) })),
      setTranslationFontSizePx: (px) =>
        setSettings((prev) => ({ ...prev, translationFontSizePx: clamp(px, 12, 24) })),
      reset: () => setSettings(DEFAULT_SETTINGS),
    }),
    [settings]
  );

  return (
    <ReadingSettingsContext.Provider value={value}>
      {children}
    </ReadingSettingsContext.Provider>
  );
}

export function useReadingSettings() {
  const ctx = useContext(ReadingSettingsContext);
  if (!ctx) throw new Error("useReadingSettings must be used within ReadingSettingsProvider");
  return ctx;
}

