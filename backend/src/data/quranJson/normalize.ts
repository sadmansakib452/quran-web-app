import type { Ayah, SurahSummary } from "../../core/models.js";
import type { QuranJsonChapter } from "./types.js";

export type NormalizedQuranData = {
  surahs: SurahSummary[];
  ayahsBySurahId: Map<number, Ayah[]>;
};

/**
 * Converts the validated raw dataset into a normalized, API-friendly shape.
 *
 * We keep normalized forms in memory so endpoints can respond quickly without
 * re-parsing or re-walking the full dataset for every request.
 */
export function normalizeQuranEnDataset(chapters: QuranJsonChapter[]): NormalizedQuranData {
  const surahs: SurahSummary[] = [];
  const ayahsBySurahId = new Map<number, Ayah[]>();

  for (const chapter of chapters) {
    const surah: SurahSummary = {
      id: chapter.id,
      nameAr: chapter.name,
      nameEn: chapter.transliteration,
      meaningEn: chapter.translation,
      type: chapter.type,
      ayahCount: chapter.total_verses,
    };

    const ayahs: Ayah[] = chapter.verses.map((v) => ({
      surahId: chapter.id,
      ayahNumber: v.id,
      arabic: v.text,
      translation: v.translation,
      // Not available in `quran_en.json`; we keep the field stable for clients.
      transliteration: v.transliteration ?? "",
    }));

    surahs.push(surah);
    ayahsBySurahId.set(chapter.id, ayahs);
  }

  // Keep output order stable (1..114) even if upstream data changes ordering.
  surahs.sort((a, b) => a.id - b.id);

  return { surahs, ayahsBySurahId };
}

