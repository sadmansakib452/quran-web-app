import type { Ayah } from "../core/models.js";
import type { QuranDataService } from "./quranDataService.js";

export type SearchHit = Ayah & {
  highlight?: { start: number; end: number };
};

export type SearchService = {
  search(params: {
    q: string;
    limit: number;
    offset: number;
    surahId?: number;
  }): { total: number; hits: SearchHit[] };
};

type IndexedAyah = {
  ayah: Ayah;
  translationLower: string;
};

/**
 * Builds an in-memory search service.
 *
 * v1 approach: case-insensitive substring match on English translation.
 * This satisfies the assignment and keeps implementation simple.
 *
 * Note: `offset` is applied to the list of matches (not to all ayahs).
 */
export function createSearchService(quranData: QuranDataService): SearchService {
  const indexed: IndexedAyah[] = [];

  // Prebuild searchable rows once at startup.
  for (const surah of quranData.getSurahs()) {
    const ayahs = quranData.getAyahsBySurahId(surah.id);
    for (const ayah of ayahs) {
      indexed.push({ ayah, translationLower: ayah.translation.toLowerCase() });
    }
  }

  function search(params: { q: string; limit: number; offset: number; surahId?: number }) {
    const qLower = params.q.toLowerCase();

    const matches: SearchHit[] = [];
    let total = 0;

    for (const row of indexed) {
      if (params.surahId !== undefined && row.ayah.surahId !== params.surahId) continue;

      const idx = row.translationLower.indexOf(qLower);
      if (idx === -1) continue;

      total++;
      if (total <= params.offset) continue;
      if (matches.length >= params.limit) continue;

      matches.push({
        ...row.ayah,
        highlight: { start: idx, end: idx + qLower.length },
      });
    }

    return { total, hits: matches };
  }

  return { search };
}

