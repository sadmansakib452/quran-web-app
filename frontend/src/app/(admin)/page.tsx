import React from "react";
import type { Metadata } from "next";
import { quranApi } from "@/features/quran/api/client";
import type { SurahSummary } from "@/features/quran/api/types";
import { SurahListScreen } from "@/features/quran/components/SurahListScreen";

export const metadata: Metadata = {
  title: "Surahs | Quran Web App",
  description: "Browse all 114 surahs of the Quran.",
};

export default async function SurahsHome() {
  let surahs: SurahSummary[] = [];
  let errorMessage: string | null = null;
  try {
    const res = await quranApi.getSurahs();
    surahs = res.surahs;
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : "Failed to load surahs.";
  }

  return (
    <div className="space-y-4">
      {errorMessage ? (
        <div className="rounded-xl border border-error-200 bg-(--reader-surface) p-5 text-theme-sm text-gray-700 shadow-theme-xs dark:border-error-800/40 dark:bg-gray-900 dark:text-gray-300">
          <div className="font-medium text-error-600 dark:text-error-400">
            Couldn’t load surahs
          </div>
          <div className="mt-1">{errorMessage}</div>
          <div className="mt-2 text-theme-xs text-gray-500 dark:text-gray-400">
            Check `NEXT_PUBLIC_API_BASE_URL` and confirm the backend is reachable.
          </div>
        </div>
      ) : (
        <SurahListScreen surahs={surahs} />
      )}
    </div>
  );
}
