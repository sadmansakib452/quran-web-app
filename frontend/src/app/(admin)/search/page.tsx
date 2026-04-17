import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { quranApi } from "@/features/quran/api/client";
import type { SearchHit } from "@/features/quran/api/types";

export const metadata: Metadata = {
  title: "Search | Quran Web App",
  description: "Search Quran ayahs by translation text.",
};

function HighlightedTranslation({
  hit,
}: {
  hit: SearchHit;
}) {
  const t = hit.translation ?? "";
  const start = Math.max(0, Math.min(hit.highlight?.start ?? 0, t.length));
  const end = Math.max(start, Math.min(hit.highlight?.end ?? start, t.length));
  return (
    <span>
      {t.slice(0, start)}
      <mark className="rounded bg-brand-100 px-1 text-gray-900 dark:bg-brand-500/20 dark:text-white/90">
        {t.slice(start, end)}
      </mark>
      {t.slice(end)}
    </span>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  let data: Awaited<ReturnType<typeof quranApi.search>> | null = null;
  let errorMessage: string | null = null;

  if (query) {
    try {
      data = await quranApi.search({ q: query, limit: 20, offset: 0 });
    } catch (err) {
      errorMessage = err instanceof Error ? err.message : "Search failed.";
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-title-md font-semibold text-gray-900 dark:text-white/90">
          Search
        </h1>
        <p className="mt-1 text-theme-sm text-gray-600 dark:text-gray-400">
          Search ayahs by translation text. Tip: use the header search icon to open the overlay.
        </p>
      </div>

      {!query ? (
        <div className="rounded-xl border border-(--reader-border) bg-(--reader-surface) p-6 shadow-theme-xs dark:bg-gray-900">
          <div className="text-theme-sm text-gray-700 dark:text-gray-300">
            Add a query in the URL like{" "}
            <span className="font-medium">/search?q=Especially</span> or use the search icon in the header.
          </div>
        </div>
      ) : errorMessage ? (
        <div className="rounded-xl border border-error-200 bg-(--reader-surface) p-5 text-theme-sm text-gray-700 shadow-theme-xs dark:border-error-800/40 dark:bg-gray-900 dark:text-gray-300">
          <div className="font-medium text-error-600 dark:text-error-400">
            Search failed
          </div>
          <div className="mt-1">{errorMessage}</div>
        </div>
      ) : !data ? (
        <div className="rounded-xl border border-(--reader-border) bg-(--reader-surface) p-6 shadow-theme-xs dark:bg-gray-900">
          <div className="text-theme-sm text-gray-700 dark:text-gray-300">
            Loading…
          </div>
        </div>
      ) : data.total === 0 ? (
        <div className="rounded-xl border border-(--reader-border) bg-(--reader-surface) p-6 shadow-theme-xs dark:bg-gray-900">
          <div className="text-theme-sm text-gray-700 dark:text-gray-300">
            No results for <span className="font-medium">{data.q}</span>.
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-(--reader-border) bg-(--reader-surface) shadow-theme-xs dark:bg-gray-900">
          <div className="border-b border-(--reader-border) px-5 py-4 text-theme-sm text-gray-700 dark:text-gray-300">
            Showing <span className="font-medium">{data.hits.length}</span> of{" "}
            <span className="font-medium">{data.total}</span> results for{" "}
            <span className="font-medium">{data.q}</span>.
          </div>

          <div>
            {data.hits.map((hit) => (
              <div
                key={`${hit.surahId}-${hit.ayahNumber}-${hit.highlight.start}-${hit.highlight.end}`}
                className="border-b border-(--reader-border) px-5 py-5 last:border-b-0"
              >
                <div className="text-theme-xs font-medium text-gray-600 dark:text-gray-400">
                  Surah {hit.surahId} • Ayah {hit.ayahNumber}{" "}
                  <Link
                    href={`/surah/${hit.surahId}`}
                    className="ml-2 text-brand-700 hover:underline dark:text-brand-300"
                  >
                    Open surah →
                  </Link>
                </div>

                {hit.arabic ? (
                  <div
                    className="mt-3 text-right leading-loose text-gray-900 dark:text-white/90"
                    style={{
                      fontFamily: "var(--q-arabic-font)",
                      fontSize: "var(--q-arabic-size)",
                    }}
                  >
                    {hit.arabic}
                  </div>
                ) : null}

                <div
                  className="mt-3 leading-7 text-gray-700 dark:text-gray-300"
                  style={{ fontSize: "var(--q-translation-size)" }}
                >
                  <HighlightedTranslation hit={hit} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

