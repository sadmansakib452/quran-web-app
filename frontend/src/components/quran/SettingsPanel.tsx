"use client";

import React from "react";
import { useReadingSettings, type ArabicFontId } from "@/context/ReadingSettingsContext";

const FONT_LABELS: Record<ArabicFontId, string> = {
  lateef: "Lateef",
  harmattan: "Harmattan",
  amiri: "Amiri",
  notoNaskhArabic: "Noto Naskh Arabic",
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-theme-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
      {children}
    </div>
  );
}

export function SettingsPanel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { settings, setArabicFont, setArabicFontSizePx, setTranslationFontSizePx, reset } =
    useReadingSettings();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <aside className="absolute right-0 top-0 h-full w-full max-w-md border-l border-(--reader-border) bg-(--reader-surface) shadow-2xl dark:bg-gray-900">
        <div className="flex items-center justify-between border-b border-(--reader-border) px-5 py-4">
          <div className="text-theme-sm font-semibold text-gray-900 dark:text-white/90">
            Settings
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            title="Close"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 hover:bg-black/5 dark:text-gray-200 dark:hover:bg-white/5"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 6L18 18M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="flex h-[calc(100%-72px)] flex-col gap-6 overflow-y-auto p-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[160px,1fr]">
            <div>
              <SectionTitle>Font</SectionTitle>
              <div className="mt-2 space-y-1">
                {(Object.keys(FONT_LABELS) as ArabicFontId[]).map((id) => {
                  const active = settings.arabicFont === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setArabicFont(id)}
                      className={`w-full rounded-lg border px-3 py-2 text-left text-theme-sm shadow-theme-xs ${
                        active
                          ? "border-brand-300 bg-brand-50 text-gray-900 dark:border-brand-800 dark:bg-brand-500/12 dark:text-white/90"
                          : "border-(--reader-border) bg-transparent text-gray-700 hover:bg-black/5 dark:text-gray-300 dark:hover:bg-white/5"
                      }`}
                    >
                      {FONT_LABELS[id]}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <SectionTitle>Selected font & size</SectionTitle>
              <div className="mt-3 rounded-xl border border-(--reader-border) bg-white p-4 shadow-theme-xs dark:bg-gray-950/20">
                <div className="grid gap-4">
                  <div>
                    <div className="mb-2 text-theme-xs font-medium text-gray-700 dark:text-gray-300">
                      Arabic font size
                    </div>
                    <input
                      type="range"
                      min={22}
                      max={56}
                      value={settings.arabicFontSizePx}
                      onChange={(e) => setArabicFontSizePx(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="mt-1 text-theme-xs text-gray-600 dark:text-gray-400">
                      {settings.arabicFontSizePx}px
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-theme-xs font-medium text-gray-700 dark:text-gray-300">
                      Translation font size
                    </div>
                    <input
                      type="range"
                      min={12}
                      max={24}
                      value={settings.translationFontSizePx}
                      onChange={(e) => setTranslationFontSizePx(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="mt-1 text-theme-xs text-gray-600 dark:text-gray-400">
                      {settings.translationFontSizePx}px
                    </div>
                  </div>

                  <div className="rounded-lg border border-(--reader-border) bg-(--reader-surface) p-4">
                    <div
                      className="text-right leading-loose text-gray-900 dark:text-white/90"
                      style={{
                        fontFamily: "var(--q-arabic-font)",
                        fontSize: "var(--q-arabic-size)",
                      }}
                    >
                      بِسْمِ ٱللَّٰهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                    </div>
                    <div
                      className="mt-3 text-gray-700 dark:text-gray-300"
                      style={{
                        fontSize: "var(--q-translation-size)",
                      }}
                    >
                      In the name of Allah, the Entirely Merciful, the Especially Merciful.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-end">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-lg border border-(--reader-border) bg-(--reader-surface) px-3 py-2 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-black/5 dark:bg-white/3 dark:text-gray-300 dark:hover:bg-white/5"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

