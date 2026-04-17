import Link from "next/link";
import Image from "next/image";
import React from "react";
import type { SurahSummary } from "../api/types";

export function SurahRow({ surah }: { surah: SurahSummary }) {
  return (
    <Link
      href={`/surah/${surah.id}`}
      className="flex items-center gap-4 border-b border-(--reader-border) px-3 py-4 transition hover:bg-black/5 dark:hover:bg-white/5"
    >
      <div className="relative h-10 w-10 shrink-0">
        <Image
          src="/images/quran/surah-number-circle.png"
          alt=""
          width={40}
          height={40}
          className="h-10 w-10 object-contain"
        />
        <div className="absolute inset-0 flex items-center justify-center text-[15px] font-semibold text-gray-900 dark:text-white/90">
          {surah.id}
        </div>
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-baseline gap-2">
          <div className="min-w-0 truncate text-lg font-semibold text-gray-900 dark:text-white/90 sm:text-xl">
            {surah.nameEn}
          </div>
          <span className="shrink-0 text-theme-xs text-gray-400 dark:text-gray-500">
            •
          </span>
          <div
            className="min-w-0 truncate text-lg font-semibold text-gray-800/90 dark:text-white/85 sm:text-xl"
            style={{ fontFamily: "var(--q-arabic-font)" }}
          >
            {surah.nameAr}
          </div>
        </div>

        <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5 text-theme-xs text-gray-600 dark:text-gray-400">
          <span className="truncate">
            {surah.type} • {surah.ayahCount} ayahs
          </span>
        </div>
      </div>

      <div className="ml-2 hidden shrink-0 text-right text-theme-xs text-gray-500 dark:text-gray-400 sm:block">
        {surah.meaningEn}
      </div>
    </Link>
  );
}

