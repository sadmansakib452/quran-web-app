import type { Metadata } from "next";
import React from "react";
import { quranApi } from "@/features/quran/api/client";
import { AyahList } from "@/features/quran/components/AyahList";
import { SurahBanner } from "@/features/quran/components/SurahBanner";
import type { SurahSummary } from "@/features/quran/api/types";

export const dynamicParams = false;

export async function generateStaticParams() {
  return Array.from({ length: 114 }, (_, i) => ({ id: String(i + 1) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return { title: `Surah ${id} | Quran Web App` };
}

export default async function SurahReaderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surahId = Number(id);

  let data: Awaited<ReturnType<typeof quranApi.getSurahAyahs>> | null = null;
  let errorMessage: string | null = null;

  try {
    data = await quranApi.getSurahAyahs(surahId);
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : "Failed to load surah.";
  }

  return (
    <div className="space-y-4">
      {errorMessage || !data ? (
        <div className="rounded-xl border border-error-200 bg-(--reader-surface) p-5 text-theme-sm text-gray-700 shadow-theme-xs dark:border-error-800/40 dark:bg-gray-900 dark:text-gray-300">
          <div className="font-medium text-error-600 dark:text-error-400">
            Couldn’t load surah
          </div>
          <div className="mt-1">{errorMessage ?? "Unknown error"}</div>
        </div>
      ) : (
        <>
          <SurahBanner surah={data.surah as SurahSummary} />
          <AyahList ayahs={data.ayahs} />
        </>
      )}
    </div>
  );
}

