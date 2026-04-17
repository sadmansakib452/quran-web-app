import Link from "next/link";
import Image from "next/image";
import React from "react";
import type { SurahSummary } from "../api/types";

export function SurahCard({ surah }: { surah: SurahSummary }) {
  return (
    <Link
      href={`/surah/${surah.id}`}
      className="group block rounded-xl border border-gray-200 bg-white p-4 shadow-theme-xs transition hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 dark:hover:bg-white/3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="truncate text-theme-sm font-medium text-gray-900 dark:text-white/90">
            <span className="inline-flex items-center gap-2">
              <span className="relative h-9 w-9">
                <Image
                  src="/images/quran/surah-number-circle.png"
                  alt=""
                  width={36}
                  height={36}
                  className="h-9 w-9 object-contain"
                />
                <span className="absolute inset-0 flex items-center justify-center text-[13px] font-semibold text-gray-900 dark:text-white/90">
                  {surah.id}
                </span>
              </span>
              <span className="truncate">{surah.nameEn}</span>
            </span>
          </div>
          <div className="mt-1 truncate text-theme-xs text-gray-500 dark:text-gray-400">
            {surah.meaningEn} • {surah.type} • {surah.ayahCount} ayahs
          </div>
        </div>

        <div className="shrink-0 text-right">
          <div
            className="text-lg font-semibold text-gray-900 dark:text-white/90"
            style={{ fontFamily: "var(--q-arabic-font)" }}
          >
            {surah.nameAr}
          </div>
        </div>
      </div>
    </Link>
  );
}

