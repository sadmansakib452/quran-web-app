import React from "react";
import type { SurahSummary } from "../api/types";

export function SurahBanner({ surah }: { surah: SurahSummary }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-(--reader-border) bg-(--reader-surface) shadow-theme-xs dark:bg-gray-900">
      <div className="bg-black/5 px-5 py-3 dark:bg-white/5">
        <div className="text-center text-theme-xs font-medium uppercase tracking-wide text-gray-600 dark:text-gray-400">
          Surah {surah.id} • {surah.type} • {surah.ayahCount} ayahs
        </div>
      </div>

      <div className="px-5 py-6 text-center">
        <div
          className="text-3xl font-semibold text-gray-900 dark:text-white/90"
          style={{ fontFamily: "var(--q-arabic-font)" }}
        >
          {surah.nameAr}
        </div>
        <div className="mt-1 text-theme-sm text-gray-700 dark:text-gray-300">
          {surah.nameEn}
        </div>
        <div className="mt-1 text-theme-xs text-gray-600 dark:text-gray-400">
          {surah.meaningEn}
        </div>
      </div>
    </div>
  );
}

