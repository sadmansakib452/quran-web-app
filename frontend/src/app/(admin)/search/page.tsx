import type { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Search | Quran Web App",
  description: "Search Quran ayahs by translation text.",
};

export default function SearchPagePlaceholder() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-title-md font-semibold text-gray-900 dark:text-white/90">
          Search
        </h1>
        <p className="mt-1 text-theme-sm text-gray-600 dark:text-gray-400">
          Next we’ll implement translation search here using the backend API.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
        <p className="text-theme-sm text-gray-700 dark:text-gray-300">
          For now, you can go back to the surah list.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex items-center justify-center rounded-lg bg-brand-500 px-4 py-2 text-theme-sm font-medium text-white hover:bg-brand-600"
        >
          Back to Surahs
        </Link>
      </div>
    </div>
  );
}

