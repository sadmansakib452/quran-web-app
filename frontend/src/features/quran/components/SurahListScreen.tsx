"use client";

import React, { useMemo, useState } from "react";
import type { SurahSummary } from "../api/types";
import { SurahList, type SurahViewMode } from "./SurahList";

export function SurahListScreen({ surahs }: { surahs: SurahSummary[] }) {
  const [viewMode, setViewMode] = useState<SurahViewMode>("list");

  const toggleButtons = useMemo(() => {
    const base = "inline-flex h-10 w-10 items-center justify-center rounded-lg border shadow-theme-xs";
    return {
      list:
        viewMode === "list"
          ? `${base} border-(--reader-border) bg-(--reader-surface) text-gray-900 dark:bg-gray-900 dark:text-white/90`
          : `${base} border-(--reader-border) bg-(--reader-surface)/60 text-gray-700 hover:bg-(--reader-surface) dark:bg-white/[0.03] dark:text-gray-300`,
      grid:
        viewMode === "grid"
          ? `${base} border-(--reader-border) bg-(--reader-surface) text-gray-900 dark:bg-gray-900 dark:text-white/90`
          : `${base} border-(--reader-border) bg-(--reader-surface)/60 text-gray-700 hover:bg-(--reader-surface) dark:bg-white/[0.03] dark:text-gray-300`,
    };
  }, [viewMode]);

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-title-md font-semibold text-gray-900 dark:text-white/90">
            Surahs
          </h1>
          <p className="mt-1 text-theme-sm text-gray-600 dark:text-gray-400">
            Browse all 114 surahs with Arabic and English names.
          </p>
        </div>

        {/* Toggle hidden on mobile: mobile always shows list */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            type="button"
            className={toggleButtons.list}
            onClick={() => setViewMode("list")}
            aria-label="List view"
            title="List view"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 6H21M8 12H21M8 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M3 6H3.01M3 12H3.01M3 18H3.01"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className={toggleButtons.grid}
            onClick={() => setViewMode("grid")}
            aria-label="Card view"
            title="Card view"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 4H10V10H4V4ZM14 4H20V10H14V4ZM4 14H10V20H4V14ZM14 14H20V20H14V14Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <SurahList surahs={surahs} viewMode={viewMode} />
    </div>
  );
}

