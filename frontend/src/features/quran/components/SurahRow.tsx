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
        <div
          className="truncate text-lg font-semibold text-gray-900 dark:text-white/90 sm:text-xl"
          style={{ fontFamily: "var(--q-arabic-font)" }}
        >
          {surah.nameAr}
        </div>
        <div className="mt-0.5 truncate text-theme-xs text-gray-600 dark:text-gray-400">
          {surah.nameEn} • {surah.type} • {surah.ayahCount} ayahs
        </div>
      </div>

      <div className="text-theme-xs text-gray-500 dark:text-gray-400">
        {surah.meaningEn}
      </div>
    </Link>
  );
}

