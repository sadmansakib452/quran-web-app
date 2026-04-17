import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Surahs | Quran Web App",
  description: "Browse all 114 surahs of the Quran.",
};

export default function SurahsHome() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-title-md font-semibold text-gray-900 dark:text-white/90">
            Surahs
          </h1>
          <p className="mt-1 text-theme-sm text-gray-600 dark:text-gray-400">
            This is the home screen. Next we’ll render the full list of 114 surahs here.
          </p>
        </div>
        <Link
          href="/search"
          className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-300 dark:hover:bg-white/5"
        >
          Search
        </Link>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
        <p className="text-theme-sm text-gray-700 dark:text-gray-300">
          Planned content:
        </p>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-theme-sm text-gray-600 dark:text-gray-400">
          <li>Show all surahs (Arabic + English)</li>
          <li>Click a surah to open its ayahs page</li>
          <li>Reading settings in the sidebar</li>
        </ul>
      </div>
    </div>
  );
}
