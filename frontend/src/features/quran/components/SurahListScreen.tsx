"use client";

import React from "react";
import type { SurahSummary } from "../api/types";
import { SurahList } from "./SurahList";
import { useSurahViewMode } from "@/context/SurahViewModeContext";

export function SurahListScreen({ surahs }: { surahs: SurahSummary[] }) {
  const { viewMode } = useSurahViewMode();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-title-md font-semibold text-gray-900 dark:text-white/90">
            Surahs
          </h1>
          <p className="mt-1 text-theme-sm text-gray-600 dark:text-gray-400">
            Browse all 114 surahs with Arabic and English names.
          </p>
        </div>
      </div>

      <SurahList surahs={surahs} viewMode={viewMode} />
    </div>
  );
}

