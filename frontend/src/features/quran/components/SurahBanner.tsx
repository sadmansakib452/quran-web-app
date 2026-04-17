import React from "react";
import type { SurahSummary } from "../api/types";

export function SurahBanner({ surah }: { surah: SurahSummary }) {
  return (
    <div className="rounded-full border border-(--reader-border) bg-(--reader-surface) px-5 py-4 text-center shadow-theme-xs dark:bg-gray-900 sm:px-8 sm:py-5">
      <div
        className="text-3xl font-semibold text-gray-900 dark:text-white/90 sm:text-4xl"
        style={{ fontFamily: "var(--q-arabic-font)" }}
      >
        {surah.nameAr}
      </div>

      <div className="mt-1 flex items-center justify-center gap-2 text-theme-sm font-medium text-gray-700 dark:text-gray-300 sm:text-base">
        <span className="truncate">{surah.nameEn}</span>
        <span className="text-theme-xs text-gray-400 dark:text-gray-500">•</span>
        <span className="uppercase tracking-wide text-theme-xs text-gray-600 dark:text-gray-400">
          {surah.type}
        </span>
      </div>
    </div>
  );
}

