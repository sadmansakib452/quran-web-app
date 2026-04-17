"use client";

import React, { useMemo, useState } from "react";
import type { SurahSummary } from "../api/types";
import { SurahList, type SurahViewMode } from "./SurahList";

export function SurahListScreen({ surahs }: { surahs: SurahSummary[] }) {
  const [viewMode, setViewMode] = useState<SurahViewMode>("list");

  const toggleBtnClass = useMemo(() => {
    const base =
      "inline-flex h-10 w-10 items-center justify-center rounded-lg border shadow-theme-xs";
    return viewMode === "list"
      ? `${base} border-(--reader-border) bg-(--reader-surface)/60 text-gray-700 hover:bg-(--reader-surface) dark:bg-white/3 dark:text-gray-300`
      : `${base} border-(--reader-border) bg-(--reader-surface) text-gray-900 dark:bg-gray-900 dark:text-white/90`;
  }, [viewMode]);

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

        {/* Desktop-only single toggle: shows the next view mode icon */}
        <button
          type="button"
          className={`hidden sm:inline-flex ${toggleBtnClass}`}
          onClick={() => setViewMode((prev) => (prev === "list" ? "grid" : "list"))}
          aria-label={viewMode === "list" ? "Switch to card view" : "Switch to list view"}
          title={viewMode === "list" ? "Cards" : "List"}
        >
          {viewMode === "list" ? (
            // Cards icon (next action)
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
          ) : (
            // List icon (next action)
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
          )}
        </button>
      </div>

      <SurahList surahs={surahs} viewMode={viewMode} />
    </div>
  );
}

